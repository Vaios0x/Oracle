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
    <div className="mb-20">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4">
          <span className="gradient-text">Popular Templates</span>
        </h2>
        <p className="text-white/70 text-lg">
          Get started quickly with these trending prediction markets
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {popularTemplates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <GlassCard hover className="h-full flex flex-col">
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-2 line-clamp-2">
                    {template.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 text-xs font-semibold bg-solana-purple/30 rounded-full">
                      {template.category === 0 ? 'Crypto' : 
                       template.category === 1 ? 'Sports' :
                       template.category === 2 ? 'Politics' :
                       template.category === 3 ? 'Entertainment' :
                       template.category === 4 ? 'Technology' : 'Other'}
                    </span>
                    <span className="text-xs text-white/60">
                      {template.popularity}% popular
                    </span>
                  </div>
                </div>
              </div>

              {/* Question */}
              <div className="mb-4 flex-1">
                <p className="text-white/80 text-sm line-clamp-3">
                  {template.question}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4 text-xs">
                <div>
                  <div className="text-white/60">Ends in</div>
                  <div className="font-semibold">{template.daysUntilEnd} days</div>
                </div>
                <div>
                  <div className="text-white/60">Liquidity</div>
                  <div className="font-semibold">{formatUSD(template.initialLiquidity)}</div>
                </div>
              </div>

              {/* Tags */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {template.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs bg-white/10 rounded-full text-white/70"
                    >
                      #{tag}
                    </span>
                  ))}
                  {template.tags.length > 2 && (
                    <span className="px-2 py-1 text-xs bg-white/10 rounded-full text-white/70">
                      +{template.tags.length - 2}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <Link href="/markets/create">
                <GlassButton className="w-full" size="sm">
                  Create This Market
                </GlassButton>
              </Link>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* View All Templates Button */}
      <div className="text-center mt-8">
        <Link href="/markets/create">
          <GlassButton variant="secondary" size="lg">
            📋 View All Templates
          </GlassButton>
        </Link>
      </div>
    </div>
  );
}
