# 🔧 SOLUCIÓN SIMPLE PARA ERROR DE LINK.EXE
Write-Host "🔧 SOLUCIONANDO ERROR DE LINK.EXE EN ORACLE" -ForegroundColor Green
Write-Host ""

# Verificar si Visual Studio Build Tools está instalado
Write-Host "🔍 VERIFICANDO VISUAL STUDIO BUILD TOOLS..." -ForegroundColor Yellow

$vsWhere = "${env:ProgramFiles(x86)}\Microsoft Visual Studio\Installer\vswhere.exe"
if (Test-Path $vsWhere) {
    Write-Host "✅ Visual Studio Installer encontrado" -ForegroundColor Green
    
    # Buscar instalaciones
    $installations = & $vsWhere -products * -requires Microsoft.VisualStudio.Component.VC.Tools.x86.x64 -format json | ConvertFrom-Json
    
    if ($installations.Count -gt 0) {
        Write-Host "✅ Visual Studio Build Tools encontrado" -ForegroundColor Green
        
        $vsPath = $installations[0].installationPath
        Write-Host "📍 Ruta: $vsPath" -ForegroundColor Cyan
        
        # Configurar entorno
        $vcvarsPath = Join-Path $vsPath "VC\Auxiliary\Build\vcvars64.bat"
        
        if (Test-Path $vcvarsPath) {
            Write-Host "✅ vcvars64.bat encontrado" -ForegroundColor Green
            Write-Host "🔧 Configurando entorno..." -ForegroundColor Yellow
            
            # Configurar variables de entorno
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
                Write-Host ""
                Write-Host "🚀 COMPILANDO ORACLE..." -ForegroundColor Green
                cargo check
            } else {
                Write-Host "❌ link.exe no disponible" -ForegroundColor Red
            }
        } else {
            Write-Host "❌ vcvars64.bat no encontrado" -ForegroundColor Red
        }
    } else {
        Write-Host "❌ Visual Studio Build Tools no encontrado" -ForegroundColor Red
        Write-Host ""
        Write-Host "📥 INSTALAR VISUAL STUDIO BUILD TOOLS:" -ForegroundColor Yellow
        Write-Host "1. Descarga: https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2022"
        Write-Host "2. Instala 'C++ build tools' (MSVC v143, Windows 10/11 SDK)"
        Write-Host "3. Reinicia PowerShell"
        Write-Host "4. Ejecuta este script nuevamente"
    }
} else {
    Write-Host "❌ Visual Studio no instalado" -ForegroundColor Red
    Write-Host ""
    Write-Host "📥 INSTALAR VISUAL STUDIO BUILD TOOLS:" -ForegroundColor Yellow
    Write-Host "1. Descarga: https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2022"
    Write-Host "2. Instala 'C++ build tools' (MSVC v143, Windows 10/11 SDK)"
    Write-Host "3. Reinicia PowerShell"
    Write-Host "4. Ejecuta este script nuevamente"
}

Write-Host ""
Write-Host "🚀 ALTERNATIVA: USAR WSL" -ForegroundColor Green
Write-Host "Para evitar problemas con Visual Studio:"
Write-Host "1. wsl --install"
Write-Host "2. ./deploy-wsl.sh"
Write-Host ""

Read-Host "Presiona Enter para continuar..."
