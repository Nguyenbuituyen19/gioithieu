import React, { useEffect, useRef, useState } from 'react';

/**
 * Reveal: 3D Spatial Scroll-Triggered Unfold Component
 * Replaces flat opacity fade with dynamic 3D perspective rotation and scaling.
 */
export default function Reveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  threshold = 0.1
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  // Directional 3D initial styles
  const getInitialTransforms = () => {
    switch (direction) {
      case 'left':
        return 'translate-x-12 [transform:perspective(1000px)_rotateY(-15deg)_scale(0.95)]';
      case 'right':
        return '-translate-x-12 [transform:perspective(1000px)_rotateY(15deg)_scale(0.95)]';
      case 'zoom':
        return '[transform:perspective(1000px)_scale(0.9)]';
      case 'up':
      default:
        return 'translate-y-12 [transform:perspective(1000px)_rotateX(12deg)_scale(0.96)]';
    }
  };

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
        transformOrigin: 'center bottom'
      }}
      className={`transform-style-3d transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) ${className} ${
        isVisible
          ? 'opacity-100 translate-y-0 translate-x-0 [transform:perspective(1000px)_rotateX(0deg)_rotateY(0deg)_scale(1)]'
          : `opacity-0 ${getInitialTransforms()}`
      }`}
    >
      {children}
    </div>
  );
}
