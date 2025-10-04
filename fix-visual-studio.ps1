# 🔧 SOLUCIÓN PARA ERROR DE LINK.EXE EN ORACLE
# Este script te ayudará a solucionar el problema del linker de Visual Studio

Write-Host "🔧 SOLUCIONANDO ERROR DE LINK.EXE EN ORACLE" -ForegroundColor Green
Write-Host ""

# Verificar si Visual Studio Build Tools está instalado
Write-Host "🔍 VERIFICANDO INSTALACIÓN DE VISUAL STUDIO..." -ForegroundColor Yellow

$vsWhere = "${env:ProgramFiles(x86)}\Microsoft Visual Studio\Installer\vswhere.exe"
if (Test-Path $vsWhere) {
    Write-Host "✅ Visual Studio Installer encontrado" -ForegroundColor Green
    
    # Buscar instalaciones de Visual Studio
    $installations = & $vsWhere -products * -requires Microsoft.VisualStudio.Component.VC.Tools.x86.x64 -format json | ConvertFrom-Json
    
    if ($installations.Count -gt 0) {
        Write-Host "✅ Visual Studio Build Tools encontrado" -ForegroundColor Green
        
        # Obtener la ruta de instalación
        $vsPath = $installations[0].installationPath
        Write-Host "📍 Ruta de instalación: $vsPath" -ForegroundColor Cyan
        
        # Configurar variables de entorno
        $vcvarsPath = Join-Path $vsPath "VC\Auxiliary\Build\vcvars64.bat"
        
        if (Test-Path $vcvarsPath) {
            Write-Host "✅ vcvars64.bat encontrado" -ForegroundColor Green
            Write-Host "🔧 Configurando variables de entorno..." -ForegroundColor Yellow
            
            # Ejecutar vcvars64.bat y configurar el entorno
            $envVars = cmd /c "`"$vcvarsPath`" && set"
            $envVars | ForEach-Object {
                if ($_ -match "^([^=]+)=(.*)$") {
                    [Environment]::SetEnvironmentVariable($matches[1], $matches[2], "Process")
                }
            }
            
            Write-Host "✅ Variables de entorno configuradas" -ForegroundColor Green
            
            # Verificar que link.exe esté disponible
            $linkPath = Get-Command link.exe -ErrorAction SilentlyContinue
            if ($linkPath) {
                Write-Host "✅ link.exe encontrado en: $($linkPath.Source)" -ForegroundColor Green
                Write-Host ""
                Write-Host "🚀 INTENTANDO COMPILAR ORACLE..." -ForegroundColor Green
                
                # Intentar compilar
                cargo check
                
                if ($LASTEXITCODE -eq 0) {
                    Write-Host ""
                    Write-Host "🎉 ¡COMPILACIÓN EXITOSA!" -ForegroundColor Green
                    Write-Host "✅ Oracle está listo para deployment" -ForegroundColor Green
                } else {
                    Write-Host ""
                    Write-Host "❌ Error en la compilación" -ForegroundColor Red
                }
            } else {
                Write-Host "❌ link.exe aún no está disponible" -ForegroundColor Red
                Write-Host "💡 Intenta reiniciar PowerShell y ejecutar este script nuevamente" -ForegroundColor Yellow
            }
        } else {
            Write-Host "❌ vcvars64.bat no encontrado" -ForegroundColor Red
        }
    } else {
        Write-Host "❌ Visual Studio Build Tools no encontrado" -ForegroundColor Red
        Write-Host ""
        Write-Host "📥 DESCARGAR E INSTALAR VISUAL STUDIO BUILD TOOLS:" -ForegroundColor Yellow
        Write-Host "1. Ve a: https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2022"
        Write-Host "2. Descarga 'Build Tools for Visual Studio 2022'"
        Write-Host "3. Ejecuta como administrador"
        Write-Host "4. Selecciona 'C++ build tools' (incluye MSVC v143, Windows 10/11 SDK)"
        Write-Host "5. Instala y reinicia PowerShell"
        Write-Host "6. Ejecuta este script nuevamente"
    }
} else {
    Write-Host "❌ Visual Studio Installer no encontrado" -ForegroundColor Red
    Write-Host ""
    Write-Host "📥 INSTALAR VISUAL STUDIO BUILD TOOLS:" -ForegroundColor Yellow
    Write-Host "1. Ve a: https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2022"
    Write-Host "2. Descarga 'Build Tools for Visual Studio 2022'"
    Write-Host "3. Ejecuta como administrador"
    Write-Host "4. Selecciona 'C++ build tools' (incluye MSVC v143, Windows 10/11 SDK)"
    Write-Host "5. Instala y reinicia PowerShell"
    Write-Host "6. Ejecuta este script nuevamente"
}

Write-Host ""
Write-Host "🚀 ALTERNATIVA: USAR WSL (RECOMENDADO)" -ForegroundColor Green
Write-Host "Si prefieres evitar problemas con Visual Studio:"
Write-Host "1. Instala WSL: wsl --install"
Write-Host "2. Abre Ubuntu en WSL"
Write-Host "3. Ejecuta: ./deploy-wsl.sh"
Write-Host ""

Read-Host "Presiona Enter para continuar..."
