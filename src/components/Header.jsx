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
    <nav className="fixed top-0 w-full z-50 bg-surface/85 backdrop-blur-xl border-b border-white/10 shadow-sm">
      <div className="flex justify-between items-center px-4 sm:px-gutter max-w-container-max mx-auto h-16 sm:h-20">
        <a href="#hero" className="flex items-center group">
          <span className="font-headline-md text-base sm:text-lg md:text-xl font-bold text-on-surface group-hover:text-primary transition-colors tracking-tight">
            Nguyễn Bùi Tuyển
          </span>
        </a>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-7 lg:gap-8 items-center">
          <a className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-body-md text-sm font-medium" href="#work">
            Dự Án
          </a>
          <a className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-body-md text-sm font-medium" href="#expertise">
            Kỹ Năng
          </a>
          <a className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-body-md text-sm font-medium" href="#about">
            Kinh Nghiệm &amp; Học Vấn
          </a>
          <a className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-body-md text-sm font-medium" href="#contact">
            Liên Hệ
          </a>
          <a 
            href={cvUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-primary text-on-primary-container px-4 py-2 rounded-xl font-bold transition-all duration-300 btn-3d inline-flex items-center gap-1.5 text-sm cursor-pointer shadow-md"
          >
            <span className="material-symbols-outlined text-base">description</span>
            Xem CV
          </a>
        </div>

        {/* Mobile Hamburger Button with comfortable touch target */}
        <button 
          aria-label="Toggle mobile menu"
          className="md:hidden w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary active:scale-95 transition-transform cursor-pointer"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="material-symbols-outlined text-xl">
            {mobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Backdrop & Drawer */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 top-16 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            className="w-full bg-[#131314]/95 border-b border-white/10 flex flex-col px-6 py-6 gap-3.5 shadow-2xl backdrop-blur-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <a 
              className="text-on-surface hover:text-primary transition-colors font-body-md text-base py-3 border-b border-white/5 flex items-center justify-between" 
              href="#work"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Dự Án Đã Thực Hiện</span>
              <span className="material-symbols-outlined text-sm text-secondary">arrow_forward</span>
            </a>
            <a 
              className="text-on-surface hover:text-primary transition-colors font-body-md text-base py-3 border-b border-white/5 flex items-center justify-between" 
              href="#expertise"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Kỹ Năng &amp; Công Nghệ</span>
              <span className="material-symbols-outlined text-sm text-secondary">arrow_forward</span>
            </a>
            <a 
              className="text-on-surface hover:text-primary transition-colors font-body-md text-base py-3 border-b border-white/5 flex items-center justify-between" 
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Kinh Nghiệm &amp; Học Vấn</span>
              <span className="material-symbols-outlined text-sm text-secondary">arrow_forward</span>
            </a>
            <a 
              className="text-on-surface hover:text-primary transition-colors font-body-md text-base py-3 border-b border-white/5 flex items-center justify-between" 
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Liên Hệ</span>
              <span className="material-symbols-outlined text-sm text-secondary">arrow_forward</span>
            </a>
            <a 
              href={cvUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-primary text-on-primary-container px-6 py-3.5 rounded-xl font-bold hover:opacity-90 transition-all duration-300 w-full text-center mt-3 flex items-center justify-center gap-2 btn-3d shadow-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="material-symbols-outlined text-lg">description</span>
              Xem CV Bản PDF
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}