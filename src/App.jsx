import React from 'react';
import ScrollProgress from './components/ScrollProgress';
import Header from './components/Header';
import Hero from './components/Hero';
import TechMarquee from './components/TechMarquee';
import Work from './components/Work';
import Expertise from './components/Expertise';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen text-ink bg-canvas antialiased selection:bg-primary/20 selection:text-primary">
      {/* Apple Minimal Scroll Indicator */}
      <ScrollProgress />

      {/* Apple Two-Tier Navigation (Global Nav + Sub-Nav Frosted) */}
      <Header />

      {/* Main Content: Alternating Full-Bleed Tiles */}
      <main className="w-full">
        {/* Tile 1: Canvas Light (White) - Hero with 3D Robot */}
        <Hero />

        {/* Transitional Parchment Strip - Tech Marquee */}
        <TechMarquee />

        {/* Tile 2: Near-Black Tile (#272729) - Featured Work & Projects */}
        <Work />

        {/* Tile 3: Canvas Parchment (#f5f5f7) - Expertise & Skills */}
        <Expertise />

        {/* Tile 4: Near-Black Tile 2 (#2a2a2c) - Experience & Background */}
        <About />

        {/* Tile 5: Canvas Light (White) - Contact & Connect */}
        <Contact />
      </main>

      {/* Apple Multicolumn Parchment Footer */}
      <Footer />
    </div>
  );
}

export default App;
