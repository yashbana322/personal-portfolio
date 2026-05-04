import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LusionLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0); // 0: counting, 1: transforming to Y, 2: zooming, 3: done

  useEffect(() => {
    // Count up to 100
    let current = 0;
    const duration = 2000; // 2 seconds
    const intervalTime = 20;
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= 100) {
        setProgress(100);
        clearInterval(timer);
        setTimeout(() => setPhase(1), 200); // Start Y transform
      } else {
        setProgress(Math.floor(current));
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (phase === 1) {
      setTimeout(() => setPhase(2), 800); // Start zoom after Y forms
    } else if (phase === 2) {
      setTimeout(() => {
        setPhase(3);
        setTimeout(onComplete, 500); // Give time for fade out
      }, 1500); // Zoom duration
    }
  }, [phase, onComplete]);

  // Format progress to be exactly 3 digits (e.g., 000, 089, 100)
  const formattedProgress = progress.toString().padStart(3, '0');

  // The Y shape paths
  // Center is at 50,50.
  // Arms: top-left (30,30) to center (50,50), top-right (70,30) to center (50,50)
  // Stem: center (50,50) to bottom (50,80)

  return (
    <AnimatePresence>
      {phase < 3 && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            backgroundColor: '#000000',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff',
            fontFamily: "'Inter', sans-serif"
          }}
        >
          {/* SVG Shape Container */}
          <motion.div
            animate={
              phase === 2
                ? { scale: 150, rotate: 45, opacity: 0 } // Zoom massively, rotate, and fade to reveal site
                : { scale: 1, rotate: 0, opacity: 1 }
            }
            transition={
              phase === 2
                ? { duration: 1.5, ease: [0.8, 0, 0.1, 1] } // Fast exponential zoom
                : { duration: 0 }
            }
            style={{ width: '100px', height: '100px', position: 'relative' }}
          >
            <svg width="100%" height="100%" viewBox="0 0 100 100">
              {/* Horizontal line initially, then morphs to Y */}
              <motion.path
                d={
                  phase === 0
                    ? "M 40 50 L 60 50 L 60 50" // Small horizontal line
                    : "M 30 30 L 50 50 L 50 80" // Left arm and stem of Y
                }
                stroke={phase === 0 ? (progress > 10 ? "#fff" : "#444") : "#fff"}
                strokeWidth={phase === 0 ? 2 : 8}
                strokeLinecap="square"
                strokeLinejoin="miter"
                fill="none"
                animate={{
                  d: phase === 0 ? "M 40 50 L 60 50 L 60 50" : "M 30 30 L 50 50 L 50 80"
                }}
                transition={{ duration: 0.5, ease: "circOut" }}
              />
              {/* Second part of Y: right arm */}
              <motion.path
                d={
                  phase === 0
                    ? "M 50 50 L 50 50" // Hidden in center
                    : "M 70 30 L 50 50" // Right arm
                }
                stroke="#fff"
                strokeWidth={8}
                strokeLinecap="square"
                strokeLinejoin="miter"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: phase > 0 ? 1 : 0,
                  opacity: phase > 0 ? 1 : 0
                }}
                transition={{ duration: 0.4, ease: "circOut", delay: 0.1 }}
              />
            </svg>
          </motion.div>

          {/* Loading Number */}
          <motion.div
            animate={{
              opacity: phase >= 2 ? 0 : 1,
              y: phase >= 2 ? 50 : 0
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              position: 'absolute',
              bottom: '4vw',
              left: '4vw',
              fontSize: 'clamp(60px, 12vw, 160px)',
              fontWeight: '400',
              lineHeight: 1,
              letterSpacing: '-0.05em'
            }}
          >
            {formattedProgress}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
