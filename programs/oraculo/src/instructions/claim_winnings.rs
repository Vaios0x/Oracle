use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Mint, Burn, Transfer};
use crate::state::{Market, MarketStatus};
use crate::errors::ErrorCode;

pub fn handler(
    ctx: Context<ClaimWinnings>,
    amount: u64,
) -> Result<()> {
    let market = &ctx.accounts.market;
    
    // Validations
    require!(
        market.status == MarketStatus::Resolved,
        ErrorCode::MarketNotResolved
    );
    
    let outcome = market.outcome.ok_or(ErrorCode::OutcomeNotSet)?;

    // Burn winning tokens
    let winning_mint = if outcome {
        &ctx.accounts.yes_token_mint
    } else {
        &ctx.accounts.no_token_mint
    };

    token::burn(
        CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            Burn {
                mint: winning_mint.to_account_info(),
                from: ctx.accounts.user_outcome_token.to_account_info(),
                authority: ctx.accounts.user.to_account_info(),
            },
        ),
        amount,
    )?;

    // Transfer 1 USDC per winning token
    let seeds = &[
        b"market",
        market.creator.as_ref(),
        &market.created_at.to_le_bytes(),
        &[market.bump],
    ];
    let signer = &[&seeds[..]];

    token::transfer(
        CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            Transfer {
                from: ctx.accounts.liquidity_vault.to_account_info(),
                to: ctx.accounts.user_usdc.to_account_info(),
                authority: market.to_account_info(),
            },
            signer,
        ),
        amount, // 1:1 ratio
    )?;

    emit!(WinningsClaimed {
        market: market.key(),
        user: ctx.accounts.user.key(),
        amount,
    });

    Ok(())
}

#[derive(Accounts)]
pub struct ClaimWinnings<'info> {
    #[account(
        constraint = market.status == MarketStatus::Resolved
    )]
    pub market: Account<'info, Market>,

    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
        mut,
        constraint = user_usdc.owner == user.key()
    )]
    pub user_usdc: Account<'info, TokenAccount>,

    #[account(
        mut,
        seeds = [b"vault", market.key().as_ref()],
        bump
    )]
    pub liquidity_vault: Account<'info, TokenAccount>,

    #[account(
        mut,
        seeds = [b"yes_mint", market.key().as_ref()],
        bump
    )]
    pub yes_token_mint: Account<'info, Mint>,

    #[account(
        mut,
        seeds = [b"no_mint", market.key().as_ref()],
        bump
    )]
    pub no_token_mint: Account<'info, Mint>,

    #[account(mut)]
    pub user_outcome_token: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,
}

#[event]
pub struct WinningsClaimed {
    pub market: Pubkey,
    pub user: Pubkey,
    pub amount: u64,
}
