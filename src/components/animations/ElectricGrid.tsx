'use client';

import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  originalX: number;
  originalY: number;
}

interface Pulse {
  fromNodeIdx: number;
  toNodeIdx: number;
  progress: number;
  speed: number;
}

export default function ElectricGrid() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; px: number; py: number; isInside: boolean }>({
    x: -1000,
    y: -1000,
    px: -1000,
    py: -1000,
    isInside: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    let width = 0;
    let height = 0;

    const resize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width;
      canvas.height = height;

      // Re-initialize nodes based on screen size
      initNodes();
    };

    const initNodes = () => {
      nodes = [];
      pulses = [];
      const area = width * height;
      // Calculate node count based on area (roughly 1 node per 35000 square pixels)
      const nodeCount = Math.min(Math.max(Math.floor(area / 35000), 15), 45);

      for (let i = 0; i < nodeCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        nodes.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 2 + 1.5,
          originalX: x,
          originalY: y,
        });
      }
    };

    // Helper function to draw lighting bolts
    const drawLightningBolt = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      displace: number,
      complexity: number
    ) => {
      if (!ctx) return;
      
      const drawSegment = (sx1: number, sy1: number, sx2: number, sy2: number, disp: number) => {
        let dx = sx2 - sx1;
        let dy = sy2 - sy1;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 15) {
          ctx.lineTo(sx2, sy2);
          return;
        }

        // Midpoint displacement
        let midx = (sx1 + sx2) / 2;
        let midy = (sy1 + sy2) / 2;
        
        let nx = -dy / dist;
        let ny = dx / dist;
        
        midx += nx * (Math.random() - 0.5) * disp;
        midy += ny * (Math.random() - 0.5) * disp;

        // Recursive split
        drawSegment(sx1, sy1, midx, midy, disp * 0.65);
        drawSegment(midx, midy, sx2, sy2, disp * 0.65);
      };

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      drawSegment(x1, y1, x2, y2, displace);
      
      // Draw outer glowing beam
      ctx.strokeStyle = 'rgba(255, 69, 0, 0.3)';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Draw middle neon beam
      ctx.strokeStyle = 'rgba(255, 69, 0, 0.8)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw hot core
      ctx.strokeStyle = '#FF4500';
      ctx.lineWidth = 0.8;
      ctx.stroke();
    };

    const spawnPulse = () => {
      if (nodes.length < 2) return;
      
      // Select a random start node
      const fromNodeIdx = Math.floor(Math.random() * nodes.length);
      const fromNode = nodes[fromNodeIdx];
      
      // Find a close node to pulse to
      let candidates: { idx: number; dist: number }[] = [];
      nodes.forEach((node, idx) => {
        if (idx === fromNodeIdx) return;
        const dx = node.x - fromNode.x;
        const dy = node.y - fromNode.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 220) {
          candidates.push({ idx, dist });
        }
      });

      if (candidates.length > 0) {
        // Choose one candidate
        const toNodeIdx = candidates[Math.floor(Math.random() * candidates.length)].idx;
        pulses.push({
          fromNodeIdx,
          toNodeIdx,
          progress: 0,
          speed: Math.random() * 0.02 + 0.015,
        });
      }
    };

    const update = () => {
      // 1. Update node positions
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        // Boundary collision
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Soft drift back to original coordinate reference to avoid clustering
        const dx = node.originalX - node.x;
        const dy = node.originalY - node.y;
        node.vx += dx * 0.0001;
        node.vy += dy * 0.0001;
      });

      // 2. Spawn pulses occasionally
      if (Math.random() < 0.04 && pulses.length < 8) {
        spawnPulse();
      }

      // 3. Update pulses
      pulses = pulses.filter((p) => {
        p.progress += p.speed;
        return p.progress < 1;
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw transmission network lines
      ctx.beginPath();
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 180) {
            const alpha = (1 - dist / 180) * 0.08;
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = `rgba(255, 69, 0, ${alpha})`;
            ctx.lineWidth = 1;
          }
        }
      }
      ctx.stroke();

      // Draw faint connections grid
      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 69, 0, 0.6)';
        ctx.fill();
        
        // Draw tiny node core
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = '#FF4500';
        ctx.fill();
      });

      // Draw running power pulses
      pulses.forEach((p) => {
        const fromNode = nodes[p.fromNodeIdx];
        const toNode = nodes[p.toNodeIdx];
        if (!fromNode || !toNode) return;

        const px = fromNode.x + (toNode.x - fromNode.x) * p.progress;
        const py = fromNode.y + (toNode.y - fromNode.y) * p.progress;

        // Pulse dot glow
        const glowGrad = ctx.createRadialGradient(px, py, 0, px, py, 6);
        glowGrad.addColorStop(0, '#FF4500');
        glowGrad.addColorStop(0.3, 'rgba(255, 69, 0, 0.8)');
        glowGrad.addColorStop(1, 'rgba(255, 69, 0, 0)');
        
        ctx.beginPath();
        ctx.arc(px, py, 6, 0, Math.PI * 2);
        ctx.fillStyle = glowGrad;
        ctx.fill();

        // Draw micro electric discharge around active pulse
        if (Math.random() < 0.3) {
          const rx = px + (Math.random() - 0.5) * 12;
          const ry = py + (Math.random() - 0.5) * 12;
          drawLightningBolt(px, py, rx, ry, 3, 2);
        }
      });

      // Interactive: discharge lightning bolt to mouse cursor if close
      const mouse = mouseRef.current;
      if (mouse.isInside) {
        // Find nearest nodes to mouse
        const distances = nodes.map((node, idx) => {
          const dx = node.x - mouse.x;
          const dy = node.y - mouse.y;
          return { idx, dist: Math.sqrt(dx * dx + dy * dy) };
        });

        // Sort by distance
        distances.sort((a, b) => a.dist - b.dist);

        // Maximum discharge distance
        const maxDischargeDist = 250;
        const dischargeCount = Math.min(2, nodes.length); // limit to max 2 discharges

        let activeDischarges = 0;
        for (let i = 0; i < dischargeCount; i++) {
          if (distances[i] && distances[i].dist < maxDischargeDist) {
            const targetNode = nodes[distances[i].idx];
            // Animate lightning from node to mouse
            drawLightningBolt(targetNode.x, targetNode.y, mouse.x, mouse.y, 25, 4);
            activeDischarges++;

            // Draw glowing contact ring at mouse
            ctx.beginPath();
            ctx.arc(mouse.x, mouse.y, Math.random() * 4 + 2, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 69, 0, 0.8)';
            ctx.shadowBlur = 8;
            ctx.shadowColor = '#F05A00';
            ctx.fill();
            ctx.shadowBlur = 0; // reset
          }
        }
      }
    };

    // Global mouse tracking so we can set pointer-events: none
    const handleMouseMoveGlobal = (e: MouseEvent) => {
      if (!canvas || !containerRef.current) return;
      const rect = canvas.getBoundingClientRect();
      const mouse = mouseRef.current;

      const isInside = (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      );

      mouse.isInside = isInside;
      if (isInside) {
        mouse.px = mouse.x;
        mouse.py = mouse.y;
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
      }
    };

    const handleMouseLeaveGlobal = () => {
      mouseRef.current.isInside = false;
    };

    const renderLoop = () => {
      update();
      draw();
      animationFrameId = requestAnimationFrame(renderLoop);
    };

    // Initialize & Resize
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMoveGlobal);
    document.addEventListener('mouseleave', handleMouseLeaveGlobal);
    renderLoop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMoveGlobal);
      document.removeEventListener('mouseleave', handleMouseLeaveGlobal);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none', // Critical: allow clicks to pass through to elements beneath
        zIndex: 1,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          opacity: 0.85,
        }}
      />
    </div>
  );
}
