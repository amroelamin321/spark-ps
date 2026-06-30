'use client';

import React, { useState, useRef, useEffect } from 'react';

interface ElectricBorderProps {
  children: React.ReactNode;
  className?: string;
  borderRadius?: string;
}

export default function ElectricBorder({
  children,
  className = '',
  borderRadius = '16px',
}: ElectricBorderProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let progress = 0;

    // We add padding around the element so the lightning glows can bleed outwards
    const padding = 12;

    const resize = () => {
      if (!containerRef.current || !canvas) return;
      const rect = containerRef.current.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width + padding * 2;
      canvas.height = height + padding * 2;
    };

    const drawLightningSegment = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      displace: number
    ) => {
      if (!ctx) return;

      const drawSub = (sx1: number, sy1: number, sx2: number, sy2: number, disp: number) => {
        const dx = sx2 - sx1;
        const dy = sy2 - sy1;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 10) {
          ctx.lineTo(sx2, sy2);
          return;
        }

        let midx = (sx1 + sx2) / 2;
        let midy = (sy1 + sy2) / 2;

        const nx = -dy / dist;
        const ny = dx / dist;

        midx += nx * (Math.random() - 0.5) * disp;
        midy += ny * (Math.random() - 0.5) * disp;

        drawSub(sx1, sy1, midx, midy, disp * 0.6);
        drawSub(midx, midy, sx2, sy2, disp * 0.6);
      };

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      drawSub(x1, y1, x2, y2, displace);

      // Glow beam
      ctx.strokeStyle = 'rgba(240, 90, 0, 0.2)';
      ctx.lineWidth = 3.5;
      ctx.stroke();

      // Inner beam
      ctx.strokeStyle = 'rgba(255, 123, 41, 0.7)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Core
      ctx.strokeStyle = '#FF4500';
      ctx.lineWidth = 0.6;
      ctx.stroke();
    };

    // Maps a 0-1 perimeter progress to actual canvas coordinates
    const getCoordinates = (p: number): { x: number; y: number } => {
      // Keep within bounds, offset by padding
      const w = width;
      const h = height;
      const perimeter = w * 2 + h * 2;
      const s = p * perimeter;

      let rx = 0;
      let ry = 0;

      if (s < w) {
        // Top edge (left to right)
        rx = s;
        ry = 0;
      } else if (s < w + h) {
        // Right edge (top to bottom)
        rx = w;
        ry = s - w;
      } else if (s < w * 2 + h) {
        // Bottom edge (right to left)
        rx = w - (s - w - h);
        ry = h;
      } else {
        // Left edge (bottom to top)
        rx = 0;
        ry = h - (s - w * 2 - h);
      }

      return {
        x: rx + padding,
        y: ry + padding,
      };
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isHovered) {
        // 1. Progress current electricity flow
        progress += 0.008; // speed of transmission round-trip
        if (progress > 1) progress = 0;

        // Draw multiple sparks chasing around the border
        const activeBolts = 2;
        const boltLength = 0.15; // 15% of perimeter

        for (let b = 0; b < activeBolts; b++) {
          const startProgress = (progress + (b * 0.5)) % 1;
          const endProgress = (startProgress + boltLength) % 1;

          const steps = 6;
          let prevPt = getCoordinates(startProgress);

          for (let s = 1; s <= steps; s++) {
            const stepProgress = (startProgress + (boltLength * (s / steps))) % 1;
            const currPt = getCoordinates(stepProgress);

            // Draw jagged arc between points
            drawLightningSegment(prevPt.x, prevPt.y, currPt.x, currPt.y, 4);
            prevPt = currPt;
          }

          // Trigger minor branching sparks discharging outwards
          if (Math.random() < 0.12) {
            const dischargePoint = getCoordinates((startProgress + Math.random() * boltLength) % 1);
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.random() * 15 + 10;
            const tx = dischargePoint.x + Math.cos(angle) * dist;
            const ty = dischargePoint.y + Math.sin(angle) * dist;
            drawLightningSegment(dischargePoint.x, dischargePoint.y, tx, ty, 3);
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    resize();
    render();

    // Resize observer to handle dynamic size changes
    const observer = new ResizeObserver(() => {
      resize();
    });
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [isHovered]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative group ${className}`}
      style={{ borderRadius, display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      {/* Background canvas for electricity arcs */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: '-12px',
          left: '-12px',
          width: 'calc(100% + 24px)',
          height: 'calc(100% + 24px)',
          pointerEvents: 'none',
          zIndex: 10,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />
      {/* Glow border overlay (faint static glow on normal, brighter on hover) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius,
          border: '1px solid var(--color-primary)',
          boxShadow: isHovered 
            ? '0 0 15px rgba(240, 90, 0, 0.25), inset 0 0 10px rgba(240, 90, 0, 0.15)' 
            : '0 0 0px transparent',
          opacity: isHovered ? 0.8 : 0,
          pointerEvents: 'none',
          transition: 'all 0.4s ease',
          zIndex: 2,
        }}
      />
      {/* Content wrapper */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>{children}</div>
    </div>
  );
}
