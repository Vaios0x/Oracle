'use client';

import { GlassCard } from '@/components/ui/GlassCard';
import { GradientText } from '@/components/ui/GradientText';

export default function GovernancePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-5xl font-bold mb-8">
        <GradientText>Governance</GradientText>
      </h1>

      <GlassCard className="mb-8">
        <h2 className="text-2xl font-bold mb-4">How DAO Resolution Works</h2>
        <div className="space-y-4 text-white/70">
          <p>
            Oráculo uses a novel <strong>DAO-as-Oracle</strong> architecture where the same governance 
            token holders who create markets also resolve them.
          </p>
          
          <div className="pl-4 border-l-2 border-solana-purple">
            <h3 className="font-semibold text-white mb-2">Resolution Process:</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>Market ends at specified time</li>
              <li>Anyone can propose outcome (requires 1,000 governance token stake)</li>
              <li>48-hour voting period begins</li>
              <li>Token holders vote YES or NO with stake-weighted votes</li>
              <li>Requires 66% supermajority + 10,000 token quorum</li>
              <li>Winning outcome is executed, losers get slashed</li>
            </ol>
          </div>

          <p className="text-sm">
            <strong>Future Enhancement (Q1 2026):</strong> zkTLS verification via Reclaim Protocol 
            will enable automatic resolution for API-based markets.
          </p>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard>
          <h3 className="text-xl font-bold mb-2">Active Proposals</h3>
          <div className="text-4xl font-bold gradient-text">0</div>
          <p className="text-sm text-white/60 mt-2">Markets awaiting resolution</p>
        </GlassCard>

        <GlassCard>
          <h3 className="text-xl font-bold mb-2">Your Voting Power</h3>
          <div className="text-4xl font-bold gradient-text">0</div>
          <p className="text-sm text-white/60 mt-2">Governance tokens held</p>
        </GlassCard>

        <GlassCard>
          <h3 className="text-xl font-bold mb-2">Resolution Accuracy</h3>
          <div className="text-4xl font-bold gradient-text">98.7%</div>
          <p className="text-sm text-white/60 mt-2">Correct resolutions</p>
        </GlassCard>
      </div>
    </div>
  );
}
