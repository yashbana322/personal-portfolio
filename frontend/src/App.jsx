import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useVelocity, AnimatePresence } from 'framer-motion';
import './index.css';

/* ═══════════════════════════════════════════════════════════
   GUMROAD-STYLE "WHAT WE DO" — EXACT REPLICA
   Pure SVG flat character + fixed text labels + arm pointing
   ═══════════════════════════════════════════════════════════ */

const WhatWeDoSection = () => {
  useEffect(() => {
    if (!document.querySelector('script[src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"]')) {
      const script = document.createElement('script');
      script.src = "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section style={{
      position: 'relative',
      display: 'flex',
      width: '100%',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '80px 20px',
      background: '#f4f4f0',
    }}>
      
      <h2 style={{
        fontSize: 'clamp(24px, 3.5vw, 40px)',
        fontWeight: 500,
        color: '#000',
        textAlign: 'center',
        marginBottom: '48px',
        fontFamily: "'Mabry Pro', -apple-system, BlinkMacSystemFont, sans-serif",
      }}>You know all those great ideas you have?</h2>

      {/* Pill + Character wrapper */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '800px',
      }}>
        
        {/* Lottie character — centered on the pill, bigger like Gumroad */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -58%)',
          width: '220px',
          height: '280px',
          zIndex: 30,
          pointerEvents: 'none',
        }}>
          <lottie-player 
            src="https://assets.gumroad.com/assets/about/gumhead-f11adc65704bbfd51d7b57af5b375a0f2d7aa35a7bcb50ea5c9669814ba836ee.json" 
            background="transparent" 
            speed="1" 
            style={{ width: "100%", height: "100%" }} 
            loop 
            autoplay>
          </lottie-player>
        </div>

        {/* Outer Yellow Pill */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '260px',
          borderRadius: '130px',
          border: '1.5px solid #000',
          background: '#ffc700',
          zIndex: 10,
          overflow: 'visible',
        }}>
          
          {/* Inner Track Oval as SVG with arrowheads on the track */}
          <svg style={{
            position: 'absolute',
            top: '24px',
            left: '32px',
            width: 'calc(100% - 64px)',
            height: 'calc(100% - 48px)',
            pointerEvents: 'none',
            overflow: 'visible',
            zIndex: 5,
          }} viewBox="0 0 736 212" preserveAspectRatio="none" fill="none">
            {/* Full racetrack oval */}
            <rect x="1" y="1" width="734" height="210" rx="105" ry="105" stroke="#000" strokeWidth="1.5" fill="none"/>
          </svg>

          {/* Top Left: "The Gumroad Way" */}
          <div style={{
            position: 'absolute',
            top: '25px',
            left: '16%',
            transform: 'translateY(-50%)',
            background: '#ffc700',
            padding: '0 16px 0 0',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            zIndex: 20,
          }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="0 1 8 5 0 9"></polyline></svg>
            <span style={{ fontSize: '15px', fontWeight: 500, whiteSpace: 'nowrap', color: '#000', fontFamily: "'Mabry Pro', -apple-system, BlinkMacSystemFont, sans-serif" }}>The Gumroad Way</span>
          </div>

          {/* Top Right: "Start Small" */}
          <div style={{
            position: 'absolute',
            top: '25px',
            right: '16%',
            transform: 'translateY(-50%)',
            background: '#ffc700',
            padding: '0 16px 0 0',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            zIndex: 20,
          }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="0 1 8 5 0 9"></polyline></svg>
            <span style={{ fontSize: '15px', fontWeight: 500, whiteSpace: 'nowrap', color: '#000', fontFamily: "'Mabry Pro', -apple-system, BlinkMacSystemFont, sans-serif" }}>Start Small</span>
          </div>

          {/* Bottom Left: "Get Better Together" */}
          <div style={{
            position: 'absolute',
            top: '235px',
            left: '16%',
            transform: 'translateY(-50%)',
            background: '#ffc700',
            padding: '0 0 0 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            zIndex: 20,
          }}>
            <span style={{ fontSize: '15px', fontWeight: 500, whiteSpace: 'nowrap', color: '#000', fontFamily: "'Mabry Pro', -apple-system, BlinkMacSystemFont, sans-serif" }}>Get Better Together</span>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="10 1 2 5 10 9"></polyline></svg>
          </div>

          {/* Bottom Right: "Learn Quickly" */}
          <div style={{
            position: 'absolute',
            top: '235px',
            right: '16%',
            transform: 'translateY(-50%)',
            background: '#ffc700',
            padding: '0 0 0 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            zIndex: 20,
          }}>
            <span style={{ fontSize: '15px', fontWeight: 500, whiteSpace: 'nowrap', color: '#000', fontFamily: "'Mabry Pro', -apple-system, BlinkMacSystemFont, sans-serif" }}>Learn Quickly</span>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="10 1 2 5 10 9"></polyline></svg>
          </div>

        </div>
      </div>

      {/* Bottom content */}
      <h2 style={{
        fontSize: 'clamp(20px, 3vw, 36px)',
        fontWeight: 500,
        color: '#000',
        textAlign: 'center',
        marginTop: '64px',
        lineHeight: 1.3,
        maxWidth: '640px',
        fontFamily: "'Mabry Pro', -apple-system, BlinkMacSystemFont, sans-serif",
      }}>We want you to try them, lots of them, and find out what works.</h2>

      <p style={{
        fontSize: '14px',
        fontWeight: 400,
        color: '#000',
        textAlign: 'center',
        marginTop: '16px',
        lineHeight: 1.5,
        maxWidth: '520px',
        fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
      }}>You don't have to be a tech expert or even understand how to start a business. You just gotta take what you know and sell it.</p>

    </section>
  );
};

