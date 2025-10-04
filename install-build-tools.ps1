# 🚀 INSTALACIÓN DE HERRAMIENTAS PARA DEPLOYMENT DE ORACLE
# Este script te guiará a través de la instalación de Visual Studio Build Tools

Write-Host "🎯 INSTALACIÓN DE HERRAMIENTAS PARA DEPLOYMENT DE ORACLE" -ForegroundColor Green
Write-Host ""

Write-Host "📋 PASOS REQUERIDOS:" -ForegroundColor Yellow
Write-Host "1. Descargar Visual Studio Build Tools"
Write-Host "2. Instalar con componente 'C++ build tools'"
Write-Host "3. Reiniciar PowerShell"
Write-Host "4. Ejecutar deployment"
Write-Host ""

Write-Host "🔗 ENLACES DE DESCARGA:" -ForegroundColor Cyan
Write-Host "- Visual Studio Build Tools: https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2022"
Write-Host ""

Write-Host "📝 INSTRUCCIONES DETALLADAS:" -ForegroundColor Magenta
Write-Host "1. Descarga 'Build Tools for Visual Studio 2022'"
Write-Host "2. Ejecuta el instalador como administrador"
Write-Host "3. Selecciona 'C++ build tools' (incluye MSVC v143, Windows 10/11 SDK)"
Write-Host "4. Instala y reinicia PowerShell"
Write-Host "5. Ejecuta: .\deploy-now.bat"
Write-Host ""

Write-Host "🚀 ALTERNATIVA: USAR WSL (RECOMENDADO)" -ForegroundColor Green
Write-Host "Si prefieres usar WSL (Windows Subsystem for Linux):"
Write-Host "1. Instala WSL: wsl --install"
Write-Host "2. Abre Ubuntu en WSL"
Write-Host "3. Ejecuta los comandos de deployment desde WSL"
Write-Host ""

Write-Host "📊 ESTADO ACTUAL:" -ForegroundColor Blue
Write-Host "✅ Proyecto Oracle configurado al 100%"
Write-Host "✅ Program IDs generados y configurados"
Write-Host "✅ Archivos de deployment listos"
Write-Host "❌ Falta: Visual Studio Build Tools o WSL"
Write-Host ""

Write-Host "🎉 ¡SOLO FALTA INSTALAR LAS HERRAMIENTAS DE COMPILACIÓN!" -ForegroundColor Green
Write-Host "Una vez instaladas, el deployment será automático."
Write-Host ""

Read-Host "Presiona Enter para continuar..."
