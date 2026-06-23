'use client';

import { motion } from 'framer-motion';

export default function EnergyFlowDivider() {
  // We represent a power transmission line with substations along the way
  return (
    <div 
      style={{ 
        position: 'relative', 
        height: '40px', 
        width: '100%', 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        pointerEvents: 'none',
        background: 'rgba(7, 9, 12, 0.2)'
      }}
    >
      {/* Grid line background */}
      <div 
        style={{ 
          position: 'absolute', 
          width: '100%', 
          height: '1px', 
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)'
        }} 
      />

      {/* Repeating electric pulse wave */}
      <motion.div
        animate={{
          x: ['-20vw', '120vw']
        }}
        transition={{
          repeat: Infinity,
          duration: 4.5,
          ease: 'linear'
        }}
        style={{
          position: 'absolute',
          left: 0,
          width: '25vw',
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(240, 90, 0, 0.4) 40%, #ffffff 70%, rgba(240, 90, 0, 0.4) 85%, transparent 100%)',
          boxShadow: '0 0 8px rgba(240, 90, 0, 0.6), 0 0 2px #fff',
        }}
      />

      {/* Substation Nodes */}
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-around', 
          width: '100%', 
          maxWidth: '1200px', 
          position: 'relative', 
          zIndex: 2,
          padding: '0 40px'
        }}
      >
        {[1, 2, 3].map((node) => (
          <div 
            key={node} 
            style={{ 
              position: 'relative',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: '#07090C',
              border: '1.5px solid rgba(240, 90, 0, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 5px rgba(240, 90, 0, 0.2)'
            }}
          >
            {/* Pulsing inner core */}
            <motion.div 
              animate={{
                scale: [0.8, 1.3, 0.8],
                backgroundColor: ['rgba(240, 90, 0, 0.4)', 'rgba(255, 255, 255, 0.95)', 'rgba(240, 90, 0, 0.4)'],
                boxShadow: [
                  '0 0 2px rgba(240, 90, 0, 0.2)',
                  '0 0 8px rgba(240, 90, 0, 0.8)',
                  '0 0 2px rgba(240, 90, 0, 0.2)'
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: node * 0.7,
                ease: 'easeInOut'
              }}
              style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%'
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
