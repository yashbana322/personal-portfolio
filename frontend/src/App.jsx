import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import MusicPlayer from './components/ui/music-player';
import BmwLanding from './components/BmwLanding';
import WhoWeAre from './components/WhoWeAre';
import './index.css';

const Terminal = () => {
  const [history, setHistory] = useState([{ type: 'sys', text: 'YashOS v2.0 initialized. Type "help" to view commands.' }]);
  const [input, setInput] = useState('');
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      const newHistory = [...history, { type: 'usr', text: `> ${input}` }];
      
      if (cmd === 'help') {
        newHistory.push({ type: 'sys', text: 'AVAILABLE COMMANDS: skills, contact, clear, whoami' });
      } else if (cmd === 'skills') {
        newHistory.push({ type: 'sys', text: 'REACT | NODE.JS | PYTHON | POSTGRES | DOCKER | AWS' });
      } else if (cmd === 'contact') {
        newHistory.push({ type: 'sys', text: 'Email: banayash661@gmail.com | Status: Available' });
      } else if (cmd === 'whoami') {
        newHistory.push({ type: 'sys', text: 'Guest User' });
      } else if (cmd === 'clear') {
        setHistory([{ type: 'sys', text: 'YashOS v2.0 initialized.' }]);
        setInput('');
        return;
      } else if (cmd !== '') {
        newHistory.push({ type: 'err', text: `Command not found: ${cmd}` });
      }

      setHistory(newHistory);
      setInput('');
    }
  };

  return (
    <div className="terminal-container">
      <div className="terminal-header">
        <div className="term-dot"></div>
        <div className="term-dot"></div>
        <div className="term-dot"></div>
        <span style={{ marginLeft: 10, fontSize: 12 }}>root@yash-server:~</span>
      </div>
      <div className="terminal-body" onClick={() => document.getElementById('term-input').focus()}>
        {history.map((line, i) => (
          <div key={i} className={`term-line ${line.type}`}>{line.text}</div>
        ))}
        <div className="term-input-line">
          <span>{">"} </span>
          <input 
            id="term-input"
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            onKeyDown={handleCommand}
            autoComplete="off"
            spellCheck="false"
          />
        </div>
        <div ref={endRef} />
      </div>
    </div>
  );
};

