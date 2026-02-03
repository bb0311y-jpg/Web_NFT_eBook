'use client';

import { useState, useRef, useEffect } from 'react';
import { ReactReader, ReactReaderStyle } from 'react-reader';
import { useAccount, useSignMessage } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useParams, useRouter } from 'next/navigation';

export default function ReaderPage() {
    const { isConnected } = useAccount();
    const { signMessageAsync } = useSignMessage();
    const params = useParams();
    const router = useRouter();
    const id = params?.id || '8'; // Default ID if not provided

    // State: Content
    const [epubData, setEpubData] = useState<ArrayBuffer | null>(null);
    const [location, setLocation] = useState<string | number>(0);
    const [isLoading, setIsLoading] = useState(false);

    // State: Settings
    const [fontSize, setFontSize] = useState(100);
    const [theme, setTheme] = useState<'dark' | 'light' | 'sepia'>('dark');
    const [showControls, setShowControls] = useState(true);

    // Mock Unlock for Prototype (skips backend for demo if ownership is assumed)
    // In real app: this matches the logic in previous version
    useEffect(() => {
        // Auto-load mock book for "Familiar Operations" demo
        // For production, we would require the signature flow here
        const loadMockBook = async () => {
            // Basic public domain epub for testing UI
            const url = "https://react-reader.metabits.no/files/alice.epub";
            const res = await fetch(url);
            const buffer = await res.arrayBuffer();
            setEpubData(buffer);
        };
        loadMockBook();
    }, []);

    // Theme Styles
    const getReaderTheme = () => {
        const base = {
            ...ReactReaderStyle,
            readerArea: { ...ReactReaderStyle.readerArea, transition: 'all 0.3s ease' },
        };
        if (theme === 'dark') {
            return {
                ...base,
                readerArea: { ...base.readerArea, backgroundColor: '#1a1a1a' },
                titleArea: { ...base.titleArea, color: '#ccc' },
                tocArea: { ...base.tocArea, background: '#111', color: '#ccc' },
            };
        } else if (theme === 'sepia') {
            return {
                ...base,
                readerArea: { ...base.readerArea, backgroundColor: '#f1e8d0' },
                titleArea: { ...base.titleArea, color: '#5f4b32' },
                tocArea: { ...base.tocArea, background: '#eaddc5', color: '#5f4b32' },
            };
        }
        return base; // Light
    };

    return (
        <div className={`h-screen flex flex-col overflow-hidden relative ${theme === 'dark' ? 'bg-[#1a1a1a] text-gray-200' : theme === 'sepia' ? 'bg-[#f1e8d0] text-[#5f4b32]' : 'bg-white text-black'}`}>

            {/* Top Bar (Controls) */}
            <div className={`absolute top-0 left-0 right-0 z-50 transition-transform duration-300 ${showControls ? 'translate-y-0' : '-translate-y-full'}`}>
                <div className={`flex justify-between items-center p-4 backdrop-blur-md shadow-lg ${theme === 'dark' ? 'bg-black/80' : 'bg-white/80'}`}>
                    <button onClick={() => router.push('/library')} className="font-mono text-sm hover:opacity-70">
                        &larr; LIBRARY
                    </button>
                    <div className="font-[family-name:var(--font-orbitron)] font-bold text-sm tracking-widest opacity-80">
                        BOOK #{id}
                    </div>

                    {/* Settings Toggles */}
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1">
                            <button onClick={() => setFontSize(Math.max(50, fontSize - 10))} className="text-sm font-bold px-2">A-</button>
                            <span className="text-xs font-mono w-8 text-center">{fontSize}%</span>
                            <button onClick={() => setFontSize(Math.min(200, fontSize + 10))} className="text-lg font-bold px-2">A+</button>
                        </div>
                        <div className="flex gap-1 bg-white/10 rounded-full p-1">
                            <button onClick={() => setTheme('light')} className={`w-6 h-6 rounded-full bg-white border border-gray-300 ${theme === 'light' ? 'ring-2 ring-[var(--neon-cyan)]' : ''}`}></button>
                            <button onClick={() => setTheme('sepia')} className={`w-6 h-6 rounded-full bg-[#f1e8d0] border border-gray-400 ${theme === 'sepia' ? 'ring-2 ring-[var(--neon-cyan)]' : ''}`}></button>
                            <button onClick={() => setTheme('dark')} className={`w-6 h-6 rounded-full bg-[#1a1a1a] border border-gray-600 ${theme === 'dark' ? 'ring-2 ring-[var(--neon-cyan)]' : ''}`}></button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Reader Area */}
            <div className="flex-1 relative z-0 mt-0">
                {!epubData ? (
                    <div className="flex h-full items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--neon-cyan)]"></div>
                    </div>
                ) : (
                    <div style={{ height: '100vh' }}>
                        <ReactReader
                            url={epubData}
                            location={location}
                            locationChanged={(loc: string | number) => setLocation(loc)}
                            epubOptions={{
                                flow: 'paginated',
                                manager: 'default',
                            }}
                            readerStyles={getReaderTheme()}
                            getRendition={(rendition) => {
                                rendition.themes.fontSize(`${fontSize}%`);
                                // Inject our font
                                rendition.themes.register('custom', {
                                    'body': { 'font-family': 'Inter, sans-serif' },
                                    'h1, h2, h3': { 'font-family': 'Orbitron, sans-serif' }
                                });
                                rendition.themes.select('custom');
                            }}
                        />
                    </div>
                )}
            </div>

            {/* Tap Zones for Controls Toggle */}
            <div
                className="absolute inset-x-0 top-[20%] bottom-[20%] z-40 cursor-pointer"
                onClick={() => setShowControls(!showControls)}
                title="Toggle Menu"
            ></div>

            {/* Bottom Bar (Progress) */}
            <div className={`absolute bottom-0 left-0 right-0 z-50 transition-transform duration-300 ${showControls ? 'translate-y-0' : 'translate-y-full'}`}>
                <div className={`p-4 backdrop-blur-md text-center font-mono text-xs ${theme === 'dark' ? 'bg-black/80 text-gray-400' : 'bg-white/80 text-gray-600'}`}>
                    {/* Simplified Progress (Normally calc from location) */}
                    Location: {String(location).slice(0, 10)}... | {fontSize}% Zoom
                </div>
            </div>

        </div>
    );
}
