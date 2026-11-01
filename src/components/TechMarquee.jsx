import React, { useEffect, useRef, useState } from 'react';
import TechBadge from './TechBadge';

const MARQUEE_TECHS = [
  'React 19',
  'Next.js',
  'TypeScript',
  'Tailwind CSS',
  'Three.js',
  'Supabase',
  'Node.js',
  'PostgreSQL',
  'VietQR',
  'Vite',
  'Figma',
  'Git & GitHub',
  'Express.js',
  'HTML5 & CSS3',
  'REST API',
  'VS Code',
  'Postman',
  'Vercel'
];

/**
 * TechMarquee: Scroll-Velocity Responsive 3D Tech Ticker
 * Seamlessly loops authentic official tech badges and dynamically accelerates
 * with subtle 3D skew when the user scrolls the page.
 */
export default function TechMarquee() {
  const containerRef = useRef(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(1);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      // Boost velocity in response to user scroll flick
      velocityRef.current += delta * 0.06;
      velocityRef.current = Math.max(-12, Math.min(12, velocityRef.current));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    let rafId;
    const animate = () => {
      if (!isHoveredRef.current) {
        // Smoothly decay velocity back to base cruising speed (0.9px / frame)
        velocityRef.current += (0.9 - velocityRef.current) * 0.05;
        offsetRef.current += velocityRef.current;

        if (containerRef.current) {
          const halfWidth = containerRef.current.scrollWidth / 2;
          if (halfWidth > 0) {
            if (offsetRef.current >= halfWidth) offsetRef.current -= halfWidth;
            if (offsetRef.current < 0) offsetRef.current += halfWidth;
            
            // Dynamic skew tilt based on velocity
            const skewX = Math.max(-6, Math.min(6, (velocityRef.current - 0.9) * 0.6));
            containerRef.current.style.transform = `translate3d(-${offsetRef.current}px, 0, 0) skewX(${skewX}deg)`;
          }
        }
      }
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div 
      className="relative w-full overflow-hidden py-8 border-y border-white/10 bg-surface-container-lowest/60 backdrop-blur-xl z-20"
      onMouseEnter={() => { isHoveredRef.current = true; }}
      onMouseLeave={() => { isHoveredRef.current = false; }}
    >
      {/* Gradient masks for smooth edges */}
      <div className="absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-[#131314] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-[#131314] to-transparent z-10 pointer-events-none" />

      <div 
        ref={containerRef}
        className="flex w-max gap-6 will-change-transform select-none"
      >
        {/* Render twice for continuous loop */}
        {[...MARQUEE_TECHS, ...MARQUEE_TECHS].map((tech, idx) => (
          <TechBadge
            key={idx}
            name={tech}
            size="md"
            className="hover:scale-110 shadow-lg cursor-pointer transition-transform"
          />
        ))}
      </div>
    </div>
  );
}