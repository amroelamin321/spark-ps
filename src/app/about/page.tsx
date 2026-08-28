'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/chat/ChatWidget';
import { motion } from 'framer-motion';
import { CheckCircle, Award, Target, Users, ShieldCheck, Gauge, FileCheck } from 'lucide-react';

export default function About() {
  const stats = [
    { value: '15+', label: 'Years Experience' },
    { value: '200+', label: 'Projects Completed' },
    { value: '50+', label: 'Expert Engineers' },
    { value: '100%', label: 'Safety Record' },
  ];

  const pillars = [
    { icon: ShieldCheck, title: 'Safety First', desc: 'A strict zero incident policy on every active switching operation, from site arrival to sign-off.' },
    { icon: Gauge, title: 'Expert Engineering', desc: 'Decades of combined engineering experience across complex HV grids, switchgear, and protection systems.' },
    { icon: FileCheck, title: 'Fully Compliant', desc: 'Every project handed over with accurate, thorough performance and compliance documentation.' },
  ];

  return (
    <main>
      <Navbar />

      <header className="page-header">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="breadcrumb">COMPANY</span>
            <h1 className="page-title">About Spark PS</h1>
            <p style={{ fontSize: '1.2rem', maxWidth: '600px' }}>
              We don&apos;t just design power systems; we architect the future of energy infrastructure with uncompromising precision.
            </p>
          </motion.div>
        </div>
      </header>

      <section className="section">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '80px', alignItems: 'center' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-panel"
            style={{ padding: '0', border: 'none', background: 'transparent' }}
          >
            <img src="/about-image.png" alt="Engineering Team" style={{ width: '100%', display: 'block', borderRadius: '16px' }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="breadcrumb">Our Story</span>
            <h2 style={{ fontSize: '3rem', marginBottom: '24px' }}>A Legacy of <br /><span className="text-gradient-primary">Trust & Authority</span></h2>
            <p style={{ fontSize: '1.1rem', marginBottom: '24px' }}>
              Founded in 2009, Spark Professional Services has grown to become a premier electrical engineering firm. We specialize in high voltage solutions that power communities, industries, and critical infrastructure.
            </p>
            <p style={{ fontSize: '1.1rem', marginBottom: '40px' }}>
              Our team consists of industry veterans and forward-thinking innovators dedicated to safety, sustainability, and technological advancement.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              {[
                { icon: Award, text: 'Award-Winning Designs' },
                { icon: Target, text: 'Precision Engineering' },
                { icon: Users, text: 'Top-Tier Talent' },
                { icon: CheckCircle, text: '100% Compliance' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--color-primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
                    <item.icon size={24} />
                  </div>
                  <span style={{ fontWeight: '600', color: 'var(--color-text-main)' }}>{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats band */}
      <section className="section" style={{ background: '#FAFAFA', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)', paddingTop: '64px', paddingBottom: '64px' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '40px' }}>
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, type: 'spring' }}
              style={{ textAlign: 'center' }}
            >
              <h3 style={{ fontSize: '3.5rem', color: 'var(--color-primary)', lineHeight: 1, marginBottom: '8px' }}>{stat.value}</h3>
              <p style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values / Pillars */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 64px' }}>
            <span className="breadcrumb">What Drives Us</span>
            <h2 style={{ fontSize: 'clamp(2.25rem, 3.6vw, 3rem)', marginBottom: '16px' }}>
              Uncompromising <span className="text-gradient-primary">Safety & Quality</span>
            </h2>
            <p style={{ fontSize: '1.15rem' }}>
              A client-centric, precision-first approach to every electrical layout, protection relay programme, and grid validation we deliver.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
            {pillars.map((pillar, i) => (
              <motion.div
                key={i}
                className="glass-panel"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                style={{ padding: '40px' }}
              >
                <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'var(--color-primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)', marginBottom: '24px' }}>
                  <pillar.icon size={28} />
                </div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '12px', color: 'var(--color-text-main)' }}>{pillar.title}</h3>
                <p>{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </main>
  );
}
