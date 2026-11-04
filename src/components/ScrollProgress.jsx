import React, { useEffect, useState } from 'react';

/**
 * ScrollProgress: High-performance Neon Scroll Indicator
 * Renders a glowing laser gradient bar tracking document scroll percentage.
 */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const pct = Math.min(Math.max(scrollTop / docHeight, 0), 1);
        setProgress(pct);
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-[100] pointer-events-none bg-white/[0.03]">
      <div
        className="h-full bg-gradient-to-r from-primary via-secondary to-[#c1c1ff] transition-all duration-75 ease-out relative"
        style={{ width: `${(progress * 100).toFixed(2)}%` }}
      >
        {/* Glowing laser head on the edge */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-secondary blur-sm shadow-[0_0_12px_#00eefc]" />
      </div>
    </div>
  );
}
