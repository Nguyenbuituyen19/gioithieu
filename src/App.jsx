import React from 'react';
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