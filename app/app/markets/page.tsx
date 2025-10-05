'use client';

import { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { GradientText } from '@/components/ui/GradientText';
import { MARKET_CATEGORIES } from '@/lib/solana/constants';
import { getActiveMarkets, getMarketsByCategory } from '@/lib/data/active-markets';
import { formatNumber, formatTimeRemaining } from '@/lib/utils';
import Link from 'next/link';

export default function MarketsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('active');

  // Get real market data
  const allMarkets = getActiveMarkets();
  const markets = selectedCategory === 'all' 
    ? allMarkets 
    : getMarketsByCategory(parseInt(selectedCategory));
  const isLoading = false;
  const error: string | null = null;

  const filteredMarkets = markets?.filter(market => {
    const statusMatch = selectedStatus === 'all' || market.status === selectedStatus;
    return statusMatch;
  }) || [];

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="text-white/60 mt-4">Loading markets...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-24">
        <GlassCard className="text-center py-12">
          <p className="text-red-400">Error loading markets: {error}</p>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12 mobile-mb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 mobile-stack">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-0 mobile-h1">
          <GradientText>Markets</GradientText>
        </h1>
        <Link href="/markets/create" className="w-full sm:w-auto mobile-full">
          <GlassButton className="mobile-btn mobile-touch">
            Create Market
          </GlassButton>
        </Link>
      </div>

      {/* Filters */}
      <GlassCard className="mb-6 sm:mb-8 mobile-card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mobile-grid-1">
          {/* Category Filter */}
          <div>
            <label className="block text-sm text-white/70 mb-2 mobile-text-xs">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 glass rounded-xl text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-solana-purple mobile-input mobile-touch"
            >
              <option value="all">All Categories</option>
              {MARKET_CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm text-white/70 mb-2 mobile-text-xs">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 glass rounded-xl text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-solana-purple mobile-input mobile-touch"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>
      </GlassCard>

      {/* Results */}
      <div className="mb-3 sm:mb-4 text-white/60 mobile-text-sm">
        Showing {filteredMarkets.length} markets
      </div>

      {filteredMarkets.length === 0 ? (
        <GlassCard className="text-center py-8 sm:py-12 mobile-card">
          <p className="text-white/60 text-base sm:text-lg mobile-text-sm">No markets found</p>
          <Link href="/markets/create" className="mt-4 inline-block mobile-full">
            <GlassButton className="mobile-btn mobile-touch">Create First Market</GlassButton>
          </Link>
        </GlassCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mobile-grid-1 tablet-grid-2">
          {filteredMarkets.map((market) => (
            <GlassCard key={market.id} className="p-4 sm:p-6 mobile-card">
              <div className="space-y-3 sm:space-y-4">
                {/* Market Header */}
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 mobile-text-sm">
                      {market.name}
                    </h3>
                    <p className="text-sm text-white/70 mobile-text-xs">
                      {market.question}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    market.status === 'active' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {market.status}
                  </span>
                </div>

                {/* Market Stats */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mobile-grid-2">
                  <div>
                    <p className="text-xs text-white/50 mb-1 mobile-text-xs">Liquidity</p>
                    <p className="text-sm font-medium text-white mobile-text-xs">
                      ${formatNumber(market.liquidity / 1_000_000)}M
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-white/50 mb-1 mobile-text-xs">Volume</p>
                    <p className="text-sm font-medium text-white mobile-text-xs">
                      ${formatNumber(market.volume / 1_000_000)}M
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-white/50 mb-1 mobile-text-xs">Participants</p>
                    <p className="text-sm font-medium text-white mobile-text-xs">
                      {formatNumber(market.participants)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-white/50 mb-1 mobile-text-xs">Ends</p>
                    <p className="text-sm font-medium text-white mobile-text-xs">
                      {formatTimeRemaining(new Date(market.endDate).getTime() / 1000)}
                    </p>
                  </div>
                </div>

                {/* Price Display */}
                <div className="flex justify-between items-center p-3 sm:p-4 glass rounded-xl mobile-p-2">
                  <div className="text-center flex-1">
                    <p className="text-xs text-white/50 mb-1 mobile-text-xs">YES</p>
                    <p className="text-lg sm:text-xl font-bold text-green-400 mobile-text-sm">
                      ${(market.yesPrice * 100).toFixed(2)}
                    </p>
                  </div>
                  <div className="text-center flex-1">
                    <p className="text-xs text-white/50 mb-1 mobile-text-xs">NO</p>
                    <p className="text-lg sm:text-xl font-bold text-red-400 mobile-text-sm">
                      ${(market.noPrice * 100).toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 sm:gap-2 mobile-gap-1">
                  {market.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/70 mobile-text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                  {market.tags.length > 3 && (
                    <span className="px-2 py-1 bg-white/10 rounded-full text-xs text-white/70 mobile-text-xs">
                      +{market.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 sm:gap-3 mobile-gap-2">
                  <GlassButton className="flex-1 mobile-btn mobile-touch">
                    View Details
                  </GlassButton>
                  <GlassButton variant="secondary" className="flex-1 mobile-btn mobile-touch">
                    Trade
                  </GlassButton>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}
