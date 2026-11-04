import React, { useRef, useState, useEffect } from 'react';
import Reveal from './Reveal';
import TiltCard from './TiltCard';

const STATS = [
  { value: '3.1/4.0', label: 'GPA ĐH Thăng Long' },
  { value: '2', label: 'Vị trí Intern thực chiến' },
  { value: '4+', label: 'Dự án đã triển khai' }
];

const TIMELINE = [
  {
    type: 'Kinh nghiệm',
    year: '08/2026 - Hiện tại',
    role: 'Frontend Developer Intern',
    company: 'SGOData',
    bullets: [
      'Phát triển giao diện người dùng cho các hệ sinh thái phần mềm CRM, ERP và POS bán hàng.',
      'Xây dựng các UI component responsive nâng cao trải nghiệm người dùng trên nhiều thiết bị.',
      'Phối hợp với team phát triển để tích hợp các RESTful APIs và triển khai tính năng mới.'
    ]
  },
  {
    type: 'Kinh nghiệm',
    year: '08/2026 - Hiện tại',
    role: 'Frontend Developer Intern',
    company: 'TravelViet',
    bullets: [
      'Thiết kế và phát triển giao diện website đặt phòng khách sạn, homestay và du lịch.',
      'Xây dựng responsive website layouts tối ưu hiển thị mượt mà trên cả desktop & mobile.',
      'Xây dựng thư viện reusable UI components đảm bảo tính nhất quán thị giác.'
    ]
  },
  {
    type: 'Kinh nghiệm',
    year: '04/2026 - 06/2026',
    role: 'Freelancer Full-stack Developer',
    company: 'NICE ART (niceart.vn)',
    bullets: [
      'Phát triển độc lập và triển khai website doanh nghiệp chính thức cùng trang quản trị CMS admin dashboard.',
      'Xây dựng admin dashboard quản trị dự án, danh mục, banner, tuyển dụng và cấu hình hệ thống.',
      'Tích hợp RESTful API với Supabase (Auth, Database, Storage) và Express.js backend; tối ưu chuẩn SEO.'
    ]
  },
  {
    type: 'Học vấn',
    year: '2024 - Hiện tại',
    role: 'Sinh viên Công nghệ Thông tin (GPA: 3.1 / 4.0)',
    company: 'Đại Học Thăng Long',
    bullets: [
      'Chuyên ngành Công nghệ Thông tin (Information Technology).',
      'Nắm vững: Cấu trúc dữ liệu & Giải thuật, Cơ sở dữ liệu quan hệ, Lập trình mạng.',
      'Định hướng chuyên sâu: Lập trình ứng dụng Web hiện đại với React, Next.js và TypeScript.'
    ]
  },
  {
    type: 'Hoạt động',
    year: '2024 - 2025',
    role: 'Thành viên Ban Chuyên môn / CLB Tin học',
    company: 'Đại Học Thăng Long',
    bullets: [
      'Tham gia chia sẻ kiến thức lập trình cơ bản và hỗ trợ các bạn sinh viên khóa dưới.',
      'Đóng góp xây dựng các workshop mini về React và kỹ năng làm việc nhóm kỹ thuật.'
    ]
  }
];

