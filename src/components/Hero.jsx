import React from 'react';
import Reveal from './Reveal';
import Text3DCanvas from './Text3DCanvas';
import CharacterModel3D from './CharacterModel3D';
import TechBadge from './TechBadge';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-gutter overflow-hidden scroll-mt-20 sm:scroll-mt-24">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] rounded-full bg-primary/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] rounded-full bg-secondary/10 blur-[100px] pointer-events-none"></div>

      {/* Decorative cyber grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(193,193,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] sm:bg-[size:40px_40px] pointer-events-none z-0"></div>

      <div className="relative z-10 w-full max-w-container-max mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-8">
        
        {/* Left Column: True 3D WebGL Mesh Typography & Tactile CTAs */}
        <div className="w-full lg:w-7/12 text-center lg:text-left flex flex-col items-center lg:items-start">
          <Reveal delay={0}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container/90 border border-primary/30 text-primary mb-4 sm:mb-6 pill-3d backdrop-blur-md shadow-lg">
              <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
              <span className="font-label-mono text-[11px] sm:text-xs uppercase tracking-widest font-semibold text-secondary">
                Intern / Fresher Frontend Developer
              </span>
            </div>
          </Reveal>
          
          {/* Real 3D Extruded WebGL Mesh Typography */}
          <Reveal delay={150} className="w-full">
            <Text3DCanvas />
          </Reveal>

          {/* Tech Badges with 3D Depth */}
          <Reveal delay={250}>
            <div className="mb-6 mt-3 flex items-center gap-2 sm:gap-2.5 flex-wrap justify-center lg:justify-start">
              <TechBadge name="React 19" size="md" />
              <TechBadge name="Next.js" size="md" />
              <TechBadge name="TypeScript" size="md" />
              <TechBadge name="Tailwind CSS" size="md" />
              <TechBadge name="Three.js" size="md" />
              <TechBadge name="Supabase" size="md" />
            </div>
          </Reveal>
          
          <Reveal delay={350}>
            <p className="font-body-md sm:font-body-lg text-sm sm:text-base text-on-surface-variant mb-6 sm:mb-8 max-w-2xl leading-relaxed text-center sm:text-justify lg:text-left">
              Sinh viên Công nghệ Thông tin tại <strong className="text-on-surface font-semibold text-primary">Đại học Thăng Long</strong> (GPA: 3.1/4.0). Mình có kinh nghiệm thực chiến phát triển các ứng dụng web thực tế tại <strong className="text-on-surface font-semibold text-secondary">SGOData</strong> &amp; <strong className="text-on-surface font-semibold text-secondary">TravelViet</strong>, luôn chú trọng trải nghiệm người dùng, giao diện pixel-perfect và hiệu năng cao.
            </p>
          </Reveal>

          {/* 3D Tactile CTA Buttons */}
          <Reveal delay={550}>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start items-center w-full sm:w-auto">
              <a 
                href={`${import.meta.env.BASE_URL}CV.pdf`}
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto btn-3d bg-primary text-on-primary-container font-bold px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-center flex items-center justify-center gap-2 cursor-pointer shadow-lg text-sm sm:text-base"
              >
                <span className="material-symbols-outlined text-lg sm:text-xl">description</span>
                Xem CV Bản Đầy Đủ
              </a>
              <a 
                href="#work" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto btn-3d bg-secondary/20 hover:bg-secondary/35 text-secondary hover:text-white border border-secondary/40 font-bold px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-center flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base transition-all hover:shadow-[0_0_20px_rgba(0,238,252,0.35)]"
              >
                <span className="material-symbols-outlined text-lg sm:text-xl">view_in_ar</span>
                Khám Phá Dự Án
              </a>
              <a 
                href="#contact" 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto btn-3d glass-card text-on-surface hover:text-secondary font-bold px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-center cursor-pointer text-sm sm:text-base hover:border-secondary/40 hover:shadow-[0_0_20px_rgba(0,238,252,0.25)] transition-all"
              >
                Liên Hệ Với Mình
              </a>
            </div>
          </Reveal>
        </div>

        {/* Right Column: Real Interactive 3D WebGL Model */}
        <div className="w-full lg:w-5/12 flex items-center justify-center relative mt-4 lg:mt-0">
          <Reveal delay={200} className="w-full max-w-[460px]">
            <CharacterModel3D />
          </Reveal>
        </div>

      </div>

      {/* Animated scroll down indicator */}
      <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-on-surface-variant/40 animate-pulse pointer-events-none">
        <span className="font-label-mono text-[10px] uppercase tracking-widest">Cuộn để khám phá</span>
        <span className="material-symbols-outlined text-sm animate-bounce">keyboard_double_arrow_down</span>
      </div>
    </section>
  );
}