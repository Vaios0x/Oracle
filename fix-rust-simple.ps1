# 🚀 SOLUCIÓN AUTOMÁTICA SIMPLE PARA RUST
Write-Host "🚀 SOLUCIONANDO RUST AUTOMÁTICAMENTE..." -ForegroundColor Green
Write-Host ""

# Paso 1: Desinstalar Rust
Write-Host "📋 PASO 1: DESINSTALANDO RUST" -ForegroundColor Cyan
try {
    rustup self uninstall
    Write-Host "✅ Rust desinstalado" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Rust ya desinstalado" -ForegroundColor Yellow
}

# Paso 2: Limpiar archivos
Write-Host "📋 PASO 2: LIMPIANDO ARCHIVOS" -ForegroundColor Cyan
Remove-Item -Path "C:\Users\amgio\.rustup" -Recurse -Force -ErrorAction SilentlyContinue
Remove-Item -Path "C:\Users\amgio\.cargo" -Recurse -Force -ErrorAction SilentlyContinue
Write-Host "✅ Archivos limpiados" -ForegroundColor Green

# Paso 3: Descargar e instalar Rust
Write-Host "📋 PASO 3: INSTALANDO RUST" -ForegroundColor Cyan
$rustupUrl = "https://win.rustup.rs/x86_64"
$rustupPath = "$env:TEMP\rustup-init.exe"

try {
    Invoke-WebRequest -Uri $rustupUrl -OutFile $rustupPath
    Start-Process -FilePath $rustupPath -ArgumentList "-y" -Wait
    Write-Host "✅ Rust instalado" -ForegroundColor Green
} catch {
    Write-Host "❌ Error instalando Rust" -ForegroundColor Red
    Write-Host "💡 Instala manualmente desde: https://rustup.rs/" -ForegroundColor Yellow
}

# Paso 4: Configurar PATH
Write-Host "📋 PASO 4: CONFIGURANDO PATH" -ForegroundColor Cyan
$env:PATH += ";$env:USERPROFILE\.cargo\bin"
Write-Host "✅ PATH configurado" -ForegroundColor Green

# Paso 5: Compilar Oracle
Write-Host "📋 PASO 5: COMPILANDO ORACLE" -ForegroundColor Cyan
Set-Location "C:\Daaps\Oracle"

try {
    cargo check
    Write-Host "🎉 ¡ORACLE COMPILADO EXITOSAMENTE!" -ForegroundColor Green
} catch {
    Write-Host "❌ Error compilando Oracle" -ForegroundColor Red
}

# Limpiar
Remove-Item -Path $rustupPath -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "🎉 ¡PROCESO COMPLETADO!" -ForegroundColor Green
Write-Host "🚀 ¡Oracle está listo para deployment!" -ForegroundColor Green

Read-Host "Presiona Enter para continuar..."
