'use client';

import { useState } from 'react';
import { ReactReader } from 'react-reader';
import { useAccount, useSignMessage } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function ReadPage() {
    const { isConnected } = useAccount();
    const { signMessageAsync } = useSignMessage();

    const [epubData, setEpubData] = useState<ArrayBuffer | null>(null);
    const [location, setLocation] = useState<string | number>(0);
    const [isLoading, setIsLoading] = useState(false);

    const handleUnlock = async () => {
        if (!isConnected) return;
        setIsLoading(true);
        try {
            // 1. Sign Message to prove ownership
            const message = "I want to read the book";
            const signature = await signMessageAsync({ message });

            // 2. Fetch from API
            const res = await fetch('/api/read', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ signature, message }),
            });

            if (!res.ok) throw new Error("Verification failed");

            // 3. Load Blob
            const blob = await res.blob();
            const buffer = await blob.arrayBuffer();
            setEpubData(buffer);

        } catch (e) {
            console.error(e);
            alert("Unlock failed. Do you own the NFT?");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-screen flex flex-col bg-gray-900 text-white">
            <header className="p-4 border-b border-gray-700 flex justify-between items-center bg-gray-800">
                <h1 className="font-bold">Reader</h1>
                <ConnectButton />
            </header>

            <main className="flex-1 relative overflow-hidden">
                {!isConnected ? (
                    <div className="flex h-full items-center justify-center">
                        <div className="text-center">
                            <p className="mb-4">Please connect wallet to read.</p>
                        </div>
                    </div>
                ) : !epubData ? (
                    <div className="flex h-full items-center justify-center">
                        <div className="text-center">
                            <button
                                onClick={handleUnlock}
                                disabled={isLoading}
                                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl text-xl font-bold transition disabled:opacity-50"
                            >
                                {isLoading ? "Verifying..." : "Unlock Book"}
                            </button>
                            <p className="mt-4 text-gray-400">Sign a message to decrypt the content.</p>
                        </div>
                    </div>
                ) : (
                    <div style={{ height: '100%' }}>
                        <ReactReader
                            url={epubData}
                            location={location}
                            locationChanged={(loc: string | number) => setLocation(loc)}
                            title="My NFT Book"
                        />
                    </div>
                )}
            </main>
        </div>
    );
}
