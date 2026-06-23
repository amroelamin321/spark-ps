'use client';
import { Mail, Phone, MapPin } from 'lucide-react';

const LinkedinIcon = ({ size = 20, ...props }: { size?: number } & React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--color-border)', padding: '64px 0', background: 'var(--color-bg-base)' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '48px' }}>
        <div>
          <img src="/sps-logo-clean.png" alt="Spark PS" style={{ height: '40px', marginBottom: '24px' }} />
          <p style={{ marginBottom: '20px' }}>Empowering Excellence in Electrical Engineering Design & Testing.</p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <a 
              href="https://www.linkedin.com/company/spark-professional-services-sps/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={20} />
            </a>
          </div>
        </div>
        
        <div>
          <h4 style={{ color: 'white', marginBottom: '24px', fontSize: '1.2rem' }}>Contact Us</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--color-text-muted)' }}>
              <MapPin size={20} color="var(--color-primary)" />
              <span>Sydney, Australia</span>
            </div>
            <a href="tel:1300425498" className="footer-contact-link" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Phone size={20} color="var(--color-primary)" />
              <span>1300 425 498</span>
            </a>
            <a href="mailto:info@spark-ps.com.au" className="footer-contact-link" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Mail size={20} color="var(--color-primary)" />
              <span>info@spark-ps.com.au</span>
            </a>
          </div>
        </div>

        <div>
          <h4 style={{ color: 'white', marginBottom: '24px', fontSize: '1.2rem' }}>Services</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--color-text-muted)' }}>
            <span>Primary Substation Design</span>
            <span>Secondary Systems Design</span>
            <span>Power System Studies</span>
            <span>Electrical Testing</span>
          </div>
        </div>
      </div>
      
      <div className="container" style={{ marginTop: '64px', paddingTop: '32px', borderTop: '1px solid var(--color-border)', textAlign: 'center', color: 'var(--color-text-muted)' }}>
        <p>&copy; {new Date().getFullYear()} Spark Professional Services. All rights reserved.</p>
      </div>
    </footer>
  );
}
