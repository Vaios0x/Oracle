import { PublicKey } from '@solana/web3.js';

export const MARKET_CATEGORIES = [
  'Crypto',
  'Sports',
  'Politics',
  'Entertainment',
  'Technology',
  'Other',
] as const;

export type MarketCategoryType = typeof MARKET_CATEGORIES[number];

export const MIN_LIQUIDITY = 100_000_000; // 100 USDC (6 decimals)
export const MIN_BET = 1_000_000; // 1 USDC

// Helper function to create PublicKey safely
const createPublicKey = (value: string | undefined, fallback: string): PublicKey => {
  try {
    return new PublicKey(value || fallback);
  } catch (error) {
    console.warn(`Invalid PublicKey: ${value}, using fallback: ${fallback}`);
    return new PublicKey(fallback);
  }
};

export const PROGRAM_ID = createPublicKey(
  process.env.NEXT_PUBLIC_PROGRAM_ID,
  '11111111111111111111111111111111' // System program as fallback
);

export const GOVERNANCE_TOKEN_MINT = createPublicKey(
  process.env.NEXT_PUBLIC_GOVERNANCE_TOKEN_MINT,
  'So11111111111111111111111111111111111111112' // SOL mint as fallback
);

export const USDC_MINT = createPublicKey(
  process.env.NEXT_PUBLIC_USDC_MINT,
  'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v' // Real USDC mint
);

export const RPC_ENDPOINT = 
  process.env.NEXT_PUBLIC_RPC_URL || 'https://api.devnet.solana.com';

export const NETWORK = process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet';

export const PROPOSAL_STAKE = 1000_000_000_000; // 1000 governance tokens
export const QUORUM = 10_000_000_000_000; // 10,000 tokens
export const SUPERMAJORITY = 0.66; // 66%

export const VOTING_PERIOD = 48 * 60 * 60; // 48 hours in seconds
export const RESOLUTION_WINDOW = 7 * 24 * 60 * 60; // 7 days in seconds
