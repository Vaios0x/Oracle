'use client';

import { createAppKit } from '@reown/appkit/react';
import { SolanaAdapter } from '@reown/appkit-adapter-solana/react';
import { solana, solanaTestnet, solanaDevnet } from '@reown/appkit/networks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useEffect, useState } from 'react';
import { NETWORK } from '@/lib/solana/constants';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: false,
    },
  },
});

const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID || 'demo-project-id';

if (!process.env.NEXT_PUBLIC_REOWN_PROJECT_ID) {
  console.warn('NEXT_PUBLIC_REOWN_PROJECT_ID is not set - using demo mode');
}

const metadata = {
  name: 'Oráculo',
  description: 'Permissionless Prediction Markets on Solana',
  url: typeof window !== 'undefined' ? window.location.origin : 'https://oraculo.app',
  icons: ['/logo.png']
};

// Initialize AppKit immediately
let appKitInstance: any = null;

if (typeof window !== 'undefined') {
  try {
    const solanaWeb3JsAdapter = new SolanaAdapter();

    appKitInstance = createAppKit({
      adapters: [solanaWeb3JsAdapter],
      networks: [solana, solanaDevnet, solanaTestnet],
      metadata,
      projectId,
      features: {
        analytics: true,
        email: false,
        socials: [],
      },
      themeMode: 'dark',
      themeVariables: {
        '--w3m-accent': '#9945FF',
        '--w3m-border-radius-master': '12px',
      },
    });

    // Store AppKit instance globally
    (window as any).appKit = appKitInstance;

    // Set up event listeners for wallet connection
    const handleWalletConnect = (event: any) => {
      console.log('🔗 Wallet connection event:', event);
      if (event.detail && event.detail.address) {
        // Dispatch custom event for useWallet hook
        window.dispatchEvent(new CustomEvent('walletConnected', {
          detail: { address: event.detail.address }
        }));
      }
    };

    const handleWalletDisconnect = (event: any) => {
      console.log('🔌 Wallet disconnection event:', event);
      // Dispatch custom event for useWallet hook
      window.dispatchEvent(new CustomEvent('walletDisconnected'));
    };

    // Listen for AppKit events
    window.addEventListener('walletConnect', handleWalletConnect);
    window.addEventListener('walletDisconnect', handleWalletDisconnect);

    console.log('✅ Reown AppKit initialized successfully with wallet modal support');
  } catch (error) {
    console.error('❌ Failed to initialize Reown AppKit:', error);
    console.log('AppKit initialization failed - wallet connection will not work');
  }
}

export function AppKitProvider({ children }: { children: ReactNode }) {
  const [isAppKitInitialized, setIsAppKitInitialized] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsAppKitInitialized(true);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
