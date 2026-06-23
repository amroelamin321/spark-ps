'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/chat/ChatWidget';
import { motion } from 'framer-motion';
import { CheckCircle, Award, Target, Users } from 'lucide-react';

export default function About() {
  return (
    <main>
      <Navbar />
      
      <header className="page-header">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="breadcrumb">COMPANY</span>
            <h1 className="page-title">About Spark PS</h1>
            <p style={{ fontSize: '1.2rem', maxWidth: '600px' }}>
              We don't just design power systems; we architect the future of energy infrastructure with uncompromising precision.
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
            <h2 style={{ fontSize: '3rem', marginBottom: '24px' }}>A Legacy of <br/><span className="text-gradient-primary">Trust & Authority</span></h2>
            <p style={{ fontSize: '1.1rem', marginBottom: '24px' }}>
              Founded in 2009, Spark Professional Services has grown to become a premier electrical engineering firm. We specialize in high voltage solutions that power communities, industries, and critical infrastructure.
            </p>
            <p style={{ fontSize: '1.1rem', marginBottom: '40px' }}>
              Our team consists of industry veterans and forward-thinking innovators dedicated to safety, sustainability, and technological advancement.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              {[
                { icon: Award, text: "Award-Winning Designs" },
                { icon: Target, text: "Precision Engineering" },
                { icon: Users, text: "Top-Tier Talent" },
                { icon: CheckCircle, text: "100% Compliance" }
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(240, 90, 0, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
                    <item.icon size={24} />
                  </div>
                  <span style={{ fontWeight: '600', color: 'var(--color-text-main)' }}>{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <ChatWidget />
    </main>
  );
}
