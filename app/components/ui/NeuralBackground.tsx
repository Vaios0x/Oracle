'use client';

import { useEffect, useRef, useState } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
 vy: number;
  radius: number;
  hue: number;
  energy: number;
  connections: number[];
}

interface Connection {
  from: number;
  to: number;
  strength: number;
  age: number;
}

export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

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

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseenter', handleMouseEnter);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const nodes: Node[] = [];
    const connections: Connection[] = [];
    const nodeCount = 40;

    // Initialize nodes with enhanced properties
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.max(0.5, Math.random() * 3 + 1), // Ensure minimum radius
        hue: Math.random() * 60 + 240, // Purple to green range
        energy: Math.max(0.1, Math.min(1, Math.random() * 0.5 + 0.5)), // Clamp between 0.1 and 1
        connections: []
      });
    }

    const createConnection = (from: number, to: number, strength: number) => {
      connections.push({
        from,
        to,
        strength,
        age: 0
      });
      nodes[from].connections.push(to);
      nodes[to].connections.push(from);
    };

    const removeConnection = (index: number) => {
      const conn = connections[index];
      nodes[conn.from].connections = nodes[conn.from].connections.filter(i => i !== conn.to);
      nodes[conn.to].connections = nodes[conn.to].connections.filter(i => i !== conn.from);
      connections.splice(index, 1);
    };

    const animate = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update nodes with neural behavior
      nodes.forEach((node, i) => {
        // Mouse interaction
        const dx = mousePosition.x - node.x;
        const dy = mousePosition.y - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150 && isHovering) {
          const force = (150 - distance) / 150;
          node.vx += (dx / distance) * force * 0.01;
          node.vy += (dy / distance) * force * 0.01;
        }

        // Neural oscillation with safe energy values
        node.energy = Math.max(0.1, Math.min(1, 0.5 + 0.5 * Math.sin(time * 2 + i * 0.1)));
        node.hue = (240 + Math.sin(time + i * 0.5) * 60) % 360;

        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Boundary behavior with soft bounce
        if (node.x < 0 || node.x > canvas.width) {
          node.vx *= -0.8;
          node.x = Math.max(0, Math.min(canvas.width, node.x));
        }
        if (node.y < 0 || node.y > canvas.height) {
          node.vy *= -0.8;
          node.y = Math.max(0, Math.min(canvas.height, node.y));
        }

        // Friction
        node.vx *= 0.99;
        node.vy *= 0.99;

        // Draw node with enhanced visual
        const safeEnergy = Math.max(0.1, Math.min(1, node.energy));
        const safeRadius = Math.max(0.5, node.radius);
        const radius = safeRadius * safeEnergy;
        
        // Only draw if radius is positive
        if (radius > 0) {
          const gradient = ctx.createRadialGradient(
            node.x, node.y, 0,
            node.x, node.y, safeRadius * 2
          );
          gradient.addColorStop(0, `hsla(${node.hue}, 70%, 60%, ${safeEnergy * 0.8})`);
          gradient.addColorStop(0.5, `hsla(${node.hue}, 70%, 50%, ${safeEnergy * 0.4})`);
          gradient.addColorStop(1, `hsla(${node.hue}, 70%, 40%, 0)`);

          ctx.beginPath();
          ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();

          // Glow effect with safe values
          ctx.shadowColor = `hsla(${node.hue}, 70%, 60%, 0.5)`;
          ctx.shadowBlur = Math.max(0, 10 * safeEnergy);
          ctx.beginPath();
          ctx.arc(node.x, node.y, Math.max(0.1, safeRadius * 0.5), 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${node.hue}, 70%, 80%, ${safeEnergy * 0.6})`;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // Update connections (reduced frequency)
      if (Math.floor(time * 10) % 2 === 0) { // Only update every 0.2 seconds
        connections.forEach((conn, index) => {
          conn.age += 0.01;
          if (conn.age > 3 || conn.strength < 0.1) {
            removeConnection(index);
          }
        });
      }

      // Create new connections based on proximity (reduced frequency)
      if (Math.floor(time * 5) % 3 === 0) { // Only check every 0.6 seconds
        nodes.forEach((node, i) => {
          nodes.slice(i + 1).forEach((otherNode, j) => {
            const dx = node.x - otherNode.x;
            const dy = node.y - otherNode.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100 && Math.random() < 0.01) {
              const strength = (1 - distance / 100) * 0.3;
              createConnection(i, i + j + 1, strength);
            }
          });
        });
      }

      // Draw connections with enhanced visual
      connections.forEach(conn => {
        const fromNode = nodes[conn.from];
        const toNode = nodes[conn.to];
        
        if (!fromNode || !toNode) return;

        const gradient = ctx.createLinearGradient(
          fromNode.x, fromNode.y,
          toNode.x, toNode.y
        );
        
        const hue1 = fromNode.hue;
        const hue2 = toNode.hue;
        const avgHue = (hue1 + hue2) / 2;
        
        gradient.addColorStop(0, `hsla(${hue1}, 70%, 60%, ${conn.strength * 0.3})`);
        gradient.addColorStop(0.5, `hsla(${avgHue}, 70%, 50%, ${conn.strength * 0.2})`);
        gradient.addColorStop(1, `hsla(${hue2}, 70%, 60%, ${conn.strength * 0.3})`);

        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = conn.strength * 2;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Animated connection effect
        const progress = (time * 2) % 1;
        const dashLength = 20;
        const dashGap = 10;
        
        ctx.setLineDash([dashLength, dashGap]);
        ctx.lineDashOffset = -progress * (dashLength + dashGap);
        ctx.strokeStyle = `hsla(${avgHue}, 70%, 70%, ${conn.strength * 0.5})`;
        ctx.lineWidth = conn.strength * 1;
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Add neural field effect
      const fieldGradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
      );
      fieldGradient.addColorStop(0, 'rgba(153, 69, 255, 0.05)');
      fieldGradient.addColorStop(0.5, 'rgba(20, 241, 149, 0.03)');
      fieldGradient.addColorStop(1, 'rgba(255, 107, 107, 0.01)');

      ctx.fillStyle = fieldGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateSize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseenter', handleMouseEnter);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePosition, isHovering]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
