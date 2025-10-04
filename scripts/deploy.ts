import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import fs from "fs";
import path from "path";

async function main() {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  console.log("Deploying programs...");
  console.log("Wallet:", provider.wallet.publicKey.toString());

  // Deploy programs using Anchor CLI
  // This script runs after `anchor deploy`

  // Read deployed program IDs
  const idlPath = path.join(__dirname, "../target/idl/oraculo.json");
  const idl = JSON.parse(fs.readFileSync(idlPath, "utf-8"));

  console.log("Oráculo Program ID:", idl.metadata.address);

  // Update .env file
  const envPath = path.join(__dirname, "../app/.env.local");
  let envContent = fs.existsSync(envPath)
    ? fs.readFileSync(envPath, "utf-8")
    : "";

  envContent = envContent.replace(
    /NEXT_PUBLIC_PROGRAM_ID=.*/,
    `NEXT_PUBLIC_PROGRAM_ID=${idl.metadata.address}`
  );

  fs.writeFileSync(envPath, envContent);

  console.log("✅ Deployment complete!");
  console.log("Program ID saved to app/.env.local");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
