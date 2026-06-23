'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/chat/ChatWidget';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formEl = e.currentTarget;
    const data = new FormData(formEl);
    const payload = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      phone: data.get('phone'),
      companyName: data.get('companyName'),
      projectDetails: data.get('projectDetails'),
    };

    try {
      const response = await fetch('https://vertx-n8n-host102938.up.railway.app/webhook/0db02aed-fcd9-43d3-ab01-bd41cfd50bbb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setIsSubmitted(true);
        formEl.reset();
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        alert('There was a problem submitting your inquiry. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was a network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <main>
      <Navbar />
      
      <header className="page-header">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="breadcrumb">GET IN TOUCH</span>
            <h1 className="page-title">Contact Spark PS</h1>
            <p style={{ fontSize: '1.2rem', maxWidth: '600px' }}>
              Our expert engineering team is ready to discuss your next high voltage infrastructure project. Reach out to us below.
            </p>
          </motion.div>
        </div>
      </header>

      <section className="section">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '80px' }}>
          
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 style={{ fontSize: '2.5rem', marginBottom: '32px' }}>Contact Information</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginBottom: '48px' }}>
              <div style={{ display: 'flex', gap: '24px' }}>
                <div style={{ width: '64px', height: '64px', background: 'rgba(240, 90, 0, 0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
                  <MapPin size={32} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Headquarters</h4>
                  <p>Level 24, 100 Power Street<br/>Sydney, NSW 2000, Australia</p>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '24px' }}>
                <div style={{ width: '64px', height: '64px', background: 'rgba(240, 90, 0, 0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
                  <Phone size={32} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Phone</h4>
                  <p>
                    <a href="tel:1300425498" style={{ color: 'var(--color-text-main)', transition: 'color 0.3s ease', textDecoration: 'none' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-main)'}>
                      1300 425 498
                    </a>
                    <br/>
                    Mon-Fri, 9am - 5pm AEST
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '24px' }}>
                <div style={{ width: '64px', height: '64px', background: 'rgba(240, 90, 0, 0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
                  <Mail size={32} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Email</h4>
                  <p>
                    <a href="mailto:info@spark-ps.com.au" style={{ color: 'var(--color-text-main)', transition: 'color 0.3s ease', textDecoration: 'none' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-main)'}>
                      info@spark-ps.com.au
                    </a>
                    <br/>
                    <a href="mailto:engineering@spark-ps.com.au" style={{ color: 'var(--color-text-main)', transition: 'color 0.3s ease', textDecoration: 'none' }} onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-main)'}>
                      engineering@spark-ps.com.au
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '32px', border: '1px solid var(--color-primary)' }}>
              <h4 style={{ marginBottom: '16px', color: 'var(--color-primary)' }}>Need Immediate Assistance?</h4>
              <p style={{ marginBottom: 0 }}>Use the chat widget in the bottom right corner to instantly connect with our AI Assistant.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-panel"
            style={{ padding: '48px' }}
          >
            <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>Send an Inquiry</h2>
            <p style={{ marginBottom: '32px' }}>Fill out the form and our team will get back to you within 24 hours.</p>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-main)' }}>First Name</label>
                  <input type="text" className="form-input" placeholder="John" name="firstName" required />
                </div>
                <div className="form-group">
                  <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-main)' }}>Last Name</label>
                  <input type="text" className="form-input" placeholder="Doe" name="lastName" required />
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginTop: '24px' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-main)' }}>Email Address</label>
                  <input type="email" className="form-input" placeholder="john@company.com" name="email" required />
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-main)' }}>Phone Number</label>
                  <input type="tel" className="form-input" placeholder="e.g. +61 400 000 000" name="phone" />
                </div>
              </div>

              <div className="form-group" style={{ marginTop: '24px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-main)' }}>Company Name</label>
                <input type="text" className="form-input" placeholder="e.g. NeoGrid Energy" name="companyName" />
              </div>
              
              <div className="form-group">
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-main)' }}>Project Details</label>
                <textarea className="form-input" placeholder="Tell us about your engineering needs..." name="projectDetails" required></textarea>
              </div>

              <div className="magnetic-btn-wrap" style={{ width: '100%' }}>
                <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '16px' }} disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : isSubmitted ? <span style={{display: 'flex', alignItems: 'center', gap: '8px'}}>Inquiry Sent <CheckCircle size={20} /></span> : <span style={{display: 'flex', alignItems: 'center', gap: '8px'}}>Submit Inquiry <Send size={20} /></span>}
                </button>
              </div>
            </form>
          </motion.div>

        </div>
      </section>

      <Footer />
      <ChatWidget />
    </main>
  );
}
