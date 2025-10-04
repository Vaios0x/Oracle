#!/bin/bash
# 🚀 DEPLOYMENT DE ORACLE EN WSL (Windows Subsystem for Linux)
# Alternativa recomendada para evitar problemas con Visual Studio Build Tools

echo "🎯 DEPLOYMENT DE ORACLE EN WSL"
echo ""

echo "📋 Verificando WSL..."
if ! command -v wsl &> /dev/null; then
    echo "❌ WSL no encontrado. Instalando WSL..."
    wsl --install
    echo "✅ WSL instalado. Reinicia tu computadora y ejecuta este script nuevamente."
    exit 1
fi

echo "✅ WSL encontrado"
echo ""

echo "🔧 Configurando entorno en WSL..."
wsl bash -c "
    echo '📋 Instalando Solana CLI...'
    curl --proto '=https' --tlsv1.2 -sSfL https://solana-install.solana.workers.dev | bash
    export PATH=\"\$HOME/.local/share/solana/install/active_release/bin:\$PATH\"
    
    echo '📋 Instalando Anchor CLI...'
    npm install -g @coral-xyz/anchor-cli
    
    echo '📋 Configurando Solana...'
    solana config set --url https://api.devnet.solana.com
    solana config set --keypair ./wallet-keypair.json
    
    echo '💰 Obteniendo SOL...'
    solana airdrop 2
    
    echo '🔨 Compilando programas...'
    anchor build
    
    if [ \$? -eq 0 ]; then
        echo '✅ Compilación exitosa'
        echo '🚀 Desplegando programas...'
        anchor deploy --provider.cluster devnet
        
        if [ \$? -eq 0 ]; then
            echo ''
            echo '🎉 ¡DEPLOYMENT EXITOSO!'
            echo ''
            echo '📋 INFORMACIÓN DE PROGRAMAS DESPLEGADOS:'
            echo '- Oráculo Program ID: 3yiUbupcQVVfU8XMd8594GEWbSjVHBXrHzWEcu9GqfZ2'
            echo '- Governance Program ID: BJBEwqCTA8kPehiqV7jzSRKonbhGVDfWSuPFSvw7kRoN'
            echo '- Wallet: 3S8EEWxgFTpoAPip78CBanP7xjNuUQK5Yb3Ezin4pFxF'
            echo ''
            echo '🌐 Enlaces de Verificación:'
            echo '- Oráculo: https://explorer.solana.com/address/3yiUbupcQVVfU8XMd8594GEWbSjVHBXrHzWEcu9GqfZ2?cluster=devnet'
            echo '- Governance: https://explorer.solana.com/address/BJBEwqCTA8kPehiqV7jzSRKonbhGVDfWSuPFSvw7kRoN?cluster=devnet'
            echo ''
            echo '🎯 ¡ORACLE DESPLEGADO EXITOSAMENTE EN SOLANA DEVNET!'
        else
            echo '❌ Error en el deployment'
        fi
    else
        echo '❌ Error en la compilación'
    fi
"

echo ""
echo "🎉 Script de deployment completado"
echo "Revisa la salida anterior para ver el estado del deployment"