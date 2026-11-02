import React from 'react';
import Reveal from './Reveal';
import TiltCard from './TiltCard';
import TechBadge from './TechBadge';

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
    bgGradient: 'from-emerald-950/40 to-teal-900/40',
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
    title: 'Personal Portfolio (Cyber-Minimalist 3D)',
    role: 'Creator & Developer',
    period: '2026',
    desc: 'Trang web portfolio cá nhân mang phong cách Cyber Spatial 3D tối giản. Tích hợp vật thể Three.js WebGL tương tác chuột, 3D Tilt Cards đa tầng, thiết kế module hóa và CI/CD GitHub Actions.',
    highlights: [
      'Không gian Three.js WebGL tương tác thời gian thực',
      'Hiệu ứng 3D Spatial Tilt & Glare thẻ dự án theo chuột',
      'Tự động hóa triển khai sản phẩm với GitHub Actions'
    ],
    tech: ['React 19', 'Three.js', 'Vite', 'Tailwind CSS', 'GitHub Actions'],
    bgGradient: 'from-blue-900/40 to-cyan-900/40',
    image: '/portfolio.jpg',
    link: 'https://github.com/Nguyenbuituyen19/gioithieu'
  }
];

export default function Work() {
  return (
    <section id="work" className="relative min-h-screen flex flex-col justify-center py-16 md:py-section-gap-desktop px-4 sm:px-gutter max-w-container-max mx-auto">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] rounded-full bg-secondary/5 blur-[120px] pointer-events-none"></div>

      <div className="mb-10 sm:mb-14">
        <Reveal>
          <span className="font-label-mono text-label-mono text-primary mb-2 block uppercase tracking-widest text-xs sm:text-sm">
            Sản phẩm &amp; Kinh nghiệm thực chiến
          </span>
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-2xl sm:text-3xl md:text-4xl text-on-surface font-bold tracking-tight">
            Các Dự Án Đã Phát Triển
          </h2>
          <p className="font-body-md text-on-surface-variant mt-2 max-w-2xl text-xs sm:text-sm md:text-base leading-relaxed">
            Các sản phẩm web thực tế đã được triển khai phục vụ người dùng và doanh nghiệp, từ website du lịch nghỉ dưỡng song ngữ đến hệ thống quản trị CMS &amp; ERP/CRM.
          </p>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 perspective-1000">
        {PROJECTS.map((proj, idx) => (
          <Reveal key={idx} delay={idx * 120} className="h-full">
            <TiltCard 
              className="h-full"
              innerClassName="project-card glass-card rounded-2xl overflow-hidden flex flex-col h-full border border-white/10 group shadow-xl"
              maxTilt={8}
              perspective={1000}
            >
              {/* Image Container */}
              <div className="h-44 sm:h-56 relative overflow-hidden border-b border-white/10 group flex items-center justify-center bg-surface-container-lowest translate-z-10">
                {proj.image ? (
                  <img 
                    src={`${import.meta.env.BASE_URL}${proj.image.replace(/^\//, '')}`} 
                    alt={proj.title}
                    className="w-full h-full object-cover project-image transition-all duration-500 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      const fallback = e.target.nextSibling;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                ) : null}
                
                <div 
                  className={`w-full h-full bg-gradient-to-br ${proj.bgGradient} flex items-center justify-center absolute inset-0`}
                  style={{ display: proj.image ? 'none' : 'flex' }}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px]"></div>
                  <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-white/20 font-label-mono text-sm tracking-wider">
                    &lt;/&gt;
                  </div>
                </div>

                {proj.featured && (
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 translate-z-30">
                    <span className="font-label-mono text-[10px] sm:text-[11px] font-semibold text-secondary bg-surface/90 border border-secondary/40 backdrop-blur-md px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full flex items-center gap-1.5 shadow-lg pill-3d">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                      Production Live
                    </span>
                  </div>
                )}
              </div>

              {/* Content info */}
              <div className="p-5 sm:p-7 md:p-8 flex flex-col flex-grow transform-style-3d">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5 translate-z-20">
                  <span className="font-label-mono text-[11px] sm:text-xs text-secondary font-medium">
                    {proj.role}
                  </span>
                  <span className="font-label-mono text-[10px] sm:text-[11px] text-on-surface-variant bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                    {proj.period}
                  </span>
                </div>

                <h3 className="font-headline-md text-lg sm:text-xl font-bold text-on-surface mb-2.5 group-hover:text-primary transition-colors translate-z-20">
                  {proj.title}
                </h3>
                
                <p className="font-body-md text-on-surface-variant mb-4 text-xs sm:text-sm leading-relaxed translate-z-10">
                  {proj.desc}
                </p>

                {proj.highlights && (
                  <ul className="mb-5 flex flex-col gap-1.5 text-xs text-on-surface-variant/90 border-l border-primary/20 pl-3 translate-z-10">
                    {proj.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-1.5">
                        <span className="text-primary mt-0.5 font-bold shrink-0">›</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex flex-wrap gap-1.5 mb-5 mt-auto translate-z-30">
                  {proj.tech.map((t, tIdx) => (
                    <TechBadge key={tIdx} name={t} size="sm" />
                  ))}
                </div>

                <div className="pt-3.5 border-t border-white/5 flex justify-between items-center translate-z-40">
                  <a 
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="font-label-mono text-xs text-secondary hover:text-primary flex items-center gap-1.5 group/btn font-semibold pill-3d px-3 py-1.5 rounded-lg bg-secondary/10 border border-secondary/20 transition-all cursor-pointer"
                  >
                    Xem sản phẩm 
                    <span className="material-symbols-outlined text-sm project-arrow transition-transform duration-300">
                      arrow_outward
                    </span>
                  </a>
                  {proj.link.includes('github') ? (
                    <span className="font-label-mono text-[10px] sm:text-[11px] text-on-surface-variant/70">
                      Mã nguồn GitHub
                    </span>
                  ) : (
                    <span className="font-label-mono text-[10px] sm:text-[11px] text-on-surface-variant/70">
                      Trang trực tiếp
                    </span>
                  )}
                </div>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}