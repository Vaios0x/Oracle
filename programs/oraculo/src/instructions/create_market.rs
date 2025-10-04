use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Mint, Transfer};
use crate::state::{Config, Market, MarketCategory, MarketStatus};
use crate::errors::ErrorCode;

pub fn handler(
    ctx: Context<CreateMarket>,
    question: String,
    description: String,
    category: u8,
    end_time: i64,
    resolution_source: String,
    initial_liquidity: u64,
) -> Result<()> {
    let config = &ctx.accounts.config;
    
    // Validations
    require!(question.len() <= 200, ErrorCode::QuestionTooLong);
    require!(description.len() <= 500, ErrorCode::DescriptionTooLong);
    require!(resolution_source.len() <= 200, ErrorCode::SourceTooLong);
    require!(initial_liquidity >= config.min_liquidity, ErrorCode::InsufficientLiquidity);
    
    let clock = Clock::get()?;
    require!(end_time > clock.unix_timestamp, ErrorCode::InvalidEndTime);
    require!(
        end_time < clock.unix_timestamp + (365 * 24 * 60 * 60),
        ErrorCode::EndTimeTooFar
    );

    let market = &mut ctx.accounts.market;
    let market_category = match category {
        0 => MarketCategory::Crypto,
        1 => MarketCategory::Sports,
        2 => MarketCategory::Politics,
        3 => MarketCategory::Entertainment,
        4 => MarketCategory::Technology,
        _ => MarketCategory::Other,
    };
    
    // Initialize market
    market.creator = ctx.accounts.creator.key();
    market.question = question.clone();
    market.description = description;
    market.category = market_category;
    market.created_at = clock.unix_timestamp;
    market.end_time = end_time;
    market.resolution_time = end_time + (7 * 24 * 60 * 60); // +7 days for voting
    market.resolution_source = resolution_source;
    market.status = MarketStatus::Active;
    market.total_liquidity = initial_liquidity;
    market.yes_pool = initial_liquidity / 2;
    market.no_pool = initial_liquidity / 2;
    market.yes_mint = ctx.accounts.yes_token_mint.key();
    market.no_mint = ctx.accounts.no_token_mint.key();
    market.volume = 0;
    market.unique_bettors = 0;
    market.bump = ctx.bumps.market;

    // Lock creator liquidity (Proof of Liquidity - anti-rug)
    token::transfer(
        CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            Transfer {
                from: ctx.accounts.creator_usdc.to_account_info(),
                to: ctx.accounts.liquidity_vault.to_account_info(),
                authority: ctx.accounts.creator.to_account_info(),
            },
        ),
        initial_liquidity,
    )?;

    emit!(MarketCreated {
        market: market.key(),
        creator: market.creator,
        question,
        category: market.category.clone(),
        end_time: market.end_time,
        initial_liquidity,
    });

    Ok(())
}

#[derive(Accounts)]
#[instruction(question: String)]
pub struct CreateMarket<'info> {
    #[account(seeds = [b"config"], bump = config.bump)]
    pub config: Account<'info, Config>,

    #[account(
        init,
        payer = creator,
        space = 8 + Market::INIT_SPACE,
        seeds = [
            b"market",
            creator.key().as_ref(),
            &Clock::get()?.unix_timestamp.to_le_bytes()
        ],
        bump
    )]
    pub market: Account<'info, Market>,

    #[account(mut)]
    pub creator: Signer<'info>,

    #[account(
        mut,
        constraint = creator_usdc.owner == creator.key()
    )]
    pub creator_usdc: Account<'info, TokenAccount>,

    #[account(
        init,
        payer = creator,
        token::mint = usdc_mint,
        token::authority = market,
        seeds = [b"vault", market.key().as_ref()],
        bump
    )]
    pub liquidity_vault: Account<'info, TokenAccount>,

    #[account(
        init,
        payer = creator,
        mint::decimals = 9,
        mint::authority = market,
        seeds = [b"yes_mint", market.key().as_ref()],
        bump
    )]
    pub yes_token_mint: Account<'info, Mint>,

    #[account(
        init,
        payer = creator,
        mint::decimals = 9,
        mint::authority = market,
        seeds = [b"no_mint", market.key().as_ref()],
        bump
    )]
    pub no_token_mint: Account<'info, Mint>,

    pub usdc_mint: Account<'info, Mint>,
    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

#[event]
pub struct MarketCreated {
    pub market: Pubkey,
    pub creator: Pubkey,
    pub question: String,
    pub category: MarketCategory,
    pub end_time: i64,
    pub initial_liquidity: u64,
}
