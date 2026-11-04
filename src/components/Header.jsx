import React, { useState, useEffect } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cvUrl = `${import.meta.env.BASE_URL}CV.pdf`;

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

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
        <a href="#hero" onClick={(e) => handleNavClick(e, 'hero')} className="flex items-center group cursor-pointer">
          <span className="font-headline-md text-base sm:text-lg md:text-xl font-bold text-on-surface group-hover:text-secondary transition-colors tracking-tight">
            Nguyễn Bùi Tuyển
          </span>
        </a>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6 lg:gap-8 items-center">
          <a 
            className="text-on-surface-variant hover:text-secondary hover:drop-shadow-[0_0_8px_rgba(0,238,252,0.8)] transition-all duration-200 font-body-md text-sm font-medium py-1 px-2 rounded-lg hover:bg-white/5 cursor-pointer" 
            href="#work"
            onClick={(e) => handleNavClick(e, 'work')}
          >
            Dự Án
          </a>
          <a 
            className="text-on-surface-variant hover:text-secondary hover:drop-shadow-[0_0_8px_rgba(0,238,252,0.8)] transition-all duration-200 font-body-md text-sm font-medium py-1 px-2 rounded-lg hover:bg-white/5 cursor-pointer" 
            href="#expertise"
            onClick={(e) => handleNavClick(e, 'expertise')}
          >
            Kỹ Năng
          </a>
          <a 
            className="text-on-surface-variant hover:text-secondary hover:drop-shadow-[0_0_8px_rgba(0,238,252,0.8)] transition-all duration-200 font-body-md text-sm font-medium py-1 px-2 rounded-lg hover:bg-white/5 cursor-pointer" 
            href="#about"
            onClick={(e) => handleNavClick(e, 'about')}
          >
            Kinh Nghiệm &amp; Học Vấn
          </a>
          <a 
            className="text-on-surface-variant hover:text-secondary hover:drop-shadow-[0_0_8px_rgba(0,238,252,0.8)] transition-all duration-200 font-body-md text-sm font-medium py-1 px-2 rounded-lg hover:bg-white/5 cursor-pointer" 
            href="#contact"
            onClick={(e) => handleNavClick(e, 'contact')}
          >
            Liên Hệ
          </a>
          <a 
            href={cvUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-primary hover:bg-secondary text-on-primary-container hover:text-background px-4 py-2 rounded-xl font-bold transition-all duration-300 btn-3d inline-flex items-center gap-1.5 text-sm cursor-pointer shadow-md hover:shadow-[0_0_20px_rgba(0,238,252,0.5)]"
          >
            <span className="material-symbols-outlined text-base">description</span>
            Xem CV
          </a>
        </div>

        {/* Mobile Hamburger Button with comfortable touch target */}
        <button 
          aria-label="Toggle mobile menu"
          className="md:hidden w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary hover:text-secondary hover:border-secondary/40 active:scale-95 transition-all cursor-pointer"
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
              className="text-on-surface hover:text-secondary transition-colors font-body-md text-base py-3 border-b border-white/5 flex items-center justify-between cursor-pointer" 
              href="#work"
              onClick={(e) => handleNavClick(e, 'work')}
            >
              <span>Dự Án Đã Thực Hiện</span>
              <span className="material-symbols-outlined text-sm text-secondary">arrow_forward</span>
            </a>
            <a 
              className="text-on-surface hover:text-secondary transition-colors font-body-md text-base py-3 border-b border-white/5 flex items-center justify-between cursor-pointer" 
              href="#expertise"
              onClick={(e) => handleNavClick(e, 'expertise')}
            >
              <span>Kỹ Năng &amp; Công Nghệ</span>
              <span className="material-symbols-outlined text-sm text-secondary">arrow_forward</span>
            </a>
            <a 
              className="text-on-surface hover:text-secondary transition-colors font-body-md text-base py-3 border-b border-white/5 flex items-center justify-between cursor-pointer" 
              href="#about"
              onClick={(e) => handleNavClick(e, 'about')}
            >
              <span>Kinh Nghiệm &amp; Học Vấn</span>
              <span className="material-symbols-outlined text-sm text-secondary">arrow_forward</span>
            </a>
            <a 
              className="text-on-surface hover:text-secondary transition-colors font-body-md text-base py-3 border-b border-white/5 flex items-center justify-between cursor-pointer" 
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
            >
              <span>Liên Hệ</span>
              <span className="material-symbols-outlined text-sm text-secondary">arrow_forward</span>
            </a>
            <a 
              href={cvUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-primary hover:bg-secondary text-on-primary-container hover:text-background px-6 py-3.5 rounded-xl font-bold transition-all duration-300 w-full text-center mt-3 flex items-center justify-center gap-2 btn-3d shadow-lg hover:shadow-[0_0_20px_rgba(0,238,252,0.5)] cursor-pointer"
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
