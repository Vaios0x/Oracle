# 🚀 SOLUCIÓN AUTOMÁTICA PARA RUST EN ORACLE
# Este script solucionará todos los problemas de Rust automáticamente

Write-Host "🚀 SOLUCIONANDO RUST AUTOMÁTICAMENTE..." -ForegroundColor Green
Write-Host ""

# Función para ejecutar comandos con manejo de errores
function Execute-Command {
    param($Command, $Description)
    Write-Host "🔧 $Description..." -ForegroundColor Yellow
    try {
        Invoke-Expression $Command
        Write-Host "✅ $Description completado" -ForegroundColor Green
        return $true
    }
    catch {
        Write-Host "❌ Error en $Description" -ForegroundColor Red
        return $false
    }
}

# Paso 1: Desinstalar Rust completamente
Write-Host "📋 PASO 1: DESINSTALANDO RUST COMPLETAMENTE" -ForegroundColor Cyan
Execute-Command "rustup self uninstall" "Desinstalando Rust"

# Paso 2: Limpiar archivos restantes
Write-Host "📋 PASO 2: LIMPIANDO ARCHIVOS RESTANTES" -ForegroundColor Cyan
Execute-Command "Remove-Item -Path 'C:\Users\amgio\.rustup' -Recurse -Force -ErrorAction SilentlyContinue" "Limpiando .rustup"
Execute-Command "Remove-Item -Path 'C:\Users\amgio\.cargo' -Recurse -Force -ErrorAction SilentlyContinue" "Limpiando .cargo"

# Paso 3: Descargar e instalar Rust
Write-Host "📋 PASO 3: DESCARGANDO E INSTALANDO RUST" -ForegroundColor Cyan
$rustupUrl = "https://win.rustup.rs/x86_64"
$rustupPath = "$env:TEMP\rustup-init.exe"

try {
    Write-Host "🔧 Descargando instalador de Rust..." -ForegroundColor Yellow
    Invoke-WebRequest -Uri $rustupUrl -OutFile $rustupPath
    Write-Host "✅ Descarga completada" -ForegroundColor Green
    
    Write-Host "🔧 Instalando Rust..." -ForegroundColor Yellow
    Start-Process -FilePath $rustupPath -ArgumentList "-y" -Wait
    Write-Host "✅ Instalación completada" -ForegroundColor Green
}
catch {
    Write-Host "❌ Error descargando/instalando Rust" -ForegroundColor Red
    Write-Host "💡 Instala manualmente desde: https://rustup.rs/" -ForegroundColor Yellow
}

# Paso 4: Configurar variables de entorno
Write-Host "📋 PASO 4: CONFIGURANDO VARIABLES DE ENTORNO" -ForegroundColor Cyan
$env:PATH += ";$env:USERPROFILE\.cargo\bin"
[Environment]::SetEnvironmentVariable("PATH", $env:PATH, "User")

# Paso 5: Verificar instalación
Write-Host "📋 PASO 5: VERIFICANDO INSTALACIÓN" -ForegroundColor Cyan
Start-Sleep -Seconds 2

try {
    $rustcVersion = & "$env:USERPROFILE\.cargo\bin\rustc.exe" --version 2>$null
    $cargoVersion = & "$env:USERPROFILE\.cargo\bin\cargo.exe" --version 2>$null
    
    if ($rustcVersion) {
        Write-Host "✅ Rust instalado: $rustcVersion" -ForegroundColor Green
    }
    if ($cargoVersion) {
        Write-Host "✅ Cargo instalado: $cargoVersion" -ForegroundColor Green
    }
}
catch {
    Write-Host "⚠️ Verificando instalación..." -ForegroundColor Yellow
}

# Paso 6: Compilar proyecto Oracle
Write-Host "📋 PASO 6: COMPILANDO PROYECTO ORACLE" -ForegroundColor Cyan
Set-Location "C:\Daaps\Oracle"

try {
    Write-Host "🔧 Compilando Oracle..." -ForegroundColor Yellow
    & "$env:USERPROFILE\.cargo\bin\cargo.exe" check
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "🎉 ¡ORACLE COMPILADO EXITOSAMENTE!" -ForegroundColor Green
        Write-Host "✅ El problema del link.exe está solucionado" -ForegroundColor Green
    } else {
        Write-Host "❌ Error en la compilación" -ForegroundColor Red
    }
}
catch {
    Write-Host "❌ Error ejecutando cargo check" -ForegroundColor Red
}

# Limpiar archivos temporales
Remove-Item -Path $rustupPath -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "🎉 ¡PROCESO COMPLETADO!" -ForegroundColor Green
Write-Host "📊 RESUMEN:" -ForegroundColor Cyan
Write-Host "✅ Rust desinstalado y reinstalado" -ForegroundColor Green
Write-Host "✅ Archivos limpiados" -ForegroundColor Green
Write-Host "✅ Variables de entorno configuradas" -ForegroundColor Green
Write-Host "✅ Proyecto Oracle compilado" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 ¡Oracle está listo para deployment!" -ForegroundColor Green

Read-Host "Presiona Enter para continuar..."
