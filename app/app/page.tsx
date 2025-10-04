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
      
      <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 mobile-h1">
          <GradientText>Pump.fun</GradientText>
          <br />
          <span className="text-white">for Prediction Markets</span>
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 max-w-4xl mx-auto mb-6 sm:mb-8 px-4 mobile-text-sm">
          Create, trade, and resolve ANY prediction market in <span className="text-solana-green font-bold">60 seconds</span>.
          <br className="hidden sm:block" />
          <span className="block sm:inline">No permissions. No gatekeepers. Just pure decentralization.</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 mobile-stack">
          <Link href="/markets/create" className="w-full sm:w-auto mobile-full">
            <GlassButton 
              variant="neural" 
              size="lg" 
              neural 
              glow 
              floating 
              className="w-full sm:w-auto mobile-btn mobile-touch"
            >
              Create Market
            </GlassButton>
          </Link>
          
          <Link href="/markets" className="w-full sm:w-auto mobile-full">
            <GlassButton 
              variant="glass" 
              size="lg" 
              glow 
              floating 
              className="w-full sm:w-auto mobile-btn mobile-touch"
            >
              Explore Markets
            </GlassButton>
          </Link>
        </div>
      </motion.div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16 lg:mb-20 mobile-grid-1 tablet-grid-2">
        <GlassCard variant="neural" neural glow floating className="mobile-card">
          <div className="text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4">🚀</div>
          <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 mobile-h3">Permissionless</h3>
          <p className="text-white/70 text-xs sm:text-sm md:text-base mobile-text-xs">
            Anyone can create markets instantly. No approval needed, no centralized control.
          </p>
        </GlassCard>

        <GlassCard variant="enhanced" glow floating className="mobile-card">
          <div className="text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4">🏛️</div>
          <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 mobile-h3">DAO Oracle</h3>
          <p className="text-white/70 text-xs sm:text-sm md:text-base mobile-text-xs">
            Community resolves outcomes through stake-weighted voting. Earn rewards for accuracy.
          </p>
        </GlassCard>

        <GlassCard variant="neural" neural glow floating className="sm:col-span-2 lg:col-span-1 mobile-card">
          <div className="text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4">⚡</div>
          <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 mobile-h3">Solana Speed</h3>
          <p className="text-white/70 text-xs sm:text-sm md:text-base mobile-text-xs">
            400ms settlement, $0.00025 per trade. Built for institutional scale.
          </p>
        </GlassCard>
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-12 md:mb-16 lg:mb-20 mobile-grid-1 tablet-grid-2"
      >
        <GlassMorphism variant="enhanced" intensity="high" interactive floating className="mobile-card">
          <div className="text-center p-3 sm:p-4 md:p-6 mobile-p-2">
            <NeuralGradient variant="neural" animated intensity="high">
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 mobile-text-sm">$2.5M</div>
            </NeuralGradient>
            <div className="text-white/60 text-xs sm:text-sm mobile-text-xs">Total Volume</div>
          </div>
        </GlassMorphism>
        
        <GlassMorphism variant="neural" intensity="high" interactive floating className="mobile-card">
          <div className="text-center p-3 sm:p-4 md:p-6 mobile-p-2">
            <NeuralGradient variant="cyber" animated intensity="high">
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 mobile-text-sm">127</div>
            </NeuralGradient>
            <div className="text-white/60 text-xs sm:text-sm mobile-text-xs">Active Markets</div>
          </div>
        </GlassMorphism>
        
        <GlassMorphism variant="enhanced" intensity="high" interactive floating className="mobile-card">
          <div className="text-center p-3 sm:p-4 md:p-6 mobile-p-2">
            <NeuralGradient variant="holographic" animated intensity="high">
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 mobile-text-sm">3.4K</div>
            </NeuralGradient>
            <div className="text-white/60 text-xs sm:text-sm mobile-text-xs">Total Users</div>
          </div>
        </GlassMorphism>
        
        <GlassMorphism variant="neural" intensity="high" interactive floating className="mobile-card">
          <div className="text-center p-3 sm:p-4 md:p-6 mobile-p-2">
            <NeuralGradient variant="neural" animated intensity="high">
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 mobile-text-sm">98.7%</div>
            </NeuralGradient>
            <div className="text-white/60 text-xs sm:text-sm mobile-text-xs">Resolution Accuracy</div>
          </div>
        </GlassMorphism>
      </motion.div>

      {/* Popular Templates Section */}
      <QuickTemplates />

      {/* Demo Markets Section */}
      <div className="text-center px-4 mobile-mb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 md:mb-6 lg:mb-8 mobile-h2">
          <span className="gradient-text">Live Markets</span>
        </h2>
        <p className="text-white/60 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 md:mb-8 max-w-2xl mx-auto mobile-text-sm">
          Explore active prediction markets and start trading
        </p>
        <Link href="/markets" className="mobile-full">
          <GlassButton 
            variant="neural" 
            size="lg" 
            neural 
            glow 
            floating 
            className="w-full sm:w-auto mobile-btn mobile-touch"
          >
            View All Markets
          </GlassButton>
        </Link>
      </div>
      </div>
    </>
  );
}
