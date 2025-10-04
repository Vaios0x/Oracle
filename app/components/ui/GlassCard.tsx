'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ReactNode, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { useHydration, useParticlePosition } from '@/hooks/useHydration';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  neural?: boolean;
  floating?: boolean;
  onClick?: () => void;
  variant?: 'default' | 'enhanced' | 'neural' | 'floating';
}

export function GlassCard({ 
  children, 
  className = '', 
  hover = true,
  glow = false,
  neural = false,
  floating = false,
  onClick,
  variant = 'default'
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isHydrated = useHydration();
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
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
    default: 'glass-card',
    enhanced: 'glass-enhanced',
    neural: 'glass-card neural-glow neural-glow-effect',
    floating: 'glass-card floating'
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      whileHover={{ 
        scale: hover ? 1.02 : 1,
        y: hover ? -5 : 0,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: hover ? rotateX : 0,
        rotateY: hover ? rotateY : 0,
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
      className={cn(
        'relative p-6 rounded-2xl transition-all duration-500',
        variants[variant],
        hover && 'glass-hover cursor-pointer',
        glow && 'neural-glow-effect',
        neural && 'neural-glow',
        floating && 'floating',
        isHovered && 'shadow-2xl',
        className
      )}
    >
      {/* Neural Network Overlay */}
      {neural && (
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-green-500/10 animate-pulse" />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 animate-shimmer" />
        </div>
      )}

      {/* Floating Particles */}
      {floating && isHydrated && (
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => {
            const { left, top, duration, delay } = useParticlePosition(i, 6);
            
            return (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  delay,
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
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            background: 'linear-gradient(45deg, rgba(153, 69, 255, 0.1), rgba(20, 241, 149, 0.1), rgba(255, 107, 107, 0.1))',
            filter: 'blur(20px)',
            transform: 'translateZ(-1px)'
          }}
        />
      )}
    </motion.div>
  );
}
