'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ReactNode, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { useHydration, useParticlePosition } from '@/hooks/useHydration';

interface GlassButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger' | 'neural' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  neural?: boolean;
  glow?: boolean;
  floating?: boolean;
}

export function GlassButton({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  size = 'md',
  className,
  neural = false,
  glow = false,
  floating = false,
}: GlassButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isHydrated = useHydration();
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-100, 100], [5, -5]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-100, 100], [-5, 5]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current || disabled) return;
    
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
    primary: 'neural-button bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800',
    secondary: 'glass hover:bg-gray-800/30',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700',
    neural: 'neural-button bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900',
    glass: 'glass-enhanced hover:bg-gray-800/30'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      ref={ref}
      whileHover={{ 
        scale: disabled ? 1 : 1.05,
        y: disabled ? 0 : -2
      }}
      whileTap={{ 
        scale: disabled ? 1 : 0.95,
        y: disabled ? 0 : 1
      }}
      onClick={onClick}
      disabled={disabled}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: !disabled ? rotateX : 0,
        rotateY: !disabled ? rotateY : 0,
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
      className={cn(
        'relative rounded-xl font-semibold text-white transition-all duration-300 overflow-hidden',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        neural && 'neural-glow',
        glow && 'neural-glow-effect',
        floating && 'floating',
        isHovered && 'shadow-2xl',
        className
      )}
    >
      {/* Neural Network Overlay */}
      {neural && (
        <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-green-500/20 animate-pulse" />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-shimmer" />
        </div>
      )}

      {/* Floating Particles */}
      {floating && isHydrated && (
        <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
          {[...Array(4)].map((_, i) => {
            const { left, top, duration, delay } = useParticlePosition(i, 4);
            
            return (
              <motion.div
                key={i}
                className="absolute w-0.5 h-0.5 bg-white/30 rounded-full"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                }}
                animate={{
                  y: [0, -10, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: duration * 0.7, // Slightly faster for buttons
                  repeat: Infinity,
                  delay: delay * 0.5, // Shorter delay for buttons
                  ease: "easeInOut"
                }}
              />
            );
          })}
        </div>
      )}

      {/* Enhanced Glass Effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 via-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>

      {/* Interactive Glow */}
      {isHovered && !disabled && (
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            background: variant === 'neural' 
              ? 'linear-gradient(45deg, rgba(153, 69, 255, 0.2), rgba(20, 241, 149, 0.2), rgba(255, 107, 107, 0.2))'
              : 'linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
            filter: 'blur(15px)',
            transform: 'translateZ(-1px)'
          }}
        />
      )}

      {/* Ripple Effect */}
      <motion.div
        className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none"
        initial={{ scale: 0, opacity: 0 }}
        whileTap={{ 
          scale: 1, 
          opacity: [0, 0.3, 0],
          transition: { duration: 0.3 }
        }}
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)'
        }}
      />
    </motion.button>
  );
}
