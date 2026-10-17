import React, { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cvUrl = `${import.meta.env.BASE_URL}CV.pdf`;

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-white/10 shadow-sm">
      <div className="flex justify-between items-center px-gutter max-w-container-max mx-auto h-20">
        <a href="#hero" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold font-label-mono text-sm group-hover:bg-primary group-hover:text-background transition-all duration-300">
            NT
          </div>
          <span className="font-headline-md text-lg md:text-xl font-bold text-on-surface group-hover:text-primary transition-colors tracking-tight">
            Nguyễn Bùi Tuyển
          </span>
        </a>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 items-center">
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
            className="bg-primary-container text-on-primary-container px-5 py-2 rounded-lg font-bold hover:opacity-90 transition-all duration-300 interactive-btn inline-flex items-center gap-1.5 text-sm"
          >
            <span className="material-symbols-outlined text-base">description</span>
            Xem CV
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          className="md:hidden text-primary"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="material-symbols-outlined">
            {mobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-surface border-b border-white/10 flex flex-col px-gutter py-6 gap-4 animate-fadeIn">
          <a 
            className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-body-md text-base py-2.5 border-b border-white/5" 
            href="#work"
            onClick={() => setMobileMenuOpen(false)}
          >
            Dự Án Đã Thực Hiện
          </a>
          <a 
            className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-body-md text-base py-2.5 border-b border-white/5" 
            href="#expertise"
            onClick={() => setMobileMenuOpen(false)}
          >
            Kỹ Năng &amp; Công Nghệ
          </a>
          <a 
            className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-body-md text-base py-2.5 border-b border-white/5" 
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
          >
            Kinh Nghiệm &amp; Học Vấn
          </a>
          <a 
            className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-body-md text-base py-2.5 border-b border-white/5" 
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
          >
            Liên Hệ
          </a>
          <a 
            href={cvUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-primary-container text-on-primary-container px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-all duration-300 w-full text-center mt-2 flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-base">description</span>
            Xem CV Đầy Đủ
          </a>
        </div>
      )}
    </nav>
  );
}
