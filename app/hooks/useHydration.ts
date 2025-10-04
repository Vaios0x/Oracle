'use client';

import { useEffect, useState } from 'react';

/**
 * Hook para manejar la hidratación de manera segura
 * Evita errores de hidratación al detectar cuando el componente está hidratado
 */
export function useHydration() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated;
}

/**
 * Hook para generar valores determinísticos basados en un seed
 * Útil para evitar diferencias entre servidor y cliente
 */
export function useDeterministicValue(seed: number, range: [number, number] = [0, 1]) {
  const [min, max] = range;
  const value = (Math.sin(seed) * 0.5 + 0.5) * (max - min) + min;
  return value;
}

/**
 * Hook para generar posiciones determinísticas de partículas
 */
export function useParticlePosition(index: number, total: number) {
  const seed = index * 0.618; // Golden ratio for better distribution
  const left = (Math.sin(seed) * 0.5 + 0.5) * 100;
  const top = (Math.cos(seed) * 0.5 + 0.5) * 100;
  const duration = 3 + (Math.sin(seed * 2) * 0.5 + 0.5) * 2;
  const delay = (Math.cos(seed * 3) * 0.5 + 0.5) * 2;
  
  return { left, top, duration, delay };
}
