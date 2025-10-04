# 🔍 VERIFICACIÓN DE VISUAL STUDIO BUILD TOOLS
# Ejecutar después de instalar Visual Studio Build Tools

Write-Host "🔍 VERIFICANDO VISUAL STUDIO BUILD TOOLS..." -ForegroundColor Green
Write-Host ""

# Verificar compilador C++
Write-Host "📋 Verificando compilador C++..." -ForegroundColor Yellow
try {
    $clVersion = cl 2>&1 | Select-String "Microsoft"
    if ($clVersion) {
        Write-Host "✅ Compilador C++ encontrado: $clVersion" -ForegroundColor Green
    } else {
        Write-Host "❌ Compilador C++ no encontrado" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Compilador C++ no encontrado" -ForegroundColor Red
}

Write-Host ""

# Verificar Rust
Write-Host "📋 Verificando Rust..." -ForegroundColor Yellow
try {
    $rustVersion = rustc --version
    if ($rustVersion) {
        Write-Host "✅ Rust encontrado: $rustVersion" -ForegroundColor Green
    } else {
        Write-Host "❌ Rust no encontrado" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Rust no encontrado" -ForegroundColor Red
}

Write-Host ""

# Verificar Cargo
Write-Host "📋 Verificando Cargo..." -ForegroundColor Yellow
try {
    $cargoVersion = cargo --version
    if ($cargoVersion) {
        Write-Host "✅ Cargo encontrado: $cargoVersion" -ForegroundColor Green
    } else {
        Write-Host "❌ Cargo no encontrado" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Cargo no encontrado" -ForegroundColor Red
}

Write-Host ""

# Verificar si podemos compilar
Write-Host "📋 Probando compilación..." -ForegroundColor Yellow
try {
    Write-Host "Probando compilación de Rust..." -ForegroundColor Cyan
    cargo check --quiet
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Compilación de Rust exitosa" -ForegroundColor Green
    } else {
        Write-Host "❌ Error en compilación de Rust" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Error al probar compilación" -ForegroundColor Red
}

Write-Host ""
Write-Host "🎯 ESTADO DE VERIFICACIÓN:" -ForegroundColor Blue
Write-Host "Si todos los elementos están ✅, puedes proceder con el deployment"
Write-Host "Si hay elementos ❌, necesitas instalar Visual Studio Build Tools"
Write-Host ""

Read-Host "Presiona Enter para continuar..."
