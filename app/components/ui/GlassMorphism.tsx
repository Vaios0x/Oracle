'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ReactNode, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { useHydration, useParticlePosition } from '@/hooks/useHydration';

interface GlassMorphismProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'enhanced' | 'premium' | 'neural';
  intensity?: 'low' | 'medium' | 'high';
  interactive?: boolean;
  floating?: boolean;
  glow?: boolean;
  onClick?: () => void;
}

export function GlassMorphism({
  children,
  className = '',
  variant = 'default',
  intensity = 'medium',
  interactive = true,
  floating = false,
  glow = false,
  onClick
}: GlassMorphismProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isHydrated = useHydration();
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [10, -10]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-10, 10]), { stiffness: 300, damping: 30 });

  const intensitySettings = {
    low: { blur: 'blur(15px)', opacity: 0.1, glow: '0 8px 32px rgba(31, 38, 135, 0.2)' },
    medium: { blur: 'blur(25px)', opacity: 0.15, glow: '0 8px 32px rgba(31, 38, 135, 0.37)' },
    high: { blur: 'blur(35px)', opacity: 0.2, glow: '0 12px 40px rgba(31, 38, 135, 0.5)' }
  };

  const settings = intensitySettings[intensity];

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !interactive) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set(event.clientX - centerX);
    mouseY.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const variants = {
    default: {
      background: `linear-gradient(135deg, rgba(255, 255, 255, ${settings.opacity}) 0%, rgba(255, 255, 255, ${settings.opacity * 0.5}) 50%, rgba(255, 255, 255, ${settings.opacity * 0.2}) 100%)`,
      border: '1px solid rgba(255, 255, 255, 0.18)',
      boxShadow: settings.glow
    },
    enhanced: {
      background: `linear-gradient(135deg, rgba(255, 255, 255, ${settings.opacity * 1.2}) 0%, rgba(255, 255, 255, ${settings.opacity * 0.8}) 50%, rgba(255, 255, 255, ${settings.opacity * 0.3}) 100%)`,
      border: '1px solid rgba(255, 255, 255, 0.25)',
      boxShadow: `${settings.glow}, inset 0 1px 0 rgba(255, 255, 255, 0.1)`
    },
    premium: {
      background: `linear-gradient(135deg, rgba(255, 255, 255, ${settings.opacity * 1.5}) 0%, rgba(255, 255, 255, ${settings.opacity}) 50%, rgba(255, 255, 255, ${settings.opacity * 0.4}) 100%)`,
      border: '1px solid rgba(255, 255, 255, 0.3)',
      boxShadow: `${settings.glow}, 0 2px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.15)`
    },
    neural: {
      background: `linear-gradient(135deg, rgba(153, 69, 255, ${settings.opacity * 0.8}) 0%, rgba(20, 241, 149, ${settings.opacity * 0.6}) 50%, rgba(255, 107, 107, ${settings.opacity * 0.4}) 100%)`,
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: `${settings.glow}, 0 0 20px rgba(153, 69, 255, 0.3), 0 0 40px rgba(20, 241, 149, 0.2)`
    }
  };

  const currentVariant = variants[variant];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
        type: "spring",
        stiffness: 80,
        damping: 20
      }}
      whileHover={{ 
        scale: interactive ? 1.02 : 1,
        y: interactive ? -8 : 0,
        transition: { duration: 0.4, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: interactive ? rotateX : 0,
        rotateY: interactive ? rotateY : 0,
        transformStyle: 'preserve-3d',
        perspective: 1000,
        backdropFilter: settings.blur,
        WebkitBackdropFilter: settings.blur,
        ...currentVariant
      }}
      className={cn(
        'relative rounded-2xl transition-all duration-500 overflow-hidden',
        floating && 'floating',
        glow && 'neural-glow-effect',
        isHovered && 'shadow-2xl',
        className
      )}
    >
      {/* Neural Network Overlay */}
      {variant === 'neural' && (
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-green-500/10 animate-pulse" />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 animate-shimmer" />
        </div>
      )}

      {/* Floating Particles */}
      {floating && isHydrated && (
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => {
            const { left, top, duration, delay } = useParticlePosition(i, 8);
            
            return (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: duration * 1.2, // Slightly longer for glass morphism
                  repeat: Infinity,
                  delay: delay * 1.5, // Longer delay for glass morphism
                  ease: "easeInOut"
                }}
              />
            );
          })}
        </div>
      )}

      {/* Enhanced Glass Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Interactive Glow */}
      {isHovered && interactive && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            background: variant === 'neural' 
              ? 'linear-gradient(45deg, rgba(153, 69, 255, 0.1), rgba(20, 241, 149, 0.1), rgba(255, 107, 107, 0.1))'
              : 'linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
            filter: 'blur(20px)',
            transform: 'translateZ(-1px)'
          }}
        />
      )}

      {/* Ripple Effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none"
        initial={{ scale: 0, opacity: 0 }}
        whileTap={{ 
          scale: 1, 
          opacity: [0, 0.2, 0],
          transition: { duration: 0.4 }
        }}
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)'
        }}
      />
    </motion.div>
  );
}
