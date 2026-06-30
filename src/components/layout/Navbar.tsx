'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' }
  ];

  return (
    <>
      <motion.nav 
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        <div className="container nav-container" style={{ position: 'relative' }}>
          <Link href="/" className="nav-logo" style={{ zIndex: 100 }} onClick={() => setIsOpen(false)}>
            <motion.img 
              src="/SPARK_LOGO.png" 
              alt="Spark PS Logo" 
              animate={{ scale: scrolled ? 0.85 : 1 }}
              transition={{ duration: 0.3 }}
              style={{ transformOrigin: 'left center', height: '150px', width: 'auto' }}
            />
          </Link>

          {/* Desktop Links */}
          <div className="nav-links desktop-only" style={{ zIndex: 10 }}>
            {navLinks.map((link) => (
              <div 
                key={link.name}
                className="nav-link-wrapper"
                style={{ position: 'relative', display: 'flex', alignItems: 'center', height: '100%' }}
                onMouseEnter={() => setIsHovered(link.name)}
                onMouseLeave={() => setIsHovered(null)}
              >
                <Link 
                  href={link.path} 
                  className={`nav-link ${pathname === link.path ? 'active' : ''}`}
                  style={{ position: 'relative', zIndex: 2, padding: '10px 16px' }}
                >
                  {link.name}
                </Link>
                
                <AnimatePresence>
                  {isHovered === link.name && (
                    <motion.div
                      layoutId="nav-hover-bg"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        borderRadius: '8px',
                        zIndex: 1,
                        border: '1px solid rgba(255,255,255,0.1)'
                      }}
                    />
                  )}
                </AnimatePresence>
              </div>
            ))}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} tabIndex={0}>
              <Link href="/contact" className="btn-primary" style={{ padding: '12px 28px', marginLeft: '16px' }}>
                Contact Us
              </Link>
            </motion.div>
          </div>

          {/* Hamburger Menu Toggle Button */}
          <button 
            className="mobile-toggle"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
            style={{ zIndex: 100 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <motion.line 
                x1="3" y1="12" x2="21" y2="12"
                animate={isOpen ? { x1: 4, y1: 4, x2: 20, y2: 20 } : { x1: 3, y1: 12, x2: 21, y2: 12 }}
                transition={{ duration: 0.3 }}
              />
              <motion.line 
                x1="3" y1="6" x2="21" y2="6"
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.line 
                x1="3" y1="18" x2="21" y2="18"
                animate={isOpen ? { x1: 4, y1: 20, x2: 20, y2: 4 } : { x1: 3, y1: 18, x2: 21, y2: 18 }}
                transition={{ duration: 0.3 }}
              />
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="mobile-drawer"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mobile-drawer-content">
              <div className="mobile-nav-links">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 + 0.1, duration: 0.5, ease: "easeOut" }}
                  >
                    <Link 
                      href={link.path} 
                      className={`mobile-nav-link ${pathname === link.path ? 'active' : ''}`}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: navLinks.length * 0.1 + 0.1, duration: 0.5 }}
                  style={{ marginTop: '24px' }}
                >
                  <Link href="/contact" className="btn-primary" style={{ width: '100%', padding: '16px' }} onClick={() => setIsOpen(false)}>
                    Contact Us
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
