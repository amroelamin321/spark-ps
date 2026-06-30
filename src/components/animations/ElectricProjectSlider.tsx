'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, MapPin, CheckCircle2, ChevronLeft, ChevronRight, Activity, Cpu } from 'lucide-react';
import Oscilloscope from './Oscilloscope';

interface Project {
  id: number;
  title: string;
  category: string;
  location: string;
  image: string;
  description: string;
  scope: string[];
}

interface ElectricProjectSliderProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export default function ElectricProjectSlider({
  projects,
  onSelectProject,
}: ElectricProjectSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const imageCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const navCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Trigger zapping wipe transition on slide change
  useEffect(() => {
    if (activeIndex === prevIndex) return;
    setIsTransitioning(true);

    const canvas = imageCanvasRef.current;
    if (!canvas) {
      setPrevIndex(activeIndex);
      setIsTransitioning(false);
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setPrevIndex(activeIndex);
      setIsTransitioning(false);
      return;
    }

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    let progress = 0;
    let animationFrameId: number;

    const drawLightningWipe = (x1: number, y1: number, x2: number, y2: number, displace: number) => {
      if (!ctx) return;

      const drawSub = (sx1: number, sy1: number, sx2: number, sy2: number, disp: number) => {
        const dx = sx2 - sx1;
        const dy = sy2 - sy1;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 12) {
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
      ctx.strokeStyle = 'rgba(240, 90, 0, 0.3)';
      ctx.lineWidth = 6;
      ctx.stroke();

      // Inner beam
      ctx.strokeStyle = 'rgba(255, 123, 41, 0.8)';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Core
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 0.8;
      ctx.stroke();
    };

    const animateSweep = () => {
      ctx.clearRect(0, 0, width, height);

      // We animate a vertical lightning bolt sweeping from left to right
      progress += 0.04;
      const x = progress * width;

      // Draw vertical lightning bolt sweep
      drawLightningWipe(x, 0, x, height, 12);

      // Draw secondary crackle discharges shooting off horizontally
      if (Math.random() < 0.3) {
        const branchY = Math.random() * height;
        const branchLength = (Math.random() - 0.5) * 80;
        drawLightningWipe(x, branchY, x + branchLength, branchY + (Math.random() - 0.5) * 40, 6);
      }

      if (progress < 1.05) {
        animationFrameId = requestAnimationFrame(animateSweep);
      } else {
        ctx.clearRect(0, 0, width, height);
        setIsTransitioning(false);
        setPrevIndex(activeIndex);
      }
    };

    animateSweep();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeIndex, prevIndex]);

  // Navigate & draw electric pulse along nav track
  const handleNav = (index: number) => {
    if (isTransitioning || index === activeIndex) return;
    setActiveIndex(index);

    // Animate energy pulse traveling on nav canvas
    const canvas = navCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    const nodeCount = projects.length;
    const padding = 30;
    const step = (width - padding * 2) / (nodeCount - 1);

    const xStart = padding + prevIndex * step;
    const xEnd = padding + index * step;
    
    let progress = 0;
    let animFrame: number;

    const drawPulse = () => {
      ctx.clearRect(0, 0, width, height);
      
      progress += 0.05;
      const currentX = xStart + (xEnd - xStart) * progress;

      // Draw traveling electric spark pulse
      ctx.beginPath();
      ctx.moveTo(xStart, height / 2);
      
      // Jagged current segment
      const drawCurrent = (sx1: number, sy1: number, sx2: number, sy2: number) => {
        let dx = sx2 - sx1;
        let dy = sy2 - sy1;
        let dist = Math.sqrt(dx * dx + dy * dy);
        let steps = Math.floor(dist / 8);
        if (steps < 2) steps = 2;
        
        ctx.beginPath();
        ctx.moveTo(sx1, sy1);
        for(let i=1; i<=steps; i++) {
          let t = i / steps;
          let tx = sx1 + dx * t;
          let ty = sy1 + dy * t;
          if (i < steps) {
            ty += (Math.random() - 0.5) * 5;
          }
          ctx.lineTo(tx, ty);
        }
        ctx.strokeStyle = 'rgba(255, 123, 41, 0.7)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      };

      drawCurrent(xStart, height / 2, currentX, height / 2);

      // Spark core glow
      ctx.beginPath();
      ctx.arc(currentX, height / 2, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#F05A00';
      ctx.fill();
      ctx.shadowBlur = 0;

      if (progress < 1) {
        animFrame = requestAnimationFrame(drawPulse);
      } else {
        ctx.clearRect(0, 0, width, height);
      }
    };

    drawPulse();
  };

  const currentProject = projects[activeIndex];

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
        width: '100%',
        marginTop: '40px',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1.2fr))',
          gap: '48px',
          alignItems: 'stretch',
        }}
      >
        {/* Project Details Panel */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            justifyContent: 'space-between',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
            >
              {/* Category & Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.85rem',
                    color: 'var(--color-primary)',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  <Tag size={14} />
                  {currentProject.category}
                </span>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.85rem',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  <MapPin size={14} />
                  {currentProject.location}
                </span>
              </div>

              {/* Title with Glowing Electric Accents */}
              <h3
                style={{
                  fontSize: 'clamp(2rem, 3.5vw, 2.6rem)',
                  lineHeight: 1.1,
                  color: 'var(--color-text-main)',
                }}
              >
                {currentProject.title}
              </h3>

              <p style={{ fontSize: '1.05rem', lineHeight: 1.7 }}>{currentProject.description}</p>

              {/* Scope Checklist with custom validation fade-in */}
              <div>
                <h5
                  style={{
                    color: 'var(--color-text-main)',
                    fontSize: '1rem',
                    marginBottom: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <Cpu size={16} color="var(--color-primary)" />
                  Validation Checklist
                </h5>
                <ul
                  style={{
                    listStyle: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    padding: 0,
                  }}
                >
                  {currentProject.scope.map((item, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 + 0.2 }}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        color: 'var(--color-text-muted)',
                        fontSize: '0.95rem',
                      }}
                    >
                      <CheckCircle2
                        size={16}
                        color="var(--color-primary)"
                        style={{ marginTop: '3px', flexShrink: 0 }}
                      />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* AC Diagnostics Waveform Panel */}
          <div style={{ marginTop: '12px' }}>
            <Oscilloscope />
          </div>
        </div>

        {/* Cinematic Slide Image Panel */}
        <div
          style={{
            position: 'relative',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            aspectRatio: '4/3',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-glass)',
          }}
        >
          {/* Active Image element (crossfades via framer-motion) */}
          <AnimatePresence mode="wait">
            <motion.img
              key={activeIndex}
              src={currentProject.image}
              alt={currentProject.title}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                position: 'absolute',
                inset: 0,
              }}
            />
          </AnimatePresence>

          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0, 0, 0, 0.05), transparent)',
              pointerEvents: 'none',
            }}
          />

          {/* Lightning wipe canvas overlay */}
          <canvas
            ref={imageCanvasRef}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              mixBlendMode: 'multiply',
              zIndex: 3,
            }}
          />

          {/* Control Overlays (Previous/Next Zappers) */}
          <div
            style={{
              position: 'absolute',
              bottom: '24px',
              right: '24px',
              display: 'flex',
              gap: '12px',
              zIndex: 4,
            }}
          >
            <button
              onClick={() => handleNav((activeIndex - 1 + projects.length) % projects.length)}
              disabled={isTransitioning}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'var(--color-bg-elevated)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text-main)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s',
                opacity: isTransitioning ? 0.4 : 1,
              }}
              className="interactive"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => handleNav((activeIndex + 1) % projects.length)}
              disabled={isTransitioning}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'var(--color-bg-elevated)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text-main)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s',
                opacity: isTransitioning ? 0.4 : 1,
              }}
              className="interactive"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Open Details Button overlay */}
          <button
            onClick={() => onSelectProject(currentProject)}
            style={{
              position: 'absolute',
              left: '24px',
              bottom: '24px',
              padding: '12px 20px',
              borderRadius: '100px',
              background: 'linear-gradient(135deg, rgba(255, 69, 0, 0.9) 0%, rgba(255, 69, 0, 1) 100%)',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              color: 'white',
              fontSize: '0.85rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              zIndex: 4,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 15px rgba(255, 69, 0, 0.4)',
            }}
            className="interactive"
          >
            <Activity size={14} />
            Diagnostics console
          </button>
        </div>
      </div>

      {/* Substation Navigation Grid Map (Pagination Console) */}
      <div
        style={{
          position: 'relative',
          height: '60px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          background: 'var(--color-bg-elevated)',
          border: '1px solid var(--color-border)',
          borderRadius: '12px',
          padding: '0 24px',
        }}
      >
        {/* Navigation Grid Wire */}
        <div
          style={{
            position: 'absolute',
            left: '30px',
            right: '30px',
            height: '1px',
            background: 'rgba(255, 69, 0, 0.05)',
            zIndex: 1,
          }}
        />

        {/* Nav Canvas overlay for current transmission pulse */}
        <canvas
          ref={navCanvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 2,
            mixBlendMode: 'multiply',
          }}
        />

        {/* Interactive Substation Node buttons */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            position: 'relative',
            zIndex: 3,
          }}
        >
          {projects.map((proj, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={proj.id}
                onClick={() => handleNav(idx)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '6px',
                }}
              >
                {/* Node visual */}
                <div
                  style={{
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    background: isActive ? 'var(--color-primary)' : 'var(--color-bg-elevated)',
                    border: `2px solid ${isActive ? 'var(--color-primary)' : 'rgba(0, 0, 0, 0.1)'}`,
                    boxShadow: isActive ? '0 0 10px var(--color-primary-glow)' : 'none',
                    transition: 'all 0.3s',
                  }}
                />
                
                {/* Node micro label */}
                <span
                  style={{
                    fontSize: '0.65rem',
                    fontFamily: 'monospace',
                    color: isActive ? 'var(--color-text-main)' : 'var(--color-text-muted)',
                    letterSpacing: '0.05em',
                    transition: 'all 0.3s',
                    textTransform: 'uppercase',
                  }}
                >
                  Node 0{proj.id}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
