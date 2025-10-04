'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  hue: number;
  energy: number;
  life: number;
  maxLife: number;
}

interface NeuralParticlesProps {
  count?: number;
  intensity?: 'low' | 'medium' | 'high';
  interactive?: boolean;
  className?: string;
}

export function NeuralParticles({ 
  count = 30, 
  intensity = 'medium',
  interactive = true,
  className = ''
}: NeuralParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const intensitySettings = {
    low: { speed: 0.3, size: 1, opacity: 0.3 },
    medium: { speed: 0.5, size: 2, opacity: 0.5 },
    high: { speed: 0.8, size: 3, opacity: 0.7 }
  };

  const settings = intensitySettings[intensity];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    if (interactive) {
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseenter', handleMouseEnter);
      canvas.addEventListener('mouseleave', handleMouseLeave);
    }

    const particles: Particle[] = [];

    // Initialize particles
    for (let i = 0; i < count; i++) {
      particles.push({
        id: i,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * settings.speed,
        vy: (Math.random() - 0.5) * settings.speed,
        size: Math.max(0.5, Math.random() * settings.size + 0.5), // Ensure minimum size
        hue: Math.random() * 60 + 240, // Purple to green range
        energy: Math.max(0.1, Math.min(1, Math.random() * 0.5 + 0.5)), // Clamp between 0.1 and 1
        life: Math.random() * 100,
        maxLife: 100
      });
    }

    const animate = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        // Mouse interaction
        if (interactive && isHovering) {
          const dx = mousePosition.x - particle.x;
          const dy = mousePosition.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            const force = (150 - distance) / 150;
            particle.vx += (dx / distance) * force * 0.01;
            particle.vy += (dy / distance) * force * 0.01;
          }
        }

        // Neural oscillation with safe energy values
        particle.energy = Math.max(0.1, Math.min(1, 0.5 + 0.5 * Math.sin(time * 2 + i * 0.1)));
        particle.hue = (240 + Math.sin(time + i * 0.5) * 60) % 360;

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Boundary behavior
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -0.8;
          particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -0.8;
          particle.y = Math.max(0, Math.min(canvas.height, particle.y));
        }

        // Friction
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Life cycle
        particle.life -= 0.5;
        if (particle.life <= 0) {
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
          particle.life = particle.maxLife;
          particle.vx = (Math.random() - 0.5) * settings.speed;
          particle.vy = (Math.random() - 0.5) * settings.speed;
        }

        // Draw particle with enhanced visual
        const safeEnergy = Math.max(0.1, Math.min(1, particle.energy));
        const safeSize = Math.max(0.5, particle.size);
        const alpha = (particle.life / particle.maxLife) * settings.opacity * safeEnergy;
        
        // Calculate safe radius
        const radius = safeSize * safeEnergy;
        
        // Only draw if radius is positive
        if (radius > 0) {
          // Main particle
          const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, safeSize * 2
          );
          gradient.addColorStop(0, `hsla(${particle.hue}, 70%, 60%, ${alpha})`);
          gradient.addColorStop(0.5, `hsla(${particle.hue}, 70%, 50%, ${alpha * 0.5})`);
          gradient.addColorStop(1, `hsla(${particle.hue}, 70%, 40%, 0)`);

          ctx.beginPath();
          ctx.arc(particle.x, particle.y, radius, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();

          // Glow effect with safe values
          ctx.shadowColor = `hsla(${particle.hue}, 70%, 60%, 0.5)`;
          ctx.shadowBlur = Math.max(0, 8 * safeEnergy);
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, Math.max(0.1, safeSize * 0.3), 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${particle.hue}, 70%, 80%, ${alpha * 0.8})`;
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        // Connection lines
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            const opacity = (1 - distance / 100) * alpha * 0.3;
            const avgHue = (particle.hue + otherParticle.hue) / 2;
            
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `hsla(${avgHue}, 70%, 60%, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();

            // Animated connection effect
            const progress = (time * 3) % 1;
            const dashLength = 10;
            const dashGap = 5;
            
            ctx.setLineDash([dashLength, dashGap]);
            ctx.lineDashOffset = -progress * (dashLength + dashGap);
            ctx.strokeStyle = `hsla(${avgHue}, 70%, 70%, ${opacity * 0.5})`;
            ctx.lineWidth = 0.3;
            ctx.stroke();
            ctx.setLineDash([]);
          }
        });
      });

      // Add neural field effect
      const fieldGradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
      );
      fieldGradient.addColorStop(0, 'rgba(153, 69, 255, 0.02)');
      fieldGradient.addColorStop(0.5, 'rgba(20, 241, 149, 0.01)');
      fieldGradient.addColorStop(1, 'rgba(255, 107, 107, 0.005)');

      ctx.fillStyle = fieldGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateSize);
      if (interactive) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseenter', handleMouseEnter);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [count, intensity, interactive, mousePosition, isHovering]);

  return (
    <motion.canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 1 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  );
}
