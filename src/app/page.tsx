'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Zap, Shield, Activity, Settings, CheckCircle, 
  ChevronRight, MapPin, Tag, X, Award, Users, Target, Briefcase 
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/chat/ChatWidget';
import Link from 'next/link';
import ElectricGrid from '@/components/animations/ElectricGrid';
import ElectricBorder from '@/components/animations/ElectricBorder';
import EnergyFlowDivider from '@/components/animations/EnergyFlowDivider';
import ElectricProjectSlider from '@/components/animations/ElectricProjectSlider';
import GridSimulator from '@/components/animations/GridSimulator';
import VideoShowcase from '@/components/common/VideoShowcase';

export default function Home() {
  const containerRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const yHeroBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const projects = [
    {
      id: 1,
      title: "The largest off-grid poultry farm in Australia, Griffith, NSW",
      category: "Testing & Commissioning",
      location: "Griffith, NSW",
      image: "/project-1.png?v=2",
      description: "Spark Professional Services contributed to an innovative off-grid energy project at one of Australia’s largest poultry farms. This groundbreaking initiative sets a new standard for renewable energy in agriculture, enabling the facility to operate with minimal environmental impact.",
      scope: [
        "Testing and commissioning the 11kV private distribution network",
        "Over 4.5km of overhead line protection systems",
        "HV switchgear, transformers, and earthing system validation",
        "Substations and battery storage system integration"
      ]
    },
    {
      id: 2,
      title: "Critical Retrofit Project for a Major LNG Facility, Darwin, NT",
      category: "Protection Relay Upgrade",
      location: "Darwin, NT",
      image: "/project-2.png?v=2",
      description: "Spark Professional Services was engaged to deliver a critical retrofit project at one of Australia’s prominent LNG export facilities. This large-scale initiative involved replacing outdated protection relays with modern, high-performance systems to enhance the facility's operational safety and efficiency.",
      scope: [
        "Installation, programming, testing, and commissioning of advanced relays",
        "Seamless integration into the facility’s network",
        "Upgrading protection relay networks to modern standards",
        "Relay upgrades to enhance reliability and stability"
      ]
    },
    {
      id: 3,
      title: "Premier Data Centre, Melbourne, VIC",
      category: "Secondary Systems",
      location: "Melbourne, VIC",
      image: "/project-3.png?v=2",
      description: "As part of a major data centre project, Spark Professional Services handled the commissioning of a complex network of 30 advanced switchgears, including an extensive protection system equipped with high-quality Schneider and SEL relays.",
      scope: [
        "Integrating voltage and current transformers",
        "Commissioning battery systems, LV assist, and UPS networks",
        "Adhering to high standards and managing client documentation",
        "Coordinating with multiple subcontractors in the switchroom"
      ]
    },
    {
      id: 4,
      title: "HV Switchboard Upgrade for a Leading Steel Manufacturer, Port Kembla, NSW",
      category: "High Voltage Design",
      location: "Port Kembla, NSW",
      image: "/project-4.png?v=2",
      description: "Spark Professional Services provided testing and commissioning services for an upgraded 35-panel 6.6kV switchboard at a major steel manufacturer's facility at their Blower Station, a crucial component of the network distribution system.",
      scope: [
        "Replacing outdated early nineties Westinghouse HQ switchgear",
        "Commissioning the 35-panel 6.6kV switchboard",
        "Testing critical substation components under strict safety protocols",
        "Minimizing manual handling risks and improving reliability"
      ]
    }
  ];

  const industries = [
    { title: "Power Utilities", desc: "Critical grid infrastructure primary & secondary substation layout design.", icon: Zap },
    { title: "Renewables", desc: "Solar, wind, and battery storage microgrid integration systems.", icon: Target },
    { title: "Mining", desc: "Dependable heavy power supply and safety distribution network engineering.", icon: Briefcase },
    { title: "Infrastructure", desc: "High-load public transport, transport hubs, and utility installations.", icon: Settings },
    { title: "Data Centres", desc: "Complex UPS networks, backup systems, and SEL/Schneider relay commissioning.", icon: Shield },
    { title: "Heavy Industry", desc: "HV switchboard and blower station upgrades for manufacturing plants.", icon: Activity }
  ];

  const testimonials = [
    { name: "Josh Mercieca", role: "EARA", text: "A huge thank you to the Spark team for a job well done. Your expertise and dedication really made a difference." },
    { name: "Moe Alrifai", role: "ABB", text: "The Spark team did an outstanding job on-site. Their commitment to the project and attention to detail were second to none. We couldn't have asked for a better partner." },
    { name: "Luka Lakic", role: "BlueScope", text: "It was nice to work with a company that not only met our expectations but exceeded them. Spark handled everything safely, on time, and with flawless documentation. We're thrilled with the quality of work and will definitely rely on Spark for future projects." },
    { name: "Daren McMurray", role: "Syscon", text: "I wanted to take a moment to express my appreciation to the Spark team. Everything fell into place perfectly, and we're absolutely delighted with the outcome." }
  ];

  return (
    <main ref={containerRef}>
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero">
        <motion.div className="hero-bg" style={{ y: yHeroBg }}>
          <img src="/hero.png" alt="High Voltage Infrastructure" />
        </motion.div>
        <div className="hero-overlay" />
        <ElectricGrid />
        
        <div className="container relative z-10">
          <motion.div className="hero-content" style={{ opacity: opacityHero }}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'inline-block', padding: '8px 16px', background: 'rgba(240, 90, 0, 0.1)', border: '1px solid rgba(240, 90, 0, 0.3)', borderRadius: '100px', color: 'var(--color-primary)', fontWeight: '600', marginBottom: '24px', letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '0.85rem' }}
            >
              Empowering Excellence Since 2009
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              Architecting the Future of <br />
              <span className="text-gradient-electric electric-glow-orange">Power Infrastructure</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              Delivering premium high voltage engineering solutions, testing and commissioning, and comprehensive power system studies.
            </motion.p>
            
            <motion.div 
              style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div className="magnetic-btn-wrap" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/contact" className="btn-primary">
                  Start Your Project <ArrowRight size={20} />
                </Link>
              </motion.div>
              <motion.div className="magnetic-btn-wrap" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/projects" className="btn-secondary">
                  View Our Portfolio
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Marquee / Brands Strip */}
      <section style={{ padding: '40px 0', borderBottom: '1px solid var(--color-border)', borderTop: '1px solid var(--color-border)', background: 'rgba(255,255,255,0.01)', overflow: 'hidden' }}>
        <div className="container" style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-muted)', fontWeight: 600 }}>Trusted by Industry Leaders</span>
        </div>
        <div style={{ display: 'flex', overflow: 'hidden' }}>
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            style={{ display: 'flex', gap: '80px', width: 'fit-content', paddingLeft: '80px', alignItems: 'center' }}
          >
            {[...Array(4)].map((_, j) => (
               <div key={j} style={{ display: 'flex', gap: '80px', alignItems: 'center' }}>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <img 
                      key={num} 
                      src={`/brands/logo-${num}n.png`} 
                      alt={`Brand Logo ${num}`} 
                      style={{ height: '48px', width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1) opacity(0.5)', transition: 'all 0.3s' }} 
                      onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(0) invert(1) opacity(1)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.filter = 'brightness(0) invert(1) opacity(0.5)'; }}
                    />
                  ))}
               </div>
            ))}
          </motion.div>
        </div>
      </section>

      <EnergyFlowDivider />

      {/* About SPS / Mission Section */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '64px', alignItems: 'center' }}>
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="breadcrumb">About SPS</span>
              <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', marginBottom: '24px', lineHeight: 1.1 }}>
                Pioneering Electrical <br />
                <span className="text-gradient-primary">Engineering Excellence</span>
              </h2>
              <p style={{ fontSize: '1.15rem', marginBottom: '24px' }}>
                Spark Professional Services is your trusted leader in high and low-voltage electrical engineering and design. Backed by a team of expert engineers and cutting-edge technology, we deliver tailored solutions for power systems, protection studies, and more.
              </p>
              <p style={{ fontSize: '1.15rem' }}>
                From in-depth testing and commissioning to proactive maintenance, we cover every angle to ensure your systems run smoothly, reliably, and in compliance with global standards.
              </p>
            </motion.div>

            <motion.div 
              className="glass-panel" 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ padding: '48px', borderLeft: '4px solid var(--color-primary)' }}
            >
              <Award size={48} color="var(--color-primary)" style={{ marginBottom: '24px' }} />
              <h3 style={{ fontSize: '2rem', marginBottom: '16px', color: '#fff' }}>Our Mission</h3>
              <p style={{ fontSize: '1.25rem', color: '#E5E7EB', lineHeight: 1.8, fontStyle: 'italic' }}>
                &ldquo;SPS is committed to providing quality electrical engineering services to enhance the communities where our clients live and work. A Safer Community.&rdquo;
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Intro / Stats Strip */}
      <section className="section" style={{ background: 'rgba(255,255,255,0.01)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '40px' }}>
          {[
            { value: "15+", label: "Years Experience" },
            { value: "200+", label: "Projects Completed" },
            { value: "50+", label: "Expert Engineers" },
            { value: "100%", label: "Safety Record" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, type: "spring" }}
              style={{ textAlign: 'center' }}
            >
              <h3 style={{ fontSize: '4rem', color: 'var(--color-primary)', lineHeight: 1, marginBottom: '8px' }}>{stat.value}</h3>
              <p style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Video Showcase Section */}
      <VideoShowcase />

      {/* Featured Services */}
      <section className="section" style={{ position: 'relative' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '64px', flexWrap: 'wrap', gap: '24px' }}>
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ maxWidth: '600px' }}
            >
              <span className="breadcrumb">Our Capabilities</span>
              <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', marginBottom: '16px' }}>Services We <span className="text-gradient-primary">Offer</span></h2>
              <p style={{ fontSize: '1.2rem' }}>Comprehensive engineering solutions designed to exceed global standards.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Link href="/services" className="btn-secondary" style={{ padding: '12px 24px' }}>Explore All Services <ArrowRight size={18} /></Link>
            </motion.div>
          </div>

          <div className="services-grid">
            {[
              { icon: Zap, title: "Testing & Commissioning", desc: "Comprehensive system commissioning, relay validation (SEL/Schneider), and detailed testing reports." },
              { icon: Settings, title: "High Voltage Design", desc: "Unparalleled expertise in designing primary and secondary systems and future-ready grid connections." },
              { icon: Activity, title: "Maintenance & Studies", desc: "24/7 support switching operations, thermographic imaging diagnostics, load flow and stability studies." }
            ].map((service, idx) => (
              <ElectricBorder key={idx} borderRadius="var(--radius-md)">
                <motion.div 
                  className="glass-panel service-card"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15, duration: 0.6 }}
                  style={{ height: '100%', display: 'flex', flexDirection: 'column', border: 'none', margin: 0 }}
                >
                  <div className="service-icon"><service.icon size={36} /></div>
                  <h3>{service.title}</h3>
                  <p style={{ flexGrow: 1 }}>{service.desc}</p>
                  
                  <div style={{ marginTop: 'auto', paddingTop: '32px' }}>
                     <span style={{ color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                       Learn More <ChevronRight size={16} />
                     </span>
                  </div>
                </motion.div>
              </ElectricBorder>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="section" style={{ background: 'rgba(255,255,255,0.01)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 64px' }}>
            <span className="breadcrumb">Industries</span>
            <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', marginBottom: '16px' }}>Sectors We <span className="text-gradient-primary">Proudly Serve</span></h2>
            <p style={{ fontSize: '1.2rem' }}>Engineered power solutions tailored to meet the demanding requirements of various industries.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {industries.map((ind, idx) => (
              <motion.div
                key={idx}
                className="glass-panel"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.5 }}
                style={{ padding: '32px', borderRadius: 'var(--radius-md)' }}
              >
                <ind.icon size={32} color="var(--color-primary)" style={{ marginBottom: '16px' }} />
                <h4 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '8px' }}>{ind.title}</h4>
                <p>{ind.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Spark / Core Pillars */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '64px', alignItems: 'center' }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="breadcrumb">Why Choose Spark</span>
              <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', marginBottom: '24px', lineHeight: 1.1 }}>
                Uncompromising <br />
                <span className="text-gradient-primary">Safety & Quality</span>
              </h2>
              <p style={{ fontSize: '1.15rem', marginBottom: '24px' }}>
                We adopting a client-centric, innovative approach to every electrical layout, protection relay programming, and grid validation.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {[
                  { title: "Expert Engineering", desc: "Decades of combined engineering experience in complex HV grids." },
                  { title: "Safety First", desc: "A strict zero incident policy on active switching operations." },
                  { title: "Fully Compliant", desc: "Handed over with accurate and thorough performance reports." }
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '16px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(240, 90, 0, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--color-primary)', marginTop: '4px' }}>
                      <CheckCircle size={16} />
                    </div>
                    <div>
                      <h5 style={{ fontSize: '1.1rem', color: 'white', marginBottom: '4px' }}>{item.title}</h5>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass-panel"
              style={{ padding: '0', overflow: 'hidden', border: 'none', position: 'relative', minHeight: '400px' }}
            >
              <img src="/services.png" alt="SPS Engineering Support" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,9,12,0.9), transparent)' }} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section" style={{ background: 'rgba(255,255,255,0.01)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '64px', flexWrap: 'wrap', gap: '24px' }}>
            <div>
              <span className="breadcrumb">Our Success Cases</span>
              <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)' }}>Featured <span className="text-gradient-primary">Projects</span></h2>
            </div>
            <Link href="/projects" className="btn-secondary" style={{ padding: '12px 24px' }}>View All Projects <ArrowRight size={18} /></Link>
          </div>

          <ElectricProjectSlider 
            projects={projects}
            onSelectProject={(project) => setSelectedProject(project)}
          />
        </div>
      </section>

      <EnergyFlowDivider />

      {/* Interactive Grid Lab */}
      <section className="section" style={{ position: 'relative' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 64px' }}>
            <span className="breadcrumb">Grid Diagnostics Lab</span>
            <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', marginBottom: '16px' }}>
              Power Grid <span className="text-gradient-electric electric-glow-orange">Stabilization</span>
            </h2>
            <p style={{ fontSize: '1.2rem' }}>
              Interact with our sandbox simulator to see how BESS battery systems and microgrid controllers protect power network integrity under unstable loading conditions.
            </p>
          </div>
          <GridSimulator />
        </div>
      </section>

      <EnergyFlowDivider />

      {/* Testimonials */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 64px' }}>
            <span className="breadcrumb">Testimonials</span>
            <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', marginBottom: '16px' }}>Client <span className="text-gradient-primary">Experiences</span></h2>
            <p style={{ fontSize: '1.2rem' }}>Hear from some of our leading industry partners across major projects in Australia.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
            {testimonials.map((test, idx) => (
              <motion.div
                key={idx}
                className="glass-panel"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                style={{ padding: '40px', display: 'flex', flexDirection: 'column', position: 'relative' }}
              >
                <span style={{ fontSize: '5rem', color: 'rgba(240, 90, 0, 0.1)', position: 'absolute', top: '10px', left: '20px', lineHeight: 1, fontFamily: 'serif', fontWeight: 'bold' }}>&ldquo;</span>
                <p style={{ fontStyle: 'italic', marginBottom: '24px', position: 'relative', zIndex: 2, fontSize: '1.05rem', lineHeight: 1.7, flexGrow: 1 }}>
                  {test.text}
                </p>
                <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '20px', marginTop: 'auto' }}>
                  <h4 style={{ color: 'white', fontSize: '1.1rem', marginBottom: '4px' }}>{test.name}</h4>
                  <span style={{ color: 'var(--color-primary)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{test.role}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Project Modal (copied from projects page for homepage integration) */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              zIndex: 999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
          >
            <motion.div 
              className="glass-panel modal-card"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '750px',
                maxHeight: '90vh',
                overflowY: 'auto',
                padding: '40px',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                background: 'rgba(17, 20, 26, 0.9)',
                position: 'relative'
              }}
            >
              <button 
                onClick={() => setSelectedProject(null)}
                style={{
                  position: 'absolute',
                  top: '24px',
                  right: '24px',
                  color: 'var(--color-text-muted)',
                  cursor: 'pointer',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s'
                }}
                className="close-btn"
              >
                <X size={20} />
              </button>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  style={{
                    width: '100%',
                    maxHeight: '300px',
                    objectFit: 'cover',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)'
                  }}
                />

                <div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '12px' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', color: 'var(--color-primary)', fontWeight: 600 }}>
                      <Tag size={16} />
                      {selectedProject.category}
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                      <MapPin size={16} />
                      {selectedProject.location}
                    </span>
                  </div>

                  <h2 style={{ fontSize: '2.2rem', marginBottom: '16px', color: '#fff', lineHeight: 1.2 }}>
                    {selectedProject.title}
                  </h2>

                  <p style={{ fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '24px', color: 'var(--color-text-muted)' }}>
                    {selectedProject.description}
                  </p>

                  <h4 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '12px', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px' }}>
                    Scope of Work
                  </h4>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingLeft: '20px', color: 'var(--color-text-muted)' }}>
                    {selectedProject.scope.map((item: string, idx: number) => (
                      <li key={idx} style={{ lineHeight: 1.6 }}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
      <ChatWidget />
    </main>
  );
}
