import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';

const TRACKS = [
  {
    title: "NEON DRIVE",
    artist: "SYNTHWAVE // 140BPM",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    colors: { c1: "#f472b6", c2: "#a855f7", c3: "#ec4899", c4: "#d946ef", c5: "#fdf4ff" }
  },
  {
    title: "CYBER CITY",
    artist: "ELECTRO // GLITCH",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    colors: { c1: "#2dd4bf", c2: "#3b82f6", c3: "#06b6d4", c4: "#6366f1", c5: "#e0f2fe" }
  },
  {
    title: "MIDNIGHT RIDE",
    artist: "DARK SYNTH // BASS",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    colors: { c1: "#f87171", c2: "#f97316", c3: "#ef4444", c4: "#ea580c", c5: "#fef2f2" }
  },
  {
    title: "FOREST CHILL",
    artist: "LOFI BEATS // RELAX",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    colors: { c1: "#4ade80", c2: "#84cc16", c3: "#22c55e", c4: "#10b981", c5: "#f0fdf4" }
  }
];

const DEFAULT_COLORS = { c1: "#38bdf8", c2: "#c084fc", c3: "#60a5fa", c4: "#818cf8", c5: "#fbcfe8" };

const BrutalVisualizer = ({ isPlaying, colors }) => {
  const bars = Array.from({ length: 24 });
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'flex-end', 
      gap: '6px', 
      height: '180px', 
      width: '100%',
      padding: '20px',
      background: '#111',
      borderBottom: '6px solid #fff',
      position: 'relative'
    }}>
      {isPlaying && (
        <motion.div 
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ repeat: Infinity, duration: 0.5 }}
          style={{ position: 'absolute', inset: 0, background: colors.c1, pointerEvents: 'none' }}
        />
      )}
      
      {bars.map((_, i) => {
        const defaultHeight = 15 + (i % 3) * 5;
        return (
          <motion.div
            key={i}
            animate={isPlaying ? { 
              height: [`${defaultHeight}%`, '100%', '30%', '90%', `${defaultHeight}%`],
              backgroundColor: [colors.c1, colors.c2, '#fff', colors.c1]
            } : { 
              height: `${defaultHeight}%`,
              backgroundColor: '#444'
            }}
            transition={isPlaying ? {
              repeat: Infinity,
              duration: 0.4 + Math.random() * 0.4,
              ease: "circInOut",
              delay: Math.random() * 0.2
            } : { duration: 0.5 }}
            style={{
              flex: 1,
              background: '#444',
              borderTop: `4px solid ${isPlaying ? '#fff' : '#222'}`,
              transformOrigin: 'bottom'
            }}
          />
        );
      })}
    </div>
  );
};

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef(null);
  const containerControls = useAnimation();

  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    const root = document.documentElement;
    const colorsToApply = isPlaying ? currentTrack.colors : DEFAULT_COLORS;
    
    root.style.setProperty('--theme-c1', colorsToApply.c1);
    root.style.setProperty('--theme-c2', colorsToApply.c2);
    root.style.setProperty('--theme-c3', colorsToApply.c3);
    root.style.setProperty('--theme-c4', colorsToApply.c4);
    root.style.setProperty('--theme-c5', colorsToApply.c5);

    if (isPlaying) {
      containerControls.start({
        scale: [1, 1.01, 0.99, 1],
        transition: { repeat: Infinity, duration: 0.5, ease: "easeInOut" }
      });
    } else {
      containerControls.stop();
      containerControls.set({ scale: 1 });
    }
  }, [isPlaying, currentTrack, containerControls]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
  };

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch(e => console.error("Audio play failed:", e));
    }
  }, [currentTrackIndex]);

  return (
    <motion.div 
      animate={containerControls}
      style={{
        width: '100%',
        maxWidth: '1100px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 50
      }}
    >
      <div style={{
        background: '#fff',
        border: '8px solid #111',
        boxShadow: '25px 25px 0 #111',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden'
      }}>
        
        {/* TOP MARQUEE BAR */}
        <div style={{
          background: '#ffef00',
          borderBottom: '6px solid #111',
          padding: '8px 0',
          overflow: 'hidden',
          display: 'flex',
          whiteSpace: 'nowrap'
        }}>
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            style={{ display: 'flex', gap: '30px' }}
          >
            {Array.from({length: 15}).map((_, i) => (
              <span key={i} style={{ 
                fontFamily: "'Bebas Neue', cursive", 
                fontSize: '24px', 
                color: '#111',
                letterSpacing: '2px'
              }}>
                ⚠ VIBE CHECK ACTIVE ⚠ AUDIO REACTIVE ⚠
              </span>
            ))}
          </motion.div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          
          {/* LEFT: INFO & RECORD */}
          <div style={{ 
            flex: '1 1 400px', 
            padding: '50px 40px', 
            position: 'relative',
            background: isPlaying ? currentTrack.colors.c5 : '#f9f9f9',
            transition: 'background 0.5s ease',
            borderRight: '6px solid #111',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '40px'
          }}>
            {/* Massive background watermark */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontFamily: "'Bebas Neue', cursive",
              fontSize: '180px',
              lineHeight: 0.8,
              color: 'rgba(17,17,17,0.04)',
              textAlign: 'center',
              pointerEvents: 'none',
              zIndex: 0,
              width: '100%'
            }}>
              NOW<br/>PLAY
            </div>

            <div style={{ position: 'relative', zIndex: 10 }}>
              <div style={{ 
                display: 'inline-block',
                background: '#111',
                color: '#fff',
                fontFamily: "'Rajdhani', sans-serif",
                fontWeight: 800,
                padding: '6px 16px',
                fontSize: '16px',
                letterSpacing: '3px',
                marginBottom: '15px',
                boxShadow: '4px 4px 0 rgba(0,0,0,0.2)'
              }}>
                TRACK {currentTrackIndex + 1} / {TRACKS.length}
              </div>
              <h2 style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: '70px',
                margin: 0,
                lineHeight: 0.9,
                color: '#111',
                textShadow: isPlaying ? `4px 4px 0 ${currentTrack.colors.c1}` : 'none',
                wordBreak: 'break-word'
              }}>
                {currentTrack.title}
              </h2>
              <p style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: '24px',
                fontWeight: 700,
                color: '#333',
                margin: '10px 0 0 0',
                letterSpacing: '2px',
                borderLeft: '4px solid #111',
                paddingLeft: '15px'
              }}>
                {currentTrack.artist}
              </p>
            </div>

            {/* Spinning Record (Moved below text to prevent overlap) */}
            <div style={{ position: 'relative', zIndex: 10, alignSelf: 'flex-start' }}>
              <motion.div 
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                style={{
                  width: '140px',
                  height: '140px',
                  borderRadius: '50%',
                  background: '#111',
                  border: `6px solid ${isPlaying ? currentTrack.colors.c1 : '#111'}`,
                  boxShadow: `8px 8px 0 ${isPlaying ? currentTrack.colors.c2 : '#ccc'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{ position: 'absolute', inset: '10px', border: '1px solid #333', borderRadius: '50%' }} />
                <div style={{ position: 'absolute', inset: '25px', border: '1px solid #333', borderRadius: '50%' }} />
                <div style={{ position: 'absolute', inset: '40px', border: '1px solid #333', borderRadius: '50%' }} />
                
                <div style={{
                  width: '50px',
                  height: '50px',
                  background: isPlaying ? currentTrack.colors.c3 : '#fff',
                  borderRadius: '50%',
                  border: '4px solid #111',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <div style={{ width: '12px', height: '12px', background: '#111', borderRadius: '50%' }} />
                </div>
              </motion.div>
            </div>
          </div>

          {/* RIGHT: VISUALIZER & CONTROLS */}
          <div style={{ 
            flex: '1 1 450px', 
            background: '#1a1a1a', 
            display: 'flex', 
            flexDirection: 'column' 
          }}>
            
            <BrutalVisualizer isPlaying={isPlaying} colors={currentTrack.colors} />

            {/* Brutalist Controls Area */}
            <div style={{ 
              flex: 1, 
              display: 'flex', 
              padding: '40px', 
              gap: '25px',
              alignItems: 'center',
              justifyContent: 'center',
              background: isPlaying ? currentTrack.colors.c2 : '#222',
              transition: 'background 0.5s ease',
              position: 'relative'
            }}>
              
              <motion.button 
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95, y: 0 }}
                onClick={prevTrack}
                style={{
                  width: '70px',
                  height: '70px',
                  background: '#fff',
                  border: '5px solid #111',
                  color: '#111',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '6px 6px 0 #111'
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95, y: 0, boxShadow: '0 0 0 #111' }}
                onClick={togglePlay}
                style={{
                  width: '160px',
                  height: '90px',
                  background: isPlaying ? '#ffef00' : '#4ade80',
                  border: '6px solid #111',
                  color: '#111',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '10px 10px 0 #111',
                  fontFamily: "'Bebas Neue', cursive",
                  fontSize: '32px',
                  letterSpacing: '2px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {isPlaying ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                    PAUSE
                  </span>
                ) : (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                    PLAY
                  </span>
                )}
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95, y: 0 }}
                onClick={nextTrack}
                style={{
                  width: '70px',
                  height: '70px',
                  background: '#fff',
                  border: '5px solid #111',
                  color: '#111',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '6px 6px 0 #111'
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
              </motion.button>
            </div>
          </div>
        </div>

        <audio 
          ref={audioRef}
          src={currentTrack.src} 
          onEnded={nextTrack}
          crossOrigin="anonymous"
        />
      </div>
    </motion.div>
  );
}
