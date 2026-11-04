import React, { useState, useEffect } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cvUrl = `${import.meta.env.BASE_URL}CV.pdf`;

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header className="w-full z-50">
      {/* 1. GLOBAL NAV (Tier 1: Apple True Black 44px) */}
      <nav className="w-full h-[44px] bg-surface-black text-white px-4 flex items-center relative z-50 select-none">
        <div className="w-full max-w-[1024px] mx-auto flex items-center justify-between text-[12px] font-normal tracking-[-0.12px]">
          {/* Logo / Monogram */}
          <a href="#hero" className="flex items-center gap-1.5 text-white/90 hover:text-white transition-opacity">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.63-.78 1.06-1.85.94-2.93-.93.04-2.07.62-2.73 1.4-.58.67-1.08 1.76-.94 2.81 1.03.08 2.1-.5 2.73-1.28" />
            </svg>
            <span className="font-semibold tracking-tight text-[13px]">Bùi Tuyển</span>
          </a>

          {/* Desktop Global Links */}
          <div className="hidden md:flex items-center gap-7 text-white/80">
            <a href="#work" className="hover:text-white transition-colors">Dự Án</a>
            <a href="#expertise" className="hover:text-white transition-colors">Kỹ Năng</a>
            <a href="#about" className="hover:text-white transition-colors">Kinh Nghiệm</a>
            <a href="#contact" className="hover:text-white transition-colors">Liên Hệ</a>
          </div>

          {/* Right Action */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/Nguyenbuituyen19"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition-colors text-[13px] hidden sm:flex items-center gap-1"
              title="GitHub Profile"
            >
              <span>GitHub</span>
              <span className="text-[10px] text-white/50">↗</span>
            </a>

            {/* Mobile Hamburger Icon */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white/90 hover:text-white p-1"
              aria-label="Toggle menu"
            >
              <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* 2. SUB-NAV FROSTED (Tier 2: Apple 52px Sticky Frosted Bar) */}
      <div className="sticky top-0 z-40 w-full h-[52px] frosted-subnav border-b border-black/[0.08] px-4 transition-all">
        <div className="w-full max-w-[1024px] mx-auto h-full flex items-center justify-between">
          {/* Category / Name */}
          <a href="#hero" className="text-ink font-semibold text-[19px] sm:text-[21px] tracking-[0.23px] hover:opacity-80 transition-opacity">
            Nguyễn Bùi Tuyển
          </a>

          {/* Subnav Links + Persistent Primary CTA */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="hidden lg:flex items-center gap-5 text-[14px] text-ink/80">
              <a href="#work" className="hover:text-primary transition-colors">Dự Án</a>
              <a href="#expertise" className="hover:text-primary transition-colors">Kỹ Năng</a>
              <a href="#about" className="hover:text-primary transition-colors">Giới Thiệu</a>
            </div>

            {/* Persistent Action Blue Pill CTA */}
            <div className="flex items-center gap-2">
              <a
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex text-[12px] text-ink/80 hover:text-ink px-3 py-1 rounded-full border border-black/10 hover:border-black/20 transition-all"
              >
                Tải CV
              </a>
              <a
                href="#contact"
                className="btn-primary text-[13px] sm:text-[14px] px-3.5 sm:px-4 py-1.5 rounded-full inline-flex items-center justify-center font-normal transition-transform active:scale-95 shadow-sm"
              >
                Liên hệ
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 top-[96px] bg-black/40 backdrop-blur-md z-50 transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            className="w-full bg-[#f5f5f7] border-b border-black/10 px-6 py-6 flex flex-col gap-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <a 
              href="#work" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-[17px] font-medium text-ink py-2 border-b border-black/5"
            >
              Dự Án Nổi Bật
            </a>
            <a 
              href="#expertise" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-[17px] font-medium text-ink py-2 border-b border-black/5"
            >
              Kỹ Năng &amp; Công Nghệ
            </a>
            <a 
              href="#about" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-[17px] font-medium text-ink py-2 border-b border-black/5"
            >
              Kinh Nghiệm &amp; Học Vấn
            </a>
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="text-[17px] font-medium text-ink py-2 border-b border-black/5"
            >
              Liên Hệ Hợp Tác
            </a>
            <div className="pt-2 flex gap-3">
              <a
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary-pill flex-1 text-center py-2 text-[15px]"
              >
                Xem CV (PDF)
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-primary flex-1 text-center py-2 text-[15px]"
              >
                Nhắn tin
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
