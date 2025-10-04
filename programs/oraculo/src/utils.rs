use anchor_lang::prelude::*;
use crate::errors::ErrorCode;

/// Constant product bonding curve: x * y = k
/// Returns (cost_in_usdc, tokens_out)
pub fn calculate_bonding_curve(
    yes_pool: u64,
    no_pool: u64,
    amount: u64,
    buy_yes: bool,
) -> Result<(u64, u64)> {
    let k = (yes_pool as u128)
        .checked_mul(no_pool as u128)
        .ok_or(ErrorCode::MathOverflow)?;

    if buy_yes {
        let new_yes_pool = (yes_pool as u128)
            .checked_add(amount as u128)
            .ok_or(ErrorCode::MathOverflow)?;
        
        let new_no_pool = k
            .checked_div(new_yes_pool)
            .ok_or(ErrorCode::DivisionByZero)?;
        
        let cost = (no_pool as u128)
            .checked_sub(new_no_pool)
            .ok_or(ErrorCode::MathUnderflow)? as u64;
        
        Ok((cost, amount))
    } else {
        let new_no_pool = (no_pool as u128)
            .checked_add(amount as u128)
            .ok_or(ErrorCode::MathOverflow)?;
        
        let new_yes_pool = k
            .checked_div(new_no_pool)
            .ok_or(ErrorCode::DivisionByZero)?;
        
        let cost = (yes_pool as u128)
            .checked_sub(new_yes_pool)
            .ok_or(ErrorCode::MathUnderflow)? as u64;
        
        Ok((cost, amount))
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_bonding_curve() {
        let yes_pool = 100_000_000; // 100 tokens
        let no_pool = 100_000_000;
        let amount = 10_000_000; // Buy 10 YES tokens

        let (cost, tokens) = calculate_bonding_curve(yes_pool, no_pool, amount, true).unwrap();
        
        assert_eq!(tokens, amount);
        assert!(cost > 0);
        assert!(cost < amount); // Should cost less than 1:1
    }
}
