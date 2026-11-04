import React from 'react';
import Reveal from './Reveal';

const PROJECTS = [
  {
    title: 'Mơ Village – Lakeside Resort',
    role: 'Frontend Developer',
    period: '09/2026 - Hiện tại',
    desc: 'Website khu nghỉ dưỡng ven hồ song ngữ (Việt / Anh). Tích hợp luồng đặt phòng đa bước (multi-step booking flow) tự động sinh mã VietQR chuyển khoản ngân hàng linh động theo số tiền & nội dung phòng.',
    highlights: [
      'Hệ thống đặt phòng đa bước & thanh toán VietQR động',
      'Thư viện ảnh lọc theo danh mục, lightbox preview mượt mà',
      'Tối ưu Core Web Vitals, accessibility và responsive toàn diện'
    ],
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'VietQR'],
    image: '/movillage.jpg',
    link: 'https://movillage.sgodata.com',
    featured: true
  },
  {
    title: 'Corporate Website & CMS – NICE ART',
    role: 'Freelancer Full-stack Developer',
    period: '04/2026 - 06/2026',
    desc: 'Website doanh nghiệp chính thức và cổng quản trị CMS nội bộ. Xây dựng admin dashboard bảo mật quản lý toàn bộ danh mục, công trình dự án, banner quảng cáo, tin tuyển dụng và thiết lập hệ thống.',
    highlights: [
      'Admin Dashboard quản trị dự án, banner, tin tuyển dụng',
      'Tích hợp Supabase (PostgreSQL, Auth & Storage) + Express.js',
      'Tối ưu chuẩn SEO On-page và tốc độ phản hồi trang'
    ],
    tech: ['Next.js', 'React', 'TypeScript', 'Node.js', 'Supabase', 'PostgreSQL'],
    image: '/niceart.jpg',
    link: 'https://niceart.vn',
    featured: true
  },
  {
    title: 'Enterprise Management Platforms (CRM / ERP / POS)',
    role: 'Frontend Developer Intern (SGOData)',
    period: '08/2026 - Hiện tại',
    desc: 'Tham gia xây dựng giao diện người dùng cho các hệ sinh thái phần mềm quản trị doanh nghiệp chuyên sâu. Phát triển các UI components dùng chung, tối ưu bảng dữ liệu lớn và biểu mẫu nhập liệu phức tạp.',
    highlights: [
      'Giao diện chuyên sâu cho hệ thống quản lý CRM, ERP & POS',
      'Xây dựng reusable components và tối ưu UX đa thiết bị',
      'Phối hợp team backend tích hợp các RESTful APIs'
    ],
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'REST API', 'Vite'],
    image: '/sgodata.jpg',
    link: 'https://github.com/Nguyenbuituyen19'
  },
  {
    title: 'Personal Portfolio (Apple Museum Gallery)',
    role: 'Creator & Developer',
    period: '2026',
    desc: 'Trang web portfolio cá nhân mang phong cách Apple Design System với các khối full-bleed xen kẽ, nhịp điệu chữ SF Pro Display và mô hình Robot Trợ Lý 3D WebGL tương tác trực tiếp.',
    highlights: [
      'Robot Trợ Lý 3D WebGL PBR tương tác thời gian thực',
      'Typography SF Pro Display với chuẩn negative letter-spacing',
      'Hệ thống điều hướng 2 tầng chuẩn Apple (Global Nav + Sub-Nav)'
    ],
    tech: ['React 19', 'Three.js', 'Vite', 'Tailwind CSS', 'GitHub Actions'],
    image: '/portfolio.jpg',
    link: 'https://github.com/Nguyenbuituyen19/gioithieu'
  }
];

export default function Work() {
  return (
    <section id="work" className="w-full bg-surface-tile-1 text-white py-16 sm:py-20 md:py-section px-4 sm:px-6 md:px-8">
      <div className="w-full max-w-[1024px] mx-auto">
        
        {/* Section Header (Apple Display-lg: 40px / 600) */}
        <div className="text-center sm:text-left mb-12 sm:mb-16">
          <Reveal>
            <span className="text-[13px] font-semibold text-primary-on-dark uppercase tracking-wider block mb-2">
              Sản phẩm &amp; Kinh nghiệm thực chiến
            </span>
            <h2 className="font-display text-[32px] sm:text-[40px] font-semibold text-white leading-[1.10] tracking-[-0.015em] mb-3">
              Dự án tiêu biểu.
            </h2>
            <p className="font-display text-[20px] sm:text-[24px] md:text-[28px] text-body-muted font-normal leading-[1.25] max-w-2xl">
              Những sản phẩm số được hoàn thiện với độ chính xác cao và trải nghiệm người dùng tự nhiên.
            </p>
          </Reveal>
        </div>

        {/* 2-Column Product Grid (Apple Store Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {PROJECTS.map((proj, idx) => (
            <Reveal key={idx} delay={idx * 100} className="h-full">
              <div className="bg-surface-tile-2 rounded-[18px] border border-white/10 overflow-hidden flex flex-col h-full transition-transform hover:-translate-y-1 duration-300">
                
                {/* Product Imagery */}
                <div className="h-48 sm:h-56 relative overflow-hidden bg-surface-tile-3 flex items-center justify-center">
                  {proj.image ? (
                    <img 
                      src={`${import.meta.env.BASE_URL}${proj.image.replace(/^\//, '')}`} 
                      alt={proj.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        const fallback = e.target.nextSibling;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  
                  <div 
                    className="w-full h-full bg-surface-tile-3 flex items-center justify-center absolute inset-0"
                    style={{ display: proj.image ? 'none' : 'flex' }}
                  >
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/40 text-xs">
                      &lt;/&gt;
                    </div>
                  </div>

                  {proj.featured && (
                    <div className="absolute top-3.5 right-3.5 z-20">
                      <span className="text-[11px] font-medium text-white bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                        Production Live
                      </span>
                    </div>
                  )}
                </div>

                {/* Content Details */}
                <div className="p-6 sm:p-7 flex flex-col flex-grow">
                  <div className="flex items-center justify-between text-[12px] text-body-muted mb-2">
                    <span className="font-medium text-primary-on-dark">{proj.role}</span>
                    <span className="bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[11px]">{proj.period}</span>
                  </div>

                  <h3 className="text-[20px] sm:text-[22px] font-semibold text-white mb-2 leading-snug">
                    {proj.title}
                  </h3>

                  <p className="text-[15px] sm:text-[16px] text-body-muted leading-[1.47] mb-4">
                    {proj.desc}
                  </p>

                  {proj.highlights && (
                    <ul className="mb-5 flex flex-col gap-1.5 text-[13px] text-white/80 border-l border-white/20 pl-3">
                      {proj.highlights.map((h, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-1.5">
                          <span className="text-primary-on-dark font-bold shrink-0">·</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Tech Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-6 mt-auto">
                    {proj.tech.map((t, tIdx) => (
                      <span 
                        key={tIdx} 
                        className="bg-white/10 text-white/90 text-[12px] font-normal px-2.5 py-0.5 rounded-full"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action Link (Sky Link Blue #2997ff) */}
                  <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                    <a 
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="text-primary-on-dark hover:underline text-[15px] font-medium inline-flex items-center gap-1.5 transition-colors"
                    >
                      <span>Xem sản phẩm</span>
                      <span className="text-[14px]">→</span>
                    </a>
                    <span className="text-[12px] text-body-muted">
                      {proj.link.includes('github') ? 'Mã nguồn GitHub' : 'Trực tuyến'}
                    </span>
                  </div>

                </div>

              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
