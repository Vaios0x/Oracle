use anchor_lang::prelude::*;
use anchor_spl::token::{Token, Mint};
use crate::state::Config;

pub fn handler(
    ctx: Context<InitializeConfig>,
    min_liquidity: u64,
    proposal_stake: u64,
    quorum: u64,
    supermajority_percent: u8,
) -> Result<()> {
    require!(supermajority_percent >= 51 && supermajority_percent <= 100, crate::errors::ErrorCode::InvalidSupermajority);
    
    let config = &mut ctx.accounts.config;
    config.authority = ctx.accounts.authority.key();
    config.governance_token_mint = ctx.accounts.governance_token_mint.key();
    config.min_liquidity = min_liquidity;
    config.proposal_stake = proposal_stake;
    config.quorum = quorum;
    config.supermajority_percent = supermajority_percent;
    config.treasury = ctx.accounts.treasury.key();
    config.total_markets = 0;
    config.total_volume = 0;
    config.bump = ctx.bumps.config;

    emit!(ConfigInitialized {
        authority: config.authority,
        governance_token_mint: config.governance_token_mint,
        min_liquidity,
        proposal_stake,
        quorum,
    });

    Ok(())
}

#[derive(Accounts)]
pub struct InitializeConfig<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + Config::INIT_SPACE,
        seeds = [b"config"],
        bump
    )]
    pub config: Account<'info, Config>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub governance_token_mint: Account<'info, Mint>,

    /// CHECK: Treasury account
    pub treasury: AccountInfo<'info>,

    pub system_program: Program<'info, System>,
}

#[event]
pub struct ConfigInitialized {
    pub authority: Pubkey,
    pub governance_token_mint: Pubkey,
    pub min_liquidity: u64,
    pub proposal_stake: u64,
    pub quorum: u64,
}
