import React, { useEffect } from 'react';
import CursorGlow from './components/CursorGlow';
import Background3D from './components/Background3D';
import ScrollProgress from './components/ScrollProgress';
import Header from './components/Header';
import Hero from './components/Hero';
import TechMarquee from './components/TechMarquee';
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

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen text-on-surface bg-[#131314] relative selection:bg-primary/30 selection:text-white">
      {/* Dynamic Laser Scroll Progress Bar */}
      <ScrollProgress />

      {/* Immersive 3D WebGL & Cyber Space Background */}
      <Background3D />

      {/* Background Interactive Mouse Glow */}
      <CursorGlow />

      {/* Header / Navbar */}
      <Header />

      {/* Main Content Layout */}
      <main className="relative z-10">
        <Hero />
        <TechMarquee />
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