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
          <span className="font-label-mono text-label-mono text-primary mb-6 block tracking-widest uppercase cursor-default select-none">
            {renderInteractiveWords("Frontend Developer", true)}
          </span>
        </Reveal>
        
        <Reveal delay={150}>
          <h1 className="font-display-xl-mobile md:font-display-xl text-display-xl-mobile md:text-display-xl mb-8 leading-tight font-extrabold tracking-tighter">
            {renderInteractiveWords("Chào, mình là", false)}
            <span className="block md:inline-block">
              {renderInteractiveWords("Frontend Developer", true)}
            </span>
          </h1>
        </Reveal>
        
        <Reveal delay={300}>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-12 max-w-2xl mx-auto">
            Em là sinh viên ngành Công nghệ Thông tin, định hướng trở thành Frontend Developer. Em luôn chú trọng trải nghiệm người dùng, hiệu năng và khả năng mở rộng của sản phẩm.
          </p>
        </Reveal>

        <Reveal delay={450}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="#work" 
              className="w-full sm:w-auto bg-primary text-on-primary-container font-bold px-8 py-4 rounded-lg interactive-btn shadow-lg hover:shadow-primary/30 transition-all duration-300 text-center"
            >
              Xem Dự Án
            </a>
            <a 
              href="#contact" 
              className="w-full sm:w-auto glass-card text-on-surface hover:text-primary font-bold px-8 py-4 rounded-lg transition-all duration-300 text-center"
            >
              Liên Hệ
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
