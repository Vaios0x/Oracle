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
  const markets = [];
  const isLoading = false;
  const error = null;

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
          <p className="text-red-400">Error loading markets: {error.message}</p>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-5xl font-bold">
          <GradientText>Markets</GradientText>
        </h1>
        <Link href="/markets/create">
          <GlassButton>
            Create Market
          </GlassButton>
        </Link>
      </div>

      {/* Filters */}
      <GlassCard className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Category Filter */}
          <div>
            <label className="block text-sm text-white/70 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 glass rounded-xl text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-solana-purple"
            >
              <option value="all">All Categories</option>
              {MARKET_CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm text-white/70 mb-2">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-3 glass rounded-xl text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-solana-purple"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>
      </GlassCard>

      {/* Results */}
      <div className="mb-4 text-white/60">
        Showing {filteredMarkets.length} markets
      </div>

      {filteredMarkets.length === 0 ? (
        <GlassCard className="text-center py-12">
          <p className="text-white/60 text-lg">No markets found</p>
          <Link href="/markets/create" className="mt-4 inline-block">
            <GlassButton>Create First Market</GlassButton>
          </Link>
        </GlassCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Market cards will go here */}
        </div>
      )}
    </div>
  );
}
