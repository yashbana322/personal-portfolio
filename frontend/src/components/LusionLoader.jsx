import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Odometer({ value }) {
  const digits = value.toString().padStart(3, '0').split('');
  return (
    <div style={{ display: 'flex', height: '1em', overflow: 'hidden' }}>
      {digits.map((digit, i) => (
        <div key={i} style={{ position: 'relative', width: '0.55em', height: '1em' }}>
          <AnimatePresence mode="popLayout">
            <motion.div
              key={digit}
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
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
  // 0: progress bar
  // 1: floating broken lines
  // 2: Y shape formed
  // 3: zoom out

  useEffect(() => {
    let current = 0;
    const duration = 2500; 
    const intervalTime = 30;
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= 100) {
        setProgress(100);
        clearInterval(timer);
        setTimeout(() => setPhase(1), 100); // Trigger floating lines
      } else {
        setProgress(Math.floor(current));
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (phase === 1) {
      setTimeout(() => setPhase(2), 600); // Form Y
    } else if (phase === 2) {
      setTimeout(() => {
        setPhase(3); // Zoom out
        setTimeout(onComplete, 800); // Complete
      }, 800);
    }
  }, [phase, onComplete]);

  // Line dimensions
  const lineW = 40;
  const lineH = 8;

  return (
    <AnimatePresence>
      {phase < 3 && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            backgroundColor: '#000000',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            color: '#fff', fontFamily: "'Inter', sans-serif"
          }}
        >
          {/* CENTER ANIMATION */}
          <motion.div
            animate={
              phase === 3
                ? { scale: 120, opacity: 0 }
                : { scale: 1, opacity: 1 }
            }
            transition={
              phase === 3
                ? { duration: 1.2, ease: [0.8, 0, 0.1, 1] }
                : { duration: 0 }
            }
            style={{ position: 'relative', width: '100px', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            {/* PROGRESS BAR (PHASE 0) */}
            <AnimatePresence>
              {phase === 0 && (
                <motion.div
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  style={{ position: 'absolute', width: '100px', height: '6px', background: '#222' }}
                >
                  <motion.div
                    style={{ height: '100%', background: '#fff' }}
                    initial={{ width: '0%' }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "linear", duration: 0.1 }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* THE "Y" BLOCKS (PHASE 1 & 2) */}
            {phase >= 1 && (
              <>
                {/* Left Arm */}
                <motion.div
                  initial={{ x: -30, y: -10, rotate: 0, opacity: 0 }}
                  animate={
                    phase === 1 
                      ? { x: -20, y: -10, rotate: 15, opacity: 1 } 
                      : { x: -12, y: -14, rotate: -45, opacity: 1 }
                  }
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{ position: 'absolute', width: lineW, height: lineH, background: '#fff' }}
                />
                
                {/* Right Arm */}
                <motion.div
                  initial={{ x: 30, y: -10, rotate: 0, opacity: 0 }}
                  animate={
                    phase === 1 
                      ? { x: 20, y: -10, rotate: -15, opacity: 1 } 
                      : { x: 12, y: -14, rotate: 45, opacity: 1 }
                  }
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{ position: 'absolute', width: lineW, height: lineH, background: '#fff' }}
                />

                {/* Stem */}
                <motion.div
                  initial={{ x: 0, y: 20, rotate: 0, opacity: 0 }}
                  animate={
                    phase === 1 
                      ? { x: 0, y: 15, rotate: 0, opacity: 1 } 
                      : { x: 0, y: 14, rotate: 90, opacity: 1 }
                  }
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{ position: 'absolute', width: lineW, height: lineH, background: '#fff' }}
                />
              </>
            )}
          </motion.div>

          {/* ODOMETER NUMBER */}
          <motion.div
            animate={{ opacity: phase === 3 ? 0 : 1, y: phase === 3 ? 50 : 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
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
