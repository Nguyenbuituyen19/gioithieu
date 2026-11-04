import React from 'react';
import Reveal from './Reveal';
import CharacterModel3D from './CharacterModel3D';

export default function Hero() {
  const cvUrl = `${import.meta.env.BASE_URL}CV.pdf`;

  return (
    <section id="hero" className="relative w-full bg-canvas pt-12 sm:pt-16 md:pt-20 pb-16 md:pb-24 px-4 sm:px-6 md:px-8 border-b border-hairline">
      <div className="w-full max-w-[1024px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14">
        
        {/* Left Column: Apple Typography & Editorial Copy */}
        <div className="w-full lg:w-7/12 text-center lg:text-left flex flex-col items-center lg:items-start">
          <Reveal delay={0}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-canvas-parchment border border-hairline text-ink mb-4 sm:mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              <span className="text-[12px] font-medium tracking-tight text-ink-muted-80">
                Frontend Developer &amp; Creative Technologist
              </span>
            </div>
          </Reveal>
          
          {/* Signature Apple Headline (56px / 600 / -0.28px) */}
          <Reveal delay={100} className="w-full">
            <h1 className="font-display text-[40px] xs:text-[48px] sm:text-[56px] font-semibold text-ink leading-[1.07] tracking-[-0.025em] mb-3 sm:mb-4">
              Nguyễn Bùi Tuyển.
            </h1>
          </Reveal>

          {/* Subtitle / Lead (28px / 400) */}
          <Reveal delay={200}>
            <p className="font-display text-[22px] sm:text-[26px] md:text-[28px] text-ink-muted-80 font-normal leading-[1.18] tracking-[0.005em] mb-5">
              Chế tác trải nghiệm Web mượt mà, chuẩn mực và giàu cảm xúc.
            </p>
          </Reveal>

          {/* Body Paragraph (17px / 400 / 1.47) */}
          <Reveal delay={300}>
            <p className="font-body text-[16px] sm:text-[17px] text-ink leading-[1.47] tracking-[-0.015em] mb-7 max-w-xl text-center sm:text-left">
              Sinh viên Công nghệ Thông tin tại <strong className="font-semibold text-ink">Đại học Thăng Long</strong> (GPA: 3.1/4.0). Từng tham gia phát triển sản phẩm thực chiến tại <strong className="font-semibold text-ink">SGOData</strong> &amp; <strong className="font-semibold text-ink">TravelViet</strong>, chuyên sâu React, Next.js, TypeScript và không gian tương tác WebGL.
            </p>
          </Reveal>

          {/* Key Facts Pills (Apple Store Style) */}
          <Reveal delay={400}>
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-8 text-[13px] text-ink-muted-80">
              <span className="bg-canvas-parchment border border-hairline px-3 py-1 rounded-full">
                🎓 ĐH Thăng Long (GPA 3.1)
              </span>
              <span className="bg-canvas-parchment border border-hairline px-3 py-1 rounded-full">
                💼 Intern @ SGOData &amp; TravelViet
              </span>
              <span className="bg-canvas-parchment border border-hairline px-3 py-1 rounded-full">
                🚀 Mơ Village &amp; Nice Art
              </span>
            </div>
          </Reveal>

          {/* Apple Action Buttons (Action Blue Pill & Secondary Ghost Pill) */}
          <Reveal delay={500}>
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-center lg:justify-start w-full sm:w-auto">
              <a 
                href="#work" 
                className="btn-pill btn-primary w-full sm:w-auto text-[16px] sm:text-[17px]"
              >
                Khám phá dự án
              </a>
              <a 
                href={cvUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-pill btn-secondary-pill w-full sm:w-auto text-[16px] sm:text-[17px]"
              >
                Xem CV (PDF) ↗
              </a>
            </div>
          </Reveal>
        </div>

        {/* Right Column: 3D Robot Assistant as the Hero Product */}
        <div className="w-full lg:w-5/12 flex items-center justify-center">
          <Reveal delay={250} className="w-full max-w-[440px] sm:max-w-[480px]">
            <div className="relative group">
              <CharacterModel3D className="shadow-apple-product" />
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
