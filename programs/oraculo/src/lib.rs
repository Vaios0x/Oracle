use anchor_lang::prelude::*;

declare_id!("3yiUbupcQVVfU8XMd8594GEWbSjVHBXrHzWEcu9GqfZ2");

pub mod state;
pub mod instructions;
pub mod errors;
pub mod utils;

use instructions::*;

#[program]
pub mod oraculo {
    use super::*;

    /// Initialize protocol configuration
    pub fn initialize_config(
        ctx: Context<InitializeConfig>,
        min_liquidity: u64,
        proposal_stake: u64,
        quorum: u64,
        supermajority_percent: u8,
    ) -> Result<()> {
        instructions::initialize::handler(
            ctx,
            min_liquidity,
            proposal_stake,
            quorum,
            supermajority_percent,
        )
    }

    /// Create prediction market with proof of liquidity
    pub fn create_market(
        ctx: Context<CreateMarket>,
        question: String,
        description: String,
        category: u8,
        end_time: i64,
        resolution_source: String,
        initial_liquidity: u64,
    ) -> Result<()> {
        instructions::create_market::handler(
            ctx,
            question,
            description,
            category,
            end_time,
            resolution_source,
            initial_liquidity,
        )
    }

    /// Place bet using bonding curve
    pub fn place_bet(
        ctx: Context<PlaceBet>,
        amount: u64,
        bet_on_yes: bool,
    ) -> Result<()> {
        instructions::place_bet::handler(ctx, amount, bet_on_yes)
    }

    /// DAO proposes resolution with stake
    pub fn propose_resolution(
        ctx: Context<ProposeResolution>,
        outcome: bool,
        evidence: String,
    ) -> Result<()> {
        instructions::propose_resolution::handler(ctx, outcome, evidence)
    }

    /// DAO members vote on resolution
    pub fn vote_on_resolution(
        ctx: Context<VoteResolution>,
        vote_weight: u64,
        support: bool,
    ) -> Result<()> {
        instructions::vote_resolution::handler(ctx, vote_weight, support)
    }

    /// Execute resolution after voting period
    pub fn execute_resolution(
        ctx: Context<ExecuteResolution>,
    ) -> Result<()> {
        instructions::execute_resolution::handler(ctx)
    }

    /// Claim winnings for resolved market
    pub fn claim_winnings(
        ctx: Context<ClaimWinnings>,
        amount: u64,
    ) -> Result<()> {
        instructions::claim_winnings::handler(ctx, amount)
    }
}
