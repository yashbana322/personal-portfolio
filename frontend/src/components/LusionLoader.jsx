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
        // Transition timeline
        setTimeout(() => setPhase(1), 100); 
      } else {
        setProgress(Math.floor(current));
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (phase === 1) {
      setTimeout(() => setPhase(2), 500); // Morph to Y
    } else if (phase === 2) {
      setTimeout(() => setPhase(3), 800); // Fly through
    } else if (phase === 3) {
      setTimeout(() => setPhase(4), 1000); // Fade out overlay
      setTimeout(onComplete, 1500); // Destroy loader
    }
  }, [phase, onComplete]);

  // SVG Paths
  const phase1Path = "M 25 35 L 42 45 M 58 45 L 75 35 M 50 65 L 50 85"; // Floating broken lines
  const phase2Path = "M 30 30 L 50 50 M 50 50 L 70 30 M 50 50 L 50 80"; // Perfect Y shape

  return (
    <AnimatePresence>
      {phase < 4 && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            backgroundColor: '#000000',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            color: '#fff', fontFamily: "'Inter', sans-serif"
          }}
        >
          {/* THE Y SHAPE / FLY THROUGH CONTAINER */}
          <motion.div
            animate={
              phase === 3
                ? { scale: 250, opacity: 0 } // Massively scale to fly through the gap
                : { scale: 1, opacity: 1 }
            }
            transition={
              phase === 3
                ? { duration: 1.5, ease: [0.7, 0, 0.1, 1] }
                : { duration: 0 }
            }
            style={{ 
              position: 'relative', 
              width: '100px', 
              height: '100px',
              // Set transform origin exactly at the top gap of the Y (x: 50, y: 30)
              transformOrigin: '50% 30%' 
            }}
          >
            {/* Phase 0: Progress Bar */}
            <AnimatePresence>
              {phase === 0 && (
                <motion.svg 
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  width="100%" height="100%" viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0 }}
                >
                  {/* Background grey line */}
                  <line x1="20" y1="50" x2="80" y2="50" stroke="#333" strokeWidth="6" strokeLinecap="square" />
                  {/* Foreground white line */}
                  <line x1="20" y1="50" x2={20 + (progress / 100) * 60} y2="50" stroke="#fff" strokeWidth="6" strokeLinecap="square" />
                </motion.svg>
              )}
            </AnimatePresence>

            {/* Phase 1 & 2: Floating Lines Morphing to Y */}
            {phase >= 1 && (
              <motion.svg 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                width="100%" height="100%" viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0 }}
              >
                <motion.path
                  initial={{ d: phase1Path }}
                  animate={{ d: phase === 1 ? phase1Path : phase2Path }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  stroke="#fff"
                  strokeWidth="8"
                  strokeLinecap="square"
                  fill="none"
                />
              </motion.svg>
            )}
          </motion.div>

          {/* ODOMETER NUMBER */}
          <motion.div
            animate={{ opacity: phase >= 3 ? 0 : 1, y: phase >= 3 ? 50 : 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              position: 'absolute', bottom: '4vw', left: '4vw',
              fontSize: 'clamp(80px, 15vw, 200px)', fontWeight: '400',
              lineHeight: 1, letterSpacing: '-0.05em'
            }}
          >
            <Odometer value={progress} />
          </motion.div>
          
        </motion.div>
      )}
    </AnimatePresence>
  );
}
