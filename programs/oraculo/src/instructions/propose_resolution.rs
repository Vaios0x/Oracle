use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};
use crate::state::{Config, Market, MarketStatus, Proposal, ProposalStatus};
use crate::errors::ErrorCode;

pub fn handler(
    ctx: Context<ProposeResolution>,
    outcome: bool,
    evidence: String,
) -> Result<()> {
    let config = &ctx.accounts.config;
    let market = &ctx.accounts.market;
    
    // Validations
    require!(evidence.len() <= 500, ErrorCode::EvidenceTooLong);
    require!(
        market.status == MarketStatus::Active,
        ErrorCode::MarketNotActive
    );
    
    let clock = Clock::get()?;
    require!(
        clock.unix_timestamp > market.end_time,
        ErrorCode::MarketNotEnded
    );

    let proposal = &mut ctx.accounts.proposal;
    
    // Lock proposer governance token stake
    token::transfer(
        CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            Transfer {
                from: ctx.accounts.proposer_gov_token.to_account_info(),
                to: ctx.accounts.proposal_stake_vault.to_account_info(),
                authority: ctx.accounts.proposer.to_account_info(),
            },
        ),
        config.proposal_stake,
    )?;

    // Initialize proposal
    proposal.market = market.key();
    proposal.proposer = ctx.accounts.proposer.key();
    proposal.outcome = outcome;
    proposal.evidence = evidence.clone();
    proposal.proposed_at = clock.unix_timestamp;
    proposal.voting_ends_at = clock.unix_timestamp + (48 * 60 * 60); // 48h voting period
    proposal.votes_for = 0;
    proposal.votes_against = 0;
    proposal.status = ProposalStatus::Active;
    proposal.bump = ctx.bumps.proposal;

    emit!(ResolutionProposed {
        market: market.key(),
        proposal: proposal.key(),
        proposer: proposal.proposer,
        outcome,
        evidence,
        voting_ends_at: proposal.voting_ends_at,
    });

    Ok(())
}

#[derive(Accounts)]
pub struct ProposeResolution<'info> {
    #[account(seeds = [b"config"], bump = config.bump)]
    pub config: Account<'info, Config>,

    #[account(
        constraint = market.status == MarketStatus::Active
    )]
    pub market: Account<'info, Market>,

    #[account(
        init,
        payer = proposer,
        space = 8 + Proposal::INIT_SPACE,
        seeds = [
            b"proposal",
            market.key().as_ref(),
            proposer.key().as_ref()
        ],
        bump
    )]
    pub proposal: Account<'info, Proposal>,

    #[account(mut)]
    pub proposer: Signer<'info>,

    #[account(
        mut,
        constraint = proposer_gov_token.owner == proposer.key(),
        constraint = proposer_gov_token.mint == config.governance_token_mint
    )]
    pub proposer_gov_token: Account<'info, TokenAccount>,

    #[account(
        init,
        payer = proposer,
        token::mint = config.governance_token_mint,
        token::authority = proposal,
        seeds = [b"proposal_stake", proposal.key().as_ref()],
        bump
    )]
    pub proposal_stake_vault: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

#[event]
pub struct ResolutionProposed {
    pub market: Pubkey,
    pub proposal: Pubkey,
    pub proposer: Pubkey,
    pub outcome: bool,
    pub evidence: String,
    pub voting_ends_at: i64,
}
