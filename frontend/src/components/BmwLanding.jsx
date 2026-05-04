import React, { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, Float, PresentationControls, ContactShadows, useProgress, Html } from '@react-three/drei';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import gsap from 'gsap';

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center zIndexRange={[100, 0]}>
      <div style={{ 
        color: '#111', 
        fontSize: '40px', 
        fontWeight: 900, 
        fontFamily: "'Inter', sans-serif", 
        letterSpacing: '-2px',
        background: '#fff',
        padding: '20px 40px',
        borderRadius: '8px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
      }}>
        {progress.toFixed(0)}%
      </div>
    </Html>
  );
}

function Pointer({ position, text, flip = false, opacity }) {
  return (
    <Html position={position} center zIndexRange={[100, 0]} style={{ pointerEvents: 'none' }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0', 
        flexDirection: flip ? 'row-reverse' : 'row',
        opacity: opacity,
        transform: `scale(${0.5 + opacity * 0.5})`,
        transition: 'opacity 0.1s, transform 0.1s',
        whiteSpace: 'nowrap'
      }}>
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FF5722', border: '1px solid #fff' }} />
        <div style={{ width: '80px', height: '1px', background: 'rgba(255,255,255,0.8)' }} />
        <div style={{ 
          background: 'rgba(255,255,255,0.95)', 
          padding: '6px 12px', 
          border: '1px solid rgba(0,0,0,0.1)',
          color: '#111',
          fontSize: '11px',
          fontWeight: '800',
          fontFamily: "'Inter', sans-serif",
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          borderRadius: '2px',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          {text}
        </div>
      </div>
    </Html>
  );
}

function Annotations() {
  const [opacity, setOpacity] = useState(0);

  useFrame(() => {
    const scrollY = window.scrollY;
    const vh = window.innerHeight;
    
    if (scrollY > vh * 0.8) {
      setOpacity(THREE.MathUtils.lerp(opacity, 1, 0.1));
    } else {
      setOpacity(THREE.MathUtils.lerp(opacity, 0, 0.1));
    }
  });

  return (
    <group visible={opacity > 0.01}>
      <Pointer position={[2.2, -1.0, 1.0]} text="Michelin Pilot Sport GT" flip={false} opacity={opacity} />
      <Pointer position={[-2.5, -1.0, 1.0]} text="590 Horsepower" flip={false} opacity={opacity} />
      <Pointer position={[3.5, 0.5, 0.5]} text="P68 Twin-Turbo V8" flip={false} opacity={opacity} />
      <Pointer position={[-4.5, 2.0, 0]} text="Carbon Fiber Aero" flip={false} opacity={opacity} />
    </group>
  );
}

function BmwModel({ onLanded, hasLanded, isLoaded }) {
  const { scene } = useGLTF('/bmw.glb');
  const positionGroup = useRef();

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material.envMapIntensity = 2.5; 
          child.material.needsUpdate = true;
        }
      }
    });

    if (window.scrollY > 50) {
      if (onLanded) onLanded();
      let p = window.scrollY / window.innerHeight;
      if (p >= 0.8) {
        positionGroup.current.position.set(-4.0, 0, 0);
        positionGroup.current.rotation.set(0.1, -1.0, 0);
      } else {
        positionGroup.current.position.set(0, 0, 0);
        positionGroup.current.rotation.set(0.5, -0.8, 0.15);
      }
    } else if (!isLoaded) {
      // Suspend it high up while loader is running so we don't see it sitting on the ground
      positionGroup.current.position.set(0, 15, -5);
      positionGroup.current.rotation.set(1.5, -1.5, -0.5);
    } else {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(
        positionGroup.current.position,
        { y: 15, z: -5 },
        { 
          y: 0, z: 0, duration: 2.5, ease: "power4.out",
          onComplete: () => {
            document.body.style.overflow = 'auto';
            if (onLanded) onLanded();
          }
        }
      );
      
      gsap.fromTo(
        positionGroup.current.rotation,
        { x: 1.5, y: -1.5, z: -0.5 },
        { x: 0.5, y: -0.8, z: 0.15, duration: 2.5, ease: "power4.out" } 
      );
    }

    return () => { document.body.style.overflow = 'auto'; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene, isLoaded]);

  useFrame(() => {
    if (!hasLanded) return;
    
    const scrollY = window.scrollY;
    const vh = window.innerHeight;
    
    let targetPos = new THREE.Vector3(0, 0, 0);
    let targetRot = new THREE.Euler(0.5, -0.8, 0.15);
    
    if (scrollY < vh * 0.1) {
      targetPos.set(0, 0, 0);
      targetRot.set(0.5, -0.8, 0.15);
    } else if (scrollY < vh * 0.9) {
      const t = (scrollY - vh * 0.1) / (vh * 0.8);
      targetPos.set(
        THREE.MathUtils.lerp(0, -4.0, t), 
        THREE.MathUtils.lerp(0, 0, t),    
        THREE.MathUtils.lerp(0, 0, t)     
      );
      targetRot.set(
        THREE.MathUtils.lerp(0.5, 0.1, t),
        THREE.MathUtils.lerp(-0.8, -1.0, t),
        THREE.MathUtils.lerp(0.15, 0, t)
      );
    } else {
      targetPos.set(-4.0, 0, 0);
      targetRot.set(0.1, -1.0, 0);
    }
    
    positionGroup.current.position.lerp(targetPos, 0.05);
    const currentQuat = new THREE.Quaternion().setFromEuler(positionGroup.current.rotation);
    const targetQuat = new THREE.Quaternion().setFromEuler(targetRot);
    currentQuat.slerp(targetQuat, 0.05);
    positionGroup.current.rotation.setFromQuaternion(currentQuat);

    let tintAmount = 0;
    if (scrollY > vh * 0.2 && scrollY < vh * 0.8) {
      tintAmount = (scrollY - vh * 0.2) / (vh * 0.6);
    } else if (scrollY >= vh * 0.8) {
      tintAmount = 1;
    }

    const targetColor = new THREE.Color('#FF5722');
    
    try {
      scene.traverse((child) => {
        if (child.isMesh && child.material && child.material.color) {
          const name = child.material.name.toLowerCase();
          if (name.includes('glass') || name.includes('tire') || name.includes('rubber') || name.includes('black') || name.includes('dark')) return;
          
          if (!child.material.userData.originalColor) {
            child.material.userData.originalColor = child.material.color.clone();
          }
          const orig = child.material.userData.originalColor;
          child.material.color.lerpColors(orig, targetColor, tintAmount * 0.5); 
        }
      });
    } catch (e) {}
  });

  return (
    <group ref={positionGroup}>
      <Float speed={2} rotationIntensity={0.05} floatIntensity={0.5}>
        <primitive object={scene} scale={2.4} position={[0, -1.5, 0]} />
        <Annotations />
      </Float>
    </group>
  );
}

