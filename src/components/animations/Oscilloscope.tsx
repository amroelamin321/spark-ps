'use client';

import { useEffect, useRef, useState } from 'react';

export default function Oscilloscope() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; isHovering: boolean }>({
    x: 0,
    y: 0,
    isHovering: false,
  });

  const [frequencyLabel, setFrequencyLabel] = useState('50.00 Hz');
  const [voltageLabel, setVoltageLabel] = useState('240.0 V');
  const [thdLabel, setThdLabel] = useState('1.2%');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let time = 0;

    const resize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      width = rect.width;
      height = 70; // Fixed height for visual consistency
      canvas.width = width;
      canvas.height = height;
    };

    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;

      // Draw vertical divisions
      const xDivisions = 12;
      const xStep = width / xDivisions;
      for (let i = 0; i <= xDivisions; i++) {
        ctx.beginPath();
        ctx.moveTo(i * xStep, 0);
        ctx.lineTo(i * xStep, height);
        ctx.stroke();
      }

      // Draw horizontal divisions
      const yDivisions = 4;
      const yStep = height / yDivisions;
      for (let i = 0; i <= yDivisions; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * yStep);
        ctx.lineTo(width, i * yStep);
        ctx.stroke();
      }

      // Draw center reference line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();
    };

    const updateMetrics = (isHovering: boolean, distFactor: number) => {
      if (isHovering) {
        // Distort labels to reflect grid disturbance
        const freqOffset = (Math.random() - 0.5) * 0.8 * distFactor;
        const voltOffset = (Math.random() - 0.5) * 12 * distFactor;
        const thdVal = (1.2 + distFactor * 8.5 + Math.random() * 0.4).toFixed(1);

        setFrequencyLabel(`${(50.0 + freqOffset).toFixed(2)} Hz`);
        setVoltageLabel(`${(240.0 + voltOffset).toFixed(1)} V`);
        setThdLabel(`${thdVal}% THD`);
      } else {
        // Natural micro-fluctuations
        const freqOffset = (Math.random() - 0.5) * 0.02;
        const voltOffset = (Math.random() - 0.5) * 0.3;
        setFrequencyLabel(`${(50.0 + freqOffset).toFixed(2)} Hz`);
        setVoltageLabel(`${(240.0 + voltOffset).toFixed(1)} V`);
        setThdLabel('1.2% THD');
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      drawGrid();

      time += 0.08;

      const mouse = mouseRef.current;
      const centerY = height / 2;
      const baseAmplitude = 18;
      
      // Calculate how close the mouse is to the center of the oscilloscope panel
      let distFactor = 0;
      if (mouse.isHovering) {
        const mouseNormX = mouse.x / width;
        // High distortion when mouse is close, peaking at center
        distFactor = 1 - Math.abs(mouseNormX - 0.5) * 2;
        distFactor = Math.max(0, distFactor);
      }

      updateMetrics(mouse.isHovering, distFactor);

      // Draw the wave
      ctx.beginPath();
      for (let x = 0; x < width; x++) {
        const theta = (x / width) * Math.PI * 6 - time;
        
        // Base sine wave (fundamental frequency)
        let y = Math.sin(theta) * baseAmplitude;

        if (mouse.isHovering && distFactor > 0) {
          // Add 3rd harmonic (triplen harmonics represent transformer distortion)
          y += Math.sin(theta * 3 + time * 0.5) * (baseAmplitude * 0.3 * distFactor);
          // Add 5th harmonic
          y += Math.sin(theta * 5 - time * 0.2) * (baseAmplitude * 0.15 * distFactor);
          
          // Inject random high-frequency transients (switching noise spikes)
          if (Math.random() < 0.03) {
            y += (Math.random() - 0.5) * 20 * distFactor;
          }
        }

        const finalY = centerY + y;
        if (x === 0) {
          ctx.moveTo(x, finalY);
        } else {
          ctx.lineTo(x, finalY);
        }
      }

      // Draw outer glowing line
      ctx.strokeStyle = mouse.isHovering ? 'rgba(255, 123, 41, 0.4)' : 'rgba(240, 90, 0, 0.4)';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Draw inner glowing line
      ctx.strokeStyle = mouse.isHovering ? '#FF7B29' : '#F05A00';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw white hot core
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 0.8;
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    resize();
    render();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const mouse = mouseRef.current;
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.isHovering = true;
  };

  const handleMouseLeave = () => {
    mouseRef.current.isHovering = false;
  };

  const handleMouseEnter = () => {
    mouseRef.current.isHovering = true;
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        width: '100%',
        background: 'rgba(17, 20, 26, 0.4)',
        border: '1px solid var(--color-border)',
        borderRadius: '8px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        userSelect: 'none',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: mouseRef.current.isHovering ? '#FF7B29' : 'var(--color-primary)', animation: 'pulse 1.5s infinite' }} />
          AC Grid Diagnostics
        </span>
        <div style={{ display: 'flex', gap: '12px', fontSize: '0.75rem', fontFamily: 'monospace', color: '#fff' }}>
          <span style={{ color: mouseRef.current.isHovering ? 'var(--color-primary)' : 'var(--color-text-muted)' }}>{frequencyLabel}</span>
          <span style={{ color: 'var(--color-text-muted)' }}>|</span>
          <span>{voltageLabel}</span>
          <span style={{ color: 'var(--color-text-muted)' }}>|</span>
          <span style={{ color: mouseRef.current.isHovering ? '#ff3b30' : 'var(--color-primary)' }}>{thdLabel}</span>
        </div>
      </div>

      <div style={{ position: 'relative', width: '100%', height: '70px', overflow: 'hidden' }}>
        <canvas
          ref={canvasRef}
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            opacity: 0.95,
          }}
        />
      </div>
    </div>
  );
}
