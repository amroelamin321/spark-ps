'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/chat/ChatWidget';
import { motion } from 'framer-motion';
import { Zap, Shield, Activity, Settings, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Services() {
  const services = [
    {
      icon: Zap,
      title: "Testing and Commissioning Service",
      desc: "SPS offers comprehensive commissioning and validation for all electrical systems. We conduct rigorous testing and adjustments on equipment ranging from power transformers to protection relays. Each project is accompanied by a detailed report certifying system performance, integrity, and compliance with electrical and safety standards.",
      features: ["Relay Testing", "Transformer Validation", "Detailed Reports"]
    },
    {
      icon: Settings,
      title: "High Voltage Design",
      desc: "We are at the forefront of high-voltage design, offering unparalleled expertise in creating powerful, future-ready electrical infrastructure. Our team of seasoned engineers combines decades of experience with cutting-edge technology to deliver innovative solutions.",
      features: ["Primary Substation Layout", "Secondary Systems", "IEC/IEEE Compliance"]
    },
    {
      icon: Shield,
      title: "High Voltage Switching Services",
      desc: "We offer safe and controlled high-voltage switch operations, performed by highly trained professionals with a strict zero-incident safety record. We handle network validations and operations across critical infrastructure safely.",
      features: ["Safe Operations", "Zero Incidents", "24/7 Availability"]
    },
    {
      icon: Activity,
      title: "Maintenance and Support",
      desc: "We understand how crucial it is to keep your electrical systems running smoothly. That's why we provide thorough maintenance and support tailored to your needs, ensuring maximum uptime and reliability.",
      features: ["Preventative Maintenance", "24/7 Support", "Troubleshooting"]
    },
    {
      icon: Zap,
      title: "Earth Testing",
      desc: "A compliant earth system in high voltage distribution is essential for safe operation. We go beyond basic 'in service' resistance measurements to deliver comprehensive earthing system evaluations.",
      features: ["Soil Resistivity", "Step & Touch Potential", "Compliance Verification"]
    },
    {
      icon: Activity,
      title: "Thermographic Imaging",
      desc: "Infra-red or thermographic imaging allows us to scan for excess heat from electrical switchgear and cabling. Thermal images provide an instant indication of all manner of potential problems in connectors, switches and fuses.",
      features: ["Infra-red Scanning", "Fault Detection", "Preventative Diagnostics"]
    }
  ];

  return (
    <main>
      <Navbar />
      
      <header className="page-header">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="breadcrumb">OUR EXPERTISE</span>
            <h1 className="page-title">Engineering Services</h1>
            <p style={{ fontSize: '1.2rem', maxWidth: '600px' }}>
              From initial feasibility studies to final commissioning, our holistic approach guarantees exceptional results across the power infrastructure lifecycle.
            </p>
          </motion.div>
        </div>
      </header>

      <section className="section" style={{ background: 'var(--color-bg-elevated)' }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            {services.map((service, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="glass-panel"
                style={{ padding: '64px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'center' }}
              >
                <div>
                  <div style={{ width: '80px', height: '80px', background: 'rgba(240, 90, 0, 0.1)', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)', marginBottom: '32px' }}>
                    <service.icon size={40} />
                  </div>
                  <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>{service.title}</h2>
                  <Link href="/contact" style={{ color: 'var(--color-primary)', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    Request Service <ArrowRight size={18} />
                  </Link>
                </div>
                
                <div>
                  <p style={{ fontSize: '1.2rem', marginBottom: '32px', color: 'var(--color-text-main)' }}>
                    {service.desc}
                  </p>
                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    {service.features.map((feat, i) => (
                      <span key={i} style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-border)', borderRadius: '100px', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
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
