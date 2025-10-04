'use client';

import { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { GradientText } from '@/components/ui/GradientText';
import { MARKET_CATEGORIES } from '@/lib/solana/constants';
import Link from 'next/link';

export default function MarketsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('active');

  // Mock data for now - will be replaced with real data from hooks
  const markets: any[] = [];
  const isLoading = false;
  const error: string | null = null;

  const filteredMarkets = markets?.filter(market => {
    const categoryMatch = selectedCategory === 'all' || 
      MARKET_CATEGORIES[parseInt(Object.keys(market.category)[0])] === selectedCategory;
    
    const statusMatch = selectedStatus === 'all' || 
      Object.keys(market.status)[0] === selectedStatus.toLowerCase();

    return categoryMatch && statusMatch;
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
          {/* Market cards will go here */}
        </div>
      )}
    </div>
  );
}
