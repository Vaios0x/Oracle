import { PublicKey } from '@solana/web3.js';

export enum MarketCategory {
  Crypto = 0,
  Sports = 1,
  Politics = 2,
  Entertainment = 3,
  Technology = 4,
  Other = 5,
}

export enum MarketStatus {
  Active = 'Active',
  Resolved = 'Resolved',
  Cancelled = 'Cancelled',
}

export enum ProposalStatus {
  Active = 'Active',
  Executed = 'Executed',
  Rejected = 'Rejected',
}

export interface Market {
  publicKey: PublicKey;
  creator: PublicKey;
  question: string;
  description: string;
  category: { [key: string]: {} };
  createdAt: number;
  endTime: number;
  resolutionTime: number;
  resolutionSource: string;
  status: { [key: string]: {} };
  outcome: boolean | null;
  resolvedAt: number | null;
  totalLiquidity: number;
  yesPool: number;
  noPool: number;
  yesMint: PublicKey;
  noMint: PublicKey;
  volume: number;
  uniqueBettors: number;
  bump: number;
}

export interface Proposal {
  publicKey: PublicKey;
  market: PublicKey;
  proposer: PublicKey;
  outcome: boolean;
  evidence: string;
  proposedAt: number;
  votingEndsAt: number;
  votesFor: number;
  votesAgainst: number;
  status: { [key: string]: {} };
  bump: number;
}

export interface Config {
  authority: PublicKey;
  governanceTokenMint: PublicKey;
  minLiquidity: number;
  proposalStake: number;
  quorum: number;
  supermajorityPercent: number;
  treasury: PublicKey;
  totalMarkets: number;
  totalVolume: number;
  bump: number;
}
