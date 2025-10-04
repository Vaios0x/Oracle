# 🚀 DEPLOYMENT FINAL DE ORACLE EN SOLANA DEVNET
# Ejecutar después de instalar Visual Studio Build Tools

Write-Host "🎯 DEPLOYMENT FINAL DE ORACLE EN SOLANA DEVNET" -ForegroundColor Green
Write-Host ""

# Verificar que tenemos las herramientas necesarias
Write-Host "📋 Verificando herramientas..." -ForegroundColor Yellow

try {
    $anchorVersion = anchor --version 2>$null
    if ($anchorVersion) {
        Write-Host "✅ Anchor CLI encontrado: $anchorVersion" -ForegroundColor Green
    } else {
        Write-Host "❌ Anchor CLI no encontrado. Instalando..." -ForegroundColor Red
        cargo install --git https://github.com/coral-xyz/anchor anchor-cli --locked
    }
} catch {
    Write-Host "❌ Error con Anchor CLI. Instalando..." -ForegroundColor Red
    cargo install --git https://github.com/coral-xyz/anchor anchor-cli --locked
}

Write-Host ""
Write-Host "🔧 Configurando Solana..." -ForegroundColor Yellow

# Configurar Solana para devnet
solana config set --url https://api.devnet.solana.com
solana config set --keypair ./wallet-keypair.json

Write-Host "✅ Solana configurado para devnet" -ForegroundColor Green

Write-Host ""
Write-Host "💰 Obteniendo SOL para deployment..." -ForegroundColor Yellow
solana airdrop 2

Write-Host ""
Write-Host "🔨 Compilando programas..." -ForegroundColor Yellow
anchor build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Compilación exitosa" -ForegroundColor Green
    
    Write-Host ""
    Write-Host "🚀 Desplegando programas en devnet..." -ForegroundColor Yellow
    anchor deploy --provider.cluster devnet
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "🎉 ¡DEPLOYMENT EXITOSO!" -ForegroundColor Green
        Write-Host ""
        Write-Host "📋 INFORMACIÓN DE PROGRAMAS DESPLEGADOS:" -ForegroundColor Cyan
        Write-Host "- Oráculo Program ID: 3yiUbupcQVVfU8XMd8594GEWbSjVHBXrHzWEcu9GqfZ2"
        Write-Host "- Governance Program ID: BJBEwqCTA8kPehiqV7jzSRKonbhGVDfWSuPFSvw7kRoN"
        Write-Host "- Wallet: 3S8EEWxgFTpoAPip78CBanP7xjNuUQK5Yb3Ezin4pFxF"
        Write-Host ""
        Write-Host "🌐 Enlaces de Verificación:" -ForegroundColor Blue
        Write-Host "- Oráculo: https://explorer.solana.com/address/3yiUbupcQVVfU8XMd8594GEWbSjVHBXrHzWEcu9GqfZ2?cluster=devnet"
        Write-Host "- Governance: https://explorer.solana.com/address/BJBEwqCTA8kPehiqV7jzSRKonbhGVDfWSuPFSvw7kRoN?cluster=devnet"
        Write-Host ""
        Write-Host "🎯 ¡ORACLE DESPLEGADO EXITOSAMENTE EN SOLANA DEVNET!" -ForegroundColor Green
    } else {
        Write-Host "❌ Error en el deployment" -ForegroundColor Red
    }
} else {
    Write-Host "❌ Error en la compilación" -ForegroundColor Red
    Write-Host "Asegúrate de tener Visual Studio Build Tools instalado" -ForegroundColor Yellow
}

Write-Host ""
Read-Host "Presiona Enter para continuar..."
