'use client';

import { useState } from 'react';
import { NFTCard } from '@/components/NFTCard';
import { useLanguage } from '@/context/LanguageContext';

export default function AdminPage() {
    const { t } = useLanguage();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [pin, setPin] = useState('');
    const [activeTab, setActiveTab] = useState<'dashboard' | 'upload' | 'manage'>('dashboard');

    // Default New Book State
    const defaultNewBook = {
        id: 999,
        title: 'Untitled Cyberbook',
        author: 'Anonymous',
        price: 10,
        maxSupply: 100,
        description: 'Enter your book marketing copy here...',
        circulatingSupply: 0
    };

    // Form State (Shared for Create & Edit)
    const [formData, setFormData] = useState(defaultNewBook);

    // Mock Inventory (Local State for Prototype - Synced with Frontend)
    const [inventory, setInventory] = useState([
        { id: 1, title: "The Future of Web3", author: "Satoshi_Nakamoto", price: 10, maxSupply: 500, circulatingSupply: 450, description: "Everything you need to know about Web3." },
        { id: 2, title: "Cyberpunk Ethics", author: "Neo_Anderson", price: 15, maxSupply: 100, circulatingSupply: 25, description: "Moral dilemmas in a high-tech world." },
        { id: 3, title: "Zero Knowledge", author: "Zooko_Wilcox", price: 12, maxSupply: 300, circulatingSupply: 10, description: "Privacy in the digital age." },
        { id: 4, title: "DeFi for Dummies", author: "Vitalik_B", price: 20, maxSupply: 1000, circulatingSupply: 850, description: "Decentralized Finance explained." },
        { id: 5, title: "Smart Contract Security", author: "OpenZeppelin", price: 25, maxSupply: 500, circulatingSupply: 490, description: "Best practices for solidity." },
        { id: 6, title: "Rare Genesis Block", author: "Unknown_Miner", price: 50, maxSupply: 10, circulatingSupply: 10, description: "A rare collection of early history." },
        { id: 7, title: "Lost Private Keys", author: "Forgot_Password", price: 100, maxSupply: 5, circulatingSupply: 1, description: "Tales of lost fortunes." },
    ]);

    const [publishStep, setPublishStep] = useState<'idle' | 'encrypting' | 'uploading' | 'minting' | 'done'>('idle');

    // Calculated Stats
    const totalRevenue = inventory.reduce((acc, book) => acc + (book.price * book.circulatingSupply), 0);
    const totalSales = inventory.reduce((acc, book) => acc + book.circulatingSupply, 0);
    const topSeller = [...inventory].sort((a, b) => b.circulatingSupply - a.circulatingSupply)[0];

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (pin === 'admin123') setIsLoggedIn(true);
        else alert('Invalid Access Code');
    };

    const handleSelectBook = (book: any) => {
        setFormData(book);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleReset = () => {
        setFormData(defaultNewBook);
        setPublishStep('idle');
    };

    const handleSave = () => {
        if (activeTab === 'upload') {
            // Mock Publish Flow
            setPublishStep('encrypting');
            setTimeout(() => setPublishStep('uploading'), 2000);
            setTimeout(() => setPublishStep('minting'), 4000);
            setTimeout(() => setPublishStep('done'), 6000);
        } else {
            // Mock Update Flow
            const newInventory = inventory.map(b => b.id === formData.id ? formData : b);
            setInventory(newInventory);
            alert("Updated Successfully!");
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
                <form onSubmit={handleLogin} className="p-8 border border-[var(--glass-border)] bg-[var(--glass-bg)] rounded-xl backdrop-blur-xl text-center shadow-[0_0_30px_rgba(0,243,255,0.2)]">
                    <h1 className="text-2xl font-[family-name:var(--font-orbitron)] mb-6 text-white tracking-widest">
                        SYSTEM ACCESS
                    </h1>
                    <input
                        type="password"
                        placeholder="ENTER PIN"
                        value={pin}
                        onChange={e => setPin(e.target.value)}
                        className="bg-black/50 border border-gray-600 text-center text-white p-2 rounded mb-4 w-full font-mono focus:border-[var(--neon-cyan)] outline-none transition-colors"
                    />
                    <button className="bg-[var(--neon-cyan)] text-white font-bold py-2 px-6 rounded font-mono hover:bg-[var(--neon-cyan)]/80 hover:shadow-[0_0_15px_rgba(0,243,255,0.4)] transition-all w-full">
                        AUTHENTICATE
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-8 bg-[var(--background)] text-white font-[family-name:var(--font-inter)]">
            <header className="mb-8 border-b border-white/10 pb-4 flex justify-between items-center">
                <h1 className="text-3xl font-[family-name:var(--font-orbitron)] text-[var(--neon-purple)]">
                    PUBLISHER DASHBOARD
                </h1>
                <div className="flex gap-4">
                    <button
                        onClick={() => setActiveTab('dashboard')}
                        className={`px-4 py-2 font-mono text-sm border rounded transition ${activeTab === 'dashboard' ? 'bg-white text-black border-white' : 'border-gray-600 text-gray-400 hover:text-white'}`}
                    >
                        OVERVIEW
                    </button>
                    <button
                        onClick={() => { setActiveTab('upload'); handleReset(); }}
                        className={`px-4 py-2 font-mono text-sm border rounded transition ${activeTab === 'upload' ? 'bg-[var(--neon-cyan)] text-black border-[var(--neon-cyan)]' : 'border-gray-600 text-gray-400 hover:text-white'}`}
                    >
                        + NEW UPLOAD
                    </button>
                    <button
                        onClick={() => setActiveTab('manage')}
                        className={`px-4 py-2 font-mono text-sm border rounded transition ${activeTab === 'manage' ? 'bg-[var(--neon-pink)] text-black border-[var(--neon-pink)]' : 'border-gray-600 text-gray-400 hover:text-white'}`}
                    >
                        MANAGE INVENTORY
                    </button>
                </div>
            </header>

            {/* DASHBOARD VIEW */}
            {activeTab === 'dashboard' && (
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 border border-[var(--glass-border)] bg-[var(--glass-bg)] rounded-xl relative overflow-hidden group">
                            <div className="absolute right-0 top-0 p-4 opacity-10">
                                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                            </div>
                            <h3 className="text-gray-400 font-mono text-sm mb-2">TOTAL REVENUE</h3>
                            <div className="text-4xl font-[family-name:var(--font-orbitron)] text-[var(--neon-cyan)]">
                                {totalRevenue.toLocaleString()} <span className="text-sm">USDT</span>
                            </div>
                            <p className="text-xs text-green-400 mt-2">↑ 12% from last week</p>
                        </div>

                        <div className="p-6 border border-[var(--glass-border)] bg-[var(--glass-bg)] rounded-xl relative overflow-hidden">
                            <div className="absolute right-0 top-0 p-4 opacity-10 text-[var(--neon-pink)]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82zM7 7h.01" /></svg>
                            </div>
                            <h3 className="text-gray-400 font-mono text-sm mb-2">TOTAL BOOKS SOLD</h3>
                            <div className="text-4xl font-[family-name:var(--font-orbitron)] text-[var(--neon-pink)]">
                                {totalSales.toLocaleString()} <span className="text-sm">COPIES</span>
                            </div>
                            <p className="text-xs text-green-400 mt-2">↑ 85 new mints today</p>
                        </div>

                        <div className="p-6 border border-[var(--glass-border)] bg-[var(--glass-bg)] rounded-xl relative overflow-hidden">
                            <div className="absolute right-0 top-0 p-4 opacity-10 text-[var(--neon-purple)]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                            </div>
                            <h3 className="text-gray-400 font-mono text-sm mb-2">BEST SELLER</h3>
                            <div className="text-xl font-[family-name:var(--font-orbitron)] text-[var(--neon-purple)] truncate">
                                {topSeller.title}
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <div className="h-2 flex-grow bg-gray-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-[var(--neon-purple)]" style={{ width: `${(topSeller.circulatingSupply / topSeller.maxSupply) * 100}%` }}></div>
                                </div>
                                <span className="text-xs font-mono">{topSeller.circulatingSupply}/{topSeller.maxSupply}</span>
                            </div>
                        </div>
                    </div>

                    {/* Sales Trend Bar Chart (Simulated with CSS) */}
                    <div className="p-6 border border-[var(--glass-border)] bg-[var(--glass-bg)] rounded-xl">
                        <h3 className="text-xl font-[family-name:var(--font-orbitron)] mb-6 text-white border-l-4 border-white pl-3">
                            SALES ANALYTICS (7 DAYS)
                        </h3>
                        <div className="flex items-end justify-between h-48 gap-2">
                            {[45, 60, 35, 80, 50, 95, 120].map((val, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                                    <div className="text-xs text-[var(--neon-cyan)] opacity-0 group-hover:opacity-100 transition-opacity mb-1">{val}</div>
                                    <div
                                        className="w-full bg-[var(--neon-cyan)]/20 border border-[var(--neon-cyan)]/50 rounded-t hover:bg-[var(--neon-cyan)]/50 transition-all relative"
                                        style={{ height: `${(val / 120) * 100}%` }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--neon-cyan)]/10 to-transparent"></div>
                                    </div>
                                    <div className="text-xs font-mono text-gray-500">Day {i + 1}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Inventory Table */}
                    <div className="p-6 border border-[var(--glass-border)] bg-[var(--glass-bg)] rounded-xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-[family-name:var(--font-orbitron)] text-white border-l-4 border-gray-500 pl-3">
                                INVENTORY PERFORMANCE
                            </h3>
                            <button onClick={() => setActiveTab('manage')} className="text-xs text-[var(--neon-pink)] border border-[var(--neon-pink)] px-3 py-1 rounded hover:bg-[var(--neon-pink)] hover:text-black transition-colors">
                                EDIT INVENTORY
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="text-xs font-mono text-gray-500 border-b border-gray-800">
                                        <th className="p-3">ID</th>
                                        <th className="p-3">TITLE</th>
                                        <th className="p-3">PRICE</th>
                                        <th className="p-3">SOLD / MAX</th>
                                        <th className="p-3">REVENUE</th>
                                        <th className="p-3">STATUS</th>
                                    </tr>
                                </thead>
                                <tbody className="font-mono text-sm">
                                    {inventory.map(book => {
                                        const percentage = (book.circulatingSupply / book.maxSupply) * 100;
                                        return (
                                            <tr key={book.id} className="border-b border-gray-800/50 hover:bg-white/5 transition-colors">
                                                <td className="p-3">#{book.id}</td>
                                                <td className="p-3 font-bold text-white">{book.title}</td>
                                                <td className="p-3">{book.price} USDT</td>
                                                <td className="p-3">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-20 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                                            <div className={`h-full ${percentage > 90 ? 'bg-red-500' : percentage > 50 ? 'bg-[var(--neon-pink)]' : 'bg-[var(--neon-cyan)]'}`} style={{ width: `${percentage}%` }}></div>
                                                        </div>
                                                        <span className="text-xs opacity-70">{book.circulatingSupply}/{book.maxSupply}</span>
                                                    </div>
                                                </td>
                                                <td className="p-3 text-[var(--neon-cyan)]">{(book.price * book.circulatingSupply).toLocaleString()}</td>
                                                <td className="p-3">
                                                    {percentage >= 100 ? (
                                                        <span className="text-red-500 border border-red-500/50 px-2 py-0.5 rounded text-[10px]">SOLD OUT</span>
                                                    ) : (
                                                        <span className="text-green-500 border border-green-500/50 px-2 py-0.5 rounded text-[10px]">ACTIVE</span>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {(activeTab === 'upload' || activeTab === 'manage') && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">

                    {/* LEFT: EDITOR */}
                    <div className="space-y-6">
                        {activeTab === 'manage' && (
                            <div className="p-6 border border-[var(--glass-border)] bg-[var(--glass-bg)] rounded-xl mb-6">
                                <h2 className="text-xl font-[family-name:var(--font-orbitron)] mb-4 text-[var(--neon-pink)]">SELECT BOOK TO EDIT</h2>
                                <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                                    {inventory.map(book => (
                                        <div
                                            key={book.id}
                                            onClick={() => handleSelectBook(book)}
                                            className={`p-3 rounded border cursor-pointer flex justify-between items-center transition ${formData.id === book.id ? 'border-[var(--neon-pink)] bg-[var(--neon-pink)]/10' : 'border-gray-700 hover:bg-white/5'}`}
                                        >
                                            <span className="font-mono text-sm truncate">{book.title}</span>
                                            <span className="text-xs text-gray-400">#{book.id}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="p-6 border border-[var(--glass-border)] bg-[var(--glass-bg)] rounded-xl">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className={`text-xl font-[family-name:var(--font-orbitron)] border-l-4 pl-3 ${activeTab === 'upload' ? 'text-[var(--neon-cyan)] border-[var(--neon-cyan)]' : 'text-[var(--neon-pink)] border-[var(--neon-pink)]'}`}>
                                    {activeTab === 'upload' ? 'NEW METADATA' : `EDITING: #${formData.id}`}
                                </h2>
                                {activeTab === 'manage' && <button onClick={handleReset} className="text-xs text-gray-400 underline hover:text-white">Cancel Edit</button>}
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-mono text-gray-400 mb-1">BOOK TITLE</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full bg-black/40 border border-gray-700 rounded p-2 text-white focus:border-[var(--neon-cyan)] outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-mono text-gray-400 mb-1">AUTHOR</label>
                                    <input
                                        type="text"
                                        value={formData.author}
                                        onChange={e => setFormData({ ...formData, author: e.target.value })}
                                        className="w-full bg-black/40 border border-gray-700 rounded p-2 text-white focus:border-[var(--neon-cyan)] outline-none"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-mono text-gray-400 mb-1">PRICE (USDT)</label>
                                        <input
                                            type="number"
                                            value={formData.price}
                                            onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                                            className="w-full bg-black/40 border border-gray-700 rounded p-2 text-white focus:border-[var(--neon-cyan)] outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-mono text-gray-400 mb-1">MAX SUPPLY</label>
                                        <input
                                            type="number"
                                            value={formData.maxSupply}
                                            onChange={e => setFormData({ ...formData, maxSupply: Number(e.target.value) })}
                                            disabled={activeTab === 'manage'} // Immutable after mint
                                            className={`w-full bg-black/40 border border-gray-700 rounded p-2 text-white outline-none ${activeTab === 'manage' ? 'opacity-50 cursor-not-allowed' : 'focus:border-[var(--neon-cyan)]'}`}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-mono text-gray-400 mb-1">MARKETING DESCRIPTION</label>
                                    <textarea
                                        rows={4}
                                        value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full bg-black/40 border border-gray-700 rounded p-2 text-white focus:border-[var(--neon-cyan)] outline-none resize-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {activeTab === 'upload' && (
                            <div className="p-6 border border-[var(--glass-border)] bg-[var(--glass-bg)] rounded-xl">
                                <h2 className="text-xl font-[family-name:var(--font-orbitron)] mb-6 text-[var(--neon-cyan)] border-l-4 border-[var(--neon-cyan)] pl-3">
                                    ASSETS UPLOAD
                                </h2>
                                <div className="space-y-4">
                                    <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-gray-500 transition-colors cursor-pointer">
                                        <p className="text-gray-400 text-sm font-mono">DRAG & DROP .EPUB FILE HERE</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <button
                            onClick={handleSave}
                            disabled={publishStep !== 'idle'}
                            className={`w-full py-4 bg-gradient-to-r text-white font-bold font-[family-name:var(--font-orbitron)] tracking-widest rounded-lg shadow-[0_0_20px_rgba(255,0,255,0.4)] hover:shadow-[0_0_30px_rgba(255,0,255,0.6)] transition-all disabled:opacity-50 disabled:cursor-not-allowed ${activeTab === 'upload' ? 'from-[var(--neon-purple)] to-[var(--neon-pink)]' : 'from-green-600 to-green-400'}`}
                        >
                            {publishStep !== 'idle' ? 'PROCESSING...' : activeTab === 'upload' ? 'PUBLISH TO BLOCKCHAIN' : 'SAVE CHANGES'}
                        </button>

                        {publishStep !== 'idle' && (
                            <div className="font-mono text-sm space-y-2 p-4 bg-black/50 rounded border border-gray-800">
                                <div className="text-green-400">[1] Encrypting Content (AES-256)...</div>
                                <div className={(publishStep === 'uploading' || publishStep === 'minting' || publishStep === 'done') ? "text-green-400" : "text-gray-600"}>[2] Uploading to IPFS...</div>
                                <div className={(publishStep === 'minting' || publishStep === 'done') ? "text-green-400" : "text-gray-600"}>[3] Minting to Polygon Amoy...</div>
                                {publishStep === 'done' && <div className="text-[var(--neon-cyan)] font-bold mt-2">{'>>'} SUCCESS: Token ID #8 Minted!</div>}
                            </div>
                        )}
                    </div>

                    {/* RIGHT: PREVIEW */}
                    <div>
                        <h2 className="text-sm font-mono text-gray-500 mb-4 uppercase tracking-widest text-center">-- Live Store Preview --</h2>
                        <div className="flex justify-center">
                            <div className="w-full max-w-sm">
                                <NFTCard
                                    id={formData.id}
                                    title={formData.title}
                                    author={formData.author}
                                    price={formData.price}
                                    maxSupply={formData.maxSupply}
                                    circulatingSupply={formData.circulatingSupply}
                                    onBuy={() => { }}
                                    onRead={() => { }}
                                    isOwned={false}
                                    contractAddress="0x..."
                                />
                            </div>
                        </div>

                        <div className="mt-8 p-6 bg-blue-900/20 border border-blue-500/30 rounded-lg text-sm text-blue-200">
                            <h3 className="font-bold mb-2 font-mono">[ PREVIEW MODE ]</h3>
                            <p>This is how your creation will appear to collectors.</p>
                            <hr className="my-4 border-blue-500/30" />
                            <h4 className="font-bold text-[var(--neon-cyan)] mb-1">Current Description:</h4>
                            <p className="opacity-80 italic">{formData.description}</p>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
}
