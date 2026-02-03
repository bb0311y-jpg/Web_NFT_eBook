'use client';

import { useLanguage } from '../context/LanguageContext';

export const LanguageSwitcher = () => {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="flex gap-2">
            <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 text-xs font-mono border rounded transition-all ${language === 'en'
                        ? 'border-[var(--neon-cyan)] text-[var(--neon-cyan)] shadow-[0_0_10px_rgba(0,243,255,0.3)]'
                        : 'border-gray-700 text-gray-500 hover:text-gray-300'
                    }`}
            >
                EN
            </button>
            <button
                onClick={() => setLanguage('zh-TW')}
                className={`px-3 py-1 text-xs font-mono border rounded transition-all ${language === 'zh-TW'
                        ? 'border-[var(--neon-cyan)] text-[var(--neon-cyan)] shadow-[0_0_10px_rgba(0,243,255,0.3)]'
                        : 'border-gray-700 text-gray-500 hover:text-gray-300'
                    }`}
            >
                繁中
            </button>
        </div>
    );
};
