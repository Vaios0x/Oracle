'use client';

import { GlassCard } from '@/components/ui/GlassCard';
import { GradientText } from '@/components/ui/GradientText';

export default function PortfolioPage() {
  // Simulate wallet connection for demo
  const isConnected = true;

  if (!isConnected) {
    return (
      <div className="container mx-auto px-4 py-24">
        <GlassCard className="text-center py-12">
          <p className="text-white/60 text-lg mb-4">
            Please connect your wallet to view your portfolio
          </p>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-5xl font-bold mb-8">
        <GradientText>Your Portfolio</GradientText>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <GlassCard>
          <h3 className="text-sm text-white/60 mb-2">Total Value</h3>
          <div className="text-3xl font-bold gradient-text">$0.00</div>
        </GlassCard>

        <GlassCard>
          <h3 className="text-sm text-white/60 mb-2">Active Positions</h3>
          <div className="text-3xl font-bold">0</div>
        </GlassCard>

        <GlassCard>
          <h3 className="text-sm text-white/60 mb-2">Total P&L</h3>
          <div className="text-3xl font-bold text-green-400">$0.00</div>
        </GlassCard>

        <GlassCard>
          <h3 className="text-sm text-white/60 mb-2">Markets Created</h3>
          <div className="text-3xl font-bold">0</div>
        </GlassCard>
      </div>

      <GlassCard>
        <h2 className="text-2xl font-bold mb-4">Your Positions</h2>
        <p className="text-white/60">No active positions yet. Start betting on markets!</p>
      </GlassCard>
    </div>
  );
}
