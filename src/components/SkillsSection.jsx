import React from 'react';
import { skillCategories } from '../data/portfolioData';
import { Terminal } from 'lucide-react';

export default function SkillsSection() {
  return (
    <section id="skills" className="py-28 sm:py-36 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-monochrome-subtle mb-16">
          <div>
            <div className="inline-flex items-center gap-2.5 text-xs font-mono tracking-widest-mono uppercase text-silver-500 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-silver-400" />
              <span>03 // Technical Stack</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tightest text-silver-100">
              Core Competencies.
            </h2>
          </div>

          <p className="text-silver-500 text-sm sm:text-base max-w-md font-normal leading-relaxed">
            Technologies applied across deployed platforms and software systems. No arbitrary percentages or progress bars—strictly tools I actively build with.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, idx) => (
            <div
              key={cat.name}
              className="kinetic-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-silver-400">0{idx + 1} //</span>
                  <Terminal className="w-4 h-4 text-silver-600" />
                </div>

                <h3 className="text-xl font-display font-bold text-silver-100 mb-2">
                  {cat.name}
                </h3>
                <p className="text-xs sm:text-sm text-silver-500 leading-relaxed mb-6">
                  {cat.description}
                </p>
              </div>

              {/* Skills Badges */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-monochrome-subtle">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-monochrome-subtle bg-obsidian text-xs font-mono text-silver-300 hover:text-white hover:border-monochrome-hover transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-silver-500" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
