'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';

const FRAME_COUNT = 64;
const framePath = (i: number) => `/scroll-sequence/frame-${String(i + 1).padStart(3, '0')}.webp`;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const rangeT = (p: number, start: number, end: number) => clamp01((p - start) / (end - start));

export default function ScrollVideoHero() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const headlineRef = useRef<HTMLDivElement | null>(null);
  const closingRef = useRef<HTMLDivElement | null>(null);
  const scrollHintRef = useRef<HTMLDivElement | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    const ctx = canvas?.getContext('2d');
    if (!canvas || !img || !ctx || !img.complete || img.naturalWidth === 0) return;

    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.naturalWidth / img.naturalHeight;
    let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;
    if (imgRatio > canvasRatio) {
      sw = img.naturalHeight * canvasRatio;
      sx = (img.naturalWidth - sw) / 2;
    } else {
      sh = img.naturalWidth / canvasRatio;
      sy = (img.naturalHeight - sh) / 2;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
  };

  // Apply every scroll-driven visual (frame + text overlays) imperatively from
  // one source of truth. Avoids composing multiple derived motion values for
  // the overlay opacity/position, which proved unreliable to keep in sync.
  const applyProgress = (progress: number) => {
    const idx = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(progress * (FRAME_COUNT - 1))));
    if (idx !== currentFrameRef.current) {
      currentFrameRef.current = idx;
      drawFrame(idx);
    }

    const headlineT = rangeT(progress, 0.04, 0.2);
    if (headlineRef.current) {
      headlineRef.current.style.opacity = String(1 - headlineT);
      headlineRef.current.style.transform = `translateY(${-50 * headlineT}px)`;
    }

    const closingT = rangeT(progress, 0.78, 0.92);
    if (closingRef.current) {
      closingRef.current.style.opacity = String(closingT);
      closingRef.current.style.transform = `translateY(${40 * (1 - closingT)}px)`;
    }

    const hintT = rangeT(progress, 0, 0.06);
    if (scrollHintRef.current) {
      scrollHintRef.current.style.opacity = String(1 - hintT);
    }
  };

  useMotionValueEvent(scrollYProgress, 'change', applyProgress);

  // Preload the frame sequence
  useEffect(() => {
    let cancelled = false;
    let loadedCount = 0;
    const imgs: HTMLImageElement[] = [];

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = framePath(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT && !cancelled) {
          setImagesLoaded(true);
        }
      };
      imgs.push(img);
    }
    imagesRef.current = imgs;

    return () => {
      cancelled = true;
    };
  }, []);

  // Size the canvas to the viewport, redraw on resize, and set the initial
  // overlay state as soon as frames are ready (before any scroll happens).
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      drawFrame(currentFrameRef.current);
    };

    resize();
    applyProgress(scrollYProgress.get());
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagesLoaded]);

  return (
    <section ref={containerRef} style={{ position: 'relative', height: '360vh' }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          background: 'var(--color-navy)',
        }}
      >
        <canvas
          ref={canvasRef}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
        />

        {/* Legibility gradient over the frame sequence */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(15,23,42,0.6) 0%, rgba(15,23,42,0.15) 32%, rgba(15,23,42,0.1) 62%, rgba(15,23,42,0.7) 100%)',
            pointerEvents: 'none',
          }}
        />

        {!imagesLoaded && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(255,255,255,0.55)',
              fontSize: '0.8rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              zIndex: 3,
            }}
          >
            Loading
          </div>
        )}

        <div
          className="container relative z-10"
          style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        >
          <div ref={headlineRef} style={{ opacity: 1, maxWidth: 800 }}>
            <span
              style={{
                display: 'inline-block',
                padding: '8px 16px',
                background: 'rgba(226, 90, 0, 0.15)',
                border: '1px solid rgba(226, 90, 0, 0.35)',
                borderRadius: '100px',
                color: '#FF9143',
                fontWeight: 600,
                marginBottom: '24px',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                fontSize: '0.85rem',
              }}
            >
              Empowering Excellence Since 2009
            </span>

            <h1 style={{ fontSize: 'clamp(2.75rem, 5.5vw, 5.5rem)', marginBottom: '24px', lineHeight: 1.05, color: '#fff' }}>
              Architecting the Future of <span style={{ color: 'var(--color-primary)' }}>Power Infrastructure</span>
            </h1>

            <p style={{ fontSize: 'clamp(1.05rem, 1.6vw, 1.3rem)', marginBottom: '40px', maxWidth: 620, color: 'rgba(255,255,255,0.7)' }}>
              Delivering premium high voltage engineering solutions, testing and commissioning, and comprehensive power system studies.
            </p>

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn-primary">
                Start Your Project <ArrowRight size={20} />
              </Link>
              <Link
                href="/projects"
                className="btn-secondary"
                style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#fff' }}
              >
                View Our Portfolio
              </Link>
            </div>
          </div>

          <div
            ref={closingRef}
            style={{
              opacity: 0,
              position: 'absolute',
              bottom: '13%',
              maxWidth: 640,
            }}
          >
            <h2 style={{ fontSize: 'clamp(2rem, 3.6vw, 3.25rem)', color: '#fff', marginBottom: '16px' }}>
              Engineered. Tested. <span style={{ color: 'var(--color-primary)' }}>Commissioned.</span>
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', maxWidth: 520 }}>
              Every layer of critical power infrastructure — switchgear to SCADA — built and verified to keep mission-critical facilities online.
            </p>
          </div>
        </div>

        <div
          ref={scrollHintRef}
          style={{
            opacity: 1,
            position: 'absolute',
            bottom: '32px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
            color: 'rgba(255,255,255,0.55)',
          }}
        >
          <span style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}>
            <ChevronDown size={18} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
