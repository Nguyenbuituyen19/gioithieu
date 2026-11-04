import React, { useEffect, useRef } from 'react';

const MARQUEE_TECHS = [
  'React 19',
  'Next.js 15',
  'TypeScript',
  'Tailwind CSS',
  'Three.js WebGL',
  'Supabase',
  'Node.js',
  'PostgreSQL',
  'VietQR Pay',
  'Vite',
  'Figma',
  'Git & GitHub',
  'RESTful APIs',
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

      velocityRef.current += delta * 0.04;
      velocityRef.current = Math.max(-8, Math.min(8, velocityRef.current));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    let rafId;
    const animate = () => {
      if (!isHoveredRef.current) {
        velocityRef.current += (0.8 - velocityRef.current) * 0.05;
        offsetRef.current += velocityRef.current;

        if (containerRef.current) {
          const halfWidth = containerRef.current.scrollWidth / 2;
          if (halfWidth > 0) {
            if (offsetRef.current >= halfWidth) offsetRef.current -= halfWidth;
            if (offsetRef.current < 0) offsetRef.current += halfWidth;
            containerRef.current.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
          }
        }
      }
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const doubleTechs = [...MARQUEE_TECHS, ...MARQUEE_TECHS];

  return (
    <div 
      className="w-full bg-canvas-parchment border-y border-hairline py-4 overflow-hidden relative select-none"
      onMouseEnter={() => { isHoveredRef.current = true; }}
      onMouseLeave={() => { isHoveredRef.current = false; }}
    >
      <div 
        ref={containerRef}
        className="flex items-center gap-6 whitespace-nowrap will-change-transform"
      >
        {doubleTechs.map((tech, idx) => (
          <div 
            key={idx}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-hairline text-ink text-[13px] sm:text-[14px] font-medium tracking-tight shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary/70"></span>
            <span>{tech}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
