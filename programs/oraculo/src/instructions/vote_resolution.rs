use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};
use crate::state::{Config, Proposal, ProposalStatus, VoteRecord};
use crate::errors::ErrorCode;

pub fn handler(
    ctx: Context<VoteResolution>,
    vote_weight: u64,
    support: bool,
) -> Result<()> {
    let proposal = &mut ctx.accounts.proposal;
    
    // Validations
    require!(
        proposal.status == ProposalStatus::Active,
        ErrorCode::ProposalNotActive
    );
    
    let clock = Clock::get()?;
    require!(
        clock.unix_timestamp < proposal.voting_ends_at,
        ErrorCode::VotingEnded
    );

    let vote_record = &mut ctx.accounts.vote_record;
    require!(!vote_record.voted_at != 0, ErrorCode::AlreadyVoted);

    // Lock voter tokens during voting period
    token::transfer(
        CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            Transfer {
                from: ctx.accounts.voter_gov_token.to_account_info(),
                to: ctx.accounts.vote_escrow.to_account_info(),
                authority: ctx.accounts.voter.to_account_info(),
            },
        ),
        vote_weight,
    )?;

    // Record vote
    vote_record.voter = ctx.accounts.voter.key();
    vote_record.proposal = proposal.key();
    vote_record.weight = vote_weight;
    vote_record.support = support;
    vote_record.voted_at = clock.unix_timestamp;
    vote_record.bump = ctx.bumps.vote_record;

    // Update proposal vote counts
    if support {
        proposal.votes_for = proposal.votes_for.checked_add(vote_weight).unwrap();
    } else {
        proposal.votes_against = proposal.votes_against.checked_add(vote_weight).unwrap();
    }

    emit!(VoteCast {
        proposal: proposal.key(),
        voter: ctx.accounts.voter.key(),
        weight: vote_weight,
        support,
        votes_for: proposal.votes_for,
        votes_against: proposal.votes_against,
    });

    Ok(())
}

#[derive(Accounts)]
pub struct VoteResolution<'info> {
    #[account(seeds = [b"config"], bump = config.bump)]
    pub config: Account<'info, Config>,

    #[account(mut)]
    pub proposal: Account<'info, Proposal>,

    #[account(
        init,
        payer = voter,
        space = 8 + VoteRecord::INIT_SPACE,
        seeds = [
            b"vote",
            proposal.key().as_ref(),
            voter.key().as_ref()
        ],
        bump
    )]
    pub vote_record: Account<'info, VoteRecord>,

    #[account(mut)]
    pub voter: Signer<'info>,

    #[account(
        mut,
        constraint = voter_gov_token.owner == voter.key(),
        constraint = voter_gov_token.mint == config.governance_token_mint
    )]
    pub voter_gov_token: Account<'info, TokenAccount>,

    #[account(
        init_if_needed,
        payer = voter,
        token::mint = config.governance_token_mint,
        token::authority = proposal,
        seeds = [b"vote_escrow", proposal.key().as_ref()],
        bump
    )]
    pub vote_escrow: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

#[event]
pub struct VoteCast {
    pub proposal: Pubkey,
    pub voter: Pubkey,
    pub weight: u64,
    pub support: bool,
    pub votes_for: u64,
    pub votes_against: u64,
}
