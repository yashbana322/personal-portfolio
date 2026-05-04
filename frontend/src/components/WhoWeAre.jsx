import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import WebGLFluid from 'webgl-fluid';
import Capabilities from './Capabilities';
import Contact from './Contact';

gsap.registerPlugin(ScrollTrigger);

// --- GOD TIER SPLIT TEXT REVEAL ---
const SplitTextReveal = ({ text, className, style, delay = 0 }) => {
  const words = text.split(" ");
  return (
    <div className={className} style={{ ...style, display: 'flex', flexWrap: 'wrap', gap: '0.25em' }}>
      {words.map((word, i) => (
        <div key={i} style={{ overflow: 'hidden' }}>
          <motion.div
            initial={{ y: '120%', rotate: 5, opacity: 0 }}
            whileInView={{ y: 0, rotate: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2, delay: delay + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'inline-block', transformOrigin: 'top left' }}
          >
            {word}
          </motion.div>
        </div>
      ))}
    </div>
  );
};

export default function WhoWeAre({ onBack }) {
  const canvasRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Deep Parallax
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { damping: 20, stiffness: 100 });
  const yashY = useTransform(smoothProgress, [0, 1], [0, -250]);
  const shivanshuY = useTransform(smoothProgress, [0, 1], [0, -400]);
  const techY = useTransform(smoothProgress, [0, 1], [0, -100]);

  useEffect(() => {
    window.scrollTo(0, 0);

    // INJECTING HIGH-FASHION FONTS
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;800&family=Syne:wght@400;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // LENIS SCROLL
    const lenis = new Lenis({ duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);

    // LUSION-STYLE ETHEREAL FLUID SETUP
    if (canvasRef.current) {
      WebGLFluid(canvasRef.current, {
        IMMEDIATE: true,
        TRIGGER: 'hover',
        SIM_RESOLUTION: 256, 
        DYE_RESOLUTION: 1024,
        CAPTURE_RESOLUTION: 512,
        DENSITY_DISSIPATION: 3.5, // Fades very fast so it stays minimal and clean
        VELOCITY_DISSIPATION: 1.5, // Less spread
        PRESSURE: 0.1, // Very low pressure for smooth, wispy smoke lines
        PRESSURE_ITERATIONS: 20,
        CURL: 30, // High curl creates that beautiful swirling, iridescent smoke effect
        SPLAT_RADIUS: 0.1, // Very thin, elegant trails
        SPLAT_FORCE: 6000,
        SHADING: false, // Turn off 3D shading for a flatter, softer, Lusion-style aesthetic
        COLORFUL: true, // We keep it colorful, but CSS will crush the saturation into pastels
        PAUSED: false,
        BACK_COLOR: { r: 255, g: 255, b: 255 }, // Pure White Background
        TRANSPARENT: false,
        BLOOM: false, // No bloom, absolute cleanliness
        SUNRAYS: false,
      });
    }

    setTimeout(() => setIsLoading(false), 1500);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      window.removeEventListener('mousemove', handleMouseMove);
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* LUSION-STYLE MINIMAL FLUID LAYER */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'auto' }}>
        <canvas 
          ref={canvasRef} 
          style={{ 
            width: '100vw', 
            height: '100vh', 
            // 1. Opacity 0.35 blends the fluid heavily with the white background underneath, turning colors into pastels.
            // 2. saturate(0.3) crushes the neon rainbow into very faint, elegant iridescent wisps (peach, ice blue, soft purple).
            opacity: 0.35,
            filter: 'saturate(0.3) contrast(1.1)'
          }} 
        />
      </div>

      {/* CONTENT LAYER */}
      <div style={{ color: '#111', fontFamily: "'Manrope', sans-serif", cursor: 'none', position: 'relative', zIndex: 10, pointerEvents: 'none' }}>
        
        {/* PRELOADER */}
        <AnimatePresence>
          {isLoading && (
            <motion.div exit={{ y: '-100%', borderBottomLeftRadius: '50%', borderBottomRightRadius: '50%' }} transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }} style={{ position: 'fixed', inset: 0, background: '#FF5722', zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'auto' }}>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ fontSize: '10vw', fontFamily: "'Syne', sans-serif", fontWeight: '800', color: '#fff', letterSpacing: '-0.02em' }}>
                AWAKENING
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CUSTOM EXCLUSION CURSOR */}
        <motion.div
          animate={{ x: mousePos.x - 10, y: mousePos.y - 10, scale: isHovering ? 4 : 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 28, mass: 0.5 }}
          style={{ position: 'fixed', top: 0, left: 0, width: '20px', height: '20px', background: '#fff', borderRadius: '50%', pointerEvents: 'none', zIndex: 9999, mixBlendMode: 'exclusion' }}
        />
        <motion.div
          animate={{ x: mousePos.x - 40, y: mousePos.y - 40, scale: isHovering ? 0 : 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 25, mass: 0.8 }}
          style={{ position: 'fixed', top: 0, left: 0, width: '80px', height: '80px', border: '1px solid rgba(0,0,0,0.2)', borderRadius: '50%', pointerEvents: 'none', zIndex: 9998 }}
        />

        {/* NAV */}
        <nav style={{ padding: '40px 6vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'fixed', width: '100%', top: 0, zIndex: 100, mixBlendMode: 'exclusion', color: '#fff', pointerEvents: 'none' }}>
          <button onClick={onBack} style={{ pointerEvents: 'auto', background: 'none', border: 'none', fontSize: '14px', fontWeight: '800', color: 'inherit', cursor: 'none', display: 'flex', alignItems: 'center', gap: '10px', textTransform: 'uppercase', letterSpacing: '2px', fontFamily: "'Manrope', sans-serif" }}>
            <span style={{ fontSize: '18px', color: '#FF5722' }}>←</span> RETURN
          </button>
          <div style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '4px', textTransform: 'uppercase' }}>STUDIO</div>
        </nav>

        {/* HERO SECTION */}
        <section style={{ minHeight: '100vh', padding: '15vh 6vw', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ maxWidth: '1400px' }}>
            <div style={{ fontSize: '14px', fontWeight: '800', letterSpacing: '6px', color: '#FF5722', textTransform: 'uppercase', marginBottom: '20px' }}>
              [ Origin Protocol ]
            </div>
            <h1 style={{ fontSize: 'clamp(60px, 12vw, 200px)', fontFamily: "'Syne', sans-serif", fontWeight: '800', letterSpacing: '-0.04em', lineHeight: 0.9, margin: 0, color: '#111' }}>
              <SplitTextReveal text="WE ARE" delay={1.5} />
              <div style={{ color: '#FF5722', paddingLeft: '5vw' }}>
                <SplitTextReveal text="THE ARCHITECTS" delay={1.8} />
              </div>
            </h1>
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, delay: 2.2, ease: [0.16, 1, 0.3, 1] }} style={{ marginTop: '10vh', maxWidth: '800px', marginLeft: 'auto' }}>
              <p style={{ fontSize: '24px', fontWeight: '400', color: '#444', lineHeight: 1.6, marginBottom: '30px' }}>
                We don’t just build websites. We engineer high-fidelity digital ecosystems. Born from an obsession with <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: '700', color: '#FF5722' }}>fluid motion</span>, <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: '700', color: '#FF5722' }}>sharp typography</span>, and <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: '700', color: '#FF5722' }}>raw code</span>, we push the boundaries of what browsers can handle.
              </p>
              <p style={{ fontSize: '18px', fontWeight: '300', color: '#777', lineHeight: 1.6 }}>
                Based on the principles of rapid iteration and fearless design, our workflow is simple: take bold ideas, strip away the generic fat, and construct interactive masterpieces that leave an undeniable impression.
              </p>
            </motion.div>
          </div>
        </section>

        {/* PHILOSOPHY & TECH STACK SECTION */}
        <section style={{ padding: '10vh 6vw', position: 'relative' }}>
          <motion.div style={{ y: techY, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', background: '#fcfcfc', padding: '6vw', borderRadius: '4px', border: '1px solid rgba(0,0,0,0.05)' }}>
            <div>
              <h3 style={{ fontSize: '32px', fontFamily: "'Syne', sans-serif", fontWeight: '800', color: '#111', marginBottom: '20px' }}>The Gumroad Way</h3>
              <p style={{ fontSize: '16px', color: '#555', lineHeight: 1.8 }}>
                We believe in shipping fast and iterating aggressively. You don't need to be a corporate giant to launch a bleeding-edge product. Start small, get better together, learn quickly, and scale up. We apply this philosophy to every line of code we write.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: '32px', fontFamily: "'Syne', sans-serif", fontWeight: '800', color: '#111', marginBottom: '20px' }}>Tech Arsenal</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {['WebGL & Three.js', 'React & Node.js Architecture', 'GSAP & Framer Motion Physics', 'GLSL Custom Shaders'].map((item, i) => (
                  <li key={i} style={{ fontSize: '16px', fontWeight: '800', color: '#FF5722', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '20px', height: '1px', background: '#111' }} /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </section>

        {/* PROFILES */}
        <section style={{ padding: '10vh 6vw 20vh 6vw', position: 'relative' }}>
          
          {/* YASH */}
          <motion.div style={{ y: yashY, display: 'flex', gap: '6vw', alignItems: 'center', marginBottom: '25vh' }}>
            <div style={{ flex: '0 0 45vw', position: 'relative', pointerEvents: 'auto' }}>
              <div style={{ overflow: 'hidden', borderRadius: '4px', background: '#f5f5f5', position: 'relative' }}>
                <img 
                  src="https://avatars.githubusercontent.com/u/205514191?v=4" 
                  alt="Yash Bana" 
                  style={{ width: '100%', height: '80vh', objectFit: 'cover', filter: 'grayscale(100%) contrast(1.1)' }} 
                  onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
                />
                <div style={{ position: 'absolute', bottom: '20px', left: '20px', background: 'rgba(255,255,255,0.9)', padding: '10px 20px', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px' }}>Lead Developer</div>
              </div>
            </div>
            <div style={{ flex: 1, pointerEvents: 'auto' }}>
              <div style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '4px', color: '#FF5722', marginBottom: '20px' }}>01 / THE CAKE</div>
              <h2 style={{ fontSize: 'clamp(40px, 6vw, 100px)', fontFamily: "'Syne', sans-serif", fontWeight: '800', margin: '0 0 30px 0', lineHeight: 1, letterSpacing: '-0.02em' }}>YASH<br/>BANA</h2>
              <p style={{ fontSize: '18px', fontWeight: '500', color: '#333', lineHeight: 1.8, maxWidth: '450px', marginBottom: '20px' }}>
                A relentless full-stack developer who steals hearts through bold interfaces and sharp, performant code. 
              </p>
              <p style={{ fontSize: '16px', fontWeight: '300', color: '#666', lineHeight: 1.8, maxWidth: '450px', marginBottom: '40px' }}>
                Yash specializes in orchestrating complex React ecosystems, building resilient Node.js backends, and injecting life into the DOM with physics-based motion libraries. For him, writing code isn't just a job; it's an obsession with making digital experiences that feel like a complete vibe.
              </p>
              <div style={{ display: 'flex', gap: '40px', borderTop: '2px solid rgba(0,0,0,0.1)', paddingTop: '20px', maxWidth: '450px' }}>
                <div><div style={{ fontSize: '40px', fontWeight: '800', fontFamily: "'Syne', sans-serif", color: '#FF5722' }}>47</div><div style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: '#888', fontWeight: '800' }}>Projects Delivered</div></div>
                <div><div style={{ fontSize: '40px', fontWeight: '800', fontFamily: "'Syne', sans-serif", color: '#FF5722' }}>5+</div><div style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: '#888', fontWeight: '800' }}>Years Experience</div></div>
              </div>
            </div>
          </motion.div>

          {/* SHIVANSHU */}
          <motion.div style={{ y: shivanshuY, display: 'flex', gap: '6vw', alignItems: 'center', flexDirection: 'row-reverse' }}>
            <div style={{ flex: '0 0 35vw', position: 'relative', pointerEvents: 'auto' }}>
              <div style={{ overflow: 'hidden', borderRadius: '4px', background: '#FF5722', padding: '10%', position: 'relative' }}>
                <img 
                  src="https://api.dicebear.com/7.x/micah/svg?seed=Shivanshu&baseColor=ffffff" 
                  alt="Shivanshu Jha" 
                  style={{ width: '100%', height: '60vh', objectFit: 'contain' }} 
                  onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
                />
                <div style={{ position: 'absolute', bottom: '20px', right: '20px', background: '#fff', color: '#FF5722', padding: '10px 20px', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px' }}>Growth & Strategy</div>
              </div>
            </div>
            <div style={{ flex: 1, textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', pointerEvents: 'auto' }}>
              <div style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '4px', color: '#FF5722', marginBottom: '20px' }}>02 / THE CHERRY</div>
              <h2 style={{ fontSize: 'clamp(40px, 6vw, 100px)', fontFamily: "'Syne', sans-serif", fontWeight: '800', margin: '0 0 30px 0', lineHeight: 1, letterSpacing: '-0.02em' }}>SHIVANSHU<br/>JHA</h2>
              <p style={{ fontSize: '18px', fontWeight: '500', color: '#333', lineHeight: 1.8, maxWidth: '450px', marginBottom: '20px' }}>
                Marketing lead, financial strategist, and visionary co-founder executing our massive roadmap. 
              </p>
              <p style={{ fontSize: '16px', fontWeight: '300', color: '#666', lineHeight: 1.8, maxWidth: '450px', marginBottom: '40px' }}>
                While Yash handles the architecture, Shivanshu drives the engine forward. He translates raw technical capability into market dominance. Managing client relations, scaling financial operations, and ensuring every product hits the target audience with maximum impact. "While Yash is the cake, I am the cherry on top."
              </p>
              <div style={{ display: 'flex', gap: '40px', borderTop: '2px solid rgba(0,0,0,0.1)', paddingTop: '20px', width: '100%', justifyContent: 'flex-end', maxWidth: '450px' }}>
                <div style={{ textAlign: 'right' }}><div style={{ fontSize: '40px', fontWeight: '800', fontFamily: "'Syne', sans-serif", color: '#FF5722' }}>20+</div><div style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: '#888', fontWeight: '800' }}>Global Campaigns</div></div>
                <div style={{ textAlign: 'right' }}><div style={{ fontSize: '40px', fontWeight: '800', fontFamily: "'Syne', sans-serif", color: '#FF5722' }}>$$$</div><div style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: '#888', fontWeight: '800' }}>Revenue Generated</div></div>
              </div>
            </div>
          </motion.div>

        </section>

        {/* THE GOD TIER EXPANSION */}
        <Capabilities />
        <Contact />

      </div>
    </div>
  );
}
