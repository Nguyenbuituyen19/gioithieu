import React from 'react';
import Reveal from './Reveal';

const STATS = [
  { value: '1+', label: 'Năm học & thực hành' },
  { value: '6+', label: 'Projects' },
  { value: 'Responsive', label: 'SEO Friendly' }
];

const TIMELINE = [
  {
    year: '2026 - Hiện tại',
    role: 'Frontend Developer',
    company: 'NICE ART (Freelance Project)',
    bullets: [
      'Phát triển website giới thiệu doanh nghiệp và hệ thống quản trị.',
      'Xây dựng giao diện bằng React.js và Next.js.',
      'Thiết kế REST API với Express.js.',
      'Tích hợp Supabase Database & Storage.',
      'Tối ưu SEO, Responsive và hiệu năng.'
    ]
  },
  {
    year: '2024 - Hiện tại',
    role: 'Frontend Self-learning & Personal Projects',
    company: 'Tự học & Dự án cá nhân',
    bullets: [
      'Tự học React.js, Next.js và TypeScript.',
      'Thực hiện các dự án cá nhân.',
      'Chuyển thiết kế Figma thành giao diện responsive.'
    ]
  },
  {
    year: '2024 - Hiện tại',
    role: 'Sinh viên Công nghệ Thông tin',
    company: 'Đại Học Thăng Long',
    bullets: [
      'Sinh viên ngành Công nghệ Thông tin.',
      'Tập trung học: HTML, CSS, JavaScript, React.js, Next.js, Cấu trúc dữ liệu & Giải thuật.'
    ]
  }
];

export default function About() {
  return (
    <section id="about" className="relative min-h-screen flex flex-col justify-center py-section-gap-mobile md:py-section-gap-desktop px-gutter max-w-container-max mx-auto">
      <div className="flex flex-col lg:flex-row gap-16">
        
        {/* Left Column: Bio & Stats */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <Reveal>
            <span className="font-label-mono text-label-mono text-primary mb-2 block uppercase tracking-widest">
              VỀ BẢN THÂN
            </span>
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-6 font-bold tracking-tight">
              Frontend Developer
            </h2>
          </Reveal>
          
          <Reveal delay={150}>
            <p className="font-body-md text-on-surface-variant mb-6 leading-relaxed">
              Mình là sinh viên ngành Công nghệ Thông tin, định hướng trở thành Frontend Developer. Mình có kinh nghiệm xây dựng giao diện web bằng React.js và Next.js thông qua các dự án thực tế, luôn chú trọng trải nghiệm người dùng, hiệu năng và khả năng mở rộng của sản phẩm.
            </p>
          </Reveal>
          
          <Reveal delay={300}>
            <p className="font-body-md text-on-surface-variant mb-12 leading-relaxed">
              Hiện mình đang phát triển dự án NICE ART từ frontend đến backend với React.js, Next.js, Express.js và Supabase. Mình luôn chủ động học hỏi công nghệ mới và mong muốn được làm việc trong môi trường chuyên nghiệp để nâng cao kỹ năng phát triển sản phẩm.
            </p>
          </Reveal>

          {/* Stats Blocks */}
          <Reveal delay={450}>
            <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-8">
              {STATS.map((s, idx) => (
                <div key={idx} className="text-center md:text-left">
                  <div className={`text-primary font-bold tracking-tight ${s.value.length > 4 ? 'text-xl md:text-2xl mt-1.5' : 'text-3xl md:text-4xl'}`}>
                    {s.value}
                  </div>
                  <div className="font-label-mono text-[10px] md:text-xs text-on-surface-variant mt-2 uppercase tracking-wider">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Download/View CV CTA */}
          <Reveal delay={550}>
            <div className="mt-8">
              <a 
                href={`${import.meta.env.BASE_URL}CV.pdf`}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/5 border border-white/10 hover:border-primary/50 text-on-surface hover:text-primary font-bold px-6 py-3 rounded-lg transition-all duration-300 interactive-btn group"
              >
                <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">
                  download
                </span>
                Tải / Xem CV Đầy Đủ
              </a>
            </div>
          </Reveal>
        </div>

        {/* Right Column: Experience Timeline */}
        <div className="w-full lg:w-1/2">
          <div className="relative border-l border-white/10 pl-6 md:pl-8 ml-4 flex flex-col gap-12">
            
            {TIMELINE.map((item, idx) => (
              <Reveal key={idx} delay={idx * 200}>
                <div className="relative">
                  {/* Bullet point on the timeline border */}
                  <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-primary border-4 border-background"></div>
                  
                  {/* Timeline content */}
                  <div>
                    <span className="font-label-mono text-xs text-secondary bg-secondary/10 px-3 py-1 rounded-full mb-3 inline-block font-medium">
                      {item.year}
                    </span>
                    <h3 className="font-headline-md text-lg font-bold text-on-surface mb-1">
                      {item.role}
                    </h3>
                    <h4 className="font-body-md text-sm text-primary mb-3 font-medium">
                      {item.company}
                    </h4>
                    <ul className="list-disc list-inside flex flex-col gap-1.5">
                      {item.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="font-body-md text-sm text-on-surface-variant leading-relaxed list-none pl-0">
                          • {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
}
