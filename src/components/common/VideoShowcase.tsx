'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Pause, Volume2, VolumeX, Maximize, Minimize, 
  Activity, Zap, RefreshCw, Cpu, ShieldAlert 
} from 'lucide-react';
import ElectricBorder from '../animations/ElectricBorder';

export default function VideoShowcase() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Telemetry simulation states for premium engineering look
  const [telemetry, setTelemetry] = useState({
    voltage: '11.04 kV',
    frequency: '50.02 Hz',
    thd: '1.2%',
    activePower: '42.8 MW',
    status: 'OPTIMAL'
  });

  // Periodically update telemetry values for realistic grid dashboard simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry(prev => {
        const volt = (11.0 + Math.random() * 0.1).toFixed(2);
        const freq = (50.0 + (Math.random() - 0.5) * 0.05).toFixed(2);
        const thd = (1.0 + Math.random() * 0.5).toFixed(1);
        const power = (42.0 + Math.random() * 1.5).toFixed(1);
        const statuses = ['OPTIMAL', 'STABLE', 'SYNCHRONIZED'];
        const status = statuses[Math.floor(Math.random() * statuses.length)];
        
        return {
          voltage: `${volt} kV`,
          frequency: `${freq} Hz`,
          thd: `${thd}%`,
          activePower: `${power} MW`,
          status
        };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Format time in seconds to mm:ss
  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return '0:00';
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Toggle Play / Pause
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.error("Video play interrupted:", err);
      });
    }
  };

  // Toggle Mute
  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  // Handle video progress update
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration;
    if (total > 0) {
      setProgress((current / total) * 100);
      setCurrentTime(formatTime(current));
    }
  };

  // Handle when video metadata is loaded
  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(formatTime(videoRef.current.duration));
    setHasLoaded(true);
  };

  // Handle click on progress bar to seek
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = clickX / width;
    
    videoRef.current.currentTime = percentage * videoRef.current.duration;
    setProgress(percentage * 100);
  };

  // Handle Fullscreen Toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if ((containerRef.current as any).webkitRequestFullscreen) {
        (containerRef.current as any).webkitRequestFullscreen();
      } else if ((containerRef.current as any).msRequestFullscreen) {
        (containerRef.current as any).msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  // Listen to fullscreen changes (e.g. if user presses Esc key)
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isCurrentlyFullscreen);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Autoplay handler when component mounts (muted)
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      setIsMuted(true);
      // Wait for user interaction or trigger autoplay
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // Autoplay blocked - normal behavior for modern browsers
          setIsPlaying(false);
        });
      }
    }
  }, []);

  // Auto-hide controls when playing and mouse is idle
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isPlaying && showControls) {
      timeoutId = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
    return () => clearTimeout(timeoutId);
  }, [isPlaying, showControls]);

  const handleMouseMove = () => {
    setShowControls(true);
  };

  return (
    <section className="section" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Decorative blurred background shapes matching electricity theme */}
      <div 
        style={{
          position: 'absolute',
          top: '30%',
          left: '5%',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(240, 90, 0, 0.08) 0%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />
      <div 
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 180, 255, 0.04) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      <div className="container relative z-10">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 56px' }}>
          <span className="breadcrumb" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Activity size={14} className="electric-glow-orange" style={{ color: 'var(--color-primary)' }} />
            SPS in Action
          </span>
          <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', marginBottom: '16px', lineHeight: 1.1 }}>
            HV Engineering & <span className="text-gradient-primary">Commissioning Showcase</span>
          </h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', maxWidth: '650px', margin: '0 auto' }}>
            Step onto the field. Watch our certified engineering team commission substations, operate switchboards, and maintain heavy industry power systems.
          </p>
        </div>

        {/* Video Player Showcase Frame */}
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <ElectricBorder borderRadius="var(--radius-lg)">
            <div 
              ref={containerRef}
              className="glass-panel"
              style={{
                borderRadius: 'var(--radius-lg)',
                border: '1px solid rgba(255,255,255,0.06)',
                overflow: 'hidden',
                background: '#0a0d14',
                position: 'relative',
                aspectRatio: '16/9',
                boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.9)',
                cursor: isPlaying && !showControls ? 'none' : 'default'
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => isPlaying && setShowControls(false)}
            >
              {/* Actual Video Tag */}
              <video
                ref={videoRef}
                src="/sps-showcase.mp4"
                poster="/spark_substation.png"
                loop
                playsInline
                muted={isMuted}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onClick={togglePlay}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  position: 'relative',
                  zIndex: 2
                }}
              />

              {/* Video Overlay Poster Gradient (Only active when NOT playing or hovering controls) */}
              <div 
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to bottom, rgba(7,9,12,0.4) 0%, rgba(7,9,12,0.1) 50%, rgba(7,9,12,0.8) 100%)',
                  pointerEvents: 'none',
                  zIndex: 3,
                  opacity: isPlaying ? 0.4 : 1,
                  transition: 'opacity 0.5s ease'
                }}
              />

              {/* High-Tech Grid Diagnostics HUD overlay (Top Left) */}
              <div className="video-hud-left">
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-primary)', fontWeight: 'bold' }}>
                  <span className="pulse-dot" style={{ width: '6px', height: '6px', backgroundColor: 'var(--color-primary)', borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 8px var(--color-primary)' }} />
                  Live Feed: Substation 03B
                </div>
                <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '4px', marginBottom: '4px' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Voltage:</span>
                  <span style={{ color: '#00e5ff', fontWeight: 600 }}>{telemetry.voltage}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Freq:</span>
                  <span style={{ color: '#00e5ff', fontWeight: 600 }}>{telemetry.frequency}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Power:</span>
                  <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>{telemetry.activePower}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Status:</span>
                  <span style={{ color: '#00ff66', fontWeight: 600 }}>{telemetry.status}</span>
                </div>
              </div>

              {/* High-tech System Health hud overlay (Top Right) */}
              <div className="video-hud-right">
                <Cpu size={14} style={{ color: 'var(--color-primary)' }} />
                <span>REC SPEED: 4K 60FPS</span>
                <span style={{ width: '1px', height: '12px', background: 'rgba(255,255,255,0.2)' }} />
                <span style={{ color: '#00ff66' }}>ONLINE</span>
              </div>


              {/* Pulsing Play Button overlay (Center) */}
              <AnimatePresence>
                {!isPlaying && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={togglePlay}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      zIndex: 5,
                      width: '84px',
                      height: '84px',
                      borderRadius: '50%',
                      background: 'rgba(240, 90, 0, 0.9)',
                      border: '1px solid rgba(255,255,255,0.3)',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 0 40px rgba(240, 90, 0, 0.6), inset 0 0 15px rgba(255, 255, 255, 0.3)',
                    }}
                    whileHover={{ 
                      scale: 1.1, 
                      backgroundColor: '#ff6c12',
                      boxShadow: '0 0 50px rgba(240, 90, 0, 0.8), inset 0 0 20px rgba(255, 255, 255, 0.4)'
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Glowing outer wave animation */}
                    <div 
                      className="absolute inset-0 rounded-full animate-ping"
                      style={{
                        position: 'absolute',
                        inset: '-12px',
                        borderRadius: '50%',
                        border: '2px solid var(--color-primary)',
                        opacity: 0.4,
                        animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
                        pointerEvents: 'none'
                      }}
                    />
                    <Play size={32} fill="white" style={{ marginLeft: '4px' }} />
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Mute indicator Overlay (Short flash when changing volume via hover or toggle) */}
              <AnimatePresence>
                {isMuted && isPlaying && !showControls && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={{
                      position: 'absolute',
                      bottom: '32px',
                      right: '32px',
                      zIndex: 4,
                      background: 'rgba(7, 9, 12, 0.8)',
                      backdropFilter: 'blur(8px)',
                      padding: '8px 16px',
                      borderRadius: '100px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      fontSize: '0.8rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: 'var(--color-primary)',
                      pointerEvents: 'none',
                      fontFamily: 'monospace'
                    }}
                  >
                    <VolumeX size={14} />
                    <span>AUDIO MUTED</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bespoke React Controls Bar overlay (Bottom) */}
              <AnimatePresence>
                {(showControls || !isPlaying) && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      position: 'absolute',
                      bottom: '0',
                      left: '0',
                      right: '0',
                      zIndex: 5,
                      background: 'linear-gradient(to top, rgba(7, 9, 12, 0.95) 0%, rgba(7, 9, 12, 0.5) 70%, transparent 100%)',
                      padding: '24px 32px 32px 32px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px',
                      pointerEvents: 'auto'
                    }}
                  >
                    {/* Progress Bar scrubber */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontFamily: 'monospace', minWidth: '38px' }}>
                        {currentTime}
                      </span>
                      <div 
                        onClick={handleSeek}
                        style={{
                          height: '6px',
                          flexGrow: 1,
                          backgroundColor: 'rgba(255, 255, 255, 0.12)',
                          borderRadius: '100px',
                          position: 'relative',
                          cursor: 'pointer',
                          overflow: 'visible',
                          transition: 'height 0.2s'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.height = '8px'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.height = '6px'; }}
                      >
                        {/* Played Progress Track */}
                        <div 
                          style={{
                            height: '100%',
                            width: `${progress}%`,
                            background: 'linear-gradient(90deg, #F05A00 0%, #FF7B29 100%)',
                            borderRadius: '100px',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            boxShadow: '0 0 10px rgba(240, 90, 0, 0.6)'
                          }}
                        />
                        {/* Glowing scrubber head */}
                        <div 
                          style={{
                            position: 'absolute',
                            top: '50%',
                            left: `${progress}%`,
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            backgroundColor: '#fff',
                            border: '2px solid var(--color-primary)',
                            transform: 'translate(-50%, -50%)',
                            boxShadow: '0 0 8px rgba(240, 90, 0, 0.8)',
                            pointerEvents: 'none'
                          }}
                        />
                      </div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontFamily: 'monospace', minWidth: '38px' }}>
                        {duration}
                      </span>
                    </div>

                    {/* Controls row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      {/* Left: Play/Pause, Mute/Unmute */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <button 
                          onClick={togglePlay}
                          style={{
                            color: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'color 0.2s',
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-primary)'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.color = '#fff'; }}
                        >
                          {isPlaying ? <Pause size={20} /> : <Play size={20} fill="currentColor" />}
                        </button>

                        <button 
                          onClick={toggleMute}
                          style={{
                            color: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'color 0.2s',
                            position: 'relative'
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-primary)'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.color = '#fff'; }}
                        >
                          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                        </button>
                      </div>

                      {/* Center: Interactive Play/Pause text label */}
                      <div style={{ fontSize: '0.8rem', letterSpacing: '0.05em', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Zap size={12} className="electric-glow-orange" style={{ color: 'var(--color-primary)' }} />
                        <span>SPS Substation Commissioning Video</span>
                      </div>

                      {/* Right: Immersive Fullscreen Mode */}
                      <div>
                        <button 
                          onClick={toggleFullscreen}
                          style={{
                            color: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'color 0.2s',
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-primary)'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.color = '#fff'; }}
                        >
                          {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ElectricBorder>
        </div>
      </div>
      
      {/* CSS Styles for ping animation (as Next.js doesn't natively bundle ping tailwind keyframes without config) */}
      <style jsx global>{`
        @keyframes ping {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        .animate-ping {
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </section>
  );
}
