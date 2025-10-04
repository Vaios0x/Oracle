
import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";

async function initializeProtocol() {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Oraculo as Program;
  const governanceProgram = anchor.workspace.GovernanceToken as Program;

  console.log("🚀 Inicializando protocolo Oráculo...");

  // Initialize governance token
  const [govConfigPDA] = PublicKey.findProgramAddressSync(
    [Buffer.from("config")],
    governanceProgram.programId
  );

  const [govMintPDA] = PublicKey.findProgramAddressSync(
    [Buffer.from("mint")],
    governanceProgram.programId
  );

  try {
    await governanceProgram.methods
      .initialize(9)
      .accounts({
        config: govConfigPDA,
        mint: govMintPDA,
        authority: provider.wallet.publicKey,
      })
      .rpc();

    console.log("✅ Governance token inicializado");
    console.log("   Mint:", govMintPDA.toString());
  } catch (err) {
    console.log("Governance token ya inicializado");
  }

  // Initialize protocol config
  const [configPDA] = PublicKey.findProgramAddressSync(
    [Buffer.from("config")],
    program.programId
  );

  const [treasuryPDA] = PublicKey.findProgramAddressSync(
    [Buffer.from("treasury")],
    program.programId
  );

  try {
    await program.methods
      .initializeConfig(
        new anchor.BN(100_000_000), // min 100 USDC
        new anchor.BN(1000_000_000_000), // 1000 tokens stake
        new anchor.BN(10_000_000_000_000), // 10K quorum
        66 // 66% supermajority
      )
      .accounts({
        config: configPDA,
        authority: provider.wallet.publicKey,
        governanceTokenMint: govMintPDA,
        treasury: treasuryPDA,
      })
      .rpc();

    console.log("✅ Configuración del protocolo inicializada");
  } catch (err) {
    console.log("Protocolo ya inicializado");
  }

  console.log("\n🎉 Protocolo Oráculo listo!");
  console.log("Governance Mint:", govMintPDA.toString());
  console.log("Config PDA:", configPDA.toString());
}

initializeProtocol().catch(console.error);
