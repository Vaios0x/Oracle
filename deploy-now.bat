@echo off
echo 🚀 DEPLOYMENT DIRECTO DE ORACLE
echo.

echo 📋 Verificando configuración...
if not exist "wallet-keypair.json" (
    echo ❌ Error: wallet-keypair.json no encontrado
    pause
    exit /b 1
)

if not exist "oraculo-keypair.json" (
    echo ❌ Error: oraculo-keypair.json no encontrado
    pause
    exit /b 1
)

if not exist "governance-keypair.json" (
    echo ❌ Error: governance-keypair.json no encontrado
    pause
    exit /b 1
)

echo ✅ Archivos de configuración encontrados
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

echo 🚀 PRÓXIMOS PASOS PARA DEPLOYMENT:
echo.
echo 1. Instalar Solana CLI:
echo    curl -sSfL https://release.solana.com/stable/install | sh
echo.
echo 2. Instalar Anchor CLI:
echo    cargo install --git https://github.com/coral-xyz/anchor anchor-cli --locked
echo.
echo 3. Configurar Solana:
echo    solana config set --url https://api.devnet.solana.com
echo    solana config set --keypair ./wallet-keypair.json
echo.
echo 4. Obtener SOL:
echo    solana airdrop 2
echo.
echo 5. Compilar y desplegar:
echo    anchor build
echo    anchor deploy --provider.cluster devnet
echo.

echo 📊 ARCHIVOS CONFIGURADOS:
echo - oracle-deployment-verification.json
echo - app/env.local
echo - oraculo-keypair.json
echo - governance-keypair.json
echo - wallet-keypair.json
echo.

echo 🎉 ¡CONFIGURACIÓN COMPLETADA!
echo El proyecto Oracle está listo para deployment.
echo.

pause
