'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NeuralBackground } from './NeuralBackground';
import { NeuralParticles } from './NeuralParticles';
import { AdvancedParticles } from './AdvancedParticles';
import { HolographicEffect } from './HolographicEffect';
import { ClientOnly } from './ClientOnly';
import { useHydration } from '@/hooks/useHydration';

interface NeuralOrchestratorProps {
  children: React.ReactNode;
  mode?: 'minimal' | 'standard' | 'intense' | 'custom';
  neuralIntensity?: 'low' | 'medium' | 'high';
  particleCount?: number;
  interactive?: boolean;
  className?: string;
}

export function NeuralOrchestrator({
  children,
  mode = 'standard',
  neuralIntensity = 'medium',
  particleCount = 50,
  interactive = true,
  className = ''
}: NeuralOrchestratorProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const isHydrated = useHydration();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // Simulate loading time for smooth animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => {
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      clearTimeout(timer);
    };
  }, [interactive]);

  const getModeSettings = () => {
    switch (mode) {
      case 'minimal':
        return {
          neuralBackground: false,
          neuralParticles: { count: 15, intensity: 'low' },
          advancedParticles: { count: 8, type: 'neural', intensity: 'low' },
          holographicOverlay: false
        };
      case 'standard':
        return {
          neuralBackground: true,
          neuralParticles: { count: 25, intensity: 'medium' },
          advancedParticles: { count: 15, type: 'mixed', intensity: 'medium' },
          holographicOverlay: false
        };
      case 'intense':
        return {
          neuralBackground: true,
          neuralParticles: { count: 35, intensity: 'high' },
          advancedParticles: { count: 20, type: 'mixed', intensity: 'high' },
          holographicOverlay: true
        };
      case 'custom':
        return {
          neuralBackground: true,
          neuralParticles: { count: particleCount, intensity: neuralIntensity },
          advancedParticles: { count: Math.floor(particleCount * 0.6), type: 'mixed', intensity: neuralIntensity },
          holographicOverlay: neuralIntensity === 'high'
        };
      default:
        return {
          neuralBackground: true,
          neuralParticles: { count: 25, intensity: 'medium' },
          advancedParticles: { count: 15, type: 'mixed', intensity: 'medium' },
          holographicOverlay: false
        };
    }
  };

  const settings = getModeSettings();

  return (
    <div className={`relative min-h-screen overflow-hidden ${className}`}>
      {/* Neural Background System */}
      <ClientOnly>
        <AnimatePresence>
          {isLoaded && settings.neuralBackground && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <NeuralBackground />
            </motion.div>
          )}
        </AnimatePresence>
      </ClientOnly>

      {/* Neural Particles Layer */}
      <ClientOnly>
        <AnimatePresence>
          {isLoaded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, delay: 0.2 }}
            >
              <NeuralParticles
                count={settings.neuralParticles.count}
                intensity={settings.neuralParticles.intensity as 'low' | 'medium' | 'high'}
                interactive={interactive}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </ClientOnly>

      {/* Advanced Particles Layer */}
      <ClientOnly>
        <AnimatePresence>
          {isLoaded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, delay: 0.4 }}
            >
              <AdvancedParticles
                count={settings.advancedParticles.count}
                type={settings.advancedParticles.type as 'neural' | 'glass' | 'holographic' | 'mixed'}
                intensity={settings.advancedParticles.intensity as 'low' | 'medium' | 'high'}
                interactive={interactive}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </ClientOnly>

      {/* Holographic Overlay */}
      <ClientOnly>
        <AnimatePresence>
          {isLoaded && settings.holographicOverlay && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.5, delay: 0.6 }}
              className="fixed inset-0 pointer-events-none"
              style={{ zIndex: 3 }}
            >
              <HolographicEffect
                intensity="medium"
                animated={true}
                interactive={interactive}
                variant="holographic"
              >
                <div className="w-full h-full" />
              </HolographicEffect>
            </motion.div>
          )}
        </AnimatePresence>
      </ClientOnly>

      {/* Mouse Interaction Indicator */}
      <ClientOnly>
        {interactive && isLoaded && (
        <motion.div
          className="fixed pointer-events-none"
          style={{
            left: mousePosition.x - 10,
            top: mousePosition.y - 10,
            zIndex: 1000
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-sm" />
        </motion.div>
        )}
      </ClientOnly>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="relative z-10"
      >
        {children}
      </motion.div>

    </div>
  );
}
