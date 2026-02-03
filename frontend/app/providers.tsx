'use client';

import * as React from 'react';
import {
    RainbowKitProvider,
    getDefaultWallets,
    getDefaultConfig,
    darkTheme,
} from '@rainbow-me/rainbowkit';
import {
    argentWallet,
    trustWallet,
    ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';
import {
    polygon,
    polygonAmoy,
} from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';

const { wallets } = getDefaultWallets();

const config = getDefaultConfig({
    appName: 'NFT eBook Reader',
    projectId: 'YOUR_PROJECT_ID', // TODO: Get WalletConnect ID
    wallets: [
        ...wallets,
        {
            groupName: 'Other',
            wallets: [argentWallet, trustWallet, ledgerWallet],
        },
    ],
    chains: [
        polygonAmoy, // Testnet
        ...(process.env.NEXT_PUBLIC_ENABLE_MAINNET === 'true' ? [polygon] : []),
    ],
    ssr: true,
});

const queryClient = new QueryClient();

import { LanguageProvider } from '@/context/LanguageContext';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider theme={darkTheme()}>
                    <LanguageProvider>
                        {children}
                    </LanguageProvider>
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}
