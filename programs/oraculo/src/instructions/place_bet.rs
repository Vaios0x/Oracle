use anchor_lang::prelude::*;
use anchor_spl::{
    token::{self, Token, TokenAccount, Mint, MintTo, Transfer},
    associated_token::AssociatedToken,
};
use crate::state::{Market, MarketStatus};
use crate::errors::ErrorCode;
use crate::utils::calculate_bonding_curve;

pub fn handler(
    ctx: Context<PlaceBet>,
    amount: u64,
    bet_on_yes: bool,
) -> Result<()> {
    let market = &mut ctx.accounts.market;
    
    // Validations
    require!(
        market.status == MarketStatus::Active,
        ErrorCode::MarketNotActive
    );
    
    let clock = Clock::get()?;
    require!(
        clock.unix_timestamp < market.end_time,
        ErrorCode::MarketEnded
    );
    
    require!(amount >= 1_000_000, ErrorCode::BetTooSmall); // Min 1 USDC

    // Calculate bonding curve pricing
    let (cost, tokens_out) = calculate_bonding_curve(
        market.yes_pool,
        market.no_pool,
        amount,
        bet_on_yes,
    )?;

    // Transfer USDC from user to vault
    token::transfer(
        CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            Transfer {
                from: ctx.accounts.user_usdc.to_account_info(),
                to: ctx.accounts.liquidity_vault.to_account_info(),
                authority: ctx.accounts.user.to_account_info(),
            },
        ),
        cost,
    )?;

    // Mint conditional tokens to user
    let outcome_mint = if bet_on_yes {
        &ctx.accounts.yes_token_mint
    } else {
        &ctx.accounts.no_token_mint
    };

    let seeds = &[
        b"market",
        market.creator.as_ref(),
        &market.created_at.to_le_bytes(),
        &[market.bump],
    ];
    let signer = &[&seeds[..]];

    token::mint_to(
        CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            MintTo {
                mint: outcome_mint.to_account_info(),
                to: ctx.accounts.user_outcome_token.to_account_info(),
                authority: market.to_account_info(),
            },
            signer,
        ),
        tokens_out,
    )?;

    // Update market state
    if bet_on_yes {
        market.yes_pool = market.yes_pool.checked_add(amount).unwrap();
    } else {
        market.no_pool = market.no_pool.checked_add(amount).unwrap();
    }
    market.total_liquidity = market.total_liquidity.checked_add(cost).unwrap();
    market.volume = market.volume.checked_add(cost).unwrap();

    emit!(BetPlaced {
        market: market.key(),
        user: ctx.accounts.user.key(),
        bet_on_yes,
        amount: tokens_out,
        cost,
        yes_pool: market.yes_pool,
        no_pool: market.no_pool,
    });

    Ok(())
}

#[derive(Accounts)]
pub struct PlaceBet<'info> {
    #[account(mut)]
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

    #[account(
        init_if_needed,
        payer = user,
        associated_token::mint = yes_token_mint,
        associated_token::authority = user
    )]
    pub user_outcome_token: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

#[event]
pub struct BetPlaced {
    pub market: Pubkey,
    pub user: Pubkey,
    pub bet_on_yes: bool,
    pub amount: u64,
    pub cost: u64,
    pub yes_pool: u64,
    pub no_pool: u64,
}
