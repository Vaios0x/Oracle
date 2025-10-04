use anchor_lang::prelude::*;
use crate::state::{Config, Market, MarketStatus, Proposal, ProposalStatus};
use crate::errors::ErrorCode;

pub fn handler(ctx: Context<ExecuteResolution>) -> Result<()> {
    let config = &ctx.accounts.config;
    let proposal = &mut ctx.accounts.proposal;
    let market = &mut ctx.accounts.market;
    
    let clock = Clock::get()?;
    
    // Validations
    require!(
        proposal.status == ProposalStatus::Active,
        ErrorCode::ProposalNotActive
    );
    require!(
        clock.unix_timestamp >= proposal.voting_ends_at,
        ErrorCode::VotingNotEnded
    );

    // Check quorum
    let total_votes = proposal.votes_for.checked_add(proposal.votes_against).unwrap();
    require!(
        total_votes >= config.quorum,
        ErrorCode::QuorumNotReached
    );

    // Check supermajority
    let winner_votes = proposal.votes_for.max(proposal.votes_against);
    let supermajority_threshold = total_votes
        .checked_mul(config.supermajority_percent as u64).unwrap()
        .checked_div(100).unwrap();
    
    require!(
        winner_votes >= supermajority_threshold,
        ErrorCode::NoSupermajority
    );

    // Determine outcome
    let outcome = proposal.votes_for > proposal.votes_against;
    
    // Update market
    market.status = MarketStatus::Resolved;
    market.outcome = Some(outcome);
    market.resolved_at = Some(clock.unix_timestamp);

    // Update proposal
    proposal.status = ProposalStatus::Executed;

    // Slash proposer if wrong, reward if correct
    let correct_proposal = outcome == proposal.outcome;
    
    emit!(MarketResolved {
        market: market.key(),
        proposal: proposal.key(),
        outcome,
        total_votes,
        proposer_correct: correct_proposal,
    });

    Ok(())
}

#[derive(Accounts)]
pub struct ExecuteResolution<'info> {
    #[account(seeds = [b"config"], bump = config.bump)]
    pub config: Account<'info, Config>,

    #[account(mut)]
    pub market: Account<'info, Market>,

    #[account(
        mut,
        constraint = proposal.market == market.key()
    )]
    pub proposal: Account<'info, Proposal>,

    pub system_program: Program<'info, System>,
}

#[event]
pub struct MarketResolved {
    pub market: Pubkey,
    pub proposal: Pubkey,
    pub outcome: bool,
    pub total_votes: u64,
    pub proposer_correct: bool,
}
