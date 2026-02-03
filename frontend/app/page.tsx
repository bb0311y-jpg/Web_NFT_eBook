'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { useState } from 'react';
import { NFTCard } from '@/components/NFTCard';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

// MOCK DATA
const MOCK_BOOKS = [
  // NEW ARRIVALS
  { id: 1, title: "The Future of Web3", author: "Satoshi_Nakamoto", price: 10, max: 500, circulated: 450, category: 'new', tier: 'Early Bird' },
  { id: 2, title: "Cyberpunk Ethics", author: "Neo_Anderson", price: 15, max: 100, circulated: 25, category: 'new', tier: 'Early Bird', isSigned: true },
  { id: 3, title: "Zero Knowledge", author: "Zooko_Wilcox", price: 12, max: 300, circulated: 10, category: 'new', tier: 'Standard' },

  // BEST SELLERS
  { id: 4, title: "DeFi for Dummies", author: "Vitalik_B", price: 20, max: 1000, circulated: 850, category: 'hot', tier: 'Standard' },
  { id: 5, title: "Smart Contract Security", author: "OpenZeppelin", price: 25, max: 500, circulated: 490, category: 'hot', tier: 'Final' },

  // SOLD OUT (Mock Secondary Market Link)
  { id: 6, title: "Rare Genesis Block", author: "Unknown_Miner", price: 50, max: 10, circulated: 10, category: 'sold_out', tier: 'Final', isSigned: true },
  { id: 7, title: "Lost Private Keys", author: "Forgot_Password", price: 100, max: 5, circulated: 5, category: 'sold_out', tier: 'Final' },
];

// Placeholder Contract Address
const CONTRACT_ADDRESS = '0x1234567890123456789012345678901234567890';

export default function Home() {
  const { isConnected } = useAccount();
  const router = useRouter();
  const { t } = useLanguage();
  const [ownedBooks, setOwnedBooks] = useState<number[]>([]); // Mock ownership
  const [searchTerm, setSearchTerm] = useState('');

  const handleBuy = (id: number) => {
    if (!isConnected) return alert("Please Connect Wallet");
    // Mock Buy
    alert(`Minting Book #${id}... Success!`);
    setOwnedBooks([...ownedBooks, id]);
  };

  const handleRead = () => {
    router.push('/read');
  };

  const CategorySection = ({ titleKey, category }: { titleKey: string, category: string }) => {
    // Filter by Category AND Search Term
    const books = MOCK_BOOKS.filter(b => {
      const matchCategory = b.category === category;
      const matchSearch =
        b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.author.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCategory && matchSearch;
    });

    // If no books match the search in this category, don't show the section (unless no search term)
    if (books.length === 0 && searchTerm) return null;

    const { t } = useLanguage();
    // @ts-ignore
    const title = t[titleKey] || titleKey;

    return (
      <section className="mb-16">
        <h2 className="text-3xl font-[family-name:var(--font-orbitron)] font-bold text-white mb-8 border-l-4 border-[var(--neon-pink)] pl-4 uppercase tracking-widest shadow-[0_0_15px_rgba(255,0,255,0.3)]">
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <NFTCard
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              price={book.price}
              maxSupply={book.max}
              circulatingSupply={book.circulated}
              onBuy={() => handleBuy(book.id)}
              onRead={handleRead}
              isOwned={ownedBooks.includes(book.id)}
              contractAddress={CONTRACT_ADDRESS}
              // @ts-ignore
              tier={book.tier}
              // @ts-ignore
              isSigned={book.isSigned}
            />
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen pb-20 font-[family-name:var(--font-inter)] relative selection:bg-[var(--neon-pink)] selection:text-white">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-20"
        style={{ backgroundImage: 'linear-gradient(rgba(0, 243, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 243, 255, 0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <header className="sticky top-0 z-50 backdrop-blur-lg border-b border-white/10 bg-[rgba(5,5,16,0.8)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold font-[family-name:var(--font-orbitron)] tracking-widest text-[var(--neon-cyan)] drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]">
              {t.nav_title} <span className="text-[0.6em] align-top opacity-70">V1.5</span>
            </h1>
            <LanguageSwitcher />
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:inline text-xs font-mono text-gray-500">{t.connect_wallet} &rarr;</span>
            <ConnectButton showBalance={false} label={t.btn_connect} />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-[var(--neon-purple)]/20 to-[var(--neon-cyan)]/20 border border-white/10 p-12 mb-20 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          <h2 className="text-4xl md:text-6xl font-[family-name:var(--font-orbitron)] font-bold mb-4 text-white relative z-10 group-hover:scale-105 transition-transform duration-700">
            {t.banner_title}
          </h2>
          <p className="text-xl text-[var(--neon-cyan)] font-mono tracking-widest relative z-10">
            {t.banner_subtitle}
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12 relative max-w-lg mx-auto">
          <input
            type="text"
            placeholder="Search Title, Author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black/40 border border-[var(--neon-cyan)]/30 rounded-full py-3 px-6 text-white placeholder-gray-500 focus:border-[var(--neon-cyan)] focus:shadow-[0_0_15px_rgba(0,243,255,0.3)] outline-none transition-all font-mono"
          />
          <div className="absolute right-4 top-3.5 text-[var(--neon-cyan)] opacity-70">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </div>
        </div>

        <CategorySection titleKey="cat_new" category="new" />
        <CategorySection titleKey="cat_hot" category="hot" />
        <CategorySection titleKey="cat_sold_out" category="sold_out" />

      </main>
    </div>
  );
}
