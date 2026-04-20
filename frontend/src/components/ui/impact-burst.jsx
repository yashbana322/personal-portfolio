import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function ImpactBurst() {
  const containerRef = useRef(null);
  const crossRef = useRef(null);
  const linesRef = useRef([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Layer C: Camera Jitter (Screen Shake) for the first 500ms
    gsap.to(document.body, {
      x: () => gsap.utils.random(-6, 6),
      y: () => gsap.utils.random(-6, 6),
      duration: 0.05,
      repeat: 10,
      yoyo: true,
      onComplete: () => gsap.set(document.body, { x: 0, y: 0 })
    });

    // Layer B: The Cross Shockwave - instantly scales up and fades out
    gsap.fromTo(crossRef.current,
      { scale: 0, opacity: 1 },
      { scale: 8, opacity: 0, duration: 0.4, ease: "power4.out" }
    );

    // Layer A: Radial Speed Lines - Scale Jitter and Staggered Opacity
    linesRef.current.forEach((line, index) => {
      gsap.to(line, {
        scaleY: () => gsap.utils.random(0.8, 1.3),
        opacity: () => gsap.utils.random(0.1, 0.9),
        duration: 0.05,
        repeat: -1,
        yoyo: true,
        delay: index * 0.01,
        ease: "none"
      });
    });

    // Optional: Periodically re-trigger the shockwave to keep the energy up
    const interval = setInterval(() => {
      gsap.to(document.body, {
        x: () => gsap.utils.random(-4, 4),
        y: () => gsap.utils.random(-4, 4),
        duration: 0.05,
        repeat: 6,
        yoyo: true,
        onComplete: () => gsap.set(document.body, { x: 0, y: 0 })
      });
      gsap.fromTo(crossRef.current,
        { scale: 0, opacity: 1 },
        { scale: 8, opacity: 0, duration: 0.4, ease: "power4.out" }
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Create 24 radial lines
  const numLines = 24;
  const lines = Array.from({ length: numLines }).map((_, i) => {
    const angle = (360 / numLines) * i;
    // Randomize length and thickness slightly for anime feel
    const thickness = 10 + Math.random() * 30; 
    
    return (
      <div
        key={i}
        ref={el => linesRef.current[i] = el}
        style={{
          position: 'absolute',
          top: '-20px', // Center alignment adjustment
          left: `-${thickness / 2}px`, // Center horizontally
          width: `${thickness}px`,
          height: '150vh',
          background: '#111',
          transformOrigin: 'top center',
          transform: `rotate(${angle}deg) translateY(120px)`, // Push out from center
          clipPath: 'polygon(0% 100%, 100% 100%, 50% 0%)', // Triangle pointing to center
        }}
      />
    );
  });

  return (
    <div ref={containerRef} style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '0',
      height: '0',
      zIndex: -1, 
      pointerEvents: 'none',
      mixBlendMode: 'overlay', // Burns through background
    }}>
      {/* Layer A: Radial Speed Lines */}
      {lines}

      {/* Layer B: The Impact Cross */}
      <div ref={crossRef} style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '200px',
        height: '200px',
        transform: 'translate(-50%, -50%)',
        opacity: 0,
        mixBlendMode: 'difference' // Burns through
      }}>
        {/* X shape using two thick lines */}
        <div style={{ position: 'absolute', top: '50%', left: '0', width: '100%', height: '40px', background: 'white', transform: 'translateY(-50%) rotate(45deg)' }} />
        <div style={{ position: 'absolute', top: '0', left: '50%', width: '40px', height: '100%', background: 'white', transform: 'translateX(-50%) rotate(45deg)' }} />
      </div>
    </div>
  );
}
