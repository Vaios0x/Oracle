'use client';

import { GlassCard } from '@/components/ui/GlassCard';
import { GlassMorphism } from '@/components/ui/GlassMorphism';
import { NeuralGradient } from '@/components/ui/NeuralGradient';
import { GradientText } from '@/components/ui/GradientText';
import { GlassButton } from '@/components/ui/GlassButton';
import { QuickTemplates } from '@/components/markets/QuickTemplates';
import { BalanceDisplay } from '@/components/wallet/BalanceDisplay';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      {/* Balance Display */}
      <BalanceDisplay />
      
      <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-24">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 sm:mb-16 lg:mb-20"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6">
          <GradientText>Pump.fun</GradientText>
          <br />
          <span className="text-white">for Prediction Markets</span>
        </h1>
        
        <p className="text-lg sm:text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
          Create, trade, and resolve ANY prediction market in <span className="text-solana-green font-bold">60 seconds</span>.
          <br className="hidden sm:block" />
          <span className="block sm:inline">No permissions. No gatekeepers. Just pure decentralization.</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
          <Link href="/markets/create" className="w-full sm:w-auto">
            <GlassButton variant="neural" size="lg" neural glow floating className="w-full sm:w-auto">
              Create Market
            </GlassButton>
          </Link>
          
          <Link href="/markets" className="w-full sm:w-auto">
            <GlassButton variant="glass" size="lg" glow floating className="w-full sm:w-auto">
              Explore Markets
            </GlassButton>
          </Link>
        </div>
      </motion.div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16 lg:mb-20">
        <GlassCard variant="neural" neural glow floating>
          <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🚀</div>
          <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Permissionless</h3>
          <p className="text-white/70 text-sm sm:text-base">
            Anyone can create markets instantly. No approval needed, no centralized control.
          </p>
        </GlassCard>

        <GlassCard variant="enhanced" glow floating>
          <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🏛️</div>
          <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">DAO Oracle</h3>
          <p className="text-white/70 text-sm sm:text-base">
            Community resolves outcomes through stake-weighted voting. Earn rewards for accuracy.
          </p>
        </GlassCard>

        <GlassCard variant="neural" neural glow floating className="sm:col-span-2 lg:col-span-1">
          <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">⚡</div>
          <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Solana Speed</h3>
          <p className="text-white/70 text-sm sm:text-base">
            400ms settlement, $0.00025 per trade. Built for institutional scale.
          </p>
        </GlassCard>
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16 lg:mb-20"
      >
        <GlassMorphism variant="enhanced" intensity="high" interactive floating>
          <div className="text-center p-4 sm:p-6">
            <NeuralGradient variant="neural" animated intensity="high">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">$2.5M</div>
            </NeuralGradient>
            <div className="text-white/60 text-xs sm:text-sm">Total Volume</div>
          </div>
        </GlassMorphism>
        
        <GlassMorphism variant="neural" intensity="high" interactive floating>
          <div className="text-center p-4 sm:p-6">
            <NeuralGradient variant="cyber" animated intensity="high">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">127</div>
            </NeuralGradient>
            <div className="text-white/60 text-xs sm:text-sm">Active Markets</div>
          </div>
        </GlassMorphism>
        
        <GlassMorphism variant="enhanced" intensity="high" interactive floating>
          <div className="text-center p-4 sm:p-6">
            <NeuralGradient variant="holographic" animated intensity="high">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">3.4K</div>
            </NeuralGradient>
            <div className="text-white/60 text-xs sm:text-sm">Total Users</div>
          </div>
        </GlassMorphism>
        
        <GlassMorphism variant="neural" intensity="high" interactive floating>
          <div className="text-center p-4 sm:p-6">
            <NeuralGradient variant="neural" animated intensity="high">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">98.7%</div>
            </NeuralGradient>
            <div className="text-white/60 text-xs sm:text-sm">Resolution Accuracy</div>
          </div>
        </GlassMorphism>
      </motion.div>

      {/* Popular Templates Section */}
      <QuickTemplates />

      {/* Demo Markets Section */}
      <div className="text-center px-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 lg:mb-8">
          <span className="gradient-text">Live Markets</span>
        </h2>
        <p className="text-white/60 text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
          Explore active prediction markets and start trading
        </p>
        <Link href="/markets">
          <GlassButton variant="neural" size="lg" neural glow floating className="w-full sm:w-auto">
            View All Markets
          </GlassButton>
        </Link>
      </div>
      </div>
    </>
  );
}
