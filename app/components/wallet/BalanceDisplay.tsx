'use client';

import { useWallet } from '@/hooks/useWallet';
import { useSolBalance } from '@/hooks/useSolBalance';
import { motion } from 'framer-motion';

export function BalanceDisplay() {
  const { address, isConnected } = useWallet();
  const { balance, formatted, isLoading, error } = useSolBalance(address);

  if (!isConnected || !address) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-20 right-4 z-30"
    >
      <div className="bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl p-4 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-solana-green/20 rounded-lg">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-solana-green">
              <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          <div className="flex-1">
            <div className="text-xs text-white/60 mb-1">SOL Balance (Devnet)</div>
            {isLoading ? (
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="animate-spin text-solana-green">
                  <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-sm text-white/60">Loading...</span>
              </div>
            ) : error ? (
              <div className="text-sm text-red-400">Error loading balance</div>
            ) : (
              <div className="text-lg font-mono text-solana-green font-bold">
                {formatted} SOL
              </div>
            )}
          </div>
        </div>
        
        {/* Network indicator */}
        <div className="mt-2 pt-2 border-t border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-blue-400">Solana Devnet</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
