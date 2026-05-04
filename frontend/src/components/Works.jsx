import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LiquidImage from './LiquidImage';

const projects = [
  { name: 'LUSION ARCHIVE', category: 'WebGL & Motion', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop' },
  { name: 'BUZZWORTHY', category: 'Creative Direction', img: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2000&auto=format&fit=crop' },
  { name: 'ET STUDIO', category: 'E-Commerce Ecosystem', img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop' },
  { name: 'MINECRAFT HUB', category: 'React Architecture', img: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2000&auto=format&fit=crop' }
];

export default function Works({ mousePos }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section style={{ padding: '15vh 6vw', position: 'relative', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
      <div style={{ fontSize: '14px', fontWeight: '800', letterSpacing: '6px', color: '#FF5722', textTransform: 'uppercase', marginBottom: '10vh' }}>
        [ The Archive ]
      </div>

      <div style={{ position: 'relative', zIndex: 2 }}>
        {projects.map((project, i) => (
          <motion.div 
            key={i}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              padding: '4vh 0', 
              borderBottom: '1px solid rgba(0,0,0,0.1)',
              cursor: 'none',
              pointerEvents: 'auto'
            }}
          >
            <h2 style={{ 
              fontSize: 'clamp(40px, 8vw, 120px)', 
              fontFamily: "'Syne', sans-serif", 
              fontWeight: '800', 
              margin: 0, 
              letterSpacing: '-0.02em', 
              color: hoveredIndex === i ? '#FF5722' : '#111',
              transition: 'color 0.4s ease, transform 0.4s ease',
              transform: hoveredIndex === i ? 'translateX(2vw)' : 'translateX(0)'
            }}>
              {project.name}
            </h2>
            <div style={{ 
              fontSize: '14px', 
              fontWeight: '800', 
              letterSpacing: '2px', 
              textTransform: 'uppercase', 
              color: '#888',
              opacity: hoveredIndex === i ? 1 : 0,
              transition: 'opacity 0.4s ease'
            }}>
              {project.category}
            </div>
          </motion.div>
        ))}
      </div>

      {/* FLOATING IMAGE REVEAL (GOD TIER) */}
      <AnimatePresence>
        {hoveredIndex !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              rotate: 0,
              x: mousePos.x - 200, 
              y: mousePos.y - 250 
            }}
            exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20, mass: 0.5 }}
            style={{ 
              position: 'fixed', 
              top: 0, 
              left: 0, 
              width: '400px', 
              height: '500px', 
              pointerEvents: 'none', 
              zIndex: 1,
              overflow: 'hidden',
              borderRadius: '8px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
            }}
          >
            <React.Suspense fallback={<div style={{ background: '#111', width: '100%', height: '100%' }} />}>
              <LiquidImage 
                src={projects[hoveredIndex].img} 
                mousePos={mousePos} 
              />
            </React.Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
