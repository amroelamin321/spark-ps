'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  decay: number;
  angle: number;
  speed: number;
}

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sparksRef = useRef<Spark[]>([]);
  const requestRef = useRef<number | null>(null);
  
  // Track mouse coordinates for spark generation
  const mouseCoords = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // 1. Particle Canvas Initialization
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 2. Mouse Listeners
    const updateMousePosition = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setMousePosition({ x: clientX, y: clientY });
      mouseCoords.current = { x: clientX, y: clientY };
      if (!isVisible) setIsVisible(true);

      // Spawn very subtle trail sparks when hovering interactive items
      if (isHovering && Math.random() < 0.25) {
        spawnSpark(clientX, clientY, 1, 'trail');
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('interactive')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Click triggers active lightning sparks burst
    const handleClick = (e: MouseEvent) => {
      spawnSpark(e.clientX, e.clientY, 12, 'click');
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('click', handleClick);

    // 3. Animation loop for particles
    const spawnSpark = (x: number, y: number, count: number, type: 'click' | 'trail') => {
      const newSparks = [...sparksRef.current];
      const colors = ['rgba(240, 90, 0, 0.8)', 'rgba(255, 123, 41, 0.9)', '#ffffff'];

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = type === 'click' ? Math.random() * 5 + 3 : Math.random() * 1.5 + 0.5;
        const size = type === 'click' ? Math.random() * 10 + 5 : Math.random() * 5 + 2;

        newSparks.push({
          x,
          y,
          vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 2,
          vy: Math.sin(angle) * speed + (Math.random() - 0.5) * 2,
          size,
          alpha: 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          decay: type === 'click' ? Math.random() * 0.02 + 0.025 : Math.random() * 0.04 + 0.04,
          angle,
          speed
        });
      }

      sparksRef.current = newSparks.slice(-80); // Cap at 80 particles
    };

    const updateParticles = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const sparks = sparksRef.current;

      sparks.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        
        // Add a bit of gravity/drag to simulate sparks falling/slowing down
        p.vy += 0.08;
        p.vx *= 0.98;
        p.vy *= 0.98;

        p.alpha -= p.decay;

        if (p.alpha <= 0) return;

        // Draw jagged sparks
        ctx.beginPath();
        const length = p.size;
        ctx.moveTo(p.x, p.y);
        
        // Draw a tiny electric crackle line segment
        const tx = p.x - p.vx * 1.5 + (Math.random() - 0.5) * 4;
        const ty = p.y - p.vy * 1.5 + (Math.random() - 0.5) * 4;
        ctx.lineTo(tx, ty);

        ctx.strokeStyle = p.color;
        ctx.lineWidth = p.size * 0.2 * p.alpha;
        ctx.globalAlpha = p.alpha;
        
        // Glow effect
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color;
        ctx.stroke();
      });

      // Clear dead sparks
      sparksRef.current = sparks.filter((p) => p.alpha > 0);
      ctx.shadowBlur = 0; // reset
      ctx.globalAlpha = 1;

      requestRef.current = requestAnimationFrame(updateParticles);
    };

    requestRef.current = requestAnimationFrame(updateParticles);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('click', handleClick);
      
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isVisible, isHovering]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null; // Do not render custom cursor on touch devices
  }

  return (
    <>
      {/* Background overlay canvas for sparks */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 99999,
          mixBlendMode: 'screen',
        }}
      />

      <motion.div
        className="cursor-dot"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          opacity: isVisible ? (isHovering ? 0 : 1) : 0,
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.1 }}
      />
      <motion.div
        className="cursor-outline"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'rgba(240, 90, 0, 0.15)' : 'transparent',
          borderColor: isHovering ? 'rgba(240, 90, 0, 0)' : 'rgba(240, 90, 0, 0.5)',
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.15 }}
      />
    </>
  );
}