export default function About() {
  const timelineRef = useRef(null);
  const [timelineProgress, setTimelineProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const totalHeight = rect.height;
      const visibleOffset = windowHeight * 0.7 - rect.top;
      const progress = Math.min(Math.max(visibleOffset / totalHeight, 0), 1);
      setTimelineProgress(progress);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="about" className="relative min-h-screen flex flex-col justify-center py-16 md:py-section-gap-desktop px-4 sm:px-gutter max-w-container-max mx-auto scroll-mt-20 sm:scroll-mt-24">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
        
        {/* Left Column: Bio & 3D Stats */}
        <div className="w-full lg:w-5/12 flex flex-col justify-center">
          <Reveal>
            <span className="font-label-mono text-label-mono text-primary mb-2 block uppercase tracking-widest text-xs sm:text-sm">
              HỒ SƠ NĂNG LỰC
            </span>
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-2xl sm:text-3xl md:text-4xl text-on-surface mb-4 sm:mb-6 font-bold tracking-tight">
              Nguyễn Bùi Tuyển
            </h2>
            <div className="text-secondary font-label-mono text-xs sm:text-sm font-semibold uppercase tracking-wider mb-5 sm:mb-6">
              Intern / Fresher Frontend Developer
            </div>
          </Reveal>
          
          <Reveal delay={150}>
            <p className="font-body-md text-on-surface-variant mb-4 leading-relaxed text-xs sm:text-sm md:text-base">
              Sinh viên năm 3 ngành Công nghệ Thông tin tại <strong className="text-on-surface font-semibold text-primary">Đại học Thăng Long</strong> với niềm đam mê sâu sắc trong việc tạo ra những ứng dụng web hiện đại, giao diện trực quan 3D và trải nghiệm người dùng mượt mà.
            </p>
          </Reveal>
          
          <Reveal delay={250}>
            <p className="font-body-md text-on-surface-variant mb-6 sm:mb-8 leading-relaxed text-xs sm:text-sm md:text-base">
              Hiện tại, mình đang thực tập Frontend tại <strong className="text-on-surface font-semibold text-secondary">SGOData</strong> và <strong className="text-on-surface font-semibold text-secondary">TravelViet</strong>, tham gia xây dựng hệ sinh thái phần mềm quản lý doanh nghiệp (CRM, ERP, POS) và các nền tảng đặt phòng du lịch. Mình luôn chủ động trau dồi các công nghệ React, Next.js, TypeScript và các phương pháp tối ưu hóa hiệu năng mới nhất.
            </p>
          </Reveal>

          {/* Personal Key Info Tile */}
          <Reveal delay={350}>
            <div className="bg-surface-container-lowest/70 border border-white/10 rounded-2xl p-4 sm:p-5 mb-6 sm:mb-8 flex flex-col gap-2 font-label-mono text-[11px] sm:text-xs shadow-lg backdrop-blur-md">
              <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                <span className="text-on-surface-variant">Ngày sinh:</span>
                <span className="text-on-surface font-medium">09/05/2006 (Nam)</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                <span className="text-on-surface-variant">Trường ĐH:</span>
                <span className="text-primary font-medium">Đại Học Thăng Long</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                <span className="text-on-surface-variant">Điểm GPA:</span>
                <span className="text-secondary font-semibold">3.1 / 4.0</span>
              </div>
              <div className="flex justify-between items-center py-1.5">
                <span className="text-on-surface-variant">Khu vực:</span>
                <span className="text-on-surface font-medium">Hà Nội, Việt Nam</span>
              </div>
            </div>
          </Reveal>

          {/* 3D Floating Stats Blocks */}
          <Reveal delay={450}>
            <div className="grid grid-cols-3 gap-2 sm:gap-3 border-t border-white/10 pt-5 sm:pt-6">
              {STATS.map((s, idx) => (
                <div key={idx} className="glass-card pill-3d p-2.5 sm:p-3.5 rounded-xl text-center border border-white/10">
                  <div className="text-primary font-bold tracking-tight text-xl sm:text-2xl md:text-3xl">
                    {s.value}
                  </div>
                  <div className="font-label-mono text-[9px] sm:text-[10px] md:text-xs text-on-surface-variant mt-1 uppercase tracking-wider font-medium">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Download/View CV CTA */}
          <Reveal delay={550}>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 w-full">
              <a 
                href={`${import.meta.env.BASE_URL}CV.pdf`}
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-on-primary-container font-bold px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl transition-all duration-300 btn-3d shadow-md text-xs sm:text-sm"
              >
                <span className="material-symbols-outlined text-base sm:text-lg">
                  description
                </span>
                Xem / Tải CV Bản PDF
              </a>
              <a 
                href="https://github.com/Nguyenbuituyen19" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:border-primary/50 text-on-surface hover:text-primary font-semibold px-5 py-3 sm:py-3.5 rounded-xl transition-all duration-300 btn-3d text-xs sm:text-sm"
              >
                <span className="material-symbols-outlined text-base sm:text-lg text-primary">
                  code
                </span>
                GitHub Profile
              </a>
            </div>
          </Reveal>
        </div>

        {/* Right Column: Experience & Education Timeline */}
        <div className="w-full lg:w-7/12 mt-4 lg:mt-0">
          <Reveal delay={100}>
            <h3 className="font-headline-md text-lg sm:text-xl font-bold text-on-surface mb-6 sm:mb-8 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">history_edu</span>
              Hành Trình Kinh Nghiệm &amp; Học Vấn
            </h3>
          </Reveal>

          <div ref={timelineRef} className="relative pl-5 sm:pl-7 md:pl-8 ml-1.5 sm:ml-3 flex flex-col gap-6 sm:gap-8 perspective-1000">
            {/* Background static line */}
            <div className="absolute left-0 top-3 bottom-3 w-[2px] bg-white/10" />

            {/* Dynamic Scroll-Filled Laser Beam */}
            <div 
              className="absolute left-0 top-3 w-[2px] bg-gradient-to-b from-primary via-secondary to-[#00eefc] shadow-[0_0_12px_#00eefc] transition-all duration-100 ease-out z-0"
              style={{ height: `${timelineProgress * 100}%` }}
            >
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-secondary blur-[1px] shadow-[0_0_10px_#00eefc]" />
            </div>

            {TIMELINE.map((item, idx) => {
              const itemThreshold = (idx + 0.3) / TIMELINE.length;
              const isPassed = timelineProgress >= itemThreshold;

              return (
                <Reveal key={idx} delay={idx * 100}>
                  <div className="relative group">
                    {/* Glowing Node */}
                    <div 
                      className={`absolute -left-[27px] sm:-left-[35px] md:-left-[39px] top-4 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 sm:border-4 border-background transition-all duration-500 z-10 ${
                        isPassed 
                          ? 'bg-secondary scale-110 sm:scale-125 shadow-[0_0_16px_rgba(0,238,252,0.9)] ring-2 ring-secondary/50' 
                          : 'bg-primary/40 group-hover:bg-secondary'
                      }`}
                    />
                    
                    {/* Timeline 3D Tilt Card */}
                    <TiltCard
                      className="w-full"
                      innerClassName={`glass-card p-4 sm:p-6 rounded-2xl border transition-all shadow-lg ${
                        isPassed ? 'border-secondary/40 shadow-[0_0_20px_rgba(0,238,252,0.08)]' : 'border-white/10 hover:border-primary/30'
                      }`}
                      maxTilt={6}
                      perspective={800}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 mb-2 translate-z-20">
                        <span className="font-label-mono text-[11px] sm:text-xs text-secondary bg-secondary/10 border border-secondary/20 px-2.5 sm:px-3 py-0.5 rounded-full font-medium">
                          {item.year}
                        </span>
                        <span className="font-label-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 px-2 sm:px-2.5 py-0.5 rounded-md font-semibold">
                          {item.type}
                        </span>
                      </div>

                      <h4 className="font-headline-md text-base sm:text-lg font-bold text-on-surface mb-0.5 translate-z-20">
                        {item.role}
                      </h4>
                      <div className="font-body-md text-xs sm:text-sm text-primary mb-3 font-semibold translate-z-10">
                        {item.company}
                      </div>
                      
                      <ul className="flex flex-col gap-1.5 translate-z-10">
                        {item.bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="font-body-md text-xs sm:text-sm text-on-surface-variant leading-relaxed flex items-start gap-1.5">
                            <span className="text-secondary shrink-0 mt-0.5 font-bold">›</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </TiltCard>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}