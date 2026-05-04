import React from 'react';
import { motion } from 'framer-motion';

const email = "hello@architects.com".split("");

export default function Contact() {
  return (
    <section style={{ minHeight: '100vh', padding: '15vh 6vw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
      
      <div style={{ fontSize: '14px', fontWeight: '800', letterSpacing: '6px', color: '#FF5722', textTransform: 'uppercase', marginBottom: '10vh' }}>
        [ Initiate Sequence ]
      </div>

      {/* MAGNETIC PHYSICS TEXT (GOD TIER) */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0vw', marginBottom: '10vh', cursor: 'crosshair' }}>
        {email.map((char, i) => (
          <motion.span
            key={i}
            whileHover={{ 
              y: (Math.random() - 0.5) * 400, 
              x: (Math.random() - 0.5) * 400, 
              rotate: (Math.random() - 0.5) * 180,
              scale: 1.5,
              color: '#FF5722'
            }}
            transition={{ type: 'spring', stiffness: 40, damping: 5, mass: 1 }}
            style={{ 
              display: 'inline-block', 
              fontSize: 'clamp(40px, 10vw, 150px)', 
              fontFamily: "'Syne', sans-serif", 
              fontWeight: '800',
              color: '#111',
              pointerEvents: 'auto'
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
        <p style={{ fontSize: '24px', fontWeight: '500', color: '#555' }}>
          Ready to break the internet?
        </p>
        
        {/* MAGNETIC BUTTON */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          style={{
            padding: '20px 60px',
            background: '#FF5722',
            color: '#fff',
            border: 'none',
            borderRadius: '100px',
            fontSize: '18px',
            fontWeight: '800',
            fontFamily: "'Syne', sans-serif",
            textTransform: 'uppercase',
            letterSpacing: '2px',
            cursor: 'none',
            pointerEvents: 'auto'
          }}
        >
          Send It
        </motion.button>
      </div>
      
    </section>
  );
}
