import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/5 bg-surface/50 backdrop-blur-sm py-8 px-gutter mt-20">
      <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Left Side: Copyright */}
        <div className="font-label-mono text-xs text-on-surface-variant">
          &copy; {currentYear} Nguyễn Bùi Tuyển. Mọi quyền được bảo lưu.
        </div>

        {/* Middle Side: Made with */}
        <div className="font-label-mono text-xs text-on-surface-variant flex items-center gap-1">
          Thiết kế & Lập trình bằng <span className="text-primary font-bold">React</span> &amp; <span className="text-secondary font-bold">Tailwind</span>
        </div>

        {/* Right Side: Back to Top */}
        <button 
          onClick={handleScrollToTop}
          className="font-label-mono text-xs text-secondary hover:text-primary transition-colors flex items-center gap-1 group"
        >
          Trở lại đầu trang
          <span className="material-symbols-outlined text-sm group-hover:-translate-y-1 transition-transform duration-300">
            arrow_upward
          </span>
        </button>

      </div>
    </footer>
  );
}
