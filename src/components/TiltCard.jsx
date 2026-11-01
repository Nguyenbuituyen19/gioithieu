import React, { useRef, useState, useEffect } from 'react';

/**
 * TiltCard: High-performance 3D Spatial Tilt Card with Glare & Depth
 * Supports mouse tracking, perspective depth, smooth reset, and mobile touch fallback.
 */
export default function TiltCard({
  children,
  className = '',
  innerClassName = '',
  maxTilt = 12,
  perspective = 1000,
  glare = true,
  scale = 1.02,
  ...props
}) {
  const cardRef = useRef(null);
  const [style, setStyle] = useState({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)'
  });
  const [glareStyle, setGlareStyle] = useState({
    opacity: 0,
    transform: 'translate(-50%, -50%)',
    left: '50%',
    top: '50%'
  });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    setIsTouchDevice(isTouch);
  }, []);

  const handleMouseMove = (e) => {
    if (isTouchDevice || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const normalizedX = (x - centerX) / centerX; // -1 to 1
    const normalizedY = (y - centerY) / centerY; // -1 to 1

    const rotX = -normalizedY * maxTilt;
    const rotY = normalizedX * maxTilt;

    setStyle({
      transform: `perspective(${perspective}px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`,
      transition: 'transform 0.1s ease-out'
    });

    if (glare) {
      setGlareStyle({
        opacity: 0.35,
        left: `${x}px`,
        top: `${y}px`,
        transform: 'translate(-50%, -50%)',
        transition: 'opacity 0.2s ease-out'
      });
    }
  };

  const handleMouseLeave = () => {
    if (isTouchDevice) return;
    setStyle({
      transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)'
    });

    if (glare) {
      setGlareStyle((prev) => ({
        ...prev,
        opacity: 0,
        transition: 'opacity 0.5s ease-out'
      }));
    }
  };

  return (
    <div
      ref={cardRef}
      className={`relative transform-style-3d ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      {...props}
    >
      <div className={`w-full h-full transform-style-3d ${innerClassName}`}>
        {children}
      </div>

      {glare && !isTouchDevice && (
        <div
          className="pointer-events-none absolute w-64 h-64 rounded-full bg-gradient-to-r from-primary/30 to-secondary/30 blur-2xl z-50 overflow-hidden"
          style={glareStyle}
        />
      )}
    </div>
  );
}
