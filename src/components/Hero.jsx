import React from 'react';
import { personalInfo } from '../data/portfolioData';
import KineticMatterScene from './KineticMatterScene';
import { ArrowDownRight, ArrowUpRight, MapPin, Terminal } from 'lucide-react';

export default function Hero() {
  const scrollTo = (href) => {
    if (window.lenis) {
      window.lenis.scrollTo(href, { offset: -80 });
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-[640px] h-[88vh] max-h-[920px] pt-24 pb-12 sm:pt-28 sm:pb-16 flex items-center overflow-hidden"
    >
      {/* Background Kinetic Canvas Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <KineticMatterScene />
      </div>

      {/* Subtle Atmospheric Gradient Horizon */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] rounded-full pointer-events-none opacity-25 blur-[160px] -z-10"
        style={{ background: 'radial-gradient(circle, rgba(226, 228, 234, 0.08) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 pointer-events-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Composed Editorial Typography (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Identity & Origin Metadata */}
            <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full border border-monochrome-subtle bg-obsidian/70 backdrop-blur-md w-fit mb-4 text-xs font-mono text-silver-500">
              <span className="w-1.5 h-1.5 rounded-full bg-silver-300 animate-pulse" />
              <span className="text-silver-300 font-medium">{personalInfo.role}</span>
              <span className="text-steel">/</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-silver-400" />
                {personalInfo.location}
              </span>
            </div>

            {/* Confident Name with Restrained Monochrome Sheen */}
            <div className="overflow-hidden">
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-bold tracking-tightest text-silver-100 leading-[1.02]">
                Abhishek <br />
                <span className="text-silver-400 font-light">
                  Jha.
                </span>
              </h1>
            </div>

            {/* Signature Manifest Line */}
            <div className="flex items-center gap-3 my-4">
              <div className="h-[1.5px] w-8 bg-silver-400" />
              <span className="font-mono text-xs sm:text-sm uppercase tracking-widest-mono text-silver-300 font-medium">
                Full-Stack Systems Engineer & Analytical Developer
              </span>
            </div>

            {/* Impactful Signature Paragraph */}
            <p className="text-lg sm:text-2xl font-display font-normal text-silver-300 leading-snug max-w-xl mb-3">
              Architecting production web platforms with <span className="text-white font-semibold">React, Node.js & MongoDB</span>, and developing computer vision pipelines with <span className="text-white font-semibold">Python</span>.
            </p>

            {/* Sub-line Grounding */}
            <p className="text-xs sm:text-sm font-mono text-silver-500 leading-relaxed max-w-lg mb-8">
              Focused on architectural discipline, verified algorithmic implementations, and high-performance software. Currently exploring Data Science with NumPy & Pandas.
            </p>

            {/* Understated Action Controls */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => scrollTo('#projects')}
                className="group relative inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-silver-200 text-void font-mono text-xs font-semibold tracking-wider uppercase hover:bg-white hover:shadow-lg hover:shadow-white/10 hover:-translate-y-0.5 transition-all duration-200"
              >
                <span>Selected Works</span>
                <ArrowDownRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={() => scrollTo('#contact')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-monochrome-subtle bg-obsidian/60 hover:border-monochrome-hover hover:bg-graphite/80 text-silver-300 font-mono text-xs font-semibold tracking-wider uppercase transition-all duration-200 hover:-translate-y-0.5"
              >
                <span>Initiate Contact</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-silver-500" />
              </button>
            </div>

            {/* Technical Grounding Ledger */}
            <div className="grid grid-cols-3 gap-6 pt-8 mt-8 border-t border-monochrome-subtle max-w-lg">
              <div>
                <span className="block text-2xl font-display font-medium text-silver-200">2</span>
                <span className="text-[11px] font-mono text-silver-600 uppercase tracking-wider">Production Apps</span>
              </div>
              <div>
                <span className="block text-2xl font-display font-medium text-silver-200">5</span>
                <span className="text-[11px] font-mono text-silver-600 uppercase tracking-wider">Python Systems</span>
              </div>
              <div>
                <span className="block text-2xl font-display font-medium text-silver-200">Active</span>
                <span className="text-[11px] font-mono text-silver-600 uppercase tracking-wider">Data Science Focus</span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Spatial Area (5 cols) */}
          <div className="lg:col-span-5 h-[340px] sm:h-[440px] lg:h-[500px] flex flex-col justify-end items-end pointer-events-none select-none">
            
            {/* Status card */}
            <div className="p-3.5 sm:p-4 rounded-xl border border-monochrome-subtle bg-obsidian/70 backdrop-blur-md text-[11px] font-mono text-silver-400 space-y-1">
              <div className="flex items-center gap-2 text-silver-200">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-medium tracking-wide">OPEN TO ENGINEERING ROLES</span>
              </div>
              <p className="text-[10px] text-silver-500">Full-Stack Web & Python Systems • Based in Delhi, India</p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
