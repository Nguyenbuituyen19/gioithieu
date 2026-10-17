import React from 'react';
import Reveal from './Reveal';

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
    role: 'Thành viên Ban Chuyên môn',
    company: 'CLB Tin học Thăng Long (ThangLong IT Club)',
    bullets: [
      'Tham gia hỗ trợ tổ chức các workshop công nghệ và sự kiện thi lập trình cho sinh viên.',
      'Hỗ trợ công tác tổ chức, kết nối và thúc đẩy phong trào học lập trình trong câu lạc bộ.'
    ]
  }
];

export default function About() {
  return (
    <section id="about" className="relative min-h-screen flex flex-col justify-center py-section-gap-mobile md:py-section-gap-desktop px-gutter max-w-container-max mx-auto">
      <div className="flex flex-col lg:flex-row gap-16">
        
        {/* Left Column: Bio & Stats */}
        <div className="w-full lg:w-5/12 flex flex-col justify-center">
          <Reveal>
            <span className="font-label-mono text-label-mono text-primary mb-2 block uppercase tracking-widest">
              HỒ SƠ NĂNG LỰC
            </span>
            <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-6 font-bold tracking-tight">
              Nguyễn Bùi Tuyển
            </h2>
            <div className="text-secondary font-label-mono text-sm font-semibold uppercase tracking-wider mb-6">
              Intern / Fresher Frontend Developer
            </div>
          </Reveal>
          
          <Reveal delay={150}>
            <p className="font-body-md text-on-surface-variant mb-5 leading-relaxed text-sm md:text-base">
              Sinh viên năm 3 ngành Công nghệ Thông tin tại <strong className="text-on-surface">Đại học Thăng Long</strong> với niềm đam mê sâu sắc trong việc tạo ra những ứng dụng web hiện đại, giao diện trực quan và trải nghiệm người dùng mượt mà.
            </p>
          </Reveal>
          
          <Reveal delay={250}>
            <p className="font-body-md text-on-surface-variant mb-8 leading-relaxed text-sm md:text-base">
              Hiện tại, mình đang thực tập Frontend tại <strong className="text-on-surface">SGOData</strong> và <strong className="text-on-surface">TravelViet</strong>, tham gia xây dựng hệ sinh thái phần mềm quản lý doanh nghiệp (CRM, ERP, POS) và các nền tảng đặt phòng du lịch. Mình luôn chủ động trau dồi các công nghệ React, Next.js, TypeScript và các phương pháp tối ưu hóa hiệu năng mới nhất.
            </p>
          </Reveal>

          {/* Personal Key Info */}
          <Reveal delay={350}>
            <div className="bg-surface-container-lowest/60 border border-white/5 rounded-xl p-5 mb-8 flex flex-col gap-2.5 font-label-mono text-xs">
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-on-surface-variant">Ngày sinh:</span>
                <span className="text-on-surface font-medium">09/05/2006 (Nam)</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-on-surface-variant">Trường ĐH:</span>
                <span className="text-primary font-medium">Đại Học Thăng Long</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-on-surface-variant">Điểm GPA:</span>
                <span className="text-secondary font-semibold">3.1 / 4.0</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-on-surface-variant">Khu vực:</span>
                <span className="text-on-surface font-medium">Hà Nội, Việt Nam</span>
              </div>
            </div>
          </Reveal>

          {/* Stats Blocks */}
          <Reveal delay={450}>
            <div className="grid grid-cols-3 gap-3 border-t border-white/10 pt-6">
              {STATS.map((s, idx) => (
                <div key={idx} className="text-center md:text-left">
                  <div className="text-primary font-bold tracking-tight text-2xl md:text-3xl">
                    {s.value}
                  </div>
                  <div className="font-label-mono text-[10px] md:text-xs text-on-surface-variant mt-1.5 uppercase tracking-wider">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Download/View CV CTA */}
          <Reveal delay={550}>
            <div className="mt-8 flex flex-wrap gap-4">
              <a 
                href={`${import.meta.env.BASE_URL}CV.pdf`}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary-container text-on-primary-container font-bold px-6 py-3 rounded-lg transition-all duration-300 interactive-btn shadow-md hover:shadow-primary/30"
              >
                <span className="material-symbols-outlined text-lg">
                  description
                </span>
                Xem / Tải CV Bản PDF
              </a>
              <a 
                href="https://github.com/Nguyenbuituyen19" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/5 border border-white/10 hover:border-primary/50 text-on-surface hover:text-primary font-semibold px-5 py-3 rounded-lg transition-all duration-300"
              >
                <span className="material-symbols-outlined text-lg text-primary">
                  code
                </span>
                GitHub Profile
              </a>
            </div>
          </Reveal>
        </div>

        {/* Right Column: Experience & Education Timeline */}
        <div className="w-full lg:w-7/12">
          <Reveal delay={100}>
            <h3 className="font-headline-md text-xl font-bold text-on-surface mb-8 flex items-center gap-2.5">
              <span className="material-symbols-outlined text-primary">history_edu</span>
              Hành Trình Kinh Nghiệm &amp; Học Vấn
            </h3>
          </Reveal>

          <div className="relative border-l border-white/10 pl-6 md:pl-8 ml-3 flex flex-col gap-10">
            {TIMELINE.map((item, idx) => (
              <Reveal key={idx} delay={idx * 120}>
                <div className="relative group">
                  {/* Bullet point on the timeline border */}
                  <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-primary border-4 border-background group-hover:scale-125 group-hover:bg-secondary transition-all"></div>
                  
                  {/* Timeline content */}
                  <div className="glass-card p-6 rounded-xl border border-white/5 hover:border-primary/20 transition-all">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="font-label-mono text-xs text-secondary bg-secondary/10 px-3 py-0.5 rounded-full font-medium">
                        {item.year}
                      </span>
                      <span className="font-label-mono text-[10px] uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded">
                        {item.type}
                      </span>
                    </div>

                    <h4 className="font-headline-md text-base md:text-lg font-bold text-on-surface mb-0.5">
                      {item.role}
                    </h4>
                    <div className="font-body-md text-sm text-primary mb-3 font-semibold">
                      {item.company}
                    </div>
                    
                    <ul className="flex flex-col gap-1.5">
                      {item.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="font-body-md text-xs md:text-sm text-on-surface-variant leading-relaxed flex items-start gap-2">
                          <span className="text-secondary shrink-0 mt-0.5 font-bold">•</span>
                          <span>{bullet}</span>
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
