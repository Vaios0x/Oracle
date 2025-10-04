'use client';

import { useEffect, useState } from 'react';

export function useWallet() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = async () => {
    try {
      setIsConnecting(true);
      setError(null);
      console.log('🔗 Attempting to connect wallet...');
      
      // Check if AppKit is available
      if (typeof window !== 'undefined' && (window as any).appKit) {
        try {
          // Use AppKit to open wallet connection modal
          const appKit = (window as any).appKit;
          await appKit.open();
          console.log('✅ Wallet connection modal opened via AppKit');
          
          // Set up a polling mechanism to check for connection
          const checkConnection = () => {
            // Try to get the connected account from AppKit
            if (appKit.getAccount && typeof appKit.getAccount === 'function') {
              try {
                const account = appKit.getAccount();
                if (account && account.address) {
                  setAddress(account.address);
                  setIsConnected(true);
                  console.log('✅ Wallet connected successfully:', account.address);
                  return true;
                }
              } catch (error) {
                console.log('AppKit getAccount not available yet');
              }
            }
            return false;
          };
          
          // Poll for connection every 500ms for up to 30 seconds
          let attempts = 0;
          const maxAttempts = 60; // 30 seconds
          
          const pollConnection = () => {
            if (checkConnection()) {
              return; // Connection successful
            }
            
            attempts++;
            if (attempts < maxAttempts) {
              setTimeout(pollConnection, 500);
            } else {
              console.log('⏰ Connection timeout - user may have cancelled');
              setError('Connection timeout. Please try again.');
            }
          };
          
          // Start polling after a short delay
          setTimeout(pollConnection, 1000);
          
        } catch (appKitError) {
          console.error('❌ AppKit error:', appKitError);
          setError('Failed to open wallet connection modal');
        }
      } else {
        console.error('❌ AppKit not available');
        setError('Wallet connection not available. Please refresh the page.');
      }
    } catch (error: any) {
      console.error('❌ Failed to connect wallet:', error);
      setError(error.message || 'Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      setIsDisconnecting(true);
      setError(null);
      console.log('🔌 Disconnecting wallet...');
      
      // Check if AppKit is available
      if (typeof window !== 'undefined' && (window as any).appKit) {
        try {
          // Use AppKit to close wallet connection
          const appKit = (window as any).appKit;
          await appKit.close();
          console.log('✅ Wallet disconnected successfully via AppKit');
          
          // Clear local state
          setAddress(null);
          setIsConnected(false);
          
        } catch (appKitError) {
          console.error('❌ AppKit disconnect error:', appKitError);
          // Still clear local state even if AppKit fails
          setAddress(null);
          setIsConnected(false);
          console.log('✅ Wallet disconnected (local state cleared)');
        }
      } else {
        console.error('❌ AppKit not available for disconnect');
        // Clear local state
        setAddress(null);
        setIsConnected(false);
        console.log('✅ Wallet disconnected (local state cleared)');
      }
    } catch (error: any) {
      console.error('❌ Failed to disconnect wallet:', error);
      setError(error.message || 'Failed to disconnect wallet');
      // Still clear local state on error
      setAddress(null);
      setIsConnected(false);
    } finally {
      setIsDisconnecting(false);
    }
  };

  // Clear error when connection state changes
  useEffect(() => {
    if (isConnected) {
      setError(null);
    }
  }, [isConnected]);

  return {
    address,
    isConnected,
    isConnecting,
    isDisconnecting,
    error,
    connect: handleConnect,
    disconnect: handleDisconnect,
  };
}
