import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'

/** max letters = 12. add more record if needed */
const SCATTER_TRANSFORMS = {
  1: { x: '-15%', y: '60%', rotate: 8 },
  2: { x: '-30%', y: '30%', rotate: 4 },
  3: { x: '-20%', y: '40%', rotate: -6 },
  4: { x: '0%', y: '8%', rotate: -8 },
  5: { x: '0%', y: '-20%', rotate: 5 },
  6: { x: '0%', y: '20%', rotate: -3 },
  7: { x: '0%', y: '-40%', rotate: -5 },
  8: { x: '0%', y: '15%', rotate: 10 },
  9: { x: '10%', y: '-30%', rotate: -5 },
  10: { x: '20%', y: '40%', rotate: 8 },
  11: { x: '15%', y: '-10%', rotate: -3 },
  12: { x: '30%', y: '20%', rotate: 6 },
}

const DefaultLinks = [
  { label: 'Github', href: 'https://github.com/shatlyk1011' },
  { label: 'Linkedin', href: 'https://www.linkedin/in/shatlyk1011' },
]

export default function FancyTextHover({
  links = DefaultLinks,
}) {
  const containerRef = useRef(null)

  /** Build per-letter DOM and attach GSAP-driven hover animations */
  useEffect(() => {
    if (!containerRef.current) return

    const fancyEls = containerRef.current.querySelectorAll('.fancy-word')

    fancyEls.forEach((anchor) => {
      // Prevent double-processing in React Strict Mode
      if (anchor.querySelector('span')) return;

      const text = anchor.textContent ?? ''
      anchor.textContent = ''

      text.split('').forEach((char, i) => {
        if (char === ' ') {
          const space = document.createElement('span')
          space.style.display = 'inline-block'
          space.style.width = '0.4em'
          space.innerHTML = '&nbsp;'
          anchor.appendChild(space)
          return
        }

        const outer = document.createElement('span')
        outer.style.display = 'inline-block'
        gsap.set(outer, {
          transition: 'transform 0.3s cubic-bezier(0.76, 0, 0.24, 1)',
        })

        const inner = document.createElement('span')
        inner.style.display = 'inline-block'

        const letter = document.createElement('span')
        letter.style.display = 'inline-block'
        letter.textContent = char.toUpperCase() // Force uppercase

        inner.appendChild(letter)
        outer.appendChild(inner)
        anchor.appendChild(outer)

        // Float animation unique seed per letter (random offset)
        const randomDelay = Math.floor(Math.random() * 5)

        /** Scatter & float on hover */
        const onEnter = () => {
          const childIndex = i + 1
          const transform = SCATTER_TRANSFORMS[childIndex] || { x: '10%', y: '-20%', rotate: 5 }
          if (transform) {
            gsap.to(outer, {
              xPercent: parseFloat(transform.x),
              yPercent: parseFloat(transform.y),
              rotation: transform.rotate,
              duration: 0.2,
              ease: 'power3.inOut',
            })
          }

          // Float animation on inner
          gsap.to(inner, {
            keyframes: [
              { yPercent: 0, duration: 0 },
              { yPercent: -3, duration: 2.5, ease: 'power3.inOut' },
              { yPercent: 0, duration: 2.5, ease: 'power3.inOut' },
            ],
            repeat: -1,
            delay: randomDelay,
          })
        }

        /** Reset all transforms on leave */
        const onLeave = () => {
          gsap.killTweensOf(inner)
          gsap.to(outer, {
            xPercent: 0,
            yPercent: 0,
            rotation: 0,
            duration: 0.35,
            ease: 'power3.inOut',
          })
          gsap.to(inner, {
            yPercent: 0,
            duration: 0.35,
            ease: 'power3.inOut',
          })
        }

        anchor.addEventListener('mouseenter', onEnter)
        anchor.addEventListener('mouseleave', onLeave)
      })
    })
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '20px',
        marginTop: '30px',
        width: '100%'
      }}
    >
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target='_blank'
          rel='noopener noreferrer'
          className='fancy-word'
          style={{
            display: 'block',
            fontSize: '3rem',
            fontFamily: "'Bebas Neue', cursive",
            letterSpacing: '4px',
            color: '#111',
            textDecoration: 'none',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => { 
            e.currentTarget.style.color = '#fff'; 
            e.currentTarget.style.textShadow = '4px 4px 0 #111'; 
          }}
          onMouseLeave={(e) => { 
            e.currentTarget.style.color = '#111'; 
            e.currentTarget.style.textShadow = 'none'; 
          }}
        >
          {link.label}
        </a>
      ))}
    </div>
  )
}
