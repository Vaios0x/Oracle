'use client';

import { useState, useEffect } from 'react';
import { GlassButton } from '@/components/ui/GlassButton';
import { NETWORK, RPC_ENDPOINT } from '@/lib/solana/constants';

export function NetworkSelector() {
  const [currentNetwork, setCurrentNetwork] = useState<string>(NETWORK);
  const [rpcEndpoint, setRpcEndpoint] = useState<string>(RPC_ENDPOINT);

  useEffect(() => {
    // Update network info when component mounts
    setCurrentNetwork(NETWORK);
    setRpcEndpoint(RPC_ENDPOINT);
  }, []);

  const getNetworkInfo = (network: string) => {
    switch (network) {
      case 'mainnet':
        return {
          name: 'Mainnet',
          color: 'text-green-400',
          bgColor: 'bg-green-500/20',
          description: 'Production network with real SOL',
          rpc: 'https://api.mainnet-beta.solana.com'
        };
      case 'devnet':
        return {
          name: 'Devnet',
          color: 'text-purple-400',
          bgColor: 'bg-purple-500/20',
          description: 'Development network for testing',
          rpc: 'https://api.devnet.solana.com'
        };
      case 'testnet':
        return {
          name: 'Testnet',
          color: 'text-yellow-400',
          bgColor: 'bg-yellow-500/20',
          description: 'Test network for development',
          rpc: 'https://api.testnet.solana.com'
        };
      default:
        return {
          name: 'Unknown',
          color: 'text-gray-400',
          bgColor: 'bg-gray-500/20',
          description: 'Unknown network',
          rpc: 'Unknown'
        };
    }
  };

  const networkInfo = getNetworkInfo(currentNetwork);

  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${networkInfo.bgColor}`}></div>
      <div className="text-sm">
        <div className={`font-semibold ${networkInfo.color}`}>
          {networkInfo.name}
        </div>
        <div className="text-white/60 text-xs">
          {networkInfo.description}
        </div>
      </div>
    </div>
  );
}