const ProfessionalBrutalismPortfolio = ({ profile }) => {
  
  const titleText = "Yash Bana.";
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1, y: 0,
      transition: { staggerChildren: 0.05, delayChildren: 0.8 }
    }
  };

  const [activeStep, setActiveStep] = useState(0);
  const pipelineSteps = [
    { title: "01. Discovery", desc: "Our proprietary approach begins with discovery. We analyze your business requirements, target audience, and current infrastructure to formulate a scalable roadmap." },
    { title: "02. Architecture", desc: "Designing the database schemas, API contracts, and system topography to ensure high availability, security, and maximum performance." },
    { title: "03. Development", desc: "Sprint-based execution. Writing clean, maintainable code using React, Node.js, and modern SaaS tooling." },
    { title: "04. Deployment", desc: "CI/CD pipelines, containerization, and final production launch with zero-downtime strategies." }
  ];

  return (
    <>
      {/* NAV */}
      <nav className="saas-nav">
        <div className="nav-brand">YASH STUDIOS.</div>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div className="pulse-container">
            <div className="pulse-dot"></div>
            AVAILABLE FOR WORK
          </div>
          <a href="mailto:banayash661@gmail.com" style={{ textDecoration: 'none' }}>
            <button className="brutal-btn">Contact</button>
          </a>
        </div>
      </nav>

      <div className="app-container">
        
        {/* HERO SECTION */}
        <section className="hero-section">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
            <div className="hero-badge">SOFTWARE ENGINEERING</div>
          </motion.div>
          
          <motion.h1 className="hero-title" variants={titleVariants} initial="hidden" animate="visible">
            {titleText.split('').map((char, index) => (
              <motion.span key={index} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                {char}
              </motion.span>
            ))}
          </motion.h1>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.2 }}>
            <h2 className="hero-subtitle">Architecting high-performance digital ecosystems.</h2>
            <p className="hero-desc">
              {profile ? profile.about : "Full-stack developer specializing in scalable infrastructure, automated systems, and premium user experiences. We don't just write code; we build durable digital assets."}
            </p>
          </motion.div>
        </section>

        {/* BENTO GRID */}
        <section className="bento-grid">
          
          {/* YASH DOSSIER */}
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ type: "spring", stiffness: 100 }} className="bento-card card-large" style={{ background: '#E0E7FF' }}>
            <div className="lottie-float">
               <DotLottieReact src="/rabbit.json" loop autoplay style={{ width: '80%' }} />
            </div>
            <h2 className="card-title">Engineering Lead</h2>
            <p className="card-desc" style={{ maxWidth: '80%' }}>Leading technical architecture and full-stack development. Focused on delivering robust, maintainable, and high-performance solutions.</p>
            <div className="profile-img-container" style={{ marginTop: '40px' }}>
              <img src="/image.jpg" alt="Yash Avatar" />
            </div>
          </motion.div>

          {/* INTERACTIVE TERMINAL */}
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ type: "spring", stiffness: 100, delay: 0.1 }} className="bento-card card-medium" style={{ background: '#FCE7F3' }}>
            <h2 className="card-title">System Console</h2>
            <p className="card-desc">Interact directly with YashOS.</p>
            <Terminal />
          </motion.div>

          {/* SHIVANSHU DOSSIER */}
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ type: "spring", stiffness: 100, delay: 0.1 }} className="bento-card card-medium" style={{ background: '#FEF3C7' }}>
            <h2 className="card-title">Shivanshu Jha</h2>
            <p className="card-desc">Director of Marketing & Finance. Strategizing user acquisition, brand expansion, and execution scaling.</p>
            <div className="profile-img-container" style={{ background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '40px' }}>
               <img src="https://api.dicebear.com/7.x/micah/svg?seed=Shivanshu&baseColor=f9c9b6" alt="Shivanshu Avatar" style={{ height: '80%', width: 'auto', objectFit: 'contain' }} />
            </div>
          </motion.div>

          {/* MASTER PLAN (GUMROAD) */}
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ type: "spring", stiffness: 100 }} className="bento-card card-large">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h2 className="card-title">The Execution Pipeline</h2>
                <motion.p 
                  key={activeStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card-desc" style={{ maxWidth: '600px', minHeight: '60px' }}
                >
                  {pipelineSteps[activeStep].desc}
                </motion.p>
              </div>
              <div style={{ width: '120px', height: '120px', border: '3px solid #111', borderRadius: '12px', background: '#FAFAFA', overflow: 'hidden', boxShadow: '4px 4px 0 #111' }}>
                <lottie-player src="https://assets.gumroad.com/assets/about/gumhead-f11adc65704bbfd51d7b57af5b375a0f2d7aa35a7bcb50ea5c9669814ba836ee.json" background="transparent" speed="1" style={{ width: "100%", height: "100%" }} loop autoplay></lottie-player>
              </div>
            </div>

            <div className="saas-track">
              {pipelineSteps.map((step, index) => (
                <div 
                  key={index}
                  className={`track-step ${activeStep === index ? 'active' : ''}`}
                  onClick={() => setActiveStep(index)}
                  style={{ cursor: 'pointer' }}
                >
                  {step.title}
                </div>
              ))}
            </div>
          </motion.div>

          {/* TECH STACK */}
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ type: "spring", stiffness: 100 }} className="bento-card card-medium" style={{ background: '#DCFCE7', gridColumn: '1 / -1' }}>
            <h2 className="card-title">Core Stack</h2>
            <p className="card-desc" style={{ marginBottom: '20px' }}>The technologies driving our high-performance infrastructure.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {['React.js', 'Node.js', 'PostgreSQL', 'Framer Motion', 'Tailwind', 'AWS', 'Docker', 'Python', 'Redis', 'GraphQL'].map((tech) => (
                <span key={tech} className="tech-chip">{tech}</span>
              ))}
            </div>
          </motion.div>

        </section>

        {/* NEW SECTION: RECENT WORK */}
        <section style={{ marginTop: '120px' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}>
            <h2 className="hero-title" style={{ fontSize: 'clamp(40px, 8vw, 80px)', marginBottom: '40px', letterSpacing: '-3px' }}>Recent Work.</h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
             {[
                { title: "Lusion", url: "https://lusion.co/", type: "Creative Studio", color: "#FFF" },
                { title: "Buzzworthy", url: "https://buzzworthystudio.com/", type: "Digital Agency", color: "#FCD34D" },
                { title: "ET Studio", url: "https://www.e-t.studio/", type: "Design / Arch", color: "#A7F3D0" },
                { title: "Minecraft Hub", url: "https://everything-you-need-minecraft-hub-d-nu.vercel.app/", type: "Gaming App", color: "#E0E7FF" }
             ].map((project, i) => (
               <motion.a 
                 href={project.url} target="_blank" rel="noreferrer" key={i}
                 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ delay: i * 0.1, type: 'spring' }}
                 style={{ 
                   display: 'block', 
                   textDecoration: 'none', 
                   color: '#111', 
                   background: project.color, 
                   border: '4px solid #111', 
                   padding: '40px', 
                   boxShadow: '8px 8px 0 #111',
                   transition: 'transform 0.2s, box-shadow 0.2s',
                   borderRadius: '12px'
                 }}
                 onMouseOver={(e) => { e.currentTarget.style.transform = 'translate(-4px, -4px)'; e.currentTarget.style.boxShadow = '12px 12px 0 #111'; }}
                 onMouseOut={(e) => { e.currentTarget.style.transform = 'translate(0, 0)'; e.currentTarget.style.boxShadow = '8px 8px 0 #111'; }}
               >
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                   <span style={{ fontFamily: 'Courier New, monospace', fontWeight: 'bold', fontSize: '14px' }}>0{i+1} // {project.type}</span>
                   <span style={{ fontSize: '24px', fontWeight: 'bold' }}>↗</span>
                 </div>
                 <h3 style={{ fontSize: '48px', margin: 0, letterSpacing: '-2px', fontWeight: '900' }}>{project.title}</h3>
               </motion.a>
             ))}
          </div>
        </section>

        {/* NEW SECTION: INNER CIRCLE */}
        <section style={{ marginTop: '120px' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}>
            <h2 className="hero-title" style={{ fontSize: 'clamp(40px, 8vw, 80px)', marginBottom: '40px', letterSpacing: '-3px' }}>Some really cool people I know.</h2>
          </motion.div>
          <div className="bento-grid">
            
            {/* MAHEK */}
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ type: "spring", stiffness: 100 }} className="bento-card card-medium" style={{ background: '#FFF', padding: 0, display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '250px', borderBottom: '3px solid #111', overflow: 'hidden', position: 'relative' }}>
                <img src="https://images.unsplash.com/photo-1490750967868-88cb4ecb0701?q=80&w=800&auto=format&fit=crop" alt="Pink Flowers" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '20px', right: '20px', background: '#FCE7F3', border: '3px solid #111', padding: '4px 12px', fontWeight: '900', boxShadow: '4px 4px 0 #111', fontFamily: 'Space Grotesk, sans-serif' }}>01</div>
              </div>
              <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', flex: 1, background: '#FCE7F3' }}>
                 <h2 className="card-title" style={{ fontSize: '40px', marginBottom: '0' }}>Mahek</h2>
                 <p className="card-desc" style={{ fontFamily: 'Courier New, monospace', fontWeight: 'bold', color: '#666', marginBottom: '30px' }}>@mahek.1810_</p>
                 
                 <a href="https://www.instagram.com/mahek.1810_/" target="_blank" rel="noreferrer" className="brutal-btn" style={{ marginTop: 'auto', textAlign: 'center', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textDecoration: 'none', background: '#FFF' }}>
                   <span>CONNECT</span>
                   <span style={{ fontSize: '20px' }}>↗</span>
                 </a>
              </div>
            </motion.div>

            {/* SHALOM */}
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ type: "spring", stiffness: 100, delay: 0.1 }} className="bento-card card-medium" style={{ background: '#FFF', padding: 0, display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '250px', borderBottom: '3px solid #111', overflow: 'hidden', position: 'relative' }}>
                <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop" alt="Ocean Waves" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '20px', right: '20px', background: '#E0E7FF', border: '3px solid #111', padding: '4px 12px', fontWeight: '900', boxShadow: '4px 4px 0 #111', fontFamily: 'Space Grotesk, sans-serif' }}>02</div>
              </div>
              <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', flex: 1, background: '#E0E7FF' }}>
                 <h2 className="card-title" style={{ fontSize: '40px', marginBottom: '0' }}>Shalom</h2>
                 <p className="card-desc" style={{ fontFamily: 'Courier New, monospace', fontWeight: 'bold', color: '#666', marginBottom: '30px' }}>@shalommanmothe12</p>
                 
                 <a href="https://www.instagram.com/shalommanmothe12/" target="_blank" rel="noreferrer" className="brutal-btn" style={{ marginTop: 'auto', textAlign: 'center', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textDecoration: 'none', background: '#FFF' }}>
                   <span>CONNECT</span>
                   <span style={{ fontSize: '20px' }}>↗</span>
                 </a>
              </div>
            </motion.div>

            {/* SLACCZ */}
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ type: "spring", stiffness: 100, delay: 0.2 }} className="bento-card card-medium" style={{ background: '#FFF', padding: 0, display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '250px', borderBottom: '3px solid #111', overflow: 'hidden', position: 'relative' }}>
                <img src="https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=800&auto=format&fit=crop" alt="Forest" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '20px', right: '20px', background: '#DCFCE7', border: '3px solid #111', padding: '4px 12px', fontWeight: '900', boxShadow: '4px 4px 0 #111', fontFamily: 'Space Grotesk, sans-serif' }}>03</div>
              </div>
              <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', flex: 1, background: '#DCFCE7' }}>
                 <h2 className="card-title" style={{ fontSize: '40px', marginBottom: '0' }}>Slaccz</h2>
                 <p className="card-desc" style={{ fontFamily: 'Courier New, monospace', fontWeight: 'bold', color: '#666', marginBottom: '30px' }}>@slaccz_</p>
                 
                 <a href="https://www.instagram.com/slaccz_/" target="_blank" rel="noreferrer" className="brutal-btn" style={{ marginTop: 'auto', textAlign: 'center', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textDecoration: 'none', background: '#FFF' }}>
                   <span>CONNECT</span>
                   <span style={{ fontSize: '20px' }}>↗</span>
                 </a>
              </div>
            </motion.div>

          </div>
        </section>
      </div>
      
      {/* MASSIVE FOOTER MARQUEE */}
      <div className="marquee-container">
        <div className="marquee-text">
           AVAILABLE FOR FREELANCE • BUILDING DIGITAL ECOSYSTEMS • HIGH-PERFORMANCE ARCHITECTURE • NO COMPROMISES • AVAILABLE FOR FREELANCE • BUILDING DIGITAL ECOSYSTEMS • HIGH-PERFORMANCE ARCHITECTURE • NO COMPROMISES •
        </div>
      </div>
    </>
  );
};

function App() {
  const [profile, setProfile] = useState(null);
  const [splashGone, setSplashGone] = useState(false);
  const [showWhoWeAre, setShowWhoWeAre] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    fetch(`${API_URL}/api/profile`)
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(err => console.error("Could not fetch profile", err));

    // Lottie player script for Gumroad svg
    if (!document.querySelector('script[src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"]')) {
      const script = document.createElement('script');
      script.src = "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js";
      script.async = true;
      document.body.appendChild(script);
    }

    const splashTimeout = setTimeout(() => {
      setSplashGone(true);
    }, 2500);

    return () => clearTimeout(splashTimeout);
  }, []);

  return (
    <>
      {showWhoWeAre ? (
        <WhoWeAre onBack={() => setShowWhoWeAre(false)} />
      ) : (
        <BmwLanding onNavigateToWhoWeAre={() => setShowWhoWeAre(true)} />
      )}
    </>
  );
}

export default App;
