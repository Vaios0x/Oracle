use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct Proposal {
    pub market: Pubkey,
    pub proposer: Pubkey,
    pub outcome: bool,
    #[max_len(500)]
    pub evidence: String,
    pub proposed_at: i64,
    pub voting_ends_at: i64,
    pub votes_for: u64,
    pub votes_against: u64,
    pub status: ProposalStatus,
    pub bump: u8,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq, InitSpace)]
pub enum ProposalStatus {
    Active,
    Executed,
    Rejected,
}

#[account]
#[derive(InitSpace)]
pub struct VoteRecord {
    pub voter: Pubkey,
    pub proposal: Pubkey,
    pub weight: u64,
    pub support: bool,
    pub voted_at: i64,
    pub bump: u8,
}
