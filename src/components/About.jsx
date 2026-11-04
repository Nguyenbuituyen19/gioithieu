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
    role: 'Thành viên Ban Chuyên môn / CLB Tin học',
    company: 'Đại Học Thăng Long',
    bullets: [
      'Tham gia chia sẻ kiến thức lập trình cơ bản và hỗ trợ các bạn sinh viên khóa dưới.',
      'Đóng góp xây dựng các workshop mini về React và kỹ năng làm việc nhóm kỹ thuật.'
    ]
  }
];

export default function About() {
  const cvUrl = `${import.meta.env.BASE_URL}CV.pdf`;

  return (
    <section id="about" className="w-full bg-surface-tile-2 text-white py-16 sm:py-20 md:py-section px-4 sm:px-6 md:px-8 border-b border-white/10">
      <div className="w-full max-w-[1024px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
        
        {/* Left Column: Bio & Apple Metrics */}
        <div className="w-full lg:w-5/12 flex flex-col justify-center">
          <Reveal>
            <span className="text-[13px] font-semibold text-primary-on-dark uppercase tracking-wider block mb-2">
              Hồ sơ năng lực
            </span>
            <h2 className="font-display text-[32px] sm:text-[40px] font-semibold text-white leading-[1.10] tracking-[-0.015em] mb-4">
              Nguyễn Bùi Tuyển.
            </h2>
            <div className="text-[15px] font-medium text-primary-on-dark mb-6">
              Intern / Fresher Frontend Developer
            </div>
          </Reveal>
          
          <Reveal delay={150}>
            <p className="text-[16px] text-body-muted leading-[1.47] mb-4">
              Sinh viên năm 3 ngành Công nghệ Thông tin tại <strong className="text-white font-medium">Đại học Thăng Long</strong> với niềm đam mê sâu sắc trong việc tạo ra những ứng dụng web hiện đại, giao diện trực quan 3D và trải nghiệm người dùng mượt mà.
            </p>
          </Reveal>
          
          <Reveal delay={250}>
            <p className="text-[16px] text-body-muted leading-[1.47] mb-8">
              Hiện tại, mình đang thực tập Frontend tại <strong className="text-white font-medium">SGOData</strong> và <strong className="text-white font-medium">TravelViet</strong>, tham gia xây dựng hệ sinh thái phần mềm quản lý doanh nghiệp (CRM, ERP, POS) và các nền tảng đặt phòng du lịch.
            </p>
          </Reveal>

          {/* Key Metrics (Apple Environmental Report Style) */}
          <Reveal delay={350}>
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-white/10 mb-8">
              {STATS.map((s, idx) => (
                <div key={idx} className="bg-surface-tile-3 rounded-[14px] p-3.5 text-center border border-white/5">
                  <div className="text-[26px] sm:text-[30px] font-semibold text-white tracking-tight leading-none mb-1">
                    {s.value}
                  </div>
                  <div className="text-[11px] text-body-muted font-normal uppercase tracking-wider">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Action Buttons */}
          <Reveal delay={450}>
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <a 
                href={cvUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-pill btn-primary text-center text-[15px] sm:text-[16px]"
              >
                Tải CV (PDF) ↗
              </a>
              <a 
                href="https://github.com/Nguyenbuituyen19" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-pill text-center text-[15px] sm:text-[16px] bg-white/10 hover:bg-white/15 text-white border border-white/15"
              >
                GitHub Profile
              </a>
            </div>
          </Reveal>
        </div>

        {/* Right Column: Experience Timeline */}
        <div className="w-full lg:w-7/12">
          <Reveal delay={100}>
            <h3 className="text-[20px] sm:text-[22px] font-semibold text-white mb-8">
              Hành trình học tập &amp; làm việc.
            </h3>
          </Reveal>

          <div className="flex flex-col gap-5">
            {TIMELINE.map((item, idx) => (
              <Reveal key={idx} delay={idx * 80}>
                <div className="bg-surface-tile-1 rounded-[18px] border border-white/10 p-5 sm:p-6 transition-all">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-[12px] font-medium text-primary-on-dark bg-primary-on-dark/10 px-2.5 py-0.5 rounded-full border border-primary-on-dark/20">
                      {item.year}
                    </span>
                    <span className="text-[11px] text-body-muted uppercase tracking-wider">
                      {item.type}
                    </span>
                  </div>

                  <h4 className="text-[18px] sm:text-[19px] font-semibold text-white mb-0.5">
                    {item.role}
                  </h4>
                  <div className="text-[14px] text-white/70 mb-3 font-medium">
                    {item.company}
                  </div>
                  
                  <ul className="flex flex-col gap-1.5 text-[14px] text-body-muted leading-[1.47] pl-3 border-l border-white/15">
                    {item.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2">
                        <span className="text-primary-on-dark font-bold shrink-0">·</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
