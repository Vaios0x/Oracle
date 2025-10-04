use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct Config {
    pub authority: Pubkey,
    pub governance_token_mint: Pubkey,
    pub min_liquidity: u64,
    pub proposal_stake: u64,
    pub quorum: u64,
    pub supermajority_percent: u8,
    pub treasury: Pubkey,
    pub total_markets: u64,
    pub total_volume: u64,
    pub bump: u8,
}
