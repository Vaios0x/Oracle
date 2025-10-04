@echo off
echo 🚀 INSTALACIÓN Y DEPLOYMENT COMPLETO DE ORACLE EN WINDOWS
echo.

echo 📋 PASO 1: INSTALANDO DEPENDENCIAS...
echo.

echo 🔧 Instalando Rust...
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
call %USERPROFILE%\.cargo\env

echo 🔧 Instalando Solana CLI...
curl -sSfL https://release.solana.com/stable/install | sh
set PATH=%USERPROFILE%\.local\share\solana\install\active_release\bin;%PATH%

echo 🔧 Instalando Anchor CLI...
cargo install --git https://github.com/coral-xyz/anchor anchor-cli --locked

echo.
echo 📋 PASO 2: CONFIGURANDO SOLANA...
echo.

solana config set --url https://api.devnet.solana.com
solana config set --keypair ./wallet-keypair.json

echo.
echo 📋 PASO 3: OBTENIENDO SOL PARA DEPLOYMENT...
echo.

solana airdrop 2

echo.
echo 📋 PASO 4: COMPILANDO PROGRAMAS...
echo.

anchor build

echo.
echo 📋 PASO 5: DESPLEGANDO A DEVNET...
echo.

anchor deploy --provider.cluster devnet

echo.
echo 🎉 ¡DEPLOYMENT COMPLETADO!
echo.
echo 📋 INFORMACIÓN DE PROGRAMAS:
echo - Oráculo Program ID: 3yiUbupcQVVfU8XMd8594GEWbSjVHBXrHzWEcu9GqfZ2
echo - Governance Program ID: BJBEwqCTA8kPehiqV7jzSRKonbhGVDfWSuPFSvw7kRoN
echo - Wallet: 3S8EEWxgFTpoAPip78CBanP7xjNuUQK5Yb3Ezin4pFxF
echo.
echo 🌐 Enlaces de Verificación:
echo - Oráculo: https://explorer.solana.com/address/3yiUbupcQVVfU8XMd8594GEWbSjVHBXrHzWEcu9GqfZ2?cluster=devnet
echo - Governance: https://explorer.solana.com/address/BJBEwqCTA8kPehiqV7jzSRKonbhGVDfWSuPFSvw7kRoN?cluster=devnet
echo.
echo 🚀 PRÓXIMOS PASOS:
echo 1. Frontend: cd app ^&^& npm run dev
echo 2. Testing: Ejecutar tests de integración
echo 3. Initialize: Ejecutar script de inicialización del protocolo
echo.
pause
