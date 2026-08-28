'use client';

import { motion } from 'framer-motion';
import { Zap, Shield, Server, Activity, Cable, Gauge } from 'lucide-react';
import ElectricBorder from '../animations/ElectricBorder';

const infrastructure = [
  { icon: Zap, label: 'HV Switchgear' },
  { icon: Activity, label: 'Standby Generation' },
  { icon: Server, label: 'UPS Battery Banks' },
  { icon: Shield, label: 'Protection Relays' },
  { icon: Cable, label: 'HV Cable Systems' },
  { icon: Gauge, label: 'SCADA Monitoring' },
];

export default function DataCenterPowerShowcase() {
  return (
    <section className="section" style={{ position: 'relative', overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(240, 90, 0, 0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <div className="container relative z-10">
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 56px' }}>
          <span className="breadcrumb" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Server size={14} className="electric-glow-orange" style={{ color: 'var(--color-primary)' }} />
            Data Centre Capability
          </span>
          <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', marginBottom: '16px', lineHeight: 1.1 }}>
            Engineering the Backbone of <span className="text-gradient-primary">Data Centre Power</span>
          </h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', maxWidth: '650px', margin: '0 auto' }}>
            From switchgear commissioning to UPS networks and protection relay programming, we deliver every layer of critical power infrastructure that keeps data centres online.
          </p>
        </div>

        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <ElectricBorder borderRadius="var(--radius-lg)">
            <div
              className="glass-panel"
              style={{
                borderRadius: 'var(--radius-lg)',
                border: '1px solid rgba(255,255,255,0.06)',
                overflow: 'hidden',
                background: '#0a0d14',
                position: 'relative',
                aspectRatio: '3/2',
                boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.9)',
              }}
            >
              <video
                poster="/spark-ps-datacenter-assembled.png"
                autoPlay
                loop
                muted
                playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              >
                <source src="/spark-ps-datacenter-reveal.webm" type="video/webm" />
                <source src="/spark-ps-datacenter-reveal.mp4" type="video/mp4" />
              </video>

              {/* Bottom gradient for text/chip legibility */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to bottom, rgba(7,9,12,0.15) 0%, transparent 40%, rgba(7,9,12,0.6) 100%)',
                  pointerEvents: 'none',
                  zIndex: 2,
                }}
              />

              {/* Concept disclosure badge (AI-generated visualization, not a documentary site photo) */}
              <div
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  zIndex: 4,
                  background: 'rgba(7, 9, 12, 0.7)',
                  backdropFilter: 'blur(8px)',
                  padding: '6px 14px',
                  borderRadius: '100px',
                  border: '1px solid rgba(255,255,255,0.12)',
                  fontSize: '0.75rem',
                  color: 'var(--color-text-muted)',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                Concept Visualization
              </div>

              {/* Infrastructure chip row */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  zIndex: 3,
                  padding: '24px 28px',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '10px',
                }}
              >
                {infrastructure.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.5 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '100px',
                      padding: '8px 14px',
                      fontSize: '0.85rem',
                      color: '#fff',
                    }}
                  >
                    <item.icon size={14} style={{ color: 'var(--color-primary)' }} />
                    {item.label}
                  </motion.div>
                ))}
              </div>
            </div>
          </ElectricBorder>
        </div>
      </div>
    </section>
  );
}
