import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function Cursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      // Check if we are hovering over something interactive (like a link or button or text)
      const target = e.target;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Framer Motion spring physics for the cursor trail
  const cursorX = useSpring(mousePosition.x, { stiffness: 500, damping: 28, mass: 0.5 });
  const cursorY = useSpring(mousePosition.y, { stiffness: 500, damping: 28, mass: 0.5 });

  useEffect(() => {
    cursorX.set(mousePosition.x);
    cursorY.set(mousePosition.y);
  }, [mousePosition, cursorX, cursorY]);

  return (
    <>
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {/* The main solid dot */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '12px', height: '12px',
          borderRadius: '50%',
          backgroundColor: '#FF5722',
          pointerEvents: 'none',
          zIndex: 999999,
          translateX: '-50%', translateY: '-50%',
          x: mousePosition.x,
          y: mousePosition.y,
          mixBlendMode: 'difference'
        }}
        animate={{
          scale: isHovering ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* The spring-based trail ring */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '40px', height: '40px',
          borderRadius: '50%',
          border: '2px solid #FF5722',
          pointerEvents: 'none',
          zIndex: 999998,
          translateX: '-50%', translateY: '-50%',
          x: cursorX,
          y: cursorY,
          mixBlendMode: 'difference'
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'rgba(255, 87, 34, 0.2)' : 'transparent',
          borderWidth: isHovering ? '1px' : '2px'
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
