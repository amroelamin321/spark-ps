'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/chat/ChatWidget';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Tag, ArrowRight } from 'lucide-react';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

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

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <header className="page-header" style={{ position: 'relative' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="breadcrumb">PORTFOLIO</span>
            <h1 className="page-title">Featured Projects</h1>
            <p style={{ fontSize: '1.2rem', maxWidth: '600px' }}>
              Explore a selection of our most complex and impactful engineering triumphs across the power sector.
            </p>
          </motion.div>
        </div>
      </header>

      <section className="section" style={{ flex: 1 }}>
        <div className="container">
          <div className="projects-grid">
            {projects.map((project, idx) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                onClick={() => setSelectedProject(project)}
                className="project-card"
                style={{
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  position: 'relative',
                  aspectRatio: '4/3',
                  cursor: 'pointer',
                  border: '1px solid var(--color-border)'
                }}
              >
                <img 
                  src={project.image} 
                  alt={project.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div className="project-overlay">
                  <p>{project.category}</p>
                  <h3>{project.title}</h3>
                  <span style={{ fontSize: '0.9rem', color: 'var(--color-primary)', display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '8px', fontWeight: 600 }}>
                    Open Details <ArrowRight size={14} />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Project Modal */}
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
