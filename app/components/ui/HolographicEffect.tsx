'use client';

import { motion } from 'framer-motion';
import { ReactNode, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface HolographicEffectProps {
  children: ReactNode;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
  animated?: boolean;
  interactive?: boolean;
  variant?: 'default' | 'cyber' | 'neon' | 'holographic';
}

export function HolographicEffect({
  children,
  className = '',
  intensity = 'medium',
  animated = true,
  interactive = true,
  variant = 'default'
}: HolographicEffectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const intensitySettings = {
    low: { opacity: 0.3, blur: 'blur(2px)', glow: '0 0 20px' },
    medium: { opacity: 0.6, blur: 'blur(1px)', glow: '0 0 30px' },
    high: { opacity: 0.9, blur: 'blur(0px)', glow: '0 0 40px' }
  };

  const settings = intensitySettings[intensity];

  const getVariantStyle = () => {
    switch (variant) {
      case 'cyber':
        return {
          background: 'linear-gradient(45deg, #00ffff, #ff00ff, #ffff00, #00ffff)',
          backgroundSize: '400% 400%',
          filter: `${settings.blur} ${settings.glow} rgba(0, 255, 255, 0.5)`
        };
      case 'neon':
        return {
          background: 'linear-gradient(45deg, #ff006e, #8338ec, #3a86ff, #06ffa5)',
          backgroundSize: '300% 300%',
          filter: `${settings.blur} ${settings.glow} rgba(255, 0, 110, 0.5)`
        };
      case 'holographic':
        return {
          background: 'linear-gradient(45deg, #ff006e, #8338ec, #3a86ff, #06ffa5, #ff006e)',
          backgroundSize: '500% 500%',
          filter: `${settings.blur} ${settings.glow} rgba(131, 56, 236, 0.5)`
        };
      default:
        return {
          background: 'linear-gradient(45deg, #9945ff, #14f195, #ff6b6b, #9945ff)',
          backgroundSize: '300% 300%',
          filter: `${settings.blur} ${settings.glow} rgba(153, 69, 255, 0.5)`
        };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1]
      }}
      whileHover={interactive ? { 
        scale: 1.05,
        y: -5,
        transition: { duration: 0.3 }
      } : {}}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'relative overflow-hidden rounded-lg',
        className
      )}
      style={{
        ...getVariantStyle(),
        opacity: settings.opacity
      }}
    >
      {/* Animated background */}
      {animated && (
        <motion.div
          className="absolute inset-0 rounded-lg"
          style={{
            background: getVariantStyle().background,
            backgroundSize: getVariantStyle().backgroundSize,
            mixBlendMode: 'overlay',
            opacity: 0.4
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
          }}
          transition={{
            duration: 3,
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
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
            transform: 'translateX(-100%)'
          }}
          animate={{
            transform: ['translateX(-100%)', 'translateX(100%)']
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
      )}

      {/* Scan lines effect */}
      {variant === 'cyber' && (
        <div className="absolute inset-0 rounded-lg opacity-30">
          <div className="h-full w-full bg-gradient-to-b from-transparent via-white/10 to-transparent animate-pulse" />
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
              <pattern id="holographic-interference" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="0.5" fill="currentColor" opacity="0.6" />
                <path d="M 0 20 Q 20 0 40 20 Q 20 40 0 20" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.4" />
                <path d="M 20 0 Q 0 20 20 40 Q 40 20 20 0" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#holographic-interference)" />
          </svg>
        </div>
      )}

      {/* Neon glow effect */}
      {variant === 'neon' && (
        <div className="absolute inset-0 rounded-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent" />
        </div>
      )}

      {/* Interactive glow */}
      {isHovered && interactive && (
        <motion.div
          className="absolute inset-0 rounded-lg pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            background: getVariantStyle().background,
            filter: 'blur(15px)',
            transform: 'translateZ(-1px)'
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Ripple effect on interaction */}
      {isHovered && interactive && (
        <motion.div
          className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: [0, 0.3, 0] }}
          transition={{ duration: 0.6 }}
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)'
          }}
        />
      )}
    </motion.div>
  );
}