useGLTF.preload('/bmw.glb');


// GOD TIER UI COMPONENTS

const techData = {
  'React.js': {
    creator: 'META — 2013',
    headline: 'THE STANDARD FOR HYPER-RESPONSIVE INTERFACES.',
    desc: 'Component-driven architecture completely redefined frontend scalability. We leverage its virtual DOM to build interfaces that feel instantaneous, maintaining complex application states without sacrificing 60fps performance.',
    expertise: 'Bespoke hooks, aggressive memoization, and liquid-smooth unmounting.'
  },
  'Node.js': {
    creator: 'RYAN DAHL — 2009',
    headline: 'ASYNCHRONOUS EVENT-DRIVEN ORCHESTRATION.',
    desc: 'The backbone of our network infrastructure. Node.js allows us to build massively scalable, real-time microservices that handle extreme concurrency without blocking the main thread.',
    expertise: 'WebSockets, robust API gateways, and ultra-low latency streams.'
  },
  'PostgreSQL': {
    creator: 'STONEBRAKER — 1996',
    headline: 'UNSHAKEABLE RELATIONAL DATA ARCHITECTURE.',
    desc: 'The absolute gold standard for data integrity. We use Postgres for its bulletproof ACID compliance, advanced JSONB indexing, and rock-solid reliability under extreme production loads.',
    expertise: 'Complex schema design, raw query optimization, and terabyte-scale scaling.'
  },
  'Framer Motion': {
    creator: 'FRAMER — 2019',
    headline: 'PHYSICS-BASED KINETIC TYPOGRAPHY & LAYOUTS.',
    desc: 'The engine behind our Awwwards-winning interactions. It replaces static CSS transitions with spring physics, giving our digital products a premium, tactile feel that responds to user intent.',
    expertise: 'Scroll-linked orchestrations, layout projections, and path morphing.'
  },
  'Tailwind': {
    creator: 'ADAM WATHAN — 2017',
    headline: 'UTILITY-FIRST DESIGN SYSTEM ENFORCEMENT.',
    desc: 'We ditched semantic CSS for rigid, scalable utility classes. Tailwind allows us to rapidly prototype and enforce strict design tokens across enterprise codebases without stylesheet bloat.',
    expertise: 'Custom JIT configurations, complex arbitrary variants, and headless UI.'
  },
  'AWS': {
    creator: 'AMAZON — 2006',
    headline: 'PLANETARY-SCALE INFRASTRUCTURE.',
    desc: 'The foundation of our cloud strategy. We architect unshakeable, auto-scaling environments that guarantee 99.99% uptime and edge-delivery of assets to users worldwide.',
    expertise: 'Serverless Lambda, S3/CloudFront distributions, and EC2 load balancing.'
  },
  'Docker': {
    creator: 'SOLOMON HYKES — 2013',
    headline: 'DETERMINISTIC CONTAINERIZED ENVIRONMENTS.',
    desc: 'Our deployment standard. By containerizing our applications, we eliminate the "works on my machine" paradigm, guaranteeing identical execution from local development to production Kubernetes clusters.',
    expertise: 'Multi-stage builds, alpine image optimization, and docker-compose.'
  },
  'Python': {
    creator: 'VAN ROSSUM — 1991',
    headline: 'ALGORITHMIC HEAVY LIFTING & AI INTEGRATION.',
    desc: 'The undisputed king of data science and automation. We deploy Python when the pipeline demands complex data engineering, machine learning integrations, or high-throughput task queues.',
    expertise: 'FastAPI microservices, Celery workers, and LLM orchestration.'
  },
  'Redis': {
    creator: 'SANFILIPPO — 2009',
    headline: 'SUB-MILLISECOND IN-MEMORY MEMORY STORE.',
    desc: 'Our weapon for latency reduction. As an in-memory data structure store, Redis powers our session caching, real-time leaderboards, and ultra-fast pub/sub messaging systems.',
    expertise: 'Distributed caching, rate limiting, and highly available clusters.'
  },
  'GraphQL': {
    creator: 'META — 2015',
    headline: 'PRECISE, CLIENT-DRIVEN DATA GRAPH FETCHING.',
    desc: 'We eliminated REST endpoint sprawl. GraphQL provides a unified schema, empowering our client applications to request exactly the data they need, drastically reducing payload sizes and over-fetching.',
    expertise: 'Apollo Federation, complex resolvers, and real-time subscriptions.'
  }
};

