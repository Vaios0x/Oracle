use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct Market {
    pub creator: Pubkey,
    #[max_len(200)]
    pub question: String,
    #[max_len(500)]
    pub description: String,
    pub category: MarketCategory,
    pub created_at: i64,
    pub end_time: i64,
    pub resolution_time: i64,
    #[max_len(200)]
    pub resolution_source: String,
    pub status: MarketStatus,
    pub outcome: Option<bool>,
    pub resolved_at: Option<i64>,
    pub total_liquidity: u64,
    pub yes_pool: u64,
    pub no_pool: u64,
    pub yes_mint: Pubkey,
    pub no_mint: Pubkey,
    pub volume: u64,
    pub unique_bettors: u64,
    pub bump: u8,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq, InitSpace)]
pub enum MarketCategory {
    Crypto,
    Sports,
    Politics,
    Entertainment,
    Technology,
    Other,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq, InitSpace)]
pub enum MarketStatus {
    Active,
    Resolved,
    Cancelled,
}
