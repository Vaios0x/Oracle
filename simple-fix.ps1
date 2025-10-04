# 🚀 SOLUCIÓN SIMPLE PARA LINK.EXE
Write-Host "🚀 SOLUCIÓN SIMPLE PARA LINK.EXE" -ForegroundColor Green
Write-Host ""

# Verificar Visual Studio
$vsPaths = @(
    "${env:ProgramFiles}\Microsoft Visual Studio\2022\Community\VC\Auxiliary\Build\vcvars64.bat",
    "${env:ProgramFiles}\Microsoft Visual Studio\2022\Professional\VC\Auxiliary\Build\vcvars64.bat",
    "${env:ProgramFiles}\Microsoft Visual Studio\2022\Enterprise\VC\Auxiliary\Build\vcvars64.bat",
    "${env:ProgramFiles(x86)}\Microsoft Visual Studio\2022\BuildTools\VC\Auxiliary\Build\vcvars64.bat"
)

$vcvarsPath = $null
foreach ($path in $vsPaths) {
    if (Test-Path $path) {
        $vcvarsPath = $path
        break
    }
}

if ($vcvarsPath) {
    Write-Host "✅ Visual Studio encontrado" -ForegroundColor Green
    Write-Host "🔧 Configurando entorno..." -ForegroundColor Yellow
    
    # Configurar entorno
    $envVars = cmd /c "`"$vcvarsPath`" && set"
    $envVars | ForEach-Object {
        if ($_ -match "^([^=]+)=(.*)$") {
            [Environment]::SetEnvironmentVariable($matches[1], $matches[2], "Process")
        }
    }
    
    Write-Host "✅ Entorno configurado" -ForegroundColor Green
    
    # Verificar link.exe
    $linkPath = Get-Command link.exe -ErrorAction SilentlyContinue
    if ($linkPath) {
        Write-Host "✅ link.exe disponible" -ForegroundColor Green
        Write-Host "🚀 COMPILANDO ORACLE..." -ForegroundColor Green
        cargo check
    } else {
        Write-Host "❌ link.exe no disponible" -ForegroundColor Red
    }
} else {
    Write-Host "❌ Visual Studio no encontrado" -ForegroundColor Red
    Write-Host ""
    Write-Host "📥 INSTALAR VISUAL STUDIO BUILD TOOLS:" -ForegroundColor Yellow
    Write-Host "1. Descarga: https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2022"
    Write-Host "2. Instala 'C++ build tools'"
    Write-Host "3. Reinicia PowerShell"
    Write-Host ""
    
    Write-Host "🚀 ALTERNATIVA: USAR GNU TOOLCHAIN" -ForegroundColor Green
    Write-Host "rustup toolchain install stable-x86_64-pc-windows-gnu"
    Write-Host "rustup default stable-x86_64-pc-windows-gnu"
}

Write-Host ""
Read-Host "Presiona Enter para continuar..."
