'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Shield, ShieldAlert, ShieldCheck, Zap, Battery, Settings, Info } from 'lucide-react';

export default function GridSimulator() {
  const [generation, setGeneration] = useState(40); // 0 to 100
  const [load, setLoad] = useState(70); // 0 to 100
  const [stabilizerActive, setStabilizerActive] = useState(false);
  const [batteryCharge, setBatteryCharge] = useState(85); // 0 to 100

  const [frequency, setFrequency] = useState(50.0);
  const [voltage, setVoltage] = useState(22.0); // 22kV nominal grid
  const [gridStatus, setGridStatus] = useState<'stable' | 'unstable' | 'charging'>('unstable');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive layout detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Simulator math loop
  useEffect(() => {
    const netPower = generation - load;
    let targetFreq = 50.0;
    let targetVolt = 22.0;

    if (netPower < 0) {
      if (stabilizerActive && batteryCharge > 0) {
        // Battery supplies missing power, grid remains stable
        targetFreq = 50.0 + (Math.random() - 0.5) * 0.04;
        targetVolt = 22.0 + (Math.random() - 0.5) * 0.08;
        setGridStatus('stable');
      } else {
        // Under-generation causes frequency and voltage drop
        const severity = Math.abs(netPower) / 100;
        targetFreq = 50.0 - severity * 3.5;
        targetVolt = 22.0 - severity * 4.2;
        setGridStatus('unstable');
      }
    } else if (netPower > 0) {
      // Over-generation is stored in the battery
      targetFreq = 50.0 + (Math.random() - 0.5) * 0.03;
      targetVolt = 22.0 + (Math.random() - 0.5) * 0.05;
      setGridStatus('charging');
    } else {
      // Perfect balance
      targetFreq = 50.0 + (Math.random() - 0.5) * 0.01;
      targetVolt = 22.0 + (Math.random() - 0.5) * 0.02;
      setGridStatus('stable');
    }

    // Dampen fluctuations to look realistic
    const interval = setInterval(() => {
      setFrequency((prev) => prev + (targetFreq - prev) * 0.15);
      setVoltage((prev) => prev + (targetVolt - prev) * 0.15);

      // Battery level depletion/charging
      setBatteryCharge((prev) => {
        if (netPower < 0 && stabilizerActive) {
          // Drain battery to stabilize load
          return Math.max(0, prev - 0.15);
        } else if (netPower > 0) {
          // Charge battery with excess power
          return Math.min(100, prev + 0.12);
        }
        return prev;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [generation, load, stabilizerActive, batteryCharge]);

  // Canvas visualizer loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let pulseOffset = 0;
    let animFrame: number;

    const resize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = 200; // Fixed canvas height
      canvas.width = width;
      canvas.height = height;
    };

    const drawLightningSegment = (x1: number, y1: number, x2: number, y2: number, disp: number, color: string) => {
      const drawSub = (sx1: number, sy1: number, sx2: number, sy2: number, d: number) => {
        const dx = sx2 - sx1;
        const dy = sy2 - sy1;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 8) {
          ctx.lineTo(sx2, sy2);
          return;
        }

        let midx = (sx1 + sx2) / 2;
        let midy = (sy1 + sy2) / 2;
        const nx = -dy / dist;
        const ny = dx / dist;

        midx += nx * (Math.random() - 0.5) * d;
        midy += ny * (Math.random() - 0.5) * d;

        drawSub(sx1, sy1, midx, midy, d * 0.6);
        drawSub(midx, midy, sx2, sy2, d * 0.6);
      };

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      drawSub(x1, y1, x2, y2, displaceAmt);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.2;
      ctx.stroke();
    };

    // Calculate dynamic animation values based on netPower
    const netPower = generation - load;
    const displaceAmt = gridStatus === 'unstable' ? 14 : 4;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      pulseOffset += 0.5;

      // Coordinate nodes layout
      const farmX = 40;
      const substationX = width / 2;
      const cityX = width - 40;
      const centerY = height / 2 - 10;
      const bessY = height - 30;

      // Draw Grid transmission lines
      const drawPowerLine = (x1: number, y1: number, x2: number, y2: number, status: typeof gridStatus, reverseFlow = false) => {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 4;
        ctx.stroke();

        // Draw flowing electric energy packets
        const dx = x2 - x1;
        const dy = y2 - y1;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        ctx.lineWidth = 2;
        let lineGrad = ctx.createLinearGradient(x1, y1, x2, y2);
        
        if (status === 'unstable') {
          ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)'; // Red overload
        } else if (status === 'charging') {
          ctx.strokeStyle = 'rgba(34, 197, 94, 0.4)'; // Green excess power
        } else {
          ctx.strokeStyle = 'rgba(240, 90, 0, 0.4)'; // Orange active balance
        }
        ctx.stroke();

        // Running energy packets
        const packetCount = Math.floor(dist / 40);
        for (let i = 0; i < packetCount; i++) {
          let t = ((pulseOffset + i * 40) % dist) / dist;
          if (reverseFlow) t = 1 - t; // Reverse direction of flow
          
          const px = x1 + dx * t;
          const py = y1 + dy * t;

          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          if (status === 'unstable') {
            ctx.fillStyle = '#ef4444';
            // Under load instability: draw warning spark arcs crackling off lines
            if (Math.random() < 0.25) {
              drawLightningSegment(px, py, px + (Math.random() - 0.5) * 20, py + (Math.random() - 0.5) * 20, 6, '#ef4444');
            }
          } else if (status === 'charging') {
            ctx.fillStyle = '#22c55e';
          } else {
            ctx.fillStyle = '#ffaa33';
            if (Math.random() < 0.1) {
              drawLightningSegment(px, py, px + (Math.random() - 0.5) * 12, py + (Math.random() - 0.5) * 12, 3, '#ffaa33');
            }
          }
          ctx.fill();
        }
      };

      // 1. Line: Renewable Farm -> Substation
      drawPowerLine(farmX, centerY, substationX, centerY, gridStatus);

      // 2. Line: Substation -> Industrial City
      drawPowerLine(substationX, centerY, cityX, centerY, gridStatus);

      // 3. Line: BESS Battery Storage -> Substation (Flow depends on charging vs discharging)
      const isStabilizingFlow = (netPower < 0 && stabilizerActive && batteryCharge > 0);
      const isChargingFlow = (netPower > 0 && batteryCharge < 100);
      
      if (isStabilizingFlow || isChargingFlow) {
        // Reverse flow when stabilizing (discharging BESS into substation)
        drawPowerLine(substationX, bessY, substationX, centerY, isChargingFlow ? 'charging' : 'stable', isStabilizingFlow);
      } else {
        // Faint idle battery cable
        ctx.beginPath();
        ctx.moveTo(substationX, bessY);
        ctx.lineTo(substationX, centerY);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Draw Substation Node
      const drawNode = (x: number, y: number, label: string, color: string) => {
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fillStyle = '#07090C';
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = color;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.font = '9px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(label, x, y - 18);
      };

      // Render Nodes with reactive status colors
      const statusColor = gridStatus === 'unstable' ? '#ef4444' : (gridStatus === 'charging' ? '#22c55e' : '#F05A00');
      
      drawNode(farmX, centerY, 'GEN (SOLAR/WIND)', '#22c55e');
      drawNode(substationX, centerY, 'SUBSTATION TRANSFORMER', statusColor);
      drawNode(cityX, centerY, 'GRID LOAD (CITY)', '#3b82f6');
      drawNode(substationX, bessY, `BESS BATTERY (${Math.floor(batteryCharge)}%)`, batteryCharge > 0 ? '#10b981' : '#6b7280');

      // Substation lightning sparks crackling around transformer if unstable
      if (gridStatus === 'unstable') {
        if (Math.random() < 0.2) {
          drawLightningSegment(substationX, centerY, substationX + (Math.random() - 0.5) * 35, centerY + (Math.random() - 0.5) * 35, 10, '#ef4444');
        }
      }

      animFrame = requestAnimationFrame(render);
    };

    resize();
    render();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', resize);
    };
  }, [generation, load, gridStatus, batteryCharge, stabilizerActive]);

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: '32px',
        alignItems: 'stretch',
        width: '100%',
        padding: '32px',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
        background: 'rgba(17, 20, 26, 0.5)',
        backdropFilter: 'var(--blur-glass)',
        boxShadow: 'var(--shadow-glass)',
      }}
    >
      {/* Simulation Controls - 1st Stack */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-primary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Microgrid Lab Console
          </span>
          <h4 style={{ color: 'white', fontSize: '1.6rem', marginTop: '4px', marginBottom: '8px' }}>
            Grid Stability Sandbox
          </h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
            Adjust the generation and load inputs below. When load exceeds generation, grid frequency drops. Toggle the SPS stabilizer to activate battery reserves.
          </p>
        </div>

        {/* Sliders Container */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Generation Slider */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span style={{ color: '#22c55e', fontWeight: 600 }}>Renewable Generation: {generation}%</span>
              <span style={{ color: 'var(--color-text-muted)' }}>Solar/Wind Feed-in</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={generation}
              onChange={(e) => setGeneration(Number(e.target.value))}
              style={{
                width: '100%',
                accentColor: '#22c55e',
                background: 'rgba(255, 255, 255, 0.05)',
                height: '6px',
                borderRadius: '100px',
                cursor: 'pointer',
              }}
            />
          </div>

          {/* Load Slider */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span style={{ color: '#3b82f6', fontWeight: 600 }}>Industrial Grid Load: {load}%</span>
              <span style={{ color: 'var(--color-text-muted)' }}>City Power Draw</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={load}
              onChange={(e) => setLoad(Number(e.target.value))}
              style={{
                width: '100%',
                accentColor: '#3b82f6',
                background: 'rgba(255, 255, 255, 0.05)',
                height: '6px',
                borderRadius: '100px',
                cursor: 'pointer',
              }}
            />
          </div>
        </div>

        {/* BESS Active Toggle Switch */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px',
            borderRadius: 'var(--radius-sm)',
            border: `1px solid ${stabilizerActive ? 'rgba(16, 185, 129, 0.2)' : 'var(--color-border)'}`,
            background: stabilizerActive ? 'rgba(16, 185, 129, 0.05)' : 'rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: stabilizerActive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: stabilizerActive ? '#10b981' : 'var(--color-text-muted)',
                transition: 'all 0.3s',
              }}
            >
              <Battery size={20} />
            </div>
            <div>
              <h5 style={{ color: 'white', fontSize: '0.95rem', margin: 0 }}>SPS Grid Stabilizer</h5>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Automated BESS Reserve Power</span>
            </div>
          </div>

          {/* Toggle Toggle Switch */}
          <button
            onClick={() => setStabilizerActive(!stabilizerActive)}
            style={{
              width: '56px',
              height: '30px',
              borderRadius: '100px',
              backgroundColor: stabilizerActive ? '#10b981' : 'rgba(255, 255, 255, 0.1)',
              padding: '3px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: stabilizerActive ? 'flex-end' : 'flex-start',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
          >
            <motion.div
              layout
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: 'white',
                boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
              }}
            />
          </button>
        </div>
      </div>

      {/* Grid Diagnostics Screen - 2nd Stack */}
      <div
        style={{
          flex: 1.2,
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          justifyContent: 'space-between',
        }}
      >
        {/* Live System Diagnostics Dashboard */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
            background: 'rgba(0, 0, 0, 0.2)',
            border: '1px solid var(--color-border)',
            borderRadius: '12px',
            padding: '16px',
          }}
        >
          {/* Frequency Metrics */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Grid Frequency</span>
            <span style={{ fontSize: '1.25rem', fontFamily: 'monospace', fontWeight: 600, color: frequency < 49.5 ? '#ef4444' : '#fff' }}>
              {frequency.toFixed(2)} Hz
            </span>
          </div>

          {/* Voltage Metrics */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Grid Voltage</span>
            <span style={{ fontSize: '1.25rem', fontFamily: 'monospace', fontWeight: 600, color: voltage < 21.0 ? '#ef4444' : '#fff' }}>
              {voltage.toFixed(1)} kV
            </span>
          </div>

          {/* Power Factor Metrics */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Power Factor</span>
            <span style={{ fontSize: '1.25rem', fontFamily: 'monospace', fontWeight: 600, color: gridStatus === 'unstable' ? '#ef4444' : '#22c55e' }}>
              {gridStatus === 'unstable' ? '0.74 cosφ' : '0.98 cosφ'}
            </span>
          </div>
        </div>

        {/* Grid Canvas Visualization area */}
        <div
          style={{
            position: 'relative',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid var(--color-border)',
            background: '#07090C',
            height: '200px',
          }}
        >
          <canvas
            ref={canvasRef}
            style={{
              display: 'block',
              width: '100%',
              height: '100%',
            }}
          />
        </div>

        {/* Diagnostic Status Indicator Panel */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            borderRadius: 'var(--radius-sm)',
            background: gridStatus === 'unstable' 
              ? 'rgba(239, 68, 68, 0.08)' 
              : (gridStatus === 'charging' ? 'rgba(34, 197, 94, 0.08)' : 'rgba(240, 90, 0, 0.08)'),
            border: `1px solid ${gridStatus === 'unstable' 
              ? 'rgba(239, 68, 68, 0.2)' 
              : (gridStatus === 'charging' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(240, 90, 0, 0.2)')}`,
            color: gridStatus === 'unstable' 
              ? '#ef4444' 
              : (gridStatus === 'charging' ? '#22c55e' : '#ffaa33'),
            fontSize: '0.85rem',
            fontWeight: 600,
          }}
        >
          {gridStatus === 'unstable' ? (
            <>
              <ShieldAlert size={18} />
              <span>⚠️ CRITICAL INSTABILITY: LOAD OVERLOAD DETECTED. ENERGIZE SPS STABILIZER.</span>
            </>
          ) : gridStatus === 'charging' ? (
            <>
              <ShieldCheck size={18} />
              <span>✅ STABLE: GENERATION SURPLUS CHARGING THE BESS BATTERY CELLS.</span>
            </>
          ) : (
            <>
              <ShieldCheck size={18} />
              <span>✅ SYSTEM STABILIZED: RESERVE BESS ACTIVE AND BALANCING NETWORK LOAD.</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
