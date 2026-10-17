import React, { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cvUrl = `${import.meta.env.BASE_URL}CV.pdf`;

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-white/10 shadow-sm">
      <div className="flex justify-between items-center px-gutter max-w-container-max mx-auto h-20">
        <div className="font-headline-md text-headline-md font-bold text-primary tracking-tighter cursor-pointer">
          TuyenNguyenBui
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 items-center">
          <a className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-body-md text-body-md" href="#work">
            Sản Phẩm
          </a>
          <a className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-body-md text-body-md" href="#expertise">
            Kỹ Năng
          </a>
          <a className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-body-md text-body-md" href="#about">
            Giới Thiệu
          </a>
          <a className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-body-md text-body-md" href="#contact">
            Liên Hệ
          </a>
          <a 
            href={cvUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-primary-container text-on-primary-container px-6 py-2 rounded-full font-bold hover:opacity-90 transition-all duration-300 interactive-btn inline-block text-center"
          >
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
            className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-body-md text-body-md py-2 border-b border-white/5" 
            href="#work"
            onClick={() => setMobileMenuOpen(false)}
          >
            Sản Phẩm
          </a>
          <a 
            className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-body-md text-body-md py-2 border-b border-white/5" 
            href="#expertise"
            onClick={() => setMobileMenuOpen(false)}
          >
            Kỹ Năng
          </a>
          <a 
            className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-body-md text-body-md py-2 border-b border-white/5" 
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
          >
            Giới Thiệu
          </a>
          <a 
            className="text-on-surface-variant hover:text-primary transition-colors duration-300 font-body-md text-body-md py-2 border-b border-white/5" 
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
          >
            Liên Hệ
          </a>
          <a 
            href={cvUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-primary-container text-on-primary-container px-6 py-3 rounded-full font-bold hover:opacity-90 transition-all duration-300 w-full text-center mt-2 inline-block"
          >
            Xem CV
          </a>
        </div>
      )}
    </nav>
  );
}
