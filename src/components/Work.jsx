import React from 'react';
import Reveal from './Reveal';

const PROJECTS = [
  {
    title: 'Mơ Village — Lakeside Resort',
    role: 'Frontend Developer',
    period: '09/2026 - Hiện tại',
    desc: 'Website khu nghỉ dưỡng ven hồ song ngữ (Việt / Anh). Tích hợp luồng đặt phòng đa bước (multi-step booking flow) tự động sinh mã VietQR chuyển khoản ngân hàng linh động theo số tiền & nội dung phòng.',
    highlights: [
      'Hệ thống đặt phòng đa bước & thanh toán VietQR động',
      'Thư viện ảnh lọc theo danh mục, lightbox preview mượt mà',
      'Tối ưu Core Web Vitals, accessibility và responsive toàn diện'
    ],
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'VietQR'],
    bgGradient: 'from-emerald-950/40 to-teal-900/40',
    image: '/movillage.jpg',
    link: 'https://movillage.sgodata.com',
    featured: true
  },
  {
    title: 'Corporate Website & CMS — NICE ART',
    role: 'Freelancer Full-stack Developer',
    period: '04/2026 - 06/2026',
    desc: 'Website doanh nghiệp chính thức và cổng quản trị CMS nội bộ. Xây dựng admin dashboard bảo mật quản lý toàn bộ danh mục, công trình dự án, banner quảng cáo, tin tuyển dụng và thiết lập hệ thống.',
    highlights: [
      'Admin Dashboard quản trị dự án, banner, tin tuyển dụng',
      'Tích hợp Supabase (PostgreSQL, Auth & Storage) + Express.js',
      'Tối ưu chuẩn SEO On-page và tốc độ phản hồi trang'
    ],
    tech: ['Next.js', 'React', 'TypeScript', 'Node.js', 'Supabase', 'PostgreSQL'],
    bgGradient: 'from-purple-900/40 to-indigo-900/40',
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
    bgGradient: 'from-cyan-950/40 to-blue-900/40',
    image: '/sgodata.jpg',
    link: 'https://github.com/Nguyenbuituyen19'
  },
  {
    title: 'Personal Portfolio (Cyber-Minimalist)',
    role: 'Creator & Developer',
    period: '2026',
    desc: 'Trang web portfolio cá nhân mang phong cách Cyber-Minimalist obsidian tối giản. Tích hợp hiệu ứng ánh sáng động theo con trỏ chuột (interactive mouse glow), thiết kế module hóa và CI/CD GitHub Actions.',
    highlights: [
      'Hiệu ứng ánh sáng động theo chuột và Glassmorphism cao cấp',
      'Đầy đủ thông tin kỹ năng, kinh nghiệm thực tế từ CV',
      'Tự động hóa triển khai sản phẩm với GitHub Actions'
    ],
    tech: ['React 19', 'Vite', 'Tailwind CSS', 'GitHub Actions'],
    bgGradient: 'from-blue-900/40 to-cyan-900/40',
    image: '/portfolio.jpg',
    link: 'https://github.com/Nguyenbuituyen19/gioithieu'
  }
];

export default function Work() {
  return (
    <section id="work" className="relative min-h-screen flex flex-col justify-center py-section-gap-mobile md:py-section-gap-desktop px-gutter max-w-container-max mx-auto">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-secondary/5 blur-[150px] pointer-events-none"></div>

      <div className="mb-12 md:mb-16">
        <Reveal>
          <span className="font-label-mono text-label-mono text-primary mb-2 block uppercase tracking-widest">
            Sản phẩm &amp; Kinh nghiệm thực chiến
          </span>
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface font-bold tracking-tight">
            Các Dự Án Đã Phát Triển
          </h2>
          <p className="font-body-md text-on-surface-variant mt-2 max-w-2xl">
            Các sản phẩm web thực tế đã được triển khai phục vụ người dùng và doanh nghiệp, từ website du lịch nghỉ dưỡng song ngữ đến hệ thống quản trị CMS &amp; ERP/CRM.
          </p>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {PROJECTS.map((proj, idx) => (
          <Reveal key={idx} delay={idx * 120} className="h-full">
            <div className="project-card glass-card rounded-xl overflow-hidden flex flex-col h-full hover:-translate-y-2 transition-all duration-300 border border-white/10 group">
              {/* Container Ảnh Dự Án */}
              <div className="h-56 relative overflow-hidden border-b border-white/10 group flex items-center justify-center bg-surface-container-lowest">
                {proj.image ? (
                  <img 
                    src={`${import.meta.env.BASE_URL}${proj.image.replace(/^\//, '')}`} 
                    alt={proj.title}
                    className="w-full h-full object-cover project-image transition-all duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      const fallback = e.target.nextSibling;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                ) : null}
                
                {/* Lớp nền gradient dự phòng */}
                <div 
                  className={`w-full h-full bg-gradient-to-br ${proj.bgGradient} flex items-center justify-center absolute inset-0`}
                  style={{ display: proj.image ? 'none' : 'flex' }}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px]"></div>
                  <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center text-white/20 font-label-mono text-sm tracking-wider">
                    &lt;/&gt;
                  </div>
                </div>

                {/* Badge Featured */}
                {proj.featured && (
                  <div className="absolute top-4 right-4 z-20">
                    <span className="font-label-mono text-[11px] font-semibold text-secondary bg-surface/80 border border-secondary/30 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                      Production Live
                    </span>
                  </div>
                )}
              </div>

              {/* Content info */}
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                {/* Period & Role */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="font-label-mono text-xs text-secondary font-medium">
                    {proj.role}
                  </span>
                  <span className="font-label-mono text-[11px] text-on-surface-variant bg-white/5 px-2.5 py-0.5 rounded">
                    {proj.period}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-headline-md text-xl font-bold text-on-surface mb-3 group-hover:text-primary transition-colors">
                  {proj.title}
                </h3>
                
                {/* Description */}
                <p className="font-body-md text-on-surface-variant mb-4 text-sm leading-relaxed">
                  {proj.desc}
                </p>

                {/* Bullet highlights */}
                {proj.highlights && (
                  <ul className="mb-6 flex flex-col gap-1.5 text-xs text-on-surface-variant/90 border-l border-primary/20 pl-3">
                    {proj.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-1.5">
                        <span className="text-primary mt-0.5">▹</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                  {proj.tech.map((t, tIdx) => (
                    <span 
                      key={tIdx} 
                      className="font-label-mono text-[11px] text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                  <a 
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="font-label-mono text-xs text-secondary hover:text-primary flex items-center gap-1.5 group/btn font-semibold"
                  >
                    Xem sản phẩm 
                    <span className="material-symbols-outlined text-sm project-arrow transition-transform duration-300">
                      arrow_outward
                    </span>
                  </a>
                  {proj.link.includes('github') ? (
                    <span className="font-label-mono text-[11px] text-on-surface-variant/70">
                      Mã nguồn GitHub
                    </span>
                  ) : (
                    <span className="font-label-mono text-[11px] text-on-surface-variant/70">
                      Trang trực tiếp
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
