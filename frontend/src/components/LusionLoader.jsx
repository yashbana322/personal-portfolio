import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Odometer({ value }) {
  const digits = value.toString().padStart(3, '0').split('');
  return (
    <div style={{ display: 'flex', height: '1em', overflow: 'hidden', fontVariantNumeric: 'tabular-nums' }}>
      {digits.map((digit, i) => (
        <div key={i} style={{ position: 'relative', width: '0.65em', height: '1em' }}>
          <AnimatePresence mode="popLayout">
            <motion.div
              key={digit}
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {digit}
            </motion.div>
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

export default function LusionLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0); 

  useEffect(() => {
    let current = 0;
    const duration = 2500; 
    const intervalTime = 20;
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= 100) {
        setProgress(100);
        clearInterval(timer);
        setTimeout(() => setPhase(1), 100); 
      } else {
        setProgress(Math.floor(current));
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (phase === 1) {
      setTimeout(() => setPhase(2), 600);
    } else if (phase === 2) {
      setTimeout(() => setPhase(3), 800); 
    } else if (phase === 3) {
      setTimeout(() => setPhase(4), 1300);
      setTimeout(onComplete, 1600); 
    }
  }, [phase, onComplete]);

  // SVG Paths - Chunkier and more brutalist
  const phase1Path = "M 50 70 L 80 90 M 120 90 L 150 70 M 100 130 L 100 160";
  const phase2Path = "M 60 60 L 100 100 M 100 100 L 140 60 M 100 100 L 100 160";

  return (
    <motion.div
      animate={{ opacity: phase === 4 ? 0 : 1 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 99999,
        pointerEvents: 'none',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        color: '#fff', fontFamily: "'Inter', sans-serif"
      }}
    >
      <svg width="100vw" height="100vh" style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <mask id="y-hole-mask">
            {/* White background = visible mask */}
            <rect width="100%" height="100%" fill="white" />
            <g transform="translate(calc(50vw - 100px), calc(50vh - 100px))">
              {phase >= 1 && (
                <motion.g
                  animate={{ scale: phase === 3 ? 300 : 1, rotate: phase === 3 ? 45 : 0 }}
                  transition={{ duration: 1.5, ease: [0.7, 0, 0.1, 1] }}
                  style={{ transformOrigin: '100px 60px' }}
                >
                  <motion.path
                    animate={{ d: phase === 1 ? phase1Path : phase2Path }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    stroke="black" // Black stroke creates the hole
                    strokeWidth="24"
                    strokeLinecap="square"
                    fill="none"
                  />
                </motion.g>
              )}
            </g>
          </mask>
        </defs>

        {/* The Black Overlay masked by the Y hole */}
        <rect width="100%" height="100%" fill="#000" mask="url(#y-hole-mask)" />

        {/* The Visible White Elements */}
        <g transform="translate(calc(50vw - 100px), calc(50vh - 100px))">
          {/* Phase 0: Progress Bar */}
          <AnimatePresence>
            {phase === 0 && (
              <motion.g exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.2 }}>
                <line x1="40" y1="100" x2="160" y2="100" stroke="#222" strokeWidth="8" strokeLinecap="square" />
                <line x1="40" y1="100" x2={40 + progress * 1.2} y2="100" stroke="#fff" strokeWidth="8" strokeLinecap="square" />
              </motion.g>
            )}
          </AnimatePresence>

          {/* Phase 1, 2, 3: The White Y */}
          {phase >= 1 && phase < 4 && (
            <motion.g
              animate={{ scale: phase === 3 ? 300 : 1, rotate: phase === 3 ? 45 : 0 }}
              transition={{ duration: 1.5, ease: [0.7, 0, 0.1, 1] }}
              style={{ transformOrigin: '100px 60px' }}
            >
              <motion.path
                initial={{ opacity: 0 }}
                animate={{ 
                  d: phase === 1 ? phase1Path : phase2Path,
                  opacity: phase === 3 ? 0 : 1 
                }}
                transition={{ 
                  d: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                  opacity: { duration: 0.6, ease: "easeIn", delay: 0.2 } // Fade out shortly after zoom starts
                }}
                stroke="#fff"
                strokeWidth="24"
                strokeLinecap="square"
                fill="none"
              />
            </motion.g>
          )}
        </g>
      </svg>

      {/* ODOMETER NUMBER */}
      <motion.div
        animate={{ opacity: phase >= 3 ? 0 : 1, y: phase >= 3 ? 50 : 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          position: 'absolute', bottom: '4vw', left: '4vw',
          fontSize: 'clamp(120px, 20vw, 250px)', fontWeight: '500',
          lineHeight: 1, letterSpacing: '-0.05em'
        }}
      >
        <Odometer value={progress} />
      </motion.div>
    </motion.div>
  );
}
