import React from 'react';
import Reveal from './Reveal';
import Text3DCanvas from './Text3DCanvas';
import CharacterModel3D from './CharacterModel3D';
import TechBadge from './TechBadge';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-gutter overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-primary/10 blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[450px] h-[450px] rounded-full bg-secondary/10 blur-[120px] pointer-events-none"></div>

      {/* Decorative 3D perspective cyber grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(193,193,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0"></div>

      <div className="relative z-10 w-full max-w-container-max mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
        
        {/* Left Column: True 3D WebGL Mesh Typography & Tactile CTAs */}
        <div className="w-full lg:w-7/12 text-center lg:text-left flex flex-col items-center lg:items-start">
          <Reveal delay={0}>
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-surface-container/90 border border-primary/30 text-primary mb-6 pill-3d backdrop-blur-md shadow-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-ping"></span>
              <span className="font-label-mono text-xs uppercase tracking-widest font-semibold text-secondary">
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
            <div className="mb-7 mt-3 flex items-center gap-2.5 flex-wrap justify-center lg:justify-start">
              <TechBadge name="React 19" size="md" />
              <TechBadge name="Next.js" size="md" />
              <TechBadge name="TypeScript" size="md" />
              <TechBadge name="Tailwind CSS" size="md" />
              <TechBadge name="Three.js" size="md" />
              <TechBadge name="Supabase" size="md" />
            </div>
          </Reveal>
          
          <Reveal delay={350}>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 max-w-2xl leading-relaxed text-justify sm:text-left">
              Sinh viên Công nghệ Thông tin tại <strong className="text-on-surface font-semibold text-primary">Đại học Thăng Long</strong> (GPA: 3.1/4.0). Mình có kinh nghiệm thực chiến phát triển các ứng dụng web thực tế tại <strong className="text-on-surface font-semibold text-secondary">SGOData</strong> &amp; <strong className="text-on-surface font-semibold text-secondary">TravelViet</strong>, luôn chú trọng trải nghiệm người dùng, giao diện pixel-perfect và hiệu năng cao.
            </p>
          </Reveal>

          {/* Highlight 3D Spatial Pills */}
          <Reveal delay={450}>
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-10 max-w-xl text-xs font-label-mono">
              <span className="pill-3d bg-white/5 border border-white/10 px-3.5 py-2 rounded-lg text-on-surface-variant flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-primary">school</span>
                ĐH Thăng Long (GPA 3.1)
              </span>
              <span className="pill-3d bg-white/5 border border-white/10 px-3.5 py-2 rounded-lg text-on-surface-variant flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-secondary">business_center</span>
                Intern @ SGOData &amp; TravelViet
              </span>
              <span className="pill-3d bg-white/5 border border-white/10 px-3.5 py-2 rounded-lg text-on-surface-variant flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-tertiary">rocket_launch</span>
                Mơ Village &amp; Nice Art
              </span>
            </div>
          </Reveal>

          {/* 3D Tactile CTA Buttons */}
          <Reveal delay={550}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center w-full sm:w-auto">
              <a 
                href={`${import.meta.env.BASE_URL}CV.pdf`}
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto btn-3d bg-primary text-on-primary-container font-bold px-8 py-4 rounded-xl text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">description</span>
                Xem CV Bản Đầy Đủ
              </a>
              <a 
                href="#work" 
                className="w-full sm:w-auto btn-3d bg-secondary/20 hover:bg-secondary/30 text-secondary border border-secondary/40 font-bold px-8 py-4 rounded-xl text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">view_in_ar</span>
                Khám Phá Dự Án
              </a>
              <a 
                href="#contact" 
                className="w-full sm:w-auto btn-3d glass-card text-on-surface hover:text-primary font-bold px-8 py-4 rounded-xl text-center cursor-pointer"
              >
                Liên Hệ Với Mình
              </a>
            </div>
          </Reveal>
        </div>

        {/* Right Column: Real Interactive 3D WebGL Model */}
        <div className="w-full lg:w-5/12 flex items-center justify-center relative">
          <Reveal delay={200} className="w-full max-w-[460px]">
            <CharacterModel3D />
          </Reveal>
        </div>

      </div>

      {/* Animated scroll down indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-on-surface-variant/50 animate-pulse pointer-events-none">
        <span className="font-label-mono text-[11px] uppercase tracking-widest">Cuộn để khám phá</span>
        <span className="material-symbols-outlined text-sm animate-bounce">keyboard_double_arrow_down</span>
      </div>
    </section>
  );
}