'use client';

import { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';
import { GradientText } from '@/components/ui/GradientText';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { MARKET_TEMPLATES, getTemplatesByCategory, getPopularTemplates, searchTemplates, MarketTemplate } from '@/lib/data/market-templates';
import { MARKET_CATEGORIES } from '@/lib/solana/constants';
import { formatUSD } from '@/lib/utils';
import { motion } from 'framer-motion';

interface MarketTemplatesProps {
  onSelectTemplate: (template: MarketTemplate) => void;
}

export function MarketTemplates({ onSelectTemplate }: MarketTemplatesProps) {
  const [selectedCategory, setSelectedCategory] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectTemplate = async (template: MarketTemplate) => {
    setIsLoading(true);
    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 500));
    onSelectTemplate(template);
    setIsLoading(false);
  };

  const getFilteredTemplates = () => {
    let templates = MARKET_TEMPLATES;

    // Filter by category
    if (selectedCategory !== 'all') {
      templates = getTemplatesByCategory(selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      templates = searchTemplates(searchQuery);
    }

    return templates;
  };

  const filteredTemplates = getFilteredTemplates();
  const popularTemplates = getPopularTemplates(6);

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <LoadingSpinner size="lg" />
        <p className="text-white/60 mt-4">Loading template...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 mobile-gap-2">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 mobile-h2">
          <GradientText>Market Templates</GradientText>
        </h2>
        <p className="text-white/70 text-sm sm:text-base md:text-lg mobile-text-sm">
          Choose from popular prediction market templates to get started quickly
        </p>
      </div>

      {/* Search and Filters */}
      <GlassCard className="mobile-card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mobile-grid-1">
          {/* Search */}
          <div>
            <label className="block text-sm text-white/70 mb-2 mobile-text-xs">Search Templates</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, question, or tags..."
              className="w-full px-3 sm:px-4 py-2 sm:py-3 glass rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-solana-purple mobile-input mobile-touch"
            />
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm text-white/70 mb-2 mobile-text-xs">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 glass rounded-xl text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-solana-purple mobile-input mobile-touch"
            >
              <option value="all">All Categories</option>
              {MARKET_CATEGORIES.map((cat, idx) => (
                <option key={cat} value={idx}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </GlassCard>

      {/* Popular Templates */}
      {selectedCategory === 'all' && !searchQuery && (
        <div>
          <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 mobile-h3">
            <span className="gradient-text">Popular Templates</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mobile-grid-1 tablet-grid-2">
            {popularTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <TemplateCard 
                  template={template} 
                  onSelect={() => handleSelectTemplate(template)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* All Templates */}
      <div>
        <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 mobile-h3">
          <span className="gradient-text">
            {selectedCategory === 'all' ? 'All Templates' : `${MARKET_CATEGORIES[selectedCategory]} Templates`}
          </span>
          <span className="text-white/60 text-sm sm:text-lg ml-2 mobile-text-sm">
            ({filteredTemplates.length} templates)
          </span>
        </h3>

        {filteredTemplates.length === 0 ? (
          <GlassCard className="text-center py-8 sm:py-12 mobile-card">
            <p className="text-white/60 text-base sm:text-lg mobile-text-sm">No templates found</p>
            <p className="text-white/40 text-xs sm:text-sm mt-2 mobile-text-xs">Try adjusting your search or category filter</p>
          </GlassCard>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mobile-grid-1 tablet-grid-2">
            {filteredTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <TemplateCard 
                  template={template} 
                  onSelect={() => handleSelectTemplate(template)}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface TemplateCardProps {
  template: MarketTemplate;
  onSelect: () => void;
}

function TemplateCard({ template, onSelect }: TemplateCardProps) {
  const categoryName = MARKET_CATEGORIES[template.category] || 'Other';
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + template.daysUntilEnd);

  return (
    <GlassCard hover className="h-full flex flex-col mobile-card">
      {/* Header */}
      <div className="flex justify-between items-start mb-3 sm:mb-4 mobile-mb-4">
        <div className="flex-1">
          <h4 className="text-base sm:text-lg font-bold mb-2 line-clamp-2 mobile-h3">
            {template.name}
          </h4>
          <span className="px-2 py-1 text-xs font-semibold bg-solana-purple/30 rounded-full mobile-text-xs">
            {categoryName}
          </span>
        </div>
        <div className="text-right">
          <div className="text-xs sm:text-sm text-white/60 mobile-text-xs">Popularity</div>
          <div className="text-base sm:text-lg font-bold text-solana-green mobile-text-sm">
            {template.popularity}%
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="mb-3 sm:mb-4 mobile-mb-4">
        <p className="text-white/80 text-xs sm:text-sm line-clamp-3 mobile-text-xs">
          {template.question}
        </p>
      </div>

      {/* Description */}
      <div className="mb-3 sm:mb-4 flex-1 mobile-mb-4">
        <p className="text-white/60 text-xs line-clamp-2 mobile-text-xs">
          {template.description}
        </p>
      </div>

      {/* Tags */}
      <div className="mb-3 sm:mb-4 mobile-mb-4">
        <div className="flex flex-wrap gap-1 mobile-gap-2">
          {template.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs bg-white/10 rounded-full text-white/70 mobile-text-xs"
            >
              #{tag}
            </span>
          ))}
          {template.tags.length > 3 && (
            <span className="px-2 py-1 text-xs bg-white/10 rounded-full text-white/70 mobile-text-xs">
              +{template.tags.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4 text-xs mobile-grid-1 mobile-mb-4">
        <div>
          <div className="text-white/60 mobile-text-xs">Ends in</div>
          <div className="font-semibold mobile-text-sm">{template.daysUntilEnd} days</div>
        </div>
        <div>
          <div className="text-white/60 mobile-text-xs">Liquidity</div>
          <div className="font-semibold mobile-text-sm">{formatUSD(template.initialLiquidity)}</div>
        </div>
      </div>

      {/* Select Button */}
      <GlassButton
        onClick={onSelect}
        className="w-full mobile-btn mobile-touch"
        size="sm"
      >
        Use This Template
      </GlassButton>
    </GlassCard>
  );
}
