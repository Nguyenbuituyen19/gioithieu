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

  return (
    <>
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
    </>
  );
}

export default App;
