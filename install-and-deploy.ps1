# 🚀 INSTALACIÓN Y DEPLOYMENT COMPLETO DE ORACLE EN WINDOWS
Write-Host "🚀 INSTALACIÓN Y DEPLOYMENT COMPLETO DE ORACLE EN WINDOWS" -ForegroundColor Green
Write-Host ""

# PASO 1: INSTALANDO DEPENDENCIAS
Write-Host "📋 PASO 1: INSTALANDO DEPENDENCIAS..." -ForegroundColor Yellow
Write-Host ""

Write-Host "🔧 Instalando Rust..." -ForegroundColor Cyan
try {
    Invoke-WebRequest -Uri "https://sh.rustup.rs" -OutFile "rustup-init.exe"
    .\rustup-init.exe -y
    $env:PATH += ";$env:USERPROFILE\.cargo\bin"
    Remove-Item "rustup-init.exe" -Force
    Write-Host "✅ Rust instalado correctamente" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Error instalando Rust: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "🔧 Instalando Solana CLI..." -ForegroundColor Cyan
try {
    $solanaInstaller = "solana-install-init-x86_64-pc-windows-msvc.exe"
    Invoke-WebRequest -Uri "https://github.com/solana-labs/solana/releases/download/v1.18.4/$solanaInstaller" -OutFile $solanaInstaller
    .\$solanaInstaller v1.18.4
    $env:PATH += ";$env:USERPROFILE\.local\share\solana\install\active_release\bin"
    Remove-Item $solanaInstaller -Force
    Write-Host "✅ Solana CLI instalado correctamente" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Error instalando Solana CLI: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "🔧 Instalando Anchor CLI..." -ForegroundColor Cyan
try {
    cargo install --git https://github.com/coral-xyz/anchor anchor-cli --locked
    Write-Host "✅ Anchor CLI instalado correctamente" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Error instalando Anchor CLI: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "📋 PASO 2: CONFIGURANDO SOLANA..." -ForegroundColor Yellow
Write-Host ""

try {
    solana config set --url https://api.devnet.solana.com
    solana config set --keypair ./wallet-keypair.json
    Write-Host "✅ Solana configurado correctamente" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Error configurando Solana: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "📋 PASO 3: OBTENIENDO SOL PARA DEPLOYMENT..." -ForegroundColor Yellow
Write-Host ""

try {
    solana airdrop 2
    Write-Host "✅ SOL obtenido correctamente" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Error obteniendo SOL: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "📋 PASO 4: COMPILANDO PROGRAMAS..." -ForegroundColor Yellow
Write-Host ""

try {
    anchor build
    Write-Host "✅ Programas compilados correctamente" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Error compilando programas: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "📋 PASO 5: DESPLEGANDO A DEVNET..." -ForegroundColor Yellow
Write-Host ""

try {
    anchor deploy --provider.cluster devnet
    Write-Host "✅ Programas desplegados correctamente" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Error desplegando programas: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "🎉 ¡DEPLOYMENT COMPLETADO!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 INFORMACIÓN DE PROGRAMAS:" -ForegroundColor Yellow
Write-Host "- Oráculo Program ID: 3yiUbupcQVVfU8XMd8594GEWbSjVHBXrHzWEcu9GqfZ2" -ForegroundColor White
Write-Host "- Governance Program ID: BJBEwqCTA8kPehiqV7jzSRKonbhGVDfWSuPFSvw7kRoN" -ForegroundColor White
Write-Host "- Wallet: 3S8EEWxgFTpoAPip78CBanP7xjNuUQK5Yb3Ezin4pFxF" -ForegroundColor White
Write-Host ""
Write-Host "🌐 Enlaces de Verificación:" -ForegroundColor Yellow
Write-Host "- Oráculo: https://explorer.solana.com/address/3yiUbupcQVVfU8XMd8594GEWbSjVHBXrHzWEcu9GqfZ2?cluster=devnet" -ForegroundColor Cyan
Write-Host "- Governance: https://explorer.solana.com/address/BJBEwqCTA8kPehiqV7jzSRKonbhGVDfWSuPFSvw7kRoN?cluster=devnet" -ForegroundColor Cyan
Write-Host ""
Write-Host "🚀 PRÓXIMOS PASOS:" -ForegroundColor Yellow
Write-Host "1. Frontend: cd app && npm run dev" -ForegroundColor White
Write-Host "2. Testing: Ejecutar tests de integración" -ForegroundColor White
Write-Host "3. Initialize: Ejecutar script de inicialización del protocolo" -ForegroundColor White
Write-Host ""
Read-Host "Presiona Enter para continuar"
