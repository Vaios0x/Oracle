'use client';

import { useEffect, useState } from 'react';

interface SolBalance {
  balance: number;
  formatted: string;
  isLoading: boolean;
  error: string | null;
}

export function useSolBalance(address: string | null) {
  const [balance, setBalance] = useState<SolBalance>({
    balance: 0,
    formatted: '0.000',
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    if (!address) {
      setBalance({
        balance: 0,
        formatted: '0.000',
        isLoading: false,
        error: null,
      });
      return;
    }

    const fetchBalance = async () => {
      setBalance(prev => ({ ...prev, isLoading: true, error: null }));

      try {
        // Usar la API pública de Solana para obtener el balance
        const response = await fetch(`https://api.devnet.solana.com`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            jsonrpc: '2.0',
            id: 1,
            method: 'getBalance',
            params: [address]
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error.message || 'RPC error');
        }

        // Convertir de lamports a SOL (1 SOL = 1,000,000,000 lamports)
        const balanceInLamports = data.result.value;
        const balanceInSol = balanceInLamports / 1000000000;
        
        // Formatear el balance
        const formatted = balanceInSol.toFixed(6);
        
        setBalance({
          balance: balanceInSol,
          formatted,
          isLoading: false,
          error: null,
        });

        console.log(`💰 SOL Balance: ${formatted} SOL (${balanceInLamports} lamports)`);
      } catch (error: any) {
        console.error('❌ Error fetching SOL balance:', error);
        setBalance(prev => ({
          ...prev,
          isLoading: false,
          error: error.message || 'Failed to fetch balance',
        }));
      }
    };

    fetchBalance();

    // Actualizar el balance cada 30 segundos
    const interval = setInterval(fetchBalance, 30000);

    return () => clearInterval(interval);
  }, [address]);

  return balance;
}
