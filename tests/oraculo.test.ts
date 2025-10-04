import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Oraculo } from "../target/types/oraculo";
import { GovernanceToken } from "../target/types/governance_token";
import { expect } from "chai";
import {
  Keypair,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import {
  TOKEN_PROGRAM_ID,
  createMint,
  createAccount,
  mintTo,
  getAccount,
} from "@solana/spl-token";

describe("oraculo", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Oraculo as Program<Oraculo>;
  const governanceProgram = anchor.workspace.GovernanceToken as Program<GovernanceToken>;

  let usdcMint: anchor.web3.PublicKey;
  let governanceMint: anchor.web3.PublicKey;
  let creator: Keypair;
  let user1: Keypair;
  let user2: Keypair;
  
  let configPDA: anchor.web3.PublicKey;
  let treasuryPDA: anchor.web3.PublicKey;

  before(async () => {
    // Create keypairs
    creator = Keypair.generate();
    user1 = Keypair.generate();
    user2 = Keypair.generate();

    // Airdrop SOL
    await provider.connection.requestAirdrop(
      creator.publicKey,
      10 * LAMPORTS_PER_SOL
    );
    await provider.connection.requestAirdrop(
      user1.publicKey,
      10 * LAMPORTS_PER_SOL
    );
    await provider.connection.requestAirdrop(
      user2.publicKey,
      10 * LAMPORTS_PER_SOL
    );

    // Wait for airdrops
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create USDC mock mint
    usdcMint = await createMint(
      provider.connection,
      creator,
      creator.publicKey,
      null,
      6 // USDC has 6 decimals
    );

    // Find PDAs
    [configPDA] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("config")],
      program.programId
    );

    [treasuryPDA] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("treasury")],
      program.programId
    );
  });

  it("Initializes governance token", async () => {
    const [govConfigPDA] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("config")],
      governanceProgram.programId
    );

    const [govMintPDA] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("mint")],
      governanceProgram.programId
    );

    await governanceProgram.methods
      .initialize(9)
      .accounts({
        config: govConfigPDA,
        mint: govMintPDA,
        authority: creator.publicKey,
      })
      .signers([creator])
      .rpc();

    governanceMint = govMintPDA;

    const config = await governanceProgram.account.tokenConfig.fetch(govConfigPDA);
    expect(config.authority.toString()).to.equal(creator.publicKey.toString());
  });

  it("Initializes protocol config", async () => {
    const minLiquidity = new anchor.BN(100_000_000); // 100 USDC
    const proposalStake = new anchor.BN(1000_000_000_000); // 1000 tokens
    const quorum = new anchor.BN(10_000_000_000_000); // 10,000 tokens
    const supermajority = 66;

    await program.methods
      .initializeConfig(
        minLiquidity,
        proposalStake,
        quorum,
        supermajority
      )
      .accounts({
        config: configPDA,
        authority: creator.publicKey,
        governanceTokenMint: governanceMint,
        treasury: treasuryPDA,
      })
      .signers([creator])
      .rpc();

    const config = await program.account.config.fetch(configPDA);
    expect(config.minLiquidity.toString()).to.equal(minLiquidity.toString());
  });

  it("Creates a prediction market", async () => {
    // Create USDC account for creator
    const creatorUSDC = await createAccount(
      provider.connection,
      creator,
      usdcMint,
      creator.publicKey
    );

    // Mint 1000 USDC to creator
    await mintTo(
      provider.connection,
      creator,
      usdcMint,
      creatorUSDC,
      creator,
      1000_000_000 // 1000 USDC
    );

    const timestamp = Math.floor(Date.now() / 1000);
    const [marketPDA] = anchor.web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from("market"),
        creator.publicKey.toBuffer(),
        new anchor.BN(timestamp).toArrayLike(Buffer, "le", 8),
      ],
      program.programId
    );

    const [vaultPDA] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("vault"), marketPDA.toBuffer()],
      program.programId
    );

    const [yesMintPDA] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("yes_mint"), marketPDA.toBuffer()],
      program.programId
    );

    const [noMintPDA] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("no_mint"), marketPDA.toBuffer()],
      program.programId
    );

    const endTime = new anchor.BN(timestamp + 86400 * 30); // 30 days

    await program.methods
      .createMarket(
        "Will BTC hit $100K by end of 2025?",
        "Bitcoin price prediction market",
        0, // Crypto category
        endTime,
        "https://api.coingecko.com/btc",
        new anchor.BN(200_000_000) // 200 USDC initial liquidity
      )
      .accounts({
        config: configPDA,
        market: marketPDA,
        creator: creator.publicKey,
        creatorUsdc: creatorUSDC,
        liquidityVault: vaultPDA,
        yesTokenMint: yesMintPDA,
        noTokenMint: noMintPDA,
        usdcMint: usdcMint,
      })
      .signers([creator])
      .rpc();

    const market = await program.account.market.fetch(marketPDA);
    expect(market.question).to.equal("Will BTC hit $100K by end of 2025?");
    expect(market.totalLiquidity.toString()).to.equal("200000000");
  });

  it("Places a bet on the market", async () => {
    const timestamp = Math.floor(Date.now() / 1000);
    const [marketPDA] = anchor.web3.PublicKey.findProgramAddressSync(
      [
        Buffer.from("market"),
        creator.publicKey.toBuffer(),
        new anchor.BN(timestamp).toArrayLike(Buffer, "le", 8),
      ],
      program.programId
    );

    // Create USDC account for user1
    const user1USDC = await createAccount(
      provider.connection,
      user1,
      usdcMint,
      user1.publicKey
    );

    // Mint 100 USDC to user1
    await mintTo(
      provider.connection,
      creator,
      usdcMint,
      user1USDC,
      creator,
      100_000_000
    );

    const [vaultPDA] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("vault"), marketPDA.toBuffer()],
      program.programId
    );

    const [yesMintPDA] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("yes_mint"), marketPDA.toBuffer()],
      program.programId
    );

    await program.methods
      .placeBet(
        new anchor.BN(10_000_000), // 10 tokens
        true // bet on YES
      )
      .accounts({
        market: marketPDA,
        user: user1.publicKey,
        userUsdc: user1USDC,
        liquidityVault: vaultPDA,
        yesTokenMint: yesMintPDA,
      })
      .signers([user1])
      .rpc();

    const market = await program.account.market.fetch(marketPDA);
    expect(market.volume.toNumber()).to.be.greaterThan(0);
  });

  // Additional tests for proposal, voting, execution, and claiming would go here
});
