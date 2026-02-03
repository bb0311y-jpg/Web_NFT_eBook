'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { NFTCard } from '@/components/NFTCard';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

export default function LibraryPage() {
    const { isConnected, address } = useAccount();
    const router = useRouter();
    const { t } = useLanguage();
    const [filter, setFilter] = useState<'all' | 'unread' | 'finished'>('all');

    // MOCK OWNED BOOKS (Simulating what would come from the blockchain)
    // In a real app, we would fetch User's Balance of ERC1155 tokens
    const OWNED_BOOKS = [
        { id: 1, title: "The Future of Web3", author: "Satoshi_Nakamoto", price: 10, max: 500, circulated: 450, tier: 'Early Bird', progress: 0 },
        { id: 4, title: "DeFi for Dummies", author: "Vitalik_B", price: 20, max: 1000, circulated: 850, tier: 'Standard', progress: 45 },
        { id: 6, title: "Rare Genesis Block", author: "Unknown_Miner", price: 50, max: 10, circulated: 10, tier: 'Final', isSigned: true, progress: 100 },
    ];

    const filteredBooks = OWNED_BOOKS.filter(book => {
        if (filter === 'unread') return book.progress === 0;
        if (filter === 'finished') return book.progress === 100;
        return true;
    });

    const handleRead = (id: number) => {
        router.push(`/read/${id}`);
    };

    const handleLoginRedirect = () => {
        router.push('/profile');
    };

    if (!isConnected) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)] text-white p-6">
                <div className="text-center space-y-6 max-w-md p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-lg">
                    <h1 className="text-3xl font-[family-name:var(--font-orbitron)] text-[var(--neon-cyan)]">MY LIBRARY</h1>
                    <p className="text-gray-400 font-mono">Connect your wallet OR login to access your secured eBook collection.</p>

                    <div className="space-y-4">
                        <div className="flex justify-center">
                            <ConnectButton label="Connect Wallet (Web3)" />
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-700"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-[#0f0f1a] px-2 text-gray-500 font-mono">OR</span>
                            </div>
                        </div>

                        <button
                            onClick={handleLoginRedirect}
                            className="w-full py-2.5 border border-white/20 hover:bg-white/10 text-white font-mono rounded-xl transition-all text-sm tracking-wider"
                        >
                            LOGIN WITH EMAIL
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--background)] text-white font-[family-name:var(--font-inter)] pb-20">
            {/* Header */}
            <header className="sticky top-0 z-50 backdrop-blur-lg border-b border-white/10 bg-[rgba(5,5,16,0.8)]">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <h1 className="text-2xl font-bold font-[family-name:var(--font-orbitron)] tracking-widest text-white">
                            MY <span className="text-[var(--neon-cyan)]">LIBRARY</span>
                        </h1>
                    </div>
                    <div>
                        <div className="flex items-center gap-2 font-mono text-xs text-gray-400 bg-black/30 px-3 py-1 rounded-full border border-white/10">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            {address?.slice(0, 6)}...{address?.slice(-4)}
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-12">

                {/* Stats / Welcome */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10">
                        <h3 className="text-gray-400 font-mono text-sm mb-1">TOTAL BOOKS</h3>
                        <div className="text-4xl font-[family-name:var(--font-orbitron)] text-white">{OWNED_BOOKS.length}</div>
                    </div>
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10">
                        <h3 className="text-gray-400 font-mono text-sm mb-1">READING STREAK</h3>
                        <div className="text-4xl font-[family-name:var(--font-orbitron)] text-[var(--neon-cyan)]">12 <span className="text-sm">DAYS</span></div>
                    </div>
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10">
                        <h3 className="text-gray-400 font-mono text-sm mb-1">TOTAL VALUE</h3>
                        <div className="text-4xl font-[family-name:var(--font-orbitron)] text-[var(--neon-pink)]">
                            {OWNED_BOOKS.reduce((acc, b) => acc + b.price, 0)} <span className="text-sm">USDT</span>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex gap-4 mb-8 border-b border-white/10 pb-4 overflow-x-auto">
                    {['all', 'unread', 'finished'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f as any)}
                            className={`px-4 py-2 rounded-full font-mono text-sm transition-all whitespace-nowrap ${filter === f ? 'bg-[var(--neon-cyan)] text-black font-bold shadow-[0_0_15px_rgba(0,243,255,0.4)]' : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'}`}
                        >
                            {f.toUpperCase()}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredBooks.map((book) => (
                        <div key={book.id} className="relative">
                            <NFTCard
                                id={book.id}
                                title={book.title}
                                author={book.author}
                                price={book.price}
                                maxSupply={book.max}
                                circulatingSupply={book.circulated}
                                onBuy={() => { }}
                                onRead={() => handleRead(book.id)}
                                isOwned={true}
                                contractAddress="0x..."
                                // @ts-ignore
                                tier={book.tier}
                                // @ts-ignore
                                isSigned={book.isSigned}
                            />
                            {/* Reading Progress Overlay (Custom for Library) */}
                            {book.progress > 0 && book.progress < 100 && (
                                <div className="absolute top-4 left-4 right-4 z-20">
                                    <div className="bg-black/80 backdrop-blur rounded p-2 border border-[var(--neon-cyan)]/30">
                                        <div className="flex justify-between text-[10px] text-[var(--neon-cyan)] font-mono mb-1">
                                            <span>READING</span>
                                            <span>{book.progress}%</span>
                                        </div>
                                        <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-[var(--neon-cyan)]" style={{ width: `${book.progress}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {filteredBooks.length === 0 && (
                    <div className="text-center py-20 opacity-50 font-mono">
                        [ NO BOOKS FOUND IN THIS CATEGORY ]
                    </div>
                )}

            </main>
        </div>
    );
}
