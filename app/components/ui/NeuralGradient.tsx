'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface NeuralGradientProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'neural' | 'cyber' | 'holographic';
  animated?: boolean;
  intensity?: 'low' | 'medium' | 'high';
  direction?: 'horizontal' | 'vertical' | 'diagonal' | 'radial';
}

export function NeuralGradient({
  children,
  className = '',
  variant = 'default',
  animated = true,
  intensity = 'medium',
  direction = 'diagonal'
}: NeuralGradientProps) {
  const intensitySettings = {
    low: { opacity: 0.6, blur: 'blur(2px)' },
    medium: { opacity: 0.8, blur: 'blur(1px)' },
    high: { opacity: 1, blur: 'blur(0px)' }
  };

  const settings = intensitySettings[intensity];

  const getGradientStyle = () => {
    const baseGradient = {
      default: 'linear-gradient(135deg, #9945ff 0%, #14f195 50%, #ff6b6b 100%)',
      neural: 'linear-gradient(135deg, #9945ff 0%, #14f195 25%, #ff6b6b 50%, #9945ff 75%, #14f195 100%)',
      cyber: 'linear-gradient(135deg, #00ffff 0%, #ff00ff 25%, #ffff00 50%, #00ffff 75%, #ff00ff 100%)',
      holographic: 'linear-gradient(135deg, #ff006e 0%, #8338ec 25%, #3a86ff 50%, #06ffa5 75%, #ff006e 100%)'
    };

    const directionMap = {
      horizontal: 'linear-gradient(90deg, ',
      vertical: 'linear-gradient(180deg, ',
      diagonal: 'linear-gradient(135deg, ',
      radial: 'radial-gradient(circle, '
    };

    const gradient = baseGradient[variant];
    const directionPrefix = directionMap[direction];
    
    if (direction === 'radial') {
      return gradient.replace('linear-gradient(135deg, ', 'radial-gradient(circle, ');
    }
    
    return gradient.replace('linear-gradient(135deg, ', directionPrefix);
  };

  const getAnimationStyle = () => {
    if (!animated) return {};
    
    return {
      backgroundSize: '300% 300%',
      animation: 'gradient-shift 3s ease-in-out infinite'
    };
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }}
      className={cn(
        'relative overflow-hidden rounded-lg',
        className
      )}
      style={{
        background: getGradientStyle(),
        ...getAnimationStyle(),
        filter: settings.blur,
        opacity: settings.opacity
      }}
    >
      {/* Animated overlay for enhanced effect */}
      {animated && (
        <motion.div
          className="absolute inset-0 rounded-lg"
          style={{
            background: getGradientStyle(),
            backgroundSize: '400% 400%',
            mixBlendMode: 'overlay',
            opacity: 0.3
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      {/* Shimmer effect */}
      {animated && (
        <motion.div
          className="absolute inset-0 rounded-lg"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            transform: 'translateX(-100%)'
          }}
          animate={{
            transform: ['translateX(-100%)', 'translateX(100%)']
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Neural network pattern overlay */}
      {variant === 'neural' && (
        <div className="absolute inset-0 rounded-lg opacity-20">
          <svg
            width="100%"
            height="100%"
            className="absolute inset-0"
            style={{ filter: 'blur(1px)' }}
          >
            <defs>
              <pattern id="neural-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1" fill="currentColor" opacity="0.3" />
                <line x1="0" y1="20" x2="40" y2="20" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
                <line x1="20" y1="0" x2="20" y2="40" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#neural-pattern)" />
          </svg>
        </div>
      )}

      {/* Cyber grid overlay */}
      {variant === 'cyber' && (
        <div className="absolute inset-0 rounded-lg opacity-30">
          <svg
            width="100%"
            height="100%"
            className="absolute inset-0"
          >
            <defs>
              <pattern id="cyber-grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cyber-grid)" />
          </svg>
        </div>
      )}

      {/* Holographic interference pattern */}
      {variant === 'holographic' && (
        <div className="absolute inset-0 rounded-lg opacity-25">
          <svg
            width="100%"
            height="100%"
            className="absolute inset-0"
            style={{ filter: 'blur(0.5px)' }}
          >
            <defs>
              <pattern id="holographic-pattern" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="15" cy="15" r="0.5" fill="currentColor" opacity="0.6" />
                <path d="M 0 15 Q 15 0 30 15 Q 15 30 0 15" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#holographic-pattern)" />
          </svg>
        </div>
      )}
    </motion.div>
  );
}
