import React from 'react';
import Reveal from './Reveal';

const SKILL_CATEGORIES = [
  {
    title: 'Frontend Engineering',
    desc: 'Lập trình ứng dụng web hiện đại với React, Next.js và TypeScript; tối ưu hóa hiệu năng tải trang, SEO On-page và tiêu chuẩn trải nghiệm người dùng.',
    skills: ['React 19', 'Next.js 15', 'TypeScript', 'JavaScript (ES6+)', 'Tailwind CSS', 'Three.js WebGL', 'Responsive Design', 'SEO On-page']
  },
  {
    title: 'Backend & Cloud Services',
    desc: 'Xây dựng RESTful API backend với Express.js, tích hợp cơ sở dữ liệu quan hệ PostgreSQL và nền tảng Supabase (Auth, Storage, Database).',
    skills: ['Node.js', 'Express.js', 'RESTful APIs', 'PostgreSQL', 'Supabase', 'Zod Validation', 'VietQR']
  },
  {
    title: 'Công cụ & Quy trình (Tools)',
    desc: 'Thành thạo công cụ kiểm soát phiên bản Git/GitHub, chuyển đổi giao diện từ Figma sang code pixel-perfect và triển khai CI/CD trên Vercel.',
    skills: ['Git & GitHub', 'VS Code', 'Postman', 'Figma to Code', 'Vercel', 'Vite', 'Chrome DevTools']
  },
  {
    title: 'Kỹ Năng Mềm & Văn Hóa (Soft Skills)',
    desc: 'Tư duy phản biện giải quyết vấn đề, tinh thần làm việc nhóm cao, giao tiếp cởi mở và chủ động cập nhật công nghệ mới mỗi ngày.',
    skills: ['Problem-solving', 'Teamwork', 'Communication', 'Continuous Learning', 'Time Management']
  }
];

export default function Expertise() {
  return (
    <section id="expertise" className="w-full bg-canvas-parchment py-16 sm:py-20 md:py-section px-4 sm:px-6 md:px-8 border-b border-hairline">
      <div className="w-full max-w-[1024px] mx-auto">
        
        {/* Section Header (Apple Display-lg: 40px / 600) */}
        <div className="text-center sm:text-left mb-12 sm:mb-16">
          <Reveal>
            <span className="text-[13px] font-semibold text-primary uppercase tracking-wider block mb-2">
              Lĩnh vực chuyên môn
            </span>
            <h2 className="font-display text-[32px] sm:text-[40px] font-semibold text-ink leading-[1.10] tracking-[-0.015em] mb-3">
              Kỹ năng &amp; Công nghệ.
            </h2>
            <p className="font-display text-[20px] sm:text-[24px] md:text-[28px] text-ink-muted-80 font-normal leading-[1.25] max-w-2xl">
              Nền tảng kỹ thuật vững vàng kết hợp tư duy sản phẩm tinh gọn.
            </p>
          </Reveal>
        </div>

        {/* 4 Apple Store Utility Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <Reveal key={idx} delay={idx * 100} className="h-full">
              <div className="store-utility-card h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-[20px] sm:text-[22px] font-semibold text-ink mb-2.5">
                    {cat.title}
                  </h3>
                  <p className="text-[15px] sm:text-[16px] text-ink-muted-80 leading-[1.47] mb-6">
                    {cat.desc}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2 border-t border-hairline">
                  {cat.skills.map((skill, sIdx) => (
                    <span 
                      key={sIdx}
                      className="bg-canvas-parchment text-ink text-[13px] font-normal px-3 py-1 rounded-full border border-hairline"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* macOS Code Snippet Window (Apple Developer aesthetic) */}
        <Reveal delay={200}>
          <div className="w-full bg-white rounded-[18px] border border-hairline overflow-hidden shadow-sm">
            {/* macOS Window Controls */}
            <div className="h-10 bg-canvas-parchment px-4 border-b border-hairline flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56]"></span>
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]"></span>
                <span className="w-3 h-3 rounded-full bg-[#27c93f]"></span>
              </div>
              <span className="text-[12px] font-medium text-ink-muted-48">
                DeveloperProfile.ts — Visual Studio Code
              </span>
              <div className="w-12"></div>
            </div>

            {/* Code Body */}
            <div className="p-5 sm:p-6 font-mono text-[13px] sm:text-[14px] leading-relaxed text-[#1d1d1f] overflow-x-auto bg-[#fafafc]">
              <div className="text-gray-400">// Thông tin định danh kỹ sư phần mềm</div>
              <div>
                <span className="text-[#0066cc]">const</span> <span className="text-[#8957e5]">developer</span>: <span className="text-[#008080]">FrontendEngineer</span> = &#123;
              </div>
              <div className="pl-5">
                <span className="text-[#24292e]">name:</span> <span className="text-[#22863a]">'Nguyễn Bùi Tuyển'</span>,
              </div>
              <div className="pl-5">
                <span className="text-[#24292e]">university:</span> <span className="text-[#22863a]">'Đại Học Thăng Long'</span>,
              </div>
              <div className="pl-5">
                <span className="text-[#24292e]">gpa:</span> <span className="text-[#005cc5]">3.1</span>,
              </div>
              <div className="pl-5">
                <span className="text-[#24292e]">focus:</span> [<span className="text-[#22863a]">'Clean Code'</span>, <span className="text-[#22863a]">'Performance'</span>, <span className="text-[#22863a]">'Pixel-Perfect UI'</span>],
              </div>
              <div className="pl-5">
                <span className="text-[#24292e]">status:</span> <span className="text-[#22863a]">'Ready for Intern / Fresher Opportunities'</span>
              </div>
              <div>&#125;;</div>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
