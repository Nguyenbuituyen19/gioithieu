import React from 'react';
import Reveal from './Reveal';

const PROJECTS = [
  {
    title: 'NICE ART Web Application',
    desc: 'Phát triển website giới thiệu doanh nghiệp và hệ thống quản trị nội bộ. Xây dựng giao diện bằng React.js & Next.js, thiết kế REST API backend với Express.js, tích hợp Supabase Database & Storage và triển khai trên Vercel & Render.',
    tech: ['React.js', 'Next.js', 'Express.js', 'Supabase', 'Vercel'],
    bgGradient: 'from-purple-900/40 to-indigo-900/40',
    image: '/niceart.jpg', // Tệp lưu trong public/niceart.jpg
    link: 'https://niceart.vn/'
  },
  {
    title: 'Personal Portfolio Website',
    desc: 'Trang web giới thiệu bản thân tối giản mang phong cách Cyber-Minimalist, xây dựng bằng React.js, Vite và Tailwind CSS, tích hợp hiệu ứng ánh sáng động theo con trỏ chuột.',
    tech: ['React.js', 'Vite', 'Tailwind CSS', 'Responsive'],
    bgGradient: 'from-blue-900/40 to-cyan-900/40',
    image: '/portfolio.jpg', // Tệp lưu trong public/portfolio.jpg
    link: '#'
  },
  {
    title: 'Figma to Responsive Layouts',
    desc: 'Tập hợp các dự án thực hành chuyển đổi file thiết kế Figma sang mã nguồn giao diện HTML/CSS/Tailwind CSS, tối ưu hóa độ hiển thị chính xác (pixel-perfect) và tương thích mọi loại thiết bị.',
    tech: ['HTML5', 'CSS3', 'Tailwind CSS', 'JavaScript'],
    bgGradient: 'from-indigo-900/40 to-blue-900/40',
    image: '/figma.jpg', // Tệp lưu trong public/figma.jpg
    link: '#',
    badge: '+4'
  }
];

export default function Work() {
  return (
    <section id="work" className="relative min-h-screen flex flex-col justify-center py-section-gap-mobile md:py-section-gap-desktop px-gutter max-w-container-max mx-auto">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-secondary/5 blur-[150px] pointer-events-none"></div>

      <div className="mb-12 md:mb-16">
        <Reveal>
          <span className="font-label-mono text-label-mono text-primary mb-2 block uppercase tracking-widest">
            Sản phẩm tiêu biểu
          </span>
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface font-bold tracking-tight">
            Các Dự Án Đã Thực Hiện
          </h2>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS.map((proj, idx) => (
          <Reveal key={idx} delay={idx * 150} className="h-full">
            <div className="project-card glass-card rounded-xl overflow-hidden flex flex-col h-full hover:-translate-y-2 transition-all duration-300">
              {/* Container Ảnh Dự Án (Hỗ trợ ảnh tĩnh hoặc bộ chuyển sắc CSS dự phòng) */}
              <div className="h-48 relative overflow-hidden border-b border-white/10 group flex items-center justify-center">
                {proj.image ? (
                  <img 
                    src={`${import.meta.env.BASE_URL}${proj.image.replace(/^\//, '')}`} 
                    alt={proj.title}
                    className="w-full h-full object-cover project-image transition-all duration-500"
                    onError={(e) => {
                      // Nếu ảnh lỗi hoặc chưa tải lên, chuyển sang chế độ nền gradient dự phòng
                      e.target.style.display = 'none';
                      const fallback = e.target.nextSibling;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                ) : null}
                
                {/* Lớp nền gradient dự phòng (hiển thị khi không có ảnh hoặc ảnh lỗi) */}
                <div 
                  className={`w-full h-full bg-gradient-to-br ${proj.bgGradient} flex items-center justify-center absolute inset-0`}
                  style={{ display: proj.image ? 'none' : 'flex' }}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px]"></div>
                  <div className="w-24 h-24 rounded-full border border-white/10 flex items-center justify-center text-white/20 font-label-mono text-sm tracking-wider project-image transition-all duration-500">
                    &lt;/&gt;
                  </div>
                </div>

                {/* Lớp phủ nhãn thông tin thêm (Ví dụ: +4 dự án khác) */}
                {proj.badge && (
                  <div className="absolute inset-0 bg-background/80 backdrop-blur-[6px] flex flex-col items-center justify-center z-20">
                    <span className="text-4xl md:text-5xl font-extrabold text-primary font-display-xl drop-shadow-[0_0_15px_rgba(193,193,255,0.6)] animate-pulse">
                      {proj.badge}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-label-mono mt-2">
                      Dự án khác
                    </span>
                  </div>
                )}
              </div>

              {/* Content info */}
              <div className="p-8 flex flex-col flex-grow">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {proj.tech.map((t, tIdx) => (
                    <span 
                      key={tIdx} 
                      className="font-label-mono text-[11px] text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Title & description */}
                <h3 className="font-headline-md text-xl font-bold text-on-surface mb-3 flex justify-between items-center group-hover:text-primary transition-colors">
                  {proj.title}
                </h3>
                
                <p className="font-body-md text-on-surface-variant mb-6 text-sm leading-relaxed">
                  {proj.desc}
                </p>

                {/* Read more link */}
                <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center">
                  <a 
                    href={proj.link} 
                    className="font-label-mono text-xs text-secondary hover:text-primary flex items-center gap-1 group/btn"
                  >
                    Chi tiết dự án 
                    <span className="material-symbols-outlined text-sm project-arrow transition-transform duration-300">
                      arrow_outward
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
