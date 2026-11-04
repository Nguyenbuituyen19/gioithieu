import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const cvUrl = `${import.meta.env.BASE_URL}CV.pdf`;

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-canvas-parchment text-ink-muted-80 pt-16 pb-12 px-4 sm:px-6 md:px-8 border-t border-hairline select-none">
      <div className="w-full max-w-[1024px] mx-auto">
        
        {/* Apple 4-Column Directory Grid (Relaxed 2.41 Leading) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12 border-b border-hairline text-[13px] sm:text-[14px]">
          
          {/* Column 1: Navigation */}
          <div>
            <h4 className="font-semibold text-ink text-[13px] uppercase tracking-wider mb-3">
              Khám Phá
            </h4>
            <ul className="flex flex-col leading-[2.41]">
              <li><a href="#hero" className="hover:text-primary transition-colors">Trang Chủ</a></li>
              <li><a href="#work" className="hover:text-primary transition-colors">Dự Án Nổi Bật</a></li>
              <li><a href="#expertise" className="hover:text-primary transition-colors">Kỹ Năng &amp; Công Nghệ</a></li>
              <li><a href="#about" className="hover:text-primary transition-colors">Kinh Nghiệm &amp; Học Vấn</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Liên Hệ Hợp Tác</a></li>
            </ul>
          </div>

          {/* Column 2: Featured Work */}
          <div>
            <h4 className="font-semibold text-ink text-[13px] uppercase tracking-wider mb-3">
              Dự Án Tiêu Biểu
            </h4>
            <ul className="flex flex-col leading-[2.41]">
              <li><a href="https://movillage.sgodata.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Mơ Village Resort</a></li>
              <li><a href="https://niceart.vn" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">NICE ART Corporate</a></li>
              <li><a href="https://github.com/Nguyenbuituyen19" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">SGOData CRM &amp; ERP</a></li>
              <li><a href="https://github.com/Nguyenbuituyen19/gioithieu" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Portfolio WebGL 3D</a></li>
            </ul>
          </div>

          {/* Column 3: Stack */}
          <div>
            <h4 className="font-semibold text-ink text-[13px] uppercase tracking-wider mb-3">
              Hệ Công Nghệ
            </h4>
            <ul className="flex flex-col leading-[2.41]">
              <li><span className="text-ink-muted-80">React 19 &amp; Next.js 15</span></li>
              <li><span className="text-ink-muted-80">TypeScript &amp; Tailwind CSS</span></li>
              <li><span className="text-ink-muted-80">Three.js &amp; WebGL PBR</span></li>
              <li><span className="text-ink-muted-80">PostgreSQL &amp; Supabase</span></li>
              <li><span className="text-ink-muted-80">Vercel &amp; GitHub Actions</span></li>
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div>
            <h4 className="font-semibold text-ink text-[13px] uppercase tracking-wider mb-3">
              Tài Nguyên &amp; Kết Nối
            </h4>
            <ul className="flex flex-col leading-[2.41]">
              <li><a href={cvUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Tải Hồ Sơ CV (PDF) ↗</a></li>
              <li><a href="https://github.com/Nguyenbuituyen19" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">GitHub Profile ↗</a></li>
              <li><a href="https://www.facebook.com/tuyennguyenbui19?locale=vi_VN" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Facebook ↗</a></li>
              <li><a href="mailto:nguytuyen19@gmail.com" className="hover:text-primary transition-colors">Email Trực Tiếp ↗</a></li>
            </ul>
          </div>

        </div>

        {/* Apple Legal & Copyright Fine-Print Row (12px / 400 / #7a7a7a) */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-ink-muted-48">
          <div>
            Bản quyền © {currentYear} Nguyễn Bùi Tuyển. Mọi quyền được bảo lưu.
          </div>

          <div className="flex items-center gap-6">
            <span>Thiết kế theo chuẩn Apple Design System</span>
            <button
              onClick={handleScrollToTop}
              className="hover:text-ink text-primary transition-colors inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Đầu trang</span>
              <span>↑</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
