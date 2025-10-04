'use client';

import { GlassCard } from '@/components/ui/GlassCard';
import { GlassButton } from '@/components/ui/GlassButton';
import { GradientText } from '@/components/ui/GradientText';
import { getPopularTemplates } from '@/lib/data/market-templates';
import { formatUSD } from '@/lib/utils';
import { motion } from 'framer-motion';
import Link from 'next/link';

export function QuickTemplates() {
  const popularTemplates = getPopularTemplates(3);

  return (
    <div className="mb-12 sm:mb-16 md:mb-20 mobile-mb-8">
      <div className="text-center mb-6 sm:mb-8 mobile-mb-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 mobile-h2">
          <span className="gradient-text">Popular Templates</span>
        </h2>
        <p className="text-white/70 text-sm sm:text-base md:text-lg mobile-text-sm">
          Get started quickly with these trending prediction markets
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mobile-grid-1 tablet-grid-2">
        {popularTemplates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <GlassCard hover className="h-full flex flex-col mobile-card">
              {/* Header */}
              <div className="flex justify-between items-start mb-3 sm:mb-4 mobile-mb-4">
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-bold mb-2 line-clamp-2 mobile-h3">
                    {template.name}
                  </h3>
                  <div className="flex items-center gap-2 mobile-gap-2">
                    <span className="px-2 py-1 text-xs font-semibold bg-solana-purple/30 rounded-full mobile-text-xs">
                      {template.category === 0 ? 'Crypto' : 
                       template.category === 1 ? 'Sports' :
                       template.category === 2 ? 'Politics' :
                       template.category === 3 ? 'Entertainment' :
                       template.category === 4 ? 'Technology' : 'Other'}
                    </span>
                    <span className="text-xs text-white/60 mobile-text-xs">
                      {template.popularity}% popular
                    </span>
                  </div>
                </div>
              </div>

              {/* Question */}
              <div className="mb-3 sm:mb-4 flex-1 mobile-mb-4">
                <p className="text-white/80 text-xs sm:text-sm line-clamp-3 mobile-text-xs">
                  {template.question}
                </p>
              </div>

              {/* Stats */}
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

              {/* Tags */}
              <div className="mb-3 sm:mb-4 mobile-mb-4">
                <div className="flex flex-wrap gap-1 mobile-gap-2">
                  {template.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs bg-white/10 rounded-full text-white/70 mobile-text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                  {template.tags.length > 2 && (
                    <span className="px-2 py-1 text-xs bg-white/10 rounded-full text-white/70 mobile-text-xs">
                      +{template.tags.length - 2}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <Link href="/markets/create" className="mobile-full">
                <GlassButton className="w-full mobile-btn mobile-touch" size="sm">
                  Create This Market
                </GlassButton>
              </Link>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* View All Templates Button */}
      <div className="text-center mt-6 sm:mt-8 mobile-mb-6">
        <Link href="/markets/create" className="mobile-full">
          <GlassButton 
            variant="secondary" 
            size="lg" 
            className="mobile-btn mobile-touch"
          >
            📋 View All Templates
          </GlassButton>
        </Link>
      </div>
    </div>
  );
}
