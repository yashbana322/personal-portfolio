import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Environment, Float } from '@react-three/drei';

const services = [
  { id: '01', title: 'Creative Development', desc: 'We build immersive interactive environments using WebGL, Three.js, and raw GLSL shaders. We push pixels to their mathematical limit to create fluid, cinematic experiences.' },
  { id: '02', title: 'Motion Physics', desc: 'No more static websites. We orchestrate buttery-smooth choreographies using GSAP, Lenis, and complex spring physics to make every interaction feel alive.' },
  { id: '03', title: 'System Architecture', desc: 'Beautiful design means nothing if it crashes. We build robust, highly scalable React ecosystems powered by resilient backends and flawless pipelines.' }
];

function GlassMorph({ activeIndex }) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.15;
    meshRef.current.rotation.y += delta * 0.2;
    
    // Smoothly scale based on active index
    const targetScale = activeIndex !== null ? 1.2 : 1;
    meshRef.current.scale.lerp({ x: targetScale, y: targetScale, z: targetScale }, 0.05);
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        {activeIndex === 0 ? <torusGeometry args={[1.2, 0.4, 64, 100]} /> : 
         activeIndex === 1 ? <octahedronGeometry args={[1.5, 2]} /> :
         activeIndex === 2 ? <icosahedronGeometry args={[1.5, 0]} /> :
         <sphereGeometry args={[1.4, 64, 64]} />
        }
        <MeshTransmissionMaterial 
          thickness={2} 
          roughness={0} 
          transmission={1} 
          ior={1.2} 
          chromaticAberration={0.04} 
          color="#ffffff"
          clearcoat={1}
        />
      </mesh>
    </Float>
  );
}

export default function Capabilities() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section style={{ padding: '15vh 6vw', position: 'relative', borderTop: '1px solid rgba(0,0,0,0.1)', display: 'flex', gap: '6vw', minHeight: '80vh', alignItems: 'center' }}>
      
      <div style={{ flex: '1.2', zIndex: 2 }}>
        <div style={{ fontSize: '14px', fontWeight: '800', letterSpacing: '6px', color: '#FF5722', textTransform: 'uppercase', marginBottom: '8vh' }}>
          [ Capabilities ]
        </div>

        <div>
          {services.map((service, i) => (
            <div key={i} style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
              <button 
                onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                style={{ 
                  width: '100%', 
                  background: 'none', 
                  border: 'none', 
                  textAlign: 'left', 
                  padding: '5vh 0', 
                  display: 'flex', 
                  alignItems: 'center',
                  cursor: 'none',
                  pointerEvents: 'auto'
                }}
              >
                <span style={{ fontSize: '14px', fontWeight: '800', color: '#FF5722', marginRight: '40px' }}>
                  {service.id}
                </span>
                <h3 style={{ 
                  fontSize: 'clamp(24px, 4vw, 48px)', 
                  fontFamily: "'Manrope', sans-serif", 
                  fontWeight: '500', 
                  margin: 0, 
                  color: activeIndex === i ? '#FF5722' : '#111',
                  transition: 'color 0.4s ease'
                }}>
                  {service.title}
                </h3>
                <motion.div 
                  animate={{ rotate: activeIndex === i ? 45 : 0 }} 
                  style={{ fontSize: '24px', fontWeight: '300', marginLeft: 'auto', color: '#111' }}
                >
                  +
                </motion.div>
              </button>
              
              <AnimatePresence>
                {activeIndex === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ paddingLeft: 'calc(14px + 40px)', paddingBottom: '5vh' }}>
                      <p style={{ fontSize: '18px', fontWeight: '300', color: '#555', lineHeight: 1.8, maxWidth: '500px', margin: 0 }}>
                        {service.desc}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* GOD TIER FROSTED GLASS OBJECT RENDERING */}
      <div style={{ flex: '0.8', position: 'relative', minHeight: '600px', pointerEvents: 'none' }}>
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} style={{ width: '100%', height: '100%' }}>
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
          <directionalLight position={[-10, -10, -10]} intensity={1} color="#FF5722" />
          <Environment preset="studio" />
          <GlassMorph activeIndex={activeIndex} />
        </Canvas>
      </div>

    </section>
  );
}
