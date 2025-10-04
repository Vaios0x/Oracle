import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { PublicKey, Keypair } from "@solana/web3.js";
import {
  createMint,
  createAccount,
  mintTo,
} from "@solana/spl-token";

const SEED_MARKETS = [
  {
    question: "Will BTC hit $100K by end of 2025?",
    description: "Bitcoin price prediction based on major exchange data",
    category: 0, // Crypto
    daysUntilEnd: 60,
    source: "https://api.coingecko.com/btc",
    liquidity: 500_000_000,
  },
  {
    question: "Will ETH surpass $5K in Q1 2026?",
    description: "Ethereum price milestone prediction",
    category: 0,
    daysUntilEnd: 90,
    source: "https://api.coingecko.com/eth",
    liquidity: 300_000_000,
  },
  {
    question: "Will Solana process 100K TPS this year?",
    description: "Network performance milestone for Solana blockchain",
    category: 4, // Technology
    daysUntilEnd: 120,
    source: "https://explorer.solana.com/metrics",
    liquidity: 200_000_000,
  },
  // Add more markets here...
];

async function main() {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Oraculo as Program;

  console.log("Seeding markets...");

  // Create mock USDC mint
  const usdcMint = await createMint(
    provider.connection,
    (provider.wallet as any).payer,
    provider.wallet.publicKey,
    null,
    6
  );

  console.log("USDC Mock Mint:", usdcMint.toString());

  // Create USDC account for seeder
  const seederUSDC = await createAccount(
    provider.connection,
    (provider.wallet as any).payer,
    usdcMint,
    provider.wallet.publicKey
  );

  // Mint USDC for seeding
  await mintTo(
    provider.connection,
    (provider.wallet as any).payer,
    usdcMint,
    seederUSDC,
    provider.wallet.publicKey,
    10_000_000_000 // 10,000 USDC
  );

  const [configPDA] = PublicKey.findProgramAddressSync(
    [Buffer.from("config")],
    program.programId
  );

  for (const marketData of SEED_MARKETS) {
    try {
      const timestamp = Math.floor(Date.now() / 1000);
      const [marketPDA] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("market"),
          provider.wallet.publicKey.toBuffer(),
          new anchor.BN(timestamp).toArrayLike(Buffer, "le", 8),
        ],
        program.programId
      );

      const [vaultPDA] = PublicKey.findProgramAddressSync(
        [Buffer.from("vault"), marketPDA.toBuffer()],
        program.programId
      );

      const [yesMintPDA] = PublicKey.findProgramAddressSync(
        [Buffer.from("yes_mint"), marketPDA.toBuffer()],
        program.programId
      );

      const [noMintPDA] = PublicKey.findProgramAddressSync(
        [Buffer.from("no_mint"), marketPDA.toBuffer()],
        program.programId
      );

      const endTime = new anchor.BN(
        timestamp + marketData.daysUntilEnd * 86400
      );

      await program.methods
        .createMarket(
          marketData.question,
          marketData.description,
          marketData.category,
          endTime,
          marketData.source,
          new anchor.BN(marketData.liquidity)
        )
        .accounts({
          config: configPDA,
          market: marketPDA,
          creator: provider.wallet.publicKey,
          creatorUsdc: seederUSDC,
          liquidityVault: vaultPDA,
          yesTokenMint: yesMintPDA,
          noTokenMint: noMintPDA,
          usdcMint: usdcMint,
        })
        .rpc();

      console.log(`✅ Created: ${marketData.question}`);
      console.log(`   Market: ${marketPDA.toString()}`);

      // Wait to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (err) {
      console.error(`❌ Failed to create market: ${marketData.question}`);
      console.error(err);
    }
  }

  console.log("\n✅ Market seeding complete!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
