'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';
import { GradientText } from '@/components/ui/GradientText';
import { MarketTemplates } from '@/components/markets/MarketTemplates';
import { MARKET_CATEGORIES, MIN_LIQUIDITY } from '@/lib/solana/constants';
import { formatUSD } from '@/lib/utils';
import { MarketTemplate } from '@/lib/data/market-templates';

export default function CreateMarketPage() {
  const router = useRouter();
  const [showTemplates, setShowTemplates] = useState(false);

  const [formData, setFormData] = useState({
    question: '',
    description: '',
    category: 0,
    endDate: '',
    resolutionSource: '',
    initialLiquidity: MIN_LIQUIDITY,
  });

  const handleSelectTemplate = (template: MarketTemplate) => {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + template.daysUntilEnd);

    setFormData({
      question: template.question,
      description: template.description,
      category: template.category,
      endDate: endDate.toISOString().slice(0, 16),
      resolutionSource: template.resolutionSource,
      initialLiquidity: template.initialLiquidity,
    });

    setShowTemplates(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.question || !formData.description || !formData.endDate) {
      alert('Please fill in all required fields');
      return;
    }

    const endDate = new Date(formData.endDate);
    if (endDate <= new Date()) {
      alert('End date must be in the future');
      return;
    }

    // TODO: Implement market creation
    alert('Market creation will be implemented with smart contract integration');
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-5xl font-bold mb-8">
        <GradientText>Create Market</GradientText>
      </h1>

      {/* Template Selection */}
      {showTemplates ? (
        <MarketTemplates onSelectTemplate={handleSelectTemplate} />
      ) : (
        <>
          {/* Template Button */}
          <div className="mb-8 text-center">
            <GlassButton
              onClick={() => setShowTemplates(true)}
              variant="secondary"
              size="lg"
            >
              📋 Browse Templates
            </GlassButton>
            <p className="text-white/60 text-sm mt-2">
              Choose from popular market templates or create from scratch
            </p>
          </div>

          <GlassCard>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Question */}
          <div>
            <label className="block text-sm text-white/70 mb-2">
              Question <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              placeholder="Will BTC hit $100K by end of 2025?"
              maxLength={200}
              className="w-full px-4 py-3 glass rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-solana-purple"
            />
            <p className="text-xs text-white/50 mt-1">
              {formData.question.length}/200 characters
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm text-white/70 mb-2">
              Description <span className="text-red-400">*</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Provide additional context about this prediction market..."
              maxLength={500}
              rows={4}
              className="w-full px-4 py-3 glass rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-solana-purple resize-none"
            />
            <p className="text-xs text-white/50 mt-1">
              {formData.description.length}/500 characters
            </p>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm text-white/70 mb-2">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: parseInt(e.target.value) })}
              className="w-full px-4 py-3 glass rounded-xl text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-solana-purple"
            >
              {MARKET_CATEGORIES.map((cat, idx) => (
                <option key={cat} value={idx}>{cat}</option>
              ))}
            </select>
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm text-white/70 mb-2">
              End Date <span className="text-red-400">*</span>
            </label>
            <input
              type="datetime-local"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              min={new Date().toISOString().slice(0, 16)}
              className="w-full px-4 py-3 glass rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-solana-purple"
            />
            <p className="text-xs text-white/50 mt-1">
              Market will end at this date. Resolution voting starts after.
            </p>
          </div>

          {/* Resolution Source */}
          <div>
            <label className="block text-sm text-white/70 mb-2">
              Resolution Source (Optional)
            </label>
            <input
              type="url"
              value={formData.resolutionSource}
              onChange={(e) => setFormData({ ...formData, resolutionSource: e.target.value })}
              placeholder="https://api.example.com/data"
              maxLength={200}
              className="w-full px-4 py-3 glass rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-solana-purple"
            />
            <p className="text-xs text-white/50 mt-1">
              Future: zkTLS verification will use this source (Q1 2026)
            </p>
          </div>

          {/* Initial Liquidity */}
          <div>
            <label className="block text-sm text-white/70 mb-2">
              Initial Liquidity <span className="text-red-400">*</span>
            </label>
            <input
              type="number"
              value={formData.initialLiquidity / 1_000_000}
              onChange={(e) => setFormData({ 
                ...formData, 
                initialLiquidity: parseFloat(e.target.value) * 1_000_000 
              })}
              min={MIN_LIQUIDITY / 1_000_000}
              step="10"
              className="w-full px-4 py-3 glass rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-solana-purple"
            />
            <p className="text-xs text-white/50 mt-1">
              Minimum: {formatUSD(MIN_LIQUIDITY)} (locked as Proof of Liquidity)
            </p>
          </div>

          {/* Info Card */}
          <GlassCard className="bg-solana-purple/10">
            <h4 className="font-semibold mb-2">Proof of Liquidity</h4>
            <p className="text-sm text-white/70">
              Your initial liquidity will be locked in the market to prevent rug pulls. 
              You'll receive it back after successful resolution. This ensures market creators 
              have skin in the game.
            </p>
          </GlassCard>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full glass-button glass-button-primary"
          >
            Create Market
          </button>
        </form>
      </GlassCard>
        </>
      )}
    </div>
  );
}
