import React from 'react';
import Reveal from './Reveal';

export default function Hero() {
  const renderInteractiveWords = (text, isHighlight = false) => {
    return text.split(' ').map((word, idx) => (
      <span
        key={idx}
        className={`inline-block mr-[0.2em] transition-all duration-300 hover:-translate-y-2 cursor-default select-none ${
          isHighlight 
            ? 'text-primary hover:text-secondary hover:drop-shadow-[0_0_20px_rgba(0,238,252,0.8)]' 
            : 'text-on-surface hover:text-primary hover:drop-shadow-[0_0_20px_rgba(193,193,255,0.8)]'
        }`}
      >
        {word}
      </span>
    ));
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 px-gutter overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 text-center max-w-4xl animate-float">
        <Reveal delay={0}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6">
            <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
            <span className="font-label-mono text-xs uppercase tracking-widest font-semibold">
              Intern / Fresher Frontend Developer
            </span>
          </div>
        </Reveal>
        
        <Reveal delay={150}>
          <h1 className="font-display-xl-mobile md:font-display-xl text-display-xl-mobile md:text-display-xl mb-6 leading-tight font-extrabold tracking-tighter">
            {renderInteractiveWords("Chào, mình là", false)}
            <span className="block text-primary drop-shadow-[0_0_35px_rgba(193,193,255,0.4)] mt-1">
              {renderInteractiveWords("Nguyễn Bùi Tuyển", true)}
            </span>
          </h1>
        </Reveal>

        <Reveal delay={250}>
          <div className="text-secondary font-label-mono text-sm md:text-base font-medium mb-6 tracking-wide">
            React.js • Next.js • TypeScript • Tailwind CSS • Supabase
          </div>
        </Reveal>
        
        <Reveal delay={350}>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 max-w-2xl mx-auto leading-relaxed">
            Sinh viên ngành Công nghệ Thông tin tại <strong className="text-on-surface font-semibold">Đại học Thăng Long</strong> (GPA: 3.1/4.0). Mình có kinh nghiệm thực chiến phát triển các ứng dụng web thực tế tại <strong className="text-on-surface font-semibold">SGOData</strong> &amp; <strong className="text-on-surface font-semibold">TravelViet</strong>, luôn chú trọng trải nghiệm người dùng, giao diện pixel-perfect và hiệu năng cao.
          </p>
        </Reveal>

        {/* Highlight Pills */}
        <Reveal delay={450}>
          <div className="flex flex-wrap justify-center gap-3 mb-10 max-w-xl mx-auto text-xs font-label-mono">
            <span className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-md text-on-surface-variant flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-primary">school</span>
              ĐH Thăng Long (GPA 3.1)
            </span>
            <span className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-md text-on-surface-variant flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-secondary">business_center</span>
              Intern @ SGOData &amp; TravelViet
            </span>
            <span className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-md text-on-surface-variant flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-tertiary">rocket_launch</span>
              Mơ Village &amp; Nice Art
            </span>
          </div>
        </Reveal>

        <Reveal delay={550}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href={`${import.meta.env.BASE_URL}CV.pdf`}
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-primary-container text-on-primary-container font-bold px-8 py-4 rounded-lg interactive-btn shadow-lg hover:shadow-primary/30 transition-all duration-300 text-center flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-xl">description</span>
              Xem CV Bản Đầy Đủ
            </a>
            <a 
              href="#work" 
              className="w-full sm:w-auto bg-primary text-on-primary-container font-bold px-8 py-4 rounded-lg interactive-btn shadow-lg hover:shadow-primary/30 transition-all duration-300 text-center"
            >
              Khám Phá Dự Án
            </a>
            <a 
              href="#contact" 
              className="w-full sm:w-auto glass-card text-on-surface hover:text-primary font-bold px-8 py-4 rounded-lg transition-all duration-300 text-center"
            >
              Liên Hệ Với Mình
            </a>
          </div>
        </Reveal>
      </div>

      {/* Decorative background grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0"></div>

      {/* Animated scroll down indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-on-surface-variant/50 animate-pulse">
        <span className="font-label-mono text-xs uppercase tracking-widest">Cuộn xuống</span>
        <span className="material-symbols-outlined animate-bounce">keyboard_double_arrow_down</span>
      </div>
    </section>
  );
}
