import React, { useEffect, useRef } from 'react';
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

      velocityRef.current += delta * 0.05;
      velocityRef.current = Math.max(-10, Math.min(10, velocityRef.current));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    let rafId;
    const animate = () => {
      if (!isHoveredRef.current) {
        velocityRef.current += (0.85 - velocityRef.current) * 0.05;
        offsetRef.current += velocityRef.current;

        if (containerRef.current) {
          const halfWidth = containerRef.current.scrollWidth / 2;
          if (halfWidth > 0) {
            if (offsetRef.current >= halfWidth) offsetRef.current -= halfWidth;
            if (offsetRef.current < 0) offsetRef.current += halfWidth;
            
            const skewX = Math.max(-5, Math.min(5, (velocityRef.current - 0.85) * 0.5));
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
      className="relative w-full overflow-hidden py-4 sm:py-7 border-y border-white/10 bg-surface-container-lowest/60 backdrop-blur-xl z-20"
      onMouseEnter={() => { isHoveredRef.current = true; }}
      onMouseLeave={() => { isHoveredRef.current = false; }}
    >
      {/* Responsive edge masks */}
      <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-24 bg-gradient-to-r from-[#131314] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-24 bg-gradient-to-l from-[#131314] to-transparent z-10 pointer-events-none" />

      <div 
        ref={containerRef}
        className="flex w-max gap-3 sm:gap-6 will-change-transform select-none items-center"
      >
        {[...MARQUEE_TECHS, ...MARQUEE_TECHS].map((tech, idx) => (
          <TechBadge
            key={idx}
            name={tech}
            size="md"
            className="hover:scale-105 shadow-md cursor-pointer transition-transform"
          />
        ))}
      </div>
    </div>
  );
}