function TechModal({ tech, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  if (!tech) return null;
  const data = techData[tech] || techData['React.js'];
  
  return (
    <motion.div 
      initial={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' }}
      animate={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
      exit={{ clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      style={{ 
        position: 'fixed', inset: 0, zIndex: 9999, 
        background: '#ffffff', pointerEvents: 'auto',
        display: 'flex', color: '#111'
      }}
    >
      <div style={{ position: 'absolute', top: 0, right: 0, width: '40%', height: '100%', background: 'radial-gradient(circle at center, rgba(255,87,34,0.08) 0%, transparent 70%)', filter: 'blur(80px)', zIndex: 0 }} />
      
      <div style={{ position: 'absolute', top: '40px', right: '40px', zIndex: 10 }}>
        <button onClick={onClose} style={{ background: 'transparent', border: '2px solid #111', borderRadius: '50px', color: '#111', padding: '12px 24px', fontSize: '12px', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 'bold', transition: '0.3s' }} onMouseOver={e => { e.currentTarget.style.background='#111'; e.currentTarget.style.color='#fff'; }} onMouseOut={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#111'; }}>
          Close [✕]
        </button>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '8vw', zIndex: 1 }}>
        <div style={{ display: 'flex', gap: '6vw', height: '100%', alignItems: 'center' }}>
          
          <div style={{ flex: '1.2', display: 'flex', flexDirection: 'column' }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={{ fontSize: '12px', letterSpacing: '4px', textTransform: 'uppercase', color: '#FF5722', marginBottom: '20px', fontWeight: 'bold' }}>
              {data.creator}
            </motion.div>
            <motion.h2 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontSize: 'clamp(60px, 10vw, 180px)', margin: '0 0 60px 0', fontWeight: '900', letterSpacing: '-0.05em', lineHeight: 0.8, WebkitTextStroke: '2px #111', color: 'transparent', textTransform: 'uppercase' }}
            >
              {tech}
            </motion.h2>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} style={{ maxWidth: '500px', borderTop: '2px solid #111', paddingTop: '30px' }}>
              <h4 style={{ fontSize: '10px', color: '#666', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '15px' }}>Our Expertise</h4>
              <p style={{ fontSize: '18px', lineHeight: 1.6, color: '#444' }}>{data.expertise}</p>
            </motion.div>
          </div>

          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <motion.h3 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              style={{ fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: '600', letterSpacing: '-0.02em', lineHeight: 1.2, margin: '0 0 30px 0', color: '#FF5722' }}
            >
              {data.headline}
            </motion.h3>
            <motion.p 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              style={{ fontSize: 'clamp(18px, 2vw, 24px)', color: '#666', lineHeight: 1.6, fontWeight: '500', maxWidth: '600px' }}
            >
              {data.desc}
            </motion.p>
          </div>

        </div>
      </div>
    </motion.div>
  );
}

function RevealText({ children, delay = 0 }) {
  return (
    <div style={{ overflow: 'hidden', display: 'inline-block', verticalAlign: 'top', paddingBottom: '10px', marginBottom: '-10px' }}>
      <motion.div
        initial={{ y: '100%' }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}

function StackMarquee({ items, direction, onTechClick }) {
  return (
    <div style={{ display: 'flex', whiteSpace: 'nowrap', overflow: 'hidden', padding: '20px 0' }}>
      <motion.div
        animate={{ x: direction === 1 ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{ repeat: Infinity, ease: 'linear', duration: 40 }}
        style={{ display: 'flex', gap: '60px', paddingRight: '60px' }}
      >
        {[...Array(2)].map((_, i) => (
          <div key={i} style={{ display: 'flex', gap: '60px' }}>
            {items.map(tech => (
              <span 
                key={tech + i} 
                onClick={() => onTechClick(tech)}
                style={{ 
                  display: 'inline-block', 
                  fontSize: 'clamp(80px, 12vw, 180px)', 
                  fontWeight: '900', 
                  WebkitTextStroke: '2px #111', 
                  color: 'transparent', 
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  transition: 'color 0.4s ease, transform 0.4s ease'
                }}
                onMouseOver={e => { e.currentTarget.style.color = '#FF5722'; e.currentTarget.style.transform = 'scale(1.05)'; }}
                onMouseOut={e => { e.currentTarget.style.color = 'transparent'; e.currentTarget.style.transform = 'scale(1)'; }}
              >
                {tech}
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function PipelineStep({ num, title, desc }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div 
      onMouseEnter={() => setHovered(true)} 
      onMouseLeave={() => setHovered(false)}
      style={{ 
        borderBottom: '1px solid rgba(0,0,0,0.1)', 
        padding: '60px 4vw', 
        position: 'relative', 
        overflow: 'hidden',
        cursor: 'pointer'
      }}
    >
      <motion.div 
        animate={{ height: hovered ? '100%' : '0%' }} 
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', background: '#FF5722', zIndex: 0 }}
      />
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
        <span style={{ fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: '500', color: hovered ? 'rgba(255,255,255,0.8)' : '#aaa', transition: 'color 0.5s' }}>
          {num}
        </span>
        <div>
          <h3 style={{ fontSize: 'clamp(40px, 6vw, 80px)', margin: '0 0 10px 0', fontWeight: '800', letterSpacing: '-0.03em', color: hovered ? '#fff' : '#111', transition: 'color 0.5s' }}>
            {title}
          </h3>
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: hovered ? 'auto' : 0, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{ fontSize: 'clamp(18px, 2vw, 24px)', margin: '20px 0 0 0', color: '#fff', fontWeight: '500', maxWidth: '800px', lineHeight: 1.6 }}>
              {desc}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function ProjectRow({ title, img, link }) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <a 
      href={link} target="_blank" rel="noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        padding: '60px 0', 
        borderBottom: '1px solid rgba(255,255,255,0.1)', 
        textDecoration: 'none', 
        color: '#fff',
        position: 'relative'
      }}
    >
      <motion.div 
        animate={{ x: isHovered ? 40 : 0 }} 
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <h3 style={{ fontSize: 'clamp(50px, 7vw, 100px)', fontWeight: '400', margin: 0, letterSpacing: '-0.03em' }}>
          <RevealText>{title}</RevealText>
        </h3>
      </motion.div>
      
      <motion.div 
        animate={{ 
          opacity: isHovered ? 1 : 0, 
          scale: isHovered ? 1 : 0.8, 
          rotate: isHovered ? 0 : -10,
          x: mousePos.x - 200, 
          y: mousePos.y - 150  
        }}
        transition={{ 
          opacity: { duration: 0.3 }, 
          scale: { duration: 0.3 }, 
          rotate: { duration: 0.3 },
          x: { type: "spring", stiffness: 100, damping: 20 },
          y: { type: "spring", stiffness: 100, damping: 20 }
        }}
        style={{ 
          position: 'absolute', 
          top: 0, left: 0,
          width: '400px', 
          height: '300px', 
          borderRadius: '8px', 
          overflow: 'hidden',
          pointerEvents: 'none',
          boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
          zIndex: 100
        }}
      >
        <img src={img} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </motion.div>
    </a>
  );
}

function FluidBackground() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  
  return (
    <div 
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0, background: '#050505' }}
    >
      <motion.div
        animate={{ x: mouse.x - 400, y: mouse.y - 400 }}
        transition={{ type: "tween", ease: "circOut", duration: 1.5 }}
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '800px', height: '800px',
          background: 'radial-gradient(circle, rgba(60,20,200,0.6) 0%, rgba(0,150,255,0.3) 40%, transparent 70%)',
          borderRadius: '50%', filter: 'blur(80px)',
        }}
      />
      <motion.div
        animate={{ x: mouse.x * -0.1, y: mouse.y * -0.1 }}
        transition={{ type: "tween", ease: "linear", duration: 4 }}
        style={{
          position: 'absolute',
          bottom: '-20%', right: '-10%',
          width: '1000px', height: '1000px',
          background: 'radial-gradient(circle, rgba(200,40,100,0.4) 0%, transparent 60%)',
          borderRadius: '50%', filter: 'blur(100px)',
        }}
      />
    </div>
  );
}

export default function BmwLanding({ onNavigateToWhoWeAre, isLoaded }) {
  const [hasLanded, setHasLanded] = useState(false);
  const [selectedTech, setSelectedTech] = useState(null);
  const [isHero, setIsHero] = useState(true);
  const { scrollY } = useScroll();
  const [vh, setVh] = useState(1000);

  useEffect(() => {
    setVh(window.innerHeight);
    const handleResize = () => setVh(window.innerHeight);
    const handleScroll = () => setIsHero(window.scrollY < window.innerHeight * 0.5);
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const bgColor = useTransform(
    scrollY,
    [0, vh * 0.4, vh * 0.8],
    ['#F8F9FA', '#F8F9FA', '#FF5722']
  );

  const opacityText = useTransform(scrollY, [0, vh * 0.5], [1, 0]);
  const textY1 = useTransform(scrollY, [0, vh], ["0%", "40%"]);
  const textY2 = useTransform(scrollY, [0, vh], ["0%", "-40%"]);

  return (
    <div style={{ position: 'relative', width: '100%', fontFamily: "'Inter', sans-serif" }}>
      
      {/* 1. FIXED ANIMATED BACKGROUND */}
      <motion.div style={{ position: 'fixed', inset: 0, zIndex: 0, backgroundColor: bgColor }} />

      {/* 2. COMPLETELY SYNCED STICKY 3D CANVAS WRAPPER */}
      {/* This spans exactly 200vh. The canvas will be sticky for the first 100vh of scroll (Hero -> Orange Tile), then it will physically scroll UP out of the viewport in absolute perfect sync with the DOM! No parallax clipping bugs ever. */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '200vh', zIndex: 5, pointerEvents: 'none' }}>
        <div style={{ position: 'sticky', top: 0, width: '100%', height: '100vh', pointerEvents: (hasLanded && isHero) ? 'auto' : 'none' }}>
          <Canvas camera={{ position: [0, 0, 14], fov: 45 }}>
            <ambientLight intensity={1.2} />
            <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={2} castShadow shadow-bias={-0.0001} />
            <spotLight position={[-10, 10, -10]} angle={0.3} penumbra={1} intensity={1} color="#FF5722" />
            <directionalLight position={[0, 10, 5]} intensity={1.5} />
            
            <Suspense fallback={<Loader />}>
              <PresentationControls
                global={false}
                cursor={true}
                config={{ mass: 1, tension: 170, friction: 26 }}
                snap={true}
                rotation={[0, 0, 0]}
                polar={[-Math.PI / 4, Math.PI / 4]}
                azimuth={[-Math.PI / 2, Math.PI / 2]}
              >
                <BmwModel onLanded={() => setHasLanded(true)} hasLanded={hasLanded} isLoaded={isLoaded} />
              </PresentationControls>
              <Environment preset="studio" />
              <ContactShadows position={[0, -1.5, 0]} opacity={0.6} scale={20} blur={2.5} far={4} color="#000000" />
            </Suspense>
          </Canvas>
        </div>
      </div>

      {/* 3. SCROLLABLE DOM CONTENT */}
      <div style={{ position: 'relative', pointerEvents: 'none' }}>
        
        {/* HERO SECTION */}
        <section style={{ height: '100vh', position: 'relative' }}>
          <motion.nav 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', padding: '40px 6vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10, pointerEvents: 'auto' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '200px' }}>
              <svg width="32" height="24" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 24L12 0H20L8 24H0Z" fill="#111"/>
                <path d="M12 24L24 0H32L20 24H12Z" fill="#FF5722"/>
              </svg>
              <span style={{ fontSize: '24px', fontWeight: '900', letterSpacing: '-1px', color: '#111' }}>Yash.</span>
            </div>
            <div style={{ display: 'flex', gap: '4vw', fontSize: '14px', fontWeight: '600', color: '#444' }}>
              <span onClick={onNavigateToWhoWeAre} style={{ cursor: 'pointer', color: '#111' }}>About us</span>
              <span style={{ cursor: 'pointer' }}>Services</span>
              <span style={{ cursor: 'pointer' }}>FAQ</span>
              <span style={{ cursor: 'pointer' }}>Reviews</span>
            </div>
            <div style={{ width: '200px', display: 'flex', justifyContent: 'flex-end' }}>
              <button style={{ background: '#111', color: '#fff', padding: '14px 32px', border: 'none', borderRadius: '4px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
                Contact us
              </button>
            </div>
          </motion.nav>

          <motion.div style={{ position: 'absolute', top: '15%', left: '4vw', zIndex: 1, y: textY1, opacity: opacityText }}>
            <motion.h1 
              initial={{ opacity: 0, y: 150 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
              style={{ fontSize: 'clamp(80px, 15vw, 240px)', fontWeight: '900', color: '#e0e0e0', margin: 0, lineHeight: 0.8, letterSpacing: '-0.05em' }}
            >
              Precision
            </motion.h1>
          </motion.div>
          
          <motion.div style={{ position: 'absolute', bottom: '8%', right: '4vw', zIndex: 1, y: textY2, opacity: opacityText }}>
            <motion.h1 
              initial={{ opacity: 0, y: 150 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
              style={{ fontSize: 'clamp(80px, 15vw, 240px)', fontWeight: '900', color: '#e0e0e0', margin: 0, lineHeight: 0.8, letterSpacing: '-0.05em', textAlign: 'right' }}
            >
              Delivery
            </motion.h1>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 1 }}
            style={{ position: 'absolute', bottom: '8%', left: '4vw', zIndex: 10, pointerEvents: 'auto' }}
          >
            <button style={{ background: '#FF5722', color: '#fff', padding: '18px 36px', border: 'none', borderRadius: '4px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', boxShadow: '0 10px 30px rgba(255, 87, 34, 0.3)' }}>
              Let's get your cargo <span style={{ fontSize: '18px' }}>→</span>
            </button>
          </motion.div>
        </section>

        {/* ABOUT US SECTION */}
        <section style={{ height: '100vh', display: 'flex', alignItems: 'center', padding: '0 5vw', position: 'relative' }}>
          {/* FLEX GRID: Left half is completely empty for the car. Right half holds the text. GUARANTEES ZERO OVERLAP. */}
          <div style={{ flex: 1.2 }}></div>
          <div style={{ flex: 0.8, display: 'flex', flexDirection: 'column', justifyContent: 'center', pointerEvents: 'auto', position: 'relative', zIndex: 10, paddingLeft: '4vw' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', fontWeight: '700', letterSpacing: '3px', marginBottom: '40px', textTransform: 'uppercase', color: '#fff' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
              </svg>
              ABOUT US
            </div>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: '600', lineHeight: 1.1, letterSpacing: '-1.5px', color: '#fff', margin: '0 0 40px 0' }}>
              <RevealText>We architect systems with</RevealText><br/>
              <RevealText delay={0.1}>flair and bright innovation.</RevealText><br/>
              <RevealText delay={0.2}>Trusted by those who prize</RevealText><br/>
              <RevealText delay={0.3}>performance, speed, and precision.</RevealText>
            </h2>
            <button onClick={onNavigateToWhoWeAre} style={{ background: '#111', color: '#fff', padding: '16px 32px', border: 'none', borderRadius: '4px', fontSize: '14px', fontWeight: '700', cursor: 'pointer', width: 'fit-content' }}>
              Who we are →
            </button>
          </div>
        </section>

        {/* RECENT WORK SECTION */}
        <section style={{ minHeight: '100vh', position: 'relative', zIndex: 10, padding: '150px 6vw', pointerEvents: 'auto' }}>
          <FluidBackground />
          <div style={{ position: 'relative', zIndex: 10, color: '#fff' }}>
             <h2 style={{ fontSize: 'clamp(60px, 10vw, 150px)', fontWeight: '400', letterSpacing: '-0.04em', marginBottom: '100px', lineHeight: 0.9 }}>
                <RevealText>Bold Ideas,</RevealText><br/>
                <RevealText delay={0.1}><span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.7)' }}>Brought to Life.</span></RevealText>
             </h2>
             <div style={{ display: 'flex', flexDirection: 'column' }}>
                <ProjectRow title="Lusion" img="/lusion.png" link="https://lusion.co/" />
                <ProjectRow title="Buzzworthy" img="/buzzworthy.png" link="https://buzzworthystudio.com/" />
                <ProjectRow title="ET Studio" img="/etstudio.png" link="https://www.e-t.studio/" />
                <ProjectRow title="Minecraft Hub" img="/minecraft.png" link="https://everything-you-need-minecraft-hub-d-nu.vercel.app/" />
             </div>
          </div>
        </section>

        {/* THE CORE STACK (MARQUEE) */}
        <div style={{ pointerEvents: 'auto', position: 'relative', zIndex: 10, background: '#F8F9FA', overflow: 'hidden', padding: '150px 0' }}>
           <div style={{ padding: '0 6vw', marginBottom: '80px' }}>
              <h2 style={{ fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: '900', letterSpacing: '-0.03em', margin: 0, color: '#111' }}>
                <RevealText>The Core</RevealText><br/>
                <RevealText delay={0.1}>Stack.</RevealText>
              </h2>
           </div>
           <StackMarquee items={['React.js', 'Node.js', 'PostgreSQL', 'Framer Motion', 'Tailwind']} direction={1} onTechClick={setSelectedTech} />
           <StackMarquee items={['AWS', 'Docker', 'Python', 'Redis', 'GraphQL']} direction={-1} onTechClick={setSelectedTech} />
        </div>

        {/* EXECUTION PIPELINE (ACCORDION) */}
        <div style={{ pointerEvents: 'auto', position: 'relative', zIndex: 10, background: '#F8F9FA' }}>
           <section style={{ padding: '50px 0 150px 0' }}>
              <div style={{ padding: '0 6vw', marginBottom: '80px' }}>
                <h2 style={{ fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: '900', letterSpacing: '-0.03em', margin: 0, color: '#111' }}>
                  <RevealText>Execution</RevealText><br/>
                  <RevealText delay={0.1}>Pipeline.</RevealText>
                </h2>
              </div>
              <div style={{ borderTop: '1px solid rgba(0,0,0,0.1)' }}>
                {[
                  { num: "01", title: "Discovery", desc: "Analyze business requirements, target audience, and infrastructure to formulate a roadmap. We dive deep into your architecture to ensure scalability from day one." },
                  { num: "02", title: "Architecture", desc: "Design database schemas, robust APIs, and distributed systems for high availability and military-grade security. We plan for extreme traffic spikes." },
                  { num: "03", title: "Development", desc: "Aggressive sprint-based execution using React, Node.js, and modern tools. We write clean, testable, and highly performant code at scale." },
                  { num: "04", title: "Deployment", desc: "Automated CI/CD pipelines, Docker containerization, and zero-downtime launches. We handle the devops so you can focus on growth." }
                ].map((step) => (
                  <PipelineStep key={step.num} {...step} />
                ))}
              </div>
           </section>
        </div>
      </div>

      <AnimatePresence>
        {selectedTech && <TechModal tech={selectedTech} onClose={() => setSelectedTech(null)} />}
      </AnimatePresence>
      
    </div>
  );
}