const WorkSection = ({ setCursorHovering }) => {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  });

  const scrollVelocity = useVelocity(smoothProgress);
  const skewX = useTransform(scrollVelocity, [-1, 1], [8, -8]);
  const scale = useTransform(scrollVelocity, [-1, 1], [0.98, 0.98]);

  const x = useTransform(smoothProgress, [0, 1], ["0%", "-85%"]);
  const bgX = useTransform(smoothProgress, [0, 1], ["0%", "15%"]);
  const imgX = useTransform(smoothProgress, [0, 1], ["-10%", "10%"]);

  const projects = [
    { num: "01", title: "Lusion", desc: "Creative web development agency specializing in immersive experiences.", url: "https://lusion.co/", img: "/lusion.png" },
    { num: "02", title: "Buzzworthy", desc: "Digital agency crafting buzzworthy experiences.", url: "https://buzzworthystudio.com/", img: "/buzzworthy.png" },
    { num: "03", title: "ET Studio", desc: "A creative web studio pushing digital boundaries.", url: "https://www.e-t.studio/", img: "/etstudio.png" },
    { num: "04", title: "Minecraft", desc: "Everything you need Minecraft hub - customized platform.", url: "https://everything-you-need-minecraft-hub-d-nu.vercel.app/", img: "/minecraft.png" }
  ];

  return (
    <section className="work-section" ref={containerRef} id="work-section">
      <div className="work-noise-bg" />
      <div className="work-section-sticky">
        
        <motion.div style={{ x: bgX }} className="work-bg-text">
          <span>PROJECTS </span><span className="red">PROJECTS </span>
          <span>PROJECTS </span><span className="red">PROJECTS </span>
        </motion.div>
        
        <motion.div 
          style={{ x, skewX, scale }} 
          className="work-cards-wrapper" 
          ref={scrollRef}
          onMouseEnter={() => setCursorHovering(true)}
          onMouseLeave={() => setCursorHovering(false)}
        >
          {projects.map((p, i) => {
            const isEven = i % 2 === 0;
            const staticYOffset = isEven ? -60 : 80;
            return (
              <motion.div 
                className="work-card" 
                key={i}
                initial={{ y: staticYOffset }}
                whileHover={{ y: staticYOffset - 30, scale: 1.03, rotateX: 6, rotateY: 3, zIndex: 10, transition: { duration: 0.5, ease: "easeOut" } }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              >
                <div className="work-card-img-wrapper">
                  <div className="work-card-img-overlay" />
                  <motion.img style={{ x: imgX }} src={p.img} alt={p.title} className="work-card-img" />
                </div>
                <div className="work-card-content">
                  <div className="work-rule">RULE NO.{p.num}</div>
                  <div className="work-card-title">{p.title}</div>
                  <div className="work-card-desc">{p.desc}</div>
                  <a href={p.url} target="_blank" rel="noreferrer" className="work-card-link">
                    VIEW PROJECT <span>→</span>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

const GodTierHero = ({ profile }) => {
  return (
    <section className="gt-hero" id="hero-top">
      <div className="gt-hero-red"></div>
      <div className="gt-hero-black"></div>
      
      <div className="gt-hero-grid"></div>

      <div className="gt-hero-content">
        <div className="gt-eyebrow">PORTFOLIO · 2025 · INITIATE</div>
        <h1 className="gt-title">
          <span className="gt-yash">YASH</span>
          <span className="gt-bana">BANA</span>
        </h1>
        <div className="gt-subtitle">{profile ? profile.title : "DESIGNER • DEVELOPER • CREATOR"}</div>
      </div>
      
      <div className="gt-kanji">
        無<br/>限<br/>の<br/>力
      </div>

      <div className="gt-scroll">
        <div className="gt-scroll-text">SCROLL <span className="gt-scroll-arrow">↓</span></div>
      </div>
    </section>
  );
};

const GodTierWhatWeDo = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const m1 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const m2 = useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]);

  const rules = [
    { num: '01', title: 'THE GUMROAD WAY', desc: 'Build fast. Test in the wild. Ship before you feel ready.' },
    { num: '02', title: 'START SMALL', desc: "Don\'t boil the ocean. Build a puddle and scale it." },
    { num: '03', title: 'GET BETTER TOGETHER', desc: 'Learn from the users. Iterate with the community.' },
    { num: '04', title: 'LEARN QUICKLY', desc: 'Data over ego. Fail fast, pivot faster.' }
  ];

  return (
    <section className="gt-wwd what-we-do-section" ref={ref}>
      <div className="gt-wwd-bg"></div>
      <div className="gt-wwd-grid-bg"></div>

      <div className="gt-wwd-marquees">
        <motion.div style={{ x: m1 }} className="gt-marquee">
          <span>GREAT IDEAS • MULTIPLY • EXECUTE • </span>
          <span>GREAT IDEAS • MULTIPLY • EXECUTE • </span>
        </motion.div>
        <motion.div style={{ x: m2 }} className="gt-marquee outline">
          <span>FIND OUT WHAT WORKS • ADAPT • PROTOTYPE • </span>
          <span>FIND OUT WHAT WORKS • ADAPT • PROTOTYPE • </span>
        </motion.div>
      </div>

      <div className="gt-wwd-content">
        <motion.div 
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="gt-wwd-header"
        >
          <div className="gt-wwd-pre">STRATEGY.</div>
          <h2 className="gt-wwd-title">
            MAKE IDEAS <span className="text-red">REAL.</span>
          </h2>
        </motion.div>

        <div className="gt-wwd-cards">
          {rules.map((rule, i) => (
            <motion.div 
              key={i} 
              className="gt-rule-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <div className="gt-rule-top">
                <span className="gt-rule-num">{rule.num}</span>
                <div className="gt-rule-line"></div>
              </div>
              <h3 className="gt-rule-title">{rule.title}</h3>
              <p className="gt-rule-desc">{rule.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="gt-wwd-cta-box"
        >
          <div className="gt-cta-text">WE WANT YOU TO TRY THEM. LOTS OF THEM.</div>
          <div className="gt-cta-sub">You don't have to be a tech expert. Take what you know and sell it.</div>
        </motion.div>
      </div>
    </section>
  );
};

const DeadpoolSpiderSection = ({ profile }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const spiderY = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], ["-120%", "30%", "30%", "-120%"]);

  return (
    <section className="dp-section" id="manga-section" ref={ref}>
      <div className="dp-halftone"></div>
      <div className="dp-noise"></div>



      <div className="dp-grid">
        <div className="dp-panel-left manga-reveal">
          <div className="dp-who-header">
            <h2 className="dp-title">WHO AM I</h2>
            <div className="dp-scratch-line"></div>
          </div>
          <p className="dp-desc">
            {profile ? profile.about : "Hey nice to meet you I am Yash Bana, I am a full stack dev and a student too! And I love coding websites, automate tasks though my favourite time is when I am coding Minecraft plugins, mods!"}
          </p>
          <div className="dp-skills">
            <span className="dp-badge">React</span>
            <span className="dp-badge">TypeScript</span>
            <span className="dp-badge">Three.js</span>
            <span className="dp-badge">Motion</span>
          </div>
        </div>

        <div className="dp-panel-right manga-reveal">
          <div className="dp-menu-header">
            <div className="dp-top-text">MENU & MAIN</div>
            <div className="dp-bot-text">COMMAND SELECT</div>
          </div>
          
          <div className="dp-stats-container">
            <div className="dp-stat-box red-box">
              <div className="dp-stat-num">{profile ? profile.projects : "15+"}</div>
              <div className="dp-stat-label">PROJECTS</div>
            </div>
            <div className="dp-stat-box white-box">
              <div className="dp-stat-num">{profile ? profile.years : "2+"}</div>
              <div className="dp-stat-label">YEARS</div>
            </div>
          </div>
          
          <div className="dp-name-watermark">YASH BANA</div>
          <div className="dp-big-number">01</div>
        </div>
      </div>
    </section>
  );
};

const ShivanshuPortfolio = ({ setCurrentSite }) => {
  return (
    <div className="neo-site-full">
      {/* GLOBAL NAV */}
      <nav className="neo-nav-top">
        <div className="neo-brand">SHIVANSHU_JHA ©</div>
        <button className="neo-btn-back" onClick={() => setCurrentSite('yash')}>
          ← BACK TO YASH
        </button>
      </nav>

      {/* HERO SECTION */}
      <section className="neo-hero bg-yellow">
        <h1 className="neo-mega-text">CO-FOUNDER</h1>
        <h1 className="neo-mega-text outline">MARKETING &amp; FINANCE</h1>
        <div className="neo-hero-badge bg-pink">
          "If Yash is the cake, I am the cherry on top."
        </div>
      </section>

      {/* WHO AM I SECTION (Mimics Yash's split grid) */}
      <section className="neo-who-am-i bg-purple">
        <div className="neo-grid-layout">
          {/* Left Panel */}
          <div className="neo-panel bg-mint neo-bio-panel">
            <h2 className="neo-section-title">WHO AM I</h2>
            <p className="neo-bio-text">
              Hey, nice to meet you! I am Shivanshu Jha. I'm not actually a developer—I am the marketing, finance lead, and co-founder executing our massive vision. 
              <br/><br/>
              While Yash is the cake, I am the cherry on top — the thing that makes the whole thing worth looking at.
            </p>
            <div className="neo-photo-frame bg-white">
              {/* Dicebear Micah with fair skin (baseColor=f9c9b6) */}
              <img className="neo-photo-fair" src="https://api.dicebear.com/7.x/micah/svg?seed=Shivanshu&baseColor=f9c9b6" alt="Shivanshu Avatar" />
              <div className="neo-photo-name bg-pink">Shivanshu Jha</div>
              <div className="neo-deco-heart">💖</div>
            </div>
          </div>
          
          {/* Right Panel (Menu & Main stats) */}
          <div className="neo-panel bg-yellow neo-stats-panel">
            <h2 className="neo-section-title">MENU & MAIN</h2>
            <div className="neo-stats-container">
              <div className="neo-stat-box bg-purple">
                <div className="neo-stat-num">20+</div>
                <div className="neo-stat-label">CAMPAIGNS</div>
              </div>
              <div className="neo-stat-box bg-green">
                <div className="neo-stat-num">$$$</div>
                <div className="neo-stat-label">FINANCE</div>
              </div>
            </div>
            
            <div className="neo-menu-links">
               <a href="https://github.com/shivanshujha081-png" target="_blank" rel="noreferrer" className="neo-contact-link"><span className="neo-link-icon">GH</span> <span>GitHub</span> <span className="link-arrow">→</span></a>
               <a href="mailto:banayash661@gmail.com" className="neo-contact-link"><span className="neo-link-icon">@</span> <span>Email Us</span> <span className="link-arrow">→</span></a>
               <a href="https://www.instagram.com/shivanshu_jha_123_/" target="_blank" rel="noreferrer" className="neo-contact-link"><span className="neo-link-icon">IG</span> <span>Instagram</span> <span className="link-arrow">→</span></a>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION (Sticky like Yash's) */}
      <section className="neo-work-section">
        <div className="neo-work-sticky bg-pink">
          <h2 className="neo-section-title">OUR VENTURES</h2>
          <p className="neo-work-desc neo-bio-text">
            <strong>HEY!</strong> I have also contributed to these phenomenal projects!
            <br/><br/>
            As the Marketing & Finance Lead, I drove the brand expansion, user acquisition, and financial strategy behind the code Yash builds. Check out our shared work.
          </p>
        </div>
        <div className="neo-work-scroll">
          
          <a href="https://lusion.co/" target="_blank" rel="noreferrer" className="neo-work-item bg-white">
             <div className="neo-work-img" style={{backgroundImage:"url('/lusion.png')"}}></div>
             <h3 className="neo-work-title">RULE NO.01 // LUSION</h3>
             <p className="neo-work-desc-text">Creative web development agency specializing in immersive experiences.</p>
          </a>

          <a href="https://buzzworthystudio.com/" target="_blank" rel="noreferrer" className="neo-work-item bg-mint">
             <div className="neo-work-img" style={{backgroundImage:"url('/buzzworthy.png')"}}></div>
             <h3 className="neo-work-title">RULE NO.02 // BUZZWORTHY</h3>
             <p className="neo-work-desc-text">Digital agency crafting buzzworthy experiences.</p>
          </a>

          <a href="https://www.e-t.studio/" target="_blank" rel="noreferrer" className="neo-work-item bg-yellow">
             <div className="neo-work-img" style={{backgroundImage:"url('/etstudio.png')"}}></div>
             <h3 className="neo-work-title">RULE NO.03 // ET STUDIO</h3>
             <p className="neo-work-desc-text">A creative web studio pushing digital boundaries.</p>
          </a>

          <a href="https://everything-you-need-minecraft-hub-d-nu.vercel.app/" target="_blank" rel="noreferrer" className="neo-work-item bg-purple">
             <div className="neo-work-img" style={{backgroundImage:"url('/minecraft.png')"}}></div>
             <h3 className="neo-work-title">RULE NO.04 // MINECRAFT HUB</h3>
             <p className="neo-work-desc-text">Everything you need Minecraft hub - customized platform.</p>
          </a>

        </div>
      </section>

      {/* LET'S BUILD TOGETHER */}
      <section className="neo-hero bg-mint" style={{borderBottom:'6px solid #111', paddingBottom:'150px'}}>
        <h1 className="neo-mega-text">LET'S BUILD</h1>
        <h1 className="neo-mega-text outline">TOGETHER</h1>
      </section>

      {/* ABOUT US — GOD TIER */}
      <section className="neo-about-section bg-pink">
        <div className="neo-about-inner">
          <h2 className="neo-about-heading">
            <span className="neo-about-outline">ABOUT</span>
            {" US"}
          </h2>

          <div className="neo-about-manifesto bg-white">
            <div className="neo-about-quote-mark">&ldquo;</div>
            <p className="neo-about-quote-text">
              Hey everyone &mdash; we are just <strong>2 students with big dreams</strong> in our empty minds.
              We build websites and apps that help <strong>schools and institutions stand out</strong> with a sense of proudness.
              <br/><br/>
              We love to do what we do, and you can always reach out to us via the links provided above.
              <br/><br/>
              <strong>Have a great day ✌</strong>
            </p>
            <div className="neo-about-quote-mark neo-about-quote-end">&rdquo;</div>
          </div>

          <div className="neo-about-duo">
            <div className="neo-about-card bg-yellow">
              <div className="neo-about-card-num">01</div>
              <div className="neo-about-card-name">YASH BANA</div>
              <div className="neo-about-card-role">THE CAKE &mdash; Full Stack Dev</div>
            </div>
            <div className="neo-about-card bg-mint">
              <div className="neo-about-card-num">02</div>
              <div className="neo-about-card-name">SHIVANSHU JHA</div>
              <div className="neo-about-card-role">THE CHERRY &mdash; Marketing &amp; Finance</div>
            </div>
          </div>

          <div className="neo-about-stamp bg-purple">WE BUILD. WE GROW. WE WIN.</div>
        </div>
      </section>
    </div>
  );
};

function App() {
  const [currentSite, setCurrentSite] = useState('yash');
  const [profile, setProfile] = useState(null);
  const [isHoveringWork, setIsHoveringWork] = useState(false);
  const [splashGone, setSplashGone] = useState(false);
  const curRef = useRef(null);
  const cur2Ref = useRef(null);

  useEffect(() => {
    // Reset scroll to top on fresh load
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    fetch(`${API_URL}/api/profile`)
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(err => console.error("Could not fetch profile", err));

    let mx = -100, my = -100, tx = -100, ty = -100;
    
    const handleMouseMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (curRef.current) {
        curRef.current.style.left = mx + 'px';
        curRef.current.style.top = my + 'px';
      }
    };
    
    document.addEventListener('mousemove', handleMouseMove);

    let afId;
    const anim = () => {
      tx += (mx - tx) * 0.15;
      ty += (my - ty) * 0.15;
      if (cur2Ref.current) {
        cur2Ref.current.style.left = tx + 'px';
        cur2Ref.current.style.top = ty + 'px';
      }
      afId = requestAnimationFrame(anim);
    };
    afId = requestAnimationFrame(anim);

    const splashTimeout = setTimeout(() => {
      setSplashGone(true);
    }, 1800);

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('revealed');
      });
    }, { threshold: 0.1 });
    
    const reveals = document.querySelectorAll('.reveal, .manga-reveal');
    reveals.forEach(el => obs.observe(el));

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(afId);
      clearTimeout(splashTimeout);
      reveals.forEach(el => obs.unobserve(el));
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentSite]);

  const scrollTo = (selector) => {
    if (selector === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.querySelector(selector);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const cursorClassnames = `cursor ${isHoveringWork ? 'expand' : ''} ${currentSite === 'shivanshu' ? 'black-cursor' : ''}`;
  const cursorTrailClassnames = `cursor-trail ${isHoveringWork ? 'expand' : ''} ${currentSite === 'shivanshu' ? 'black-cursor-trail' : ''}`;

  return (
    <>
      <div className={cursorClassnames} ref={curRef}></div>
      <div className={cursorTrailClassnames} ref={cur2Ref}></div>
      <div className="noise"></div>

      {currentSite === 'shivanshu' ? (
        <ShivanshuPortfolio setCurrentSite={setCurrentSite} />
      ) : (
        <>
          <div id="splash" className={splashGone ? 'gone' : ''}>
            <div className="splash-text">PERSONA</div>
          </div>

          <div id="main-content" className={splashGone ? 'visible' : ''}>
        <div className="nav-dots">
          <div className="dot active" onClick={() => scrollTo('top')}></div>
          <div className="dot" onClick={() => scrollTo('.manga-section')}></div>
          <div className="dot" onClick={() => scrollTo('.work-section')}></div>
          <div className="dot" onClick={() => scrollTo('.what-we-do-section')}></div>
        </div>

        <GodTierHero profile={profile} />

        {/* NEW DEADPOOL SPIDER SECTION */}
        <DeadpoolSpiderSection profile={profile} />

        <WorkSection setCursorHovering={setIsHoveringWork} />
        
        {/* WHAT WE DO SECTION */}
        <WhatWeDoSection />

        <section className="contact-section" id="contact-section">
          <div className="contact-hatch"></div>
          <div className="contact-grid">
            <div>
              <div className="contact-heading reveal">LET'S<br />WORK<br />TOGETHER</div>
              <p className="reveal" style={{ marginTop: 16, fontSize: 17, color: 'rgba(0,0,0,0.6)', fontWeight: 600, letterSpacing: 1 }}>Currently available for freelance & full-time.</p>
            </div>
            <div className="contact-links">
              <a href="mailto:banayash661@gmail.com" target="_blank" rel="noopener noreferrer" className="contact-link reveal"><span>✉</span><span>Email Me</span><span className="link-arrow">→</span></a>
              <a href="https://github.com/yashbana322" target="_blank" rel="noopener noreferrer" className="contact-link reveal"><span>◈</span><span>GitHub</span><span className="link-arrow">→</span></a>
              <a href="https://www.instagram.com/riaas_17/" target="_blank" rel="noopener noreferrer" className="contact-link reveal"><span>◇</span><span>Instagram</span><span className="link-arrow">→</span></a>
            </div>
          </div>
        </section>

        {/* PARTNER TEASER SECTION */}
        <section className="partner-teaser-section">
          <div className="partner-teaser-content">
            <h2 className="partner-teaser-text">
              Hey perhaps you missed something!? Didn't you? Meet my partner
            </h2>
            <button className="partner-teaser-arrow" onClick={() => setCurrentSite('shivanshu')}>
              ➜
            </button>
          </div>
        </section>
      </div>
      </>
      )}
    </>
  );
}

export default App;
