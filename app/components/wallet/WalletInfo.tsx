'use client';

import { useState } from 'react';
import { GlassButton } from '@/components/ui/GlassButton';
import { formatAddress } from '@/lib/utils';
import { useWallet } from '@/hooks/useWallet';
import { useSolBalance } from '@/hooks/useSolBalance';
import { motion, AnimatePresence } from 'framer-motion';

export function WalletInfo() {
  const { 
    address, 
    isConnected, 
    isDisconnecting, 
    disconnect 
  } = useWallet();

  const { balance, formatted, isLoading: balanceLoading, error: balanceError } = useSolBalance(address);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const openExplorer = () => {
    if (address) {
      window.open(`https://explorer.solana.com/address/${address}?cluster=devnet`, '_blank');
    }
  };

  if (!isConnected || !address) {
    return null;
  }

  return (
    <div className="relative">
      {/* Wallet Button */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200"
      >
        <div className="w-2 h-2 bg-solana-green rounded-full animate-pulse"></div>
        <div className="text-left">
          <div className="text-xs text-white/60">Connected</div>
          <div className="text-sm font-mono text-solana-green">
            {formatAddress(address)}
          </div>
        </div>
        <div className="text-xs text-solana-green font-mono">
          {balanceLoading ? '...' : formatted} SOL
        </div>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 w-80 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl z-50"
          >
            <div className="p-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Wallet Info</h3>
                <button
                  onClick={() => setIsDropdownOpen(false)}
                  className="text-white/60 hover:text-white transition"
                >
                  ×
                </button>
              </div>

              {/* Address */}
              <div className="mb-4">
                <label className="text-xs text-white/60 mb-1 block">Address</label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 font-mono text-sm text-white/80 bg-white/5 rounded-lg px-3 py-2">
                    {address}
                  </div>
                  <button
                    onClick={copyAddress}
                    className="p-2 text-white/60 hover:text-white transition"
                    title="Copy address"
                  >
                    {copied ? '✓' : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M8 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>
                  <button
                    onClick={openExplorer}
                    className="p-2 text-white/60 hover:text-white transition"
                    title="View on Solana Explorer"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M15 3H21V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Balance */}
              <div className="mb-4">
                <label className="text-xs text-white/60 mb-1 block">SOL Balance (Devnet)</label>
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    {balanceLoading ? (
                      <div className="flex items-center gap-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="animate-spin text-solana-green">
                          <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
                          <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="text-sm text-white/60">Loading balance...</span>
                      </div>
                    ) : balanceError ? (
                      <div className="text-sm text-red-400">Error loading balance</div>
                    ) : (
                      <div className="text-lg font-mono text-solana-green">
                        {formatted} SOL
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Network Info */}
              <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-blue-400">Connected to Solana Devnet</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <GlassButton
                  onClick={disconnect}
                  variant="secondary"
                  size="sm"
                  disabled={isDisconnecting}
                  className="flex-1"
                >
                  {isDisconnecting ? 'Disconnecting...' : 'Disconnect'}
                </GlassButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  );
}
