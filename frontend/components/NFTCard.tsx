'use client';

import React from 'react';
import { useAccount } from 'wagmi';
import { useLanguage } from '../context/LanguageContext';

interface NFTCardProps {
    id: number;
    title: string;
    author: string;
    price: number;
    maxSupply: number;
    circulatingSupply: number;
    coverImage?: string;
    onBuy: () => void;
    onRead: () => void;
    isOwned: boolean;
    contractAddress: string;
}

export const NFTCard = ({
    id, title, author, price, maxSupply, circulatingSupply, onBuy, onRead, isOwned,
    contractAddress,
    isSigned = false, // New prop
    tier = 'Standard' // New prop: 'Early Bird', 'Standard', 'Final'
}: NFTCardProps & { isSigned?: boolean; tier?: string }) => {
    const { isConnected } = useAccount();
    const { t } = useLanguage();
    const isSoldOut = circulatingSupply >= maxSupply;

    // Mock Secondary Market URL (e.g., Opensea)
    const secondaryMarketUrl = `https://testnets.opensea.io/assets/amoy/${contractAddress}/${id}`;

    // Tier Calculation (Mock Logic for visual)
    // Assuming Standard Phases: 1-500 (Early), 501-1500 (Std), 1501-3500 (Final)
    // We calculate width based on current tier phase
    const getProgressWidth = () => {
        const percentage = (circulatingSupply / maxSupply) * 100;
        return Math.min(percentage, 100);
    };

    return (
        <div className="relative group bg-[rgba(5,5,16,0.6)] border border-white/10 rounded-2xl p-4 transition-all duration-300 hover:border-[var(--neon-cyan)]/50 hover:shadow-[0_0_30px_rgba(0,243,255,0.2)] hover:-translate-y-1 backdrop-blur-md overflow-hidden">

            {/* Signed Edition Badge */}
            {isSigned && (
                <div className="absolute top-0 right-0 z-20">
                    <div className="bg-[var(--neon-pink)] text-black text-[10px] font-bold py-1 px-8 rotate-45 translate-x-[28%] translate-y-[40%] shadow-[0_0_10px_rgba(255,0,255,0.8)] border-b border-white">
                        SIGNED
                    </div>
                </div>
            )}

            {/* Glowing Border Gradient */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity"></div>

            {/* Image Placeholder */}
            <div className={`relative h-64 bg-black/50 rounded-lg mb-4 overflow-hidden border border-white/5 ${isSigned ? 'shadow-[0_0_15px_rgba(255,0,255,0.2)]' : ''}`}>
                {/* Cyberpunk Grid Background */}
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

                {/* Book Cover Mock */}
                <div className="absolute inset-4 bg-gradient-to-br from-gray-900 to-black border border-white/10 flex flex-col items-center justify-center p-4 text-center group-hover:scale-105 transition-transform duration-500">
                    <div className="text-[var(--neon-cyan)] text-4xl mb-2 opacity-80">
                        {/* Icon based on ID to vary covers */}
                        {id % 2 === 0 ? '⚡' : '🔮'}
                    </div>
                    <h3 className="text-white font-[family-name:var(--font-orbitron)] font-bold tracking-widest text-sm line-clamp-2">
                        {title}
                    </h3>
                </div>

                {/* Tier Tag */}
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-mono bg-black/60 border border-white/20 text-gray-300">
                    TIER: <span className={tier === 'Early Bird' ? 'text-green-400' : tier === 'Final' ? 'text-red-400' : 'text-blue-400'}>{tier.toUpperCase()}</span>
                </div>
            </div>

            <div className="relative z-10">
                {/* Author & ID */}
                <div className="flex justify-between items-end mb-3">
                    <div className="text-xs text-[var(--neon-purple)] font-mono">@{author}</div>
                    <div className="text-xs text-gray-600 font-mono">#{String(id).padStart(3, '0')}</div>
                </div>

                {/* Progress Bar (Tier Visualization) */}
                <div className="mb-4">
                    <div className="flex justify-between text-[10px] text-gray-500 font-mono mb-1">
                        <span>MINT PROGRESS</span>
                        <span className={isSoldOut ? 'text-red-500' : 'text-[var(--neon-cyan)]'}>
                            {((circulatingSupply / maxSupply) * 100).toFixed(0)}%
                        </span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden flex">
                        {/* Segmented Bar Look */}
                        <div
                            className={`h-full shadow-[0_0_10px_currentColor] transition-all duration-1000 ${isSoldOut ? 'bg-red-500' : 'bg-[var(--neon-cyan)]'}`}
                            style={{ width: `${getProgressWidth()}%` }}
                        ></div>
                    </div>
                    {/* Tier Markers (Visual Only) */}
                    <div className="flex justify-between mt-1 px-0.5">
                        <div className="w-[1px] h-1 bg-gray-700"></div>
                        <div className="w-[1px] h-1 bg-gray-700"></div>
                        <div className="w-[1px] h-1 bg-gray-700"></div>
                    </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-2 mb-4 text-xs font-mono text-gray-500">
                    <div>{t.card_edition}</div>
                    <div className="text-right text-white">{circulatingSupply} / {maxSupply}</div>
                    <div>{t.card_price}</div>
                    <div className="text-right text-[var(--neon-pink)] font-bold drop-shadow-[0_0_5px_rgba(255,0,255,0.5)]">{price} USDT</div>
                </div>

                {/* Action Button */}
                <div className="flex flex-col gap-2">
                    {isOwned ? (
                        <button
                            onClick={onRead}
                            className="w-full py-2 bg-white text-black font-bold font-[family-name:var(--font-orbitron)] rounded hover:bg-gray-200 transition-colors tracking-widest"
                        >
                            {t.btn_read}
                        </button>
                    ) : isSoldOut ? (
                        <a
                            href={secondaryMarketUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-2 border border-gray-600 text-gray-400 font-bold font-[family-name:var(--font-orbitron)] rounded text-center hover:border-white hover:text-white transition-colors text-sm tracking-widest"
                        >
                            {t.btn_check_secondary}
                        </a>
                    ) : (
                        <button
                            onClick={onBuy}
                            disabled={!isConnected}
                            className="w-full py-2 bg-[var(--neon-cyan)]/10 border border-[var(--neon-cyan)] text-[var(--neon-cyan)] font-bold font-[family-name:var(--font-orbitron)] rounded hover:bg-[var(--neon-cyan)] hover:text-black hover:shadow-[0_0_20px_rgba(0,243,255,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none tracking-widest"
                        >
                            {isConnected ? t.btn_mint : t.btn_connect}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
