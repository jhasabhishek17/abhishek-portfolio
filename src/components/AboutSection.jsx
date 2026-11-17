import React from 'react';
import { personalInfo } from '../data/portfolioData';
import { Code2, Database, BrainCircuit, GraduationCap, Compass } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-28 sm:py-36 relative border-y border-monochrome-subtle bg-obsidian/25 backdrop-blur-[1px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2.5 text-xs font-mono tracking-widest-mono uppercase text-silver-500 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-silver-400" />
            <span>02 // Background & Engineering Philosophy</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tightest text-silver-100">
            About Me.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Narrative (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-silver-400 text-base sm:text-lg leading-relaxed font-normal">
            <p className="text-silver-200 font-medium text-xl sm:text-2xl leading-snug">
              I am a software engineer focused on building robust full-stack platforms and computational software with structural clarity and architectural discipline.
            </p>

            <p>
              In full-stack engineering, I build production systems across modern JavaScript, Node.js, and React. With platforms like <span className="text-silver-200 font-medium">PetPaws</span> and <span className="text-silver-200 font-medium">Wanderlust</span>, I design complete architectures—from relational schemas and session-based authentication to spatial geocoding and responsive client interfaces.
            </p>

            {/* Honest Data Science Journey Callout */}
            <div className="p-6 rounded-2xl border border-monochrome-hover bg-graphite/80 shadow-xl my-8">
              <div className="flex items-center gap-2 text-xs font-mono text-silver-400 uppercase tracking-wider mb-2">
                <BrainCircuit className="w-4 h-4 text-silver-300" />
                <span>Current Learning Endeavor</span>
              </div>
              <h3 className="text-lg font-display font-bold text-silver-100 mb-2">
                Expanding into Data Science & Analytical Computing
              </h3>
              <p className="text-sm sm:text-base text-silver-400 leading-relaxed">
                I am actively learning Data Science. Working directly with <span className="text-silver-200 font-medium">NumPy</span>, <span className="text-silver-200 font-medium">Pandas</span>, <span className="text-silver-200 font-medium">Matplotlib</span>, and <span className="text-silver-200 font-medium">Jupyter Notebooks</span>, I am developing fluency in vector computations and exploratory data analysis, extending the mathematical logic I explored through OpenCV computer vision.
              </p>
            </div>

            <p>
              I believe in clean, readable code and honest engineering. No decorative fluff, no exaggerated metrics—only purposeful solutions engineered to perform.
            </p>
          </div>

          {/* Right Column: Architectural Pillars (5 cols) */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-4">
            
            <div className="p-6 rounded-2xl kinetic-card border border-monochrome-subtle hover:border-monochrome-hover transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-graphite border border-monochrome-subtle flex items-center justify-center text-silver-300">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-silver-200 text-base">Full-Stack Systems</h4>
                  <span className="text-xs font-mono text-silver-500">React, Node.js, Express, MongoDB</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-silver-500 leading-relaxed mt-2">
                Designing modular MVC structures, REST APIs, and responsive interfaces with clean state management.
              </p>
            </div>

            <div className="p-6 rounded-2xl kinetic-card border border-monochrome-subtle hover:border-monochrome-hover transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-graphite border border-monochrome-subtle flex items-center justify-center text-silver-300">
                  <BrainCircuit className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-silver-200 text-base">Python & Vision</h4>
                  <span className="text-xs font-mono text-silver-500">OpenCV, SIFT, Flask, Tkinter</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-silver-500 leading-relaxed mt-2">
                Extracting keyframes, stitching seamless panoramas, and building asynchronous multithreaded desktop tools.
              </p>
            </div>

            <div className="p-6 rounded-2xl kinetic-card border border-monochrome-subtle hover:border-monochrome-hover transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-graphite border border-monochrome-subtle flex items-center justify-center text-silver-300">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-silver-200 text-base">Academic Engineering</h4>
                  <span className="text-xs font-mono text-silver-500">B.Tech ECE • Delhi, India</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-silver-500 leading-relaxed mt-2">
                Electronics and communication background providing rigorous training in systems, signals, and discrete logic.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
