use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Mint, MintTo};

declare_id!("BJBEwqCTA8kPehiqV7jzSRKonbhGVDfWSuPFSvw7kRoN");

pub mod instructions;
pub mod state;

use instructions::*;

#[program]
pub mod governance_token {
    use super::*;

    pub fn initialize(
        ctx: Context<Initialize>,
        decimals: u8,
    ) -> Result<()> {
        instructions::initialize::handler(ctx, decimals)
    }

    pub fn mint_tokens(
        ctx: Context<MintTokens>,
        amount: u64,
    ) -> Result<()> {
        instructions::mint_tokens::handler(ctx, amount)
    }
}

pub mod instructions {
    use super::*;

    pub mod initialize {
        use super::*;

        pub fn handler(
            ctx: Context<Initialize>,
            _decimals: u8,
        ) -> Result<()> {
            let config = &mut ctx.accounts.config;
            config.authority = ctx.accounts.authority.key();
            config.mint = ctx.accounts.mint.key();
            config.total_supply = 0;
            config.bump = ctx.bumps.config;

            emit!(TokenInitialized {
                authority: config.authority,
                mint: config.mint,
            });

            Ok(())
        }

        #[derive(Accounts)]
        pub struct Initialize<'info> {
            #[account(
                init,
                payer = authority,
                space = 8 + TokenConfig::INIT_SPACE,
                seeds = [b"config"],
                bump
            )]
            pub config: Account<'info, TokenConfig>,

            #[account(
                init,
                payer = authority,
                mint::decimals = 9,
                mint::authority = config,
                seeds = [b"mint"],
                bump
            )]
            pub mint: Account<'info, Mint>,

            #[account(mut)]
            pub authority: Signer<'info>,

            pub token_program: Program<'info, Token>,
            pub system_program: Program<'info, System>,
            pub rent: Sysvar<'info, Rent>,
        }

        #[event]
        pub struct TokenInitialized {
            pub authority: Pubkey,
            pub mint: Pubkey,
        }
    }

    pub mod mint_tokens {
        use super::*;

        pub fn handler(
            ctx: Context<MintTokens>,
            amount: u64,
        ) -> Result<()> {
            let config = &mut ctx.accounts.config;

            let seeds = &[b"config", &[config.bump]];
            let signer = &[&seeds[..]];

            token::mint_to(
                CpiContext::new_with_signer(
                    ctx.accounts.token_program.to_account_info(),
                    MintTo {
                        mint: ctx.accounts.mint.to_account_info(),
                        to: ctx.accounts.destination.to_account_info(),
                        authority: config.to_account_info(),
                    },
                    signer,
                ),
                amount,
            )?;

            config.total_supply = config.total_supply.checked_add(amount).unwrap();

            emit!(TokensMinted {
                recipient: ctx.accounts.destination.owner,
                amount,
                total_supply: config.total_supply,
            });

            Ok(())
        }

        #[derive(Accounts)]
        pub struct MintTokens<'info> {
            #[account(
                mut,
                seeds = [b"config"],
                bump = config.bump,
                has_one = authority
            )]
            pub config: Account<'info, TokenConfig>,

            #[account(mut)]
            pub authority: Signer<'info>,

            #[account(
                mut,
                seeds = [b"mint"],
                bump
            )]
            pub mint: Account<'info, Mint>,

            #[account(mut)]
            pub destination: Account<'info, TokenAccount>,

            pub token_program: Program<'info, Token>,
        }

        #[event]
        pub struct TokensMinted {
            pub recipient: Pubkey,
            pub amount: u64,
            pub total_supply: u64,
        }
    }
}

pub mod state {
    use super::*;

    #[account]
    #[derive(InitSpace)]
    pub struct TokenConfig {
        pub authority: Pubkey,
        pub mint: Pubkey,
        pub total_supply: u64,
        pub bump: u8,
    }
}
