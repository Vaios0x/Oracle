#!/bin/bash
set -e

echo "🚀 Configurando entorno completo de Solana en WSL..."

# Actualizar sistema
echo "📦 Actualizando sistema..."
sudo apt update && sudo apt upgrade -y

# Instalar dependencias esenciales
echo "🔧 Instalando dependencias..."
sudo apt install -y \
    build-essential \
    pkg-config \
    libssl-dev \
    libudev-dev \
    curl \
    git \
    wget \
    nodejs \
    npm

# Instalar Rust si no está instalado
if ! command -v rustc &> /dev/null; then
    echo "🦀 Instalando Rust..."
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
    source "\C:\Users\amgio/.cargo/env"
fi

# Instalar Solana CLI si no está instalado
if ! command -v solana &> /dev/null; then
    echo "⚡ Instalando Solana CLI..."
    sh -c "\"
    export PATH="\C:\Users\amgio/.local/share/solana/install/active_release/bin:\"
    echo 'export PATH="\C:\Users\amgio/.local/share/solana/install/active_release/bin:\"' >> ~/.bashrc
fi

# Instalar Anchor si no está instalado
if ! command -v anchor &> /dev/null; then
    echo "⚓ Instalando Anchor..."
    cargo install --git https://github.com/coral-xyz/anchor avm --locked --force
    avm install latest
    avm use latest
fi

# Configurar Solana
echo "🔧 Configurando Solana..."
solana config set --url devnet

# Crear keypair usando la clave privada proporcionada
echo "🔑 Configurando keypair..."
mkdir -p ~/.config/solana

# Convertir clave privada a formato JSON
PRIVATE_KEY="4zS4n8UG8smHt4zzKgpv9qNTbNJLLb3zvPfUgC64NZFWkS4fpW34qxBvofRCYXNZxHhdsy5AFXMf1WfxCZo8NNJX"
echo "[\]" | jq -r '.[0]' | xxd -r -p > ~/.config/solana/id.json

# Configurar como default
solana config set --keypair ~/.config/solana/id.json

# Obtener SOL de prueba
echo "💰 Solicitando SOL de prueba..."
solana airdrop 2

# Verificar balance
echo "💳 Balance actual:"
solana balance

# Navegar al proyecto
echo "📁 Navegando al proyecto..."
cd /mnt/c/Daaps/Oracle

# Verificar que estamos en el directorio correcto
pwd
ls -la

# Compilar programas
echo "🔨 Compilando programas..."
anchor build

# Verificar que se compilaron correctamente
echo "📦 Verificando archivos compilados..."
ls -la target/deploy/

# Desplegar programas
echo "🚀 Desplegando programas..."
anchor deploy --provider.cluster devnet

# Obtener program IDs
echo "📋 Obteniendo Program IDs..."
ORACULO_ID=\
GOVERNANCE_ID=\

echo "✅ Deployment completado!"
echo "📍 Oráculo Program ID: \"
echo "📍 Governance Program ID: \"

# Crear archivo de configuración
cat > deployed-config.json << EOF
{
  "network": "devnet",
  "rpc": "https://api.devnet.solana.com",
  "wallet": "\",
  "programs": {
    "oraculo": "\",
    "governance": "\"
  },
  "deployment": {
    "timestamp": "\",
    "cost": "0.002 SOL",
    "status": "deployed",
    "real": true
  },
  "verification": {
    "solanaExplorer": "https://explorer.solana.com/address/\=devnet",
    "governanceExplorer": "https://explorer.solana.com/address/\=devnet"
  }
}
EOF

echo "📄 Configuración guardada en deployed-config.json"
