'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'zh-TW';

interface Translations {
    nav_title: string;
    connect_wallet: string;
    banner_title: string;
    banner_subtitle: string;
    cat_new: string;
    cat_hot: string;
    cat_sold_out: string;
    card_edition: string;
    card_price: string;
    btn_mint: string;
    btn_connect: string;
    btn_read: string;
    btn_check_secondary: string;
    badge_sold_out: string;
}

const dictionaries: Record<Language, Translations> = {
    en: {
        nav_title: "CYBER_READS",
        connect_wallet: "Connect Wallet",
        banner_title: "OWN YOUR KNOWLEDGE",
        banner_subtitle: "DECENTRALIZED / ENCRYPTED / PERMANENT",
        cat_new: "NEW ARRIVALS",
        cat_hot: "BEST SELLERS",
        cat_sold_out: "SOLD OUT (SECONDARY MARKET)",
        card_edition: "EDITION",
        card_price: "PRICE",
        btn_mint: "MINT (BUY)",
        btn_connect: "CONNECT TO MINT",
        btn_read: "READ ACCESS GRANTED",
        btn_check_secondary: "CHECK SECONDARY MARKET",
        badge_sold_out: "SOLD OUT",
    },
    'zh-TW': {
        nav_title: "CYBER_READS",
        connect_wallet: "連接錢包",
        banner_title: "擁有您的知識",
        banner_subtitle: "去中心化 / 加密保護 / 永久保存",
        cat_new: "新書上架",
        cat_hot: "熱銷排行榜",
        cat_sold_out: "已售完 (二手市場)",
        card_edition: "版次",
        card_price: "價格",
        btn_mint: "鑄造 (購買)",
        btn_connect: "連接錢包購買",
        btn_read: "閱讀權限已解鎖",
        btn_check_secondary: "前往二級市場查看",
        badge_sold_out: "已售完",
    }
};

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>('zh-TW'); // Default to Chinese as per context
    const t = dictionaries[language];

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
