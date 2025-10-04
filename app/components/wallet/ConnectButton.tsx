'use client';

import { GlassButton } from '@/components/ui/GlassButton';
import { formatAddress } from '@/lib/utils';
import { useWallet } from '@/hooks/useWallet';
import { useSolBalance } from '@/hooks/useSolBalance';

export function ConnectButton() {
  const { 
    address, 
    isConnected, 
    isConnecting, 
    isDisconnecting, 
    error, 
    connect, 
    disconnect 
  } = useWallet();

  const { balance, formatted, isLoading: balanceLoading, error: balanceError } = useSolBalance(address);

  if (isConnected && address) {
    return (
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 mobile-stack">
        <div className="flex items-center gap-2 mobile-gap-2">
          <div className="w-2 h-2 bg-solana-green rounded-full animate-pulse"></div>
          <div className="text-xs sm:text-sm mobile-text-xs">
            <div className="text-white/60 text-xs mobile-text-xs">Wallet Connected</div>
            <div className="font-mono text-solana-green text-xs mobile-text-xs">
              {formatAddress(address)}
            </div>
            {/* Balance Display */}
            <div className="flex items-center gap-1 mt-1 mobile-gap-2">
              <div className="text-xs text-white/80 mobile-text-xs">Balance:</div>
              {balanceLoading ? (
                <div className="text-xs text-white/60 animate-pulse mobile-text-xs">Loading...</div>
              ) : balanceError ? (
                <div className="text-xs text-red-400 mobile-text-xs">Error</div>
              ) : (
                <div className="text-xs text-solana-green font-mono mobile-text-xs">
                  {formatted} SOL
                </div>
              )}
            </div>
          </div>
        </div>
        <GlassButton
          onClick={disconnect}
          variant="secondary"
          size="sm"
          disabled={isDisconnecting}
          className="mobile-btn mobile-touch"
        >
          {isDisconnecting ? 'Disconnecting...' : 'Disconnect'}
        </GlassButton>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end gap-2 mobile-gap-2">
      <GlassButton
        onClick={connect}
        size="sm"
        disabled={isConnecting}
        className="mobile-btn mobile-touch"
      >
        {isConnecting ? 'Connecting...' : 'Connect Wallet'}
      </GlassButton>
      {error && (
        <div className="text-xs text-red-400 max-w-48 text-right mobile-text-xs">
          {error}
        </div>
      )}
    </div>
  );
}
