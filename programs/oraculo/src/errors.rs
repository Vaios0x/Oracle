use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
    #[msg("Question too long (max 200 characters)")]
    QuestionTooLong,
    
    #[msg("Description too long (max 500 characters)")]
    DescriptionTooLong,
    
    #[msg("Resolution source too long (max 200 characters)")]
    SourceTooLong,
    
    #[msg("Evidence too long (max 500 characters)")]
    EvidenceTooLong,
    
    #[msg("Insufficient initial liquidity")]
    InsufficientLiquidity,
    
    #[msg("Invalid end time (must be in future)")]
    InvalidEndTime,
    
    #[msg("End time too far (max 1 year)")]
    EndTimeTooFar,
    
    #[msg("Market not active")]
    MarketNotActive,
    
    #[msg("Market has ended")]
    MarketEnded,
    
    #[msg("Market not ended yet")]
    MarketNotEnded,
    
    #[msg("Bet too small (min 1 USDC)")]
    BetTooSmall,
    
    #[msg("Math overflow")]
    MathOverflow,
    
    #[msg("Math underflow")]
    MathUnderflow,
    
    #[msg("Division by zero")]
    DivisionByZero,
    
    #[msg("Quorum not reached")]
    QuorumNotReached,
    
    #[msg("No supermajority")]
    NoSupermajority,
    
    #[msg("Already voted")]
    AlreadyVoted,
    
    #[msg("Market not resolved")]
    MarketNotResolved,
    
    #[msg("Proposal not active")]
    ProposalNotActive,
    
    #[msg("Voting period ended")]
    VotingEnded,
    
    #[msg("Voting period not ended yet")]
    VotingNotEnded,
    
    #[msg("Outcome not set")]
    OutcomeNotSet,
    
    #[msg("Invalid supermajority percentage")]
    InvalidSupermajority,
}
