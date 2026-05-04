import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Odometer({ value }) {
  const formatted = value.toString().padStart(3, '0');
  return (
    <div style={{ display: 'flex', height: '1em', overflow: 'hidden', fontVariantNumeric: 'tabular-nums' }}>
      {formatted}
    </div>
  );
}

export default function LusionLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0); 

  useEffect(() => {
    let animationFrameId;
    const duration = 4500; // 4.5 seconds for a deliberate, slow build-up
    const startTime = performance.now();

    // Easing function for a luxurious slow-down at the end
    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

    const updateProgress = (currentTime) => {
      const elapsed = currentTime - startTime;
      const t = Math.min(elapsed / duration, 1);
      
      const currentProgress = Math.floor(easeOutQuart(t) * 100);
      setProgress(currentProgress);

      if (t < 1) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
        setTimeout(() => setPhase(1), 150); 
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  useEffect(() => {
    if (phase === 1) {
      setTimeout(() => setPhase(2), 600);
    } else if (phase === 2) {
      setTimeout(() => setPhase(3), 800); 
    } else if (phase === 3) {
      setTimeout(() => setPhase(4), 1000);
      setTimeout(onComplete, 1300); 
    }
  }, [phase, onComplete]);

  // Center is exactly at (0,0) for the gap between the top arms
  const phase1Path = "M -50 10 L -20 30 M 20 30 L 50 10 M 0 70 L 0 100";
  const phase2Path = "M -40 0 L 0 40 M 0 40 L 40 0 M 0 40 L 0 100";

  return (
    <motion.div
      animate={{ opacity: phase === 4 ? 0 : 1 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 99999,
        backgroundColor: '#000', // Base fallback
        color: '#fff', fontFamily: "'Inter', sans-serif",
        display: 'flex', justifyContent: 'center', alignItems: 'center'
      }}
    >
      <svg width="100vw" height="100vh" style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <mask id="y-hole-mask">
            {/* White background = visible mask */}
            <rect width="100%" height="100%" fill="white" />
            
            {/* Nested SVG to place (0,0) perfectly in the center of the screen */}
            <svg x="50%" y="50%" style={{ overflow: 'visible' }}>
              {phase >= 1 && (
                <motion.g
                  animate={{ scale: phase === 3 ? 300 : 1, rotate: phase === 3 ? 45 : 0 }}
                  transition={{ duration: 1.2, ease: [0.7, 0, 0.1, 1] }}
                  // Transform origin is naturally (0,0), which is the exact center!
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
            </svg>
          </mask>
        </defs>

        {/* The Black Overlay masked by the Y hole */}
        <rect width="100%" height="100%" fill="#000" mask="url(#y-hole-mask)" />

        {/* The Visible White Elements */}
        <svg x="50%" y="50%" style={{ overflow: 'visible' }}>
          {/* Phase 0: Progress Bar */}
          <AnimatePresence>
            {phase === 0 && (
              <motion.g exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.2 }}>
                <line x1="-60" y1="40" x2="60" y2="40" stroke="#222" strokeWidth="8" strokeLinecap="square" />
                <line x1="-60" y1="40" x2={-60 + progress * 1.2} y2="40" stroke="#fff" strokeWidth="8" strokeLinecap="square" />
              </motion.g>
            )}
          </AnimatePresence>

          {/* Phase 1, 2, 3: The White Y */}
          {phase >= 1 && phase < 4 && (
            <motion.g
              animate={{ scale: phase === 3 ? 300 : 1, rotate: phase === 3 ? 45 : 0 }}
              transition={{ duration: 1.2, ease: [0.7, 0, 0.1, 1] }}
            >
              <motion.path
                initial={{ opacity: 0 }}
                animate={{ 
                  d: phase === 1 ? phase1Path : phase2Path,
                  opacity: phase === 3 ? 0 : 1 
                }}
                transition={{ 
                  d: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                  opacity: { duration: 0.4, ease: "easeIn", delay: 0.1 } // Fast fade out to reveal hole
                }}
                stroke="#fff"
                strokeWidth="24"
                strokeLinecap="square"
                fill="none"
              />
            </motion.g>
          )}
        </svg>
      </svg>

      {/* ODOMETER NUMBER */}
      <motion.div
        animate={{ opacity: phase >= 3 ? 0 : 1, y: phase >= 3 ? 50 : 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          position: 'absolute', bottom: '4vw', left: '4vw',
          fontSize: 'clamp(100px, 18vw, 250px)', fontWeight: '500',
          lineHeight: 1, letterSpacing: '-0.04em'
        }}
      >
        <Odometer value={progress} />
      </motion.div>
    </motion.div>
  );
}
