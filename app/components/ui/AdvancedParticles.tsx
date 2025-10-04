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
  type: 'neural' | 'glass' | 'holographic';
}

interface AdvancedParticlesProps {
  count?: number;
  type?: 'neural' | 'glass' | 'holographic' | 'mixed';
  intensity?: 'low' | 'medium' | 'high';
  interactive?: boolean;
  className?: string;
}

export function AdvancedParticles({ 
  count = 40, 
  type = 'neural',
  intensity = 'medium',
  interactive = true,
  className = ''
}: AdvancedParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const intensitySettings = {
    low: { speed: 0.2, size: 1, opacity: 0.2, blur: 2 },
    medium: { speed: 0.4, size: 2, opacity: 0.4, blur: 1 },
    high: { speed: 0.6, size: 3, opacity: 0.6, blur: 0.5 }
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

    // Initialize particles based on type
    for (let i = 0; i < count; i++) {
      const particleType = type === 'mixed' 
        ? ['neural', 'glass', 'holographic'][Math.floor(Math.random() * 3)] as 'neural' | 'glass' | 'holographic'
        : type as 'neural' | 'glass' | 'holographic';

      particles.push({
        id: i,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * settings.speed,
        vy: (Math.random() - 0.5) * settings.speed,
        size: Math.max(0.5, Math.random() * settings.size + 0.5), // Ensure minimum size
        hue: getHueForType(particleType),
        energy: Math.max(0.1, Math.min(1, Math.random() * 0.5 + 0.5)), // Clamp between 0.1 and 1
        life: Math.random() * 100,
        maxLife: 100,
        type: particleType
      });
    }

    function getHueForType(particleType: 'neural' | 'glass' | 'holographic'): number {
      switch (particleType) {
        case 'neural': return Math.random() * 60 + 240; // Purple to green
        case 'glass': return Math.random() * 30 + 200; // Blue to purple
        case 'holographic': return Math.random() * 120 + 300; // Pink to cyan
        default: return Math.random() * 360;
      }
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
          
          if (distance < 200) {
            const force = (200 - distance) / 200;
            particle.vx += (dx / distance) * force * 0.015;
            particle.vy += (dy / distance) * force * 0.015;
          }
        }

        // Type-specific behavior with safe energy values
        switch (particle.type) {
          case 'neural':
            particle.energy = Math.max(0.1, Math.min(1, 0.5 + 0.5 * Math.sin(time * 2 + i * 0.1)));
            particle.hue = (240 + Math.sin(time + i * 0.5) * 60) % 360;
            break;
          case 'glass':
            particle.energy = Math.max(0.1, Math.min(1, 0.3 + 0.7 * Math.sin(time * 1.5 + i * 0.15)));
            particle.hue = (200 + Math.sin(time * 0.8 + i * 0.3) * 30) % 360;
            break;
          case 'holographic':
            particle.energy = Math.max(0.1, Math.min(1, 0.4 + 0.6 * Math.sin(time * 3 + i * 0.2)));
            particle.hue = (300 + Math.sin(time * 1.2 + i * 0.4) * 120) % 360;
            break;
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Boundary behavior
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -0.7;
          particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -0.7;
          particle.y = Math.max(0, Math.min(canvas.height, particle.y));
        }

        // Friction
        particle.vx *= 0.98;
        particle.vy *= 0.98;

        // Life cycle
        particle.life -= 0.3;
        if (particle.life <= 0) {
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
          particle.life = particle.maxLife;
          particle.vx = (Math.random() - 0.5) * settings.speed;
          particle.vy = (Math.random() - 0.5) * settings.speed;
        }

        // Draw particle with type-specific visual
        const alpha = (particle.life / particle.maxLife) * settings.opacity * particle.energy;
        
        drawParticle(ctx, particle, alpha, settings.blur);
      });

      // Draw connections
      drawConnections(ctx, particles, settings.opacity);

      // Add field effect
      addFieldEffect(ctx, canvas, time);

      animationFrameId = requestAnimationFrame(animate);
    };

    function drawParticle(ctx: CanvasRenderingContext2D, particle: Particle, alpha: number, blur: number) {
      // Ensure energy is always positive and within reasonable bounds
      const safeEnergy = Math.max(0.1, Math.min(1, particle.energy));
      const safeSize = Math.max(0.5, particle.size);
      
      const gradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, safeSize * 3
      );

      switch (particle.type) {
        case 'neural':
          gradient.addColorStop(0, `hsla(${particle.hue}, 80%, 60%, ${alpha})`);
          gradient.addColorStop(0.5, `hsla(${particle.hue}, 80%, 50%, ${alpha * 0.6})`);
          gradient.addColorStop(1, `hsla(${particle.hue}, 80%, 40%, 0)`);
          break;
        case 'glass':
          gradient.addColorStop(0, `hsla(${particle.hue}, 60%, 70%, ${alpha * 0.8})`);
          gradient.addColorStop(0.5, `hsla(${particle.hue}, 60%, 60%, ${alpha * 0.4})`);
          gradient.addColorStop(1, `hsla(${particle.hue}, 60%, 50%, 0)`);
          break;
        case 'holographic':
          gradient.addColorStop(0, `hsla(${particle.hue}, 90%, 70%, ${alpha})`);
          gradient.addColorStop(0.5, `hsla(${particle.hue}, 90%, 60%, ${alpha * 0.7})`);
          gradient.addColorStop(1, `hsla(${particle.hue}, 90%, 50%, 0)`);
          break;
      }

      // Calculate safe radius
      const radius = safeSize * safeEnergy;
      
      // Only draw if radius is positive
      if (radius > 0) {
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
    }

    function drawConnections(ctx: CanvasRenderingContext2D, particles: Particle[], opacity: number) {
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            const connectionOpacity = (1 - distance / 120) * opacity * 0.3;
            const avgHue = (particle.hue + otherParticle.hue) / 2;
            
            // Main connection
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `hsla(${avgHue}, 70%, 60%, ${connectionOpacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();

            // Animated connection effect
            const progress = (time * 2) % 1;
            const dashLength = 15;
            const dashGap = 8;
            
            ctx.setLineDash([dashLength, dashGap]);
            ctx.lineDashOffset = -progress * (dashLength + dashGap);
            ctx.strokeStyle = `hsla(${avgHue}, 70%, 70%, ${connectionOpacity * 0.6})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
            ctx.setLineDash([]);
          }
        });
      });
    }

    function addFieldEffect(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, time: number) {
      const fieldGradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
      );
      
      switch (type) {
        case 'neural':
          fieldGradient.addColorStop(0, 'rgba(153, 69, 255, 0.03)');
          fieldGradient.addColorStop(0.5, 'rgba(20, 241, 149, 0.02)');
          fieldGradient.addColorStop(1, 'rgba(255, 107, 107, 0.01)');
          break;
        case 'glass':
          fieldGradient.addColorStop(0, 'rgba(100, 200, 255, 0.02)');
          fieldGradient.addColorStop(0.5, 'rgba(150, 100, 255, 0.015)');
          fieldGradient.addColorStop(1, 'rgba(200, 150, 255, 0.01)');
          break;
        case 'holographic':
          fieldGradient.addColorStop(0, 'rgba(255, 0, 150, 0.02)');
          fieldGradient.addColorStop(0.5, 'rgba(0, 255, 255, 0.015)');
          fieldGradient.addColorStop(1, 'rgba(255, 255, 0, 0.01)');
          break;
        case 'mixed':
          fieldGradient.addColorStop(0, 'rgba(153, 69, 255, 0.015)');
          fieldGradient.addColorStop(0.3, 'rgba(100, 200, 255, 0.01)');
          fieldGradient.addColorStop(0.6, 'rgba(255, 0, 150, 0.01)');
          fieldGradient.addColorStop(1, 'rgba(20, 241, 149, 0.005)');
          break;
      }

      ctx.fillStyle = fieldGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

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
  }, [count, type, intensity, interactive, mousePosition, isHovering]);

  return (
    <motion.canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 2 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    />
  );
}
