import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useVelocity, AnimatePresence } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import AnimatedGradientBackground from './components/ui/animated-gradient-background';
import FancyTextHover from './components/ui/fancy-text-hover';
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
      background: 'transparent',
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

const NeoYashPortfolio = ({ setCurrentSite, profile }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], ["0%", "30%"]);
  const marquee1 = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);
  const marquee2 = useTransform(scrollYProgress, [0, 1], ["-100%", "0%"]);

  return (
    <div className="neo-site-full yash-crazy-neo" ref={containerRef}>
      {/* GLOBAL NAV */}
      <motion.nav 
        initial={{ y: -100 }} 
        animate={{ y: 0 }} 
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className="neo-nav-top" style={{ backgroundColor: '#e0e7ff' }}
      >
        <div className="neo-brand">YASH_BANA ©</div>
        <button className="neo-btn-back" style={{ background: '#c084fc', color: '#111' }} onClick={() => setCurrentSite('shivanshu')}>
          MEET CO-FOUNDER →
        </button>
      </motion.nav>

      {/* HERO SECTION */}
      <section className="neo-hero" style={{ paddingTop: '150px', position: 'relative', overflow: 'hidden' }}>
        
        {/* Animated Gradient Background */}
        <AnimatedGradientBackground 
          Breathing={true}
          breathingRange={8}
          gradientColors={["#fbcfe8", "#c084fc", "#38bdf8", "#818cf8", "#fbcfe8", "#38bdf8", "#6366f1"]}
        />

        <motion.div style={{ y: heroY, position: 'relative', zIndex: 10 }} className="yash-hero-content flex flex-col items-start w-full">
          <motion.h1 
            initial={{ x: -200, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }} 
            transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.1 }}
            className="neo-mega-text" style={{ color: '#fff' }}
          >
            YASH BANA
          </motion.h1>
          <motion.h1 
            initial={{ x: 200, opacity: 0 }} 
            animate={{ x: 0, opacity: 1 }} 
            transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.2 }}
            className="neo-mega-text outline" style={{ color: 'transparent', WebkitTextStroke: '4px #fff' }}
          >
            FULL STACK
          </motion.h1>
          <motion.h1 
            initial={{ scale: 0.5, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.3 }}
            className="neo-mega-text" style={{ color: '#fff' }}
          >
            DEVELOPER
          </motion.h1>
          
          <motion.div 
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="neo-hero-badge bg-cyan-crazy"
          >
            "I build websites and much more."
          </motion.div>
        </motion.div>

        {/* The Rabbit Animation */}
        <div style={{ position: 'absolute', right: '10%', bottom: '10%', width: '400px', height: '400px', zIndex: 6, pointerEvents: 'none' }}>
          <DotLottieReact
            src="/rabbit.json"
            loop
            autoplay
          />
        </div>

      </section>

      {/* CRAZY MARQUEE */}
      <div className="crazy-marquee-container bg-purple-crazy">
        <motion.div style={{ x: marquee1 }} className="crazy-marquee-track">
          <span>CODE • DESIGN • ANIMATE • COOK • </span>
          <span>CODE • DESIGN • ANIMATE • COOK • </span>
          <span>CODE • DESIGN • ANIMATE • COOK • </span>
          <span>CODE • DESIGN • ANIMATE • COOK • </span>
        </motion.div>
      </div>

      {/* WHO AM I */}
      <section className="neo-who-am-i bg-blue-crazy">
        <div className="neo-grid-layout">
          <motion.div 
            initial={{ y: 100, opacity: 0, rotate: -5 }}
            whileInView={{ y: 0, opacity: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
            className="neo-panel bg-white neo-bio-panel"
          >
            <h2 className="neo-section-title">WHO AM I</h2>
            <p className="neo-bio-text">
              {profile ? profile.about : "Hey, nice to meet you I am Yash Bana, I am a full stack dev and a student too! And I love coding websites, automate tasks though my favourite time is when I am coding Minecraft plugins, mods!"}
            </p>
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="neo-photo-frame bg-purple-crazy" style={{ transform: 'rotate(-3deg)' }}
            >
               <img className="neo-photo-fair" src="/image.jpg" alt="Yash Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
               <div className="neo-photo-name bg-cyan-crazy">Yash Bana</div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ y: 100, opacity: 0, rotate: 5 }}
            whileInView={{ y: 0, opacity: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 150, damping: 15, delay: 0.2 }}
            className="neo-panel bg-indigo-crazy neo-stats-panel"
          >
            <h2 className="neo-section-title" style={{ color: '#fff' }}>MENU & MAIN</h2>
            <div className="neo-stats-container">
              <motion.div whileHover={{ y: -10 }} className="neo-stat-box bg-cyan-crazy">
                <div className="neo-stat-num">{profile ? profile.projects : "15+"}</div>
                <div className="neo-stat-label">PROJECTS</div>
              </motion.div>
              <motion.div whileHover={{ y: -10 }} className="neo-stat-box bg-white">
                <div className="neo-stat-num">{profile ? profile.years : "2+"}</div>
                <div className="neo-stat-label">YEARS</div>
              </motion.div>
            </div>
            
            <div className="neo-menu-links" style={{ padding: 0 }}>
               <FancyTextHover 
                 links={[
                   { label: 'Github', href: 'https://github.com/yashbana322' },
                   { label: 'Email Me', href: 'mailto:banayash661@gmail.com' },
                   { label: 'Instagram', href: 'https://www.instagram.com/riaas_17/' }
                 ]} 
               />
            </div>
          </motion.div>
        </div>
      </section>

      {/* REVERSE MARQUEE */}
      <div className="crazy-marquee-container bg-pink">
        <motion.div style={{ x: marquee2 }} className="crazy-marquee-track">
          <span>FRONTEND • BACKEND • THREE.JS • MOTION • </span>
          <span>FRONTEND • BACKEND • THREE.JS • MOTION • </span>
          <span>FRONTEND • BACKEND • THREE.JS • MOTION • </span>
          <span>FRONTEND • BACKEND • THREE.JS • MOTION • </span>
        </motion.div>
      </div>

      {/* GUMROAD ANIMATION REPLICA - WRAPPED */}
      <section className="neo-gumroad-section bg-indigo-crazy" style={{ borderBottom: '6px solid #111', padding: '8vw 3vw' }}>
         <motion.h2 
           initial={{ opacity: 0, scale: 0.8 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ type: "spring", stiffness: 200, damping: 10 }}
           className="neo-section-title" style={{ textAlign: 'center', marginBottom: '40px', color: '#fff', fontSize: 'clamp(50px, 8vw, 100px)' }}
         >
           THE PHILOSOPHY
         </motion.h2>
         
         <motion.div 
           initial={{ y: 50, opacity: 0 }}
           whileInView={{ y: 0, opacity: 1 }}
           viewport={{ once: true }}
           transition={{ type: "spring", stiffness: 100, damping: 20 }}
           className="neo-panel bg-white" style={{ padding: '0', overflow: 'hidden', maxWidth: '1200px', margin: '0 auto', boxShadow: '20px 20px 0 #111' }}
         >
            <WhatWeDoSection />
         </motion.div>
      </section>

      {/* PROJECTS SECTION */}
      <section className="neo-work-section" style={{ background: '#fdfdfd' }}>
        <div className="neo-work-sticky bg-cyan-crazy" style={{ flex: '0 0 35%', padding: '5vw', position: 'relative', display: 'flex', flexDirection: 'column' }}>
          
          <div style={{ paddingTop: '80px', position: 'relative' }}>
            <motion.h2 
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="neo-section-title"
            >
              MY WORKS
            </motion.h2>
            
            <div style={{ position: 'relative', marginTop: '20px' }}>
              {/* The Cat Animation Sitting on the top right corner of the description box */}
              <div style={{ position: 'absolute', top: '-185px', right: '-20px', width: '250px', height: '250px', zIndex: 10, pointerEvents: 'none' }}>
                <DotLottieReact
                  src="https://lottie.host/8cf4ba71-e5fb-44f3-8134-178c4d389417/0CCsdcgNIP.json"
                  loop
                  autoplay
                  style={{ width: '100%', height: '100%' }}
                />
              </div>

              <motion.p 
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="neo-work-desc neo-bio-text bg-white"
                style={{ position: 'relative', zIndex: 5 }}
              >
                <strong>CHECK THIS OUT!</strong> Here are some of the web experiences I've developed. High performance, top-tier animations, and full-stack architecture.
              </motion.p>
            </div>
          </div>

        </div>
        <div className="neo-work-scroll bg-purple-crazy" style={{ flex: '1', padding: '5vw', display: 'flex', flexDirection: 'column', gap: '5vw' }}>
          {[
            { title: "Lusion", num: "01", img: "/lusion.png", bg: "bg-white", url: "https://lusion.co/" },
            { title: "Buzzworthy", num: "02", img: "/buzzworthy.png", bg: "bg-cyan-crazy", url: "https://buzzworthystudio.com/" },
            { title: "ET Studio", num: "03", img: "/etstudio.png", bg: "bg-indigo-crazy", url: "https://www.e-t.studio/" },
            { title: "Minecraft Hub", num: "04", img: "/minecraft.png", bg: "bg-pink", url: "https://everything-you-need-minecraft-hub-d-nu.vercel.app/" }
          ].map((work, i) => (
            <motion.a 
              href={work.url} target="_blank" rel="noreferrer" 
              className={`neo-work-item ${work.bg}`}
              key={i}
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 100, damping: 15, delay: i * 0.1 }}
              whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 2 : -2 }}
            >
               <div className="neo-work-img" style={{backgroundImage:`url('${work.img}')`}}></div>
               <h3 className="neo-work-title" style={{ color: work.bg === 'bg-indigo-crazy' ? '#fff' : '#111' }}>RULE NO.{work.num} // {work.title}</h3>
            </motion.a>
          ))}
        </div>
      </section>

      {/* LET'S BUILD TOGETHER */}
      <section className="neo-hero yash-hero-bg" style={{ paddingBottom: '100px', borderBottom: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <motion.div
           initial={{ scale: 0.8, opacity: 0 }}
           whileInView={{ scale: 1, opacity: 1 }}
           viewport={{ once: true }}
           transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <h1 className="neo-mega-text">READY TO</h1>
          <h1 className="neo-mega-text outline" style={{ color: 'transparent', WebkitTextStroke: '4px #111' }}>COOK?</h1>
        </motion.div>
      </section>
    </div>
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
            <NeoYashPortfolio setCurrentSite={setCurrentSite} profile={profile} />
          </div>
        </>
      )}
    </>
  );
}

export default App;
