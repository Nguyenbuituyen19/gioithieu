import React, { useEffect } from 'react';
import CursorGlow from './components/CursorGlow';
import Header from './components/Header';
import Hero from './components/Hero';
import Expertise from './components/Expertise';
import Work from './components/Work';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    const handleScroll = () => {
      const workSection = document.getElementById('work');
      if (!workSection) return;
      
      const workTop = workSection.offsetTop;
      const scrollPosition = window.scrollY;
      
      // Kích hoạt scroll-snapping khi ở vùng Hero và đầu Work, vô hiệu hóa khi cuộn tiếp xuống dưới
      if (scrollPosition > workTop + 50) {
        document.documentElement.classList.remove('enable-snap');
      } else {
        document.documentElement.classList.add('enable-snap');
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Gọi khởi tạo lần đầu
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Đường dẫn ảnh nền động tương thích với cả local và GitHub Pages
  const bgUrl = `${import.meta.env.BASE_URL}bg-cyber.jpg`;

  return (
    <div 
      style={{ 
        backgroundImage: `radial-gradient(circle at center, rgba(19, 19, 20, 0.4) 0%, rgba(19, 19, 20, 0.85) 100%), url('${bgUrl}')`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat'
      }} 
      className="min-h-screen text-on-surface"
    >
      {/* Background Interactive Mouse Glow */}
      <CursorGlow />

      {/* Header / Navbar */}
      <Header />

      {/* Main Content Layout */}
      <main className="relative z-10">
        <Hero />
        <Work />
        <Expertise />
        <About />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
