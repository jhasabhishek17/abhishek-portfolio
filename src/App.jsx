import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import Preloader from './components/Preloader';
import ScrollProgress from './components/ScrollProgress';
import WaterDropletCursor from './components/WaterDropletCursor';
import ContinuousBackground from './components/ContinuousBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectsSection from './components/ProjectsSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  const [loading, setLoading] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      // Skip preloader on direct deep links or test params
      if (params.get('project') || params.get('skipIntro') || window.location.hash) return false;
    }
    return true;
  });

  // Initialize Lenis Smooth Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    window.lenis = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Initial hash handling
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        lenis.scrollTo(target, { offset: -80, immediate: true });
      }
    }

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-void text-silver-200 antialiased selection:bg-white/15 selection:text-white">
      
      {/* 1. Fast Non-blocking Cinematic Intro */}
      {loading && (
        <Preloader onComplete={() => setLoading(false)} />
      )}

      {/* 2. Water Droplet Liquid Lens Cursor */}
      <WaterDropletCursor />

      {/* 3. Silver-sheen Scroll Progress */}
      <ScrollProgress />

      {/* 4. Minimal Floating Glassmorphism Nav */}
      <Navbar />

      {/* 5. Core Editorial Sections */}
      <main>
        <Hero />
        
        {/* Continuous Flowing Background Experience from "Engineered Works." through to Footer */}
        <div id="lower-experience" className="relative">
          <ContinuousBackground />
          <div className="relative" style={{ zIndex: 2 }}>
            <ProjectsSection />
            <AboutSection />
            <SkillsSection />
            <ContactSection />
            <Footer />
          </div>
        </div>
      </main>

    </div>
  );
}
