import React, { useState, useEffect, useRef } from 'react';
import { projects } from '../data/portfolioData';
import { 
  ExternalLink, 
  Github, 
  Terminal, 
  ArrowUpRight, 
  ArrowLeft, 
  ArrowRight, 
  Layers, 
  CheckCircle2, 
  ChevronDown,
  LayoutGrid,
  SlidersHorizontal,
  Play,
  Pause,
  Compass,
  Sparkles
} from 'lucide-react';

/**
 * CypherBadge for Random Name Generator
 * Displays an algorithmic hash roll on hover
 */
function CypherBadge({ isHovered }) {
  const [text, setText] = useState('0x7F4A');

  useEffect(() => {
    if (!isHovered) {
      setText('0x7F4A');
      return;
    }
    const glyphs = '0123456789ABCDEF';
    let count = 0;
    const interval = setInterval(() => {
      let str = '0x';
      for (let i = 0; i < 4; i++) {
        str += glyphs[Math.floor(Math.random() * glyphs.length)];
      }
      setText(str);
      count++;
      if (count > 7) {
        clearInterval(interval);
        setText('GEN: READY');
      }
    }, 50);
    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-void/95 border border-purple-500/30 text-[9px] font-mono text-purple-300 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-1.5 pointer-events-none">
      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
      <span>{text} // ENTROPY</span>
    </div>
  );
}

/**
 * ProjectVisualFrame
 * Renders the 16:10 visual preview with domain-specific creative animation
 */
function ProjectVisualFrame({ project, size = 'default' }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative w-full aspect-[16/10] overflow-hidden bg-obsidian border-b border-monochrome-subtle"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Authentic Project Screenshot with Domain-Specific Fitting & Hover Behavior */}
      <img
        src={project.image}
        alt={project.title}
        className={`w-full h-full ${
          project.id === 'wanderlust'
            ? 'object-contain object-center bg-[#070709] p-0.5 sm:p-1'
            : 'object-cover object-top'
        } transition-transform duration-700 ease-out ${
          project.id === 'video-panorama'
            ? 'group-hover:scale-108 group-hover:translate-x-1'
            : project.id === 'wanderlust'
            ? 'group-hover:scale-[1.01]'
            : project.id === 'petpaws'
            ? 'group-hover:scale-105'
            : 'group-hover:scale-104'
        }`}
        loading="lazy"
      />

      {/* Subtle Monochrome Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-void/25 to-transparent pointer-events-none" />

      {/* Top Badges */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider uppercase bg-void/85 backdrop-blur-md text-silver-300 border border-monochrome-subtle">
          {project.badges[0]}
        </span>
        {project.liveUrl && (
          <span className="w-2 h-2 rounded-full bg-emerald-400/90 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
        )}
      </div>

      {/* Domain-Specific Creative Layers */}

      {/* A. Video Panorama Studio: Scanline Sweep & Homography Bracket Reticle */}
      {project.id === 'video-panorama' && (
        <>
          <div className="absolute inset-y-0 w-1 bg-gradient-to-b from-transparent via-cyan-300/80 to-transparent blur-[0.5px] opacity-0 group-hover:opacity-100 group-hover:animate-scanline pointer-events-none" />
          <div className="absolute inset-2 border border-cyan-400/0 group-hover:border-cyan-400/30 transition-all duration-300 rounded pointer-events-none flex flex-col justify-between p-1">
            <span className="text-[9px] font-mono text-cyan-300/0 group-hover:text-cyan-300/90 transition-opacity duration-300">[ + ] SIFT HOMOGRAPHY</span>
            <span className="text-[9px] font-mono text-cyan-300/0 group-hover:text-cyan-300/90 transition-opacity duration-300 self-end">FOV: 142° STITCH</span>
          </div>
        </>
      )}

      {/* B. Wanderlust: Geospatial Topographic Contours & Waypoint Telemetry */}
      {project.id === 'wanderlust' && (
        <>
          <svg className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none" viewBox="0 0 100 60" preserveAspectRatio="none">
            <path d="M0,20 Q25,5 50,25 T100,15" fill="none" stroke="#34d399" strokeWidth="0.5" strokeDasharray="2,2" />
            <path d="M0,35 Q35,50 70,30 T100,45" fill="none" stroke="#34d399" strokeWidth="0.5" strokeDasharray="3,2" />
            <circle cx="68" cy="28" r="2.5" fill="none" stroke="#34d399" strokeWidth="0.75" />
          </svg>
          <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-void/90 border border-emerald-500/40 text-[9px] font-mono text-emerald-300 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-1.5 pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>GEO: 28.61° N // MAPBOX GL</span>
          </div>
        </>
      )}

      {/* C. PetPaws: Adoption Rescue Warmth & Lifeline Wave */}
      {project.id === 'petpaws' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-amber-500/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-amber-400/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-void/90 border border-amber-400/30 text-[9px] font-mono text-amber-300 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-1.5 pointer-events-none">
            <span className="text-amber-400 text-[10px]">♥</span>
            <span>RESCUE DB // ADOPTIONS</span>
          </div>
        </>
      )}

      {/* D. Instagram Intelligence Studio: OSINT Terminal CRT Scanlines & Async Ticker */}
      {project.id === 'instagram-fetcher' && (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.45)_50%)] bg-[length:100%_4px] opacity-0 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none" />
          <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-void/95 border border-silver-400/30 text-[9px] font-mono text-silver-300 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-1.5 pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-silver-400 animate-pulse" />
            <span>OSINT://ASYNC_WORKER [200 OK]</span>
          </div>
        </>
      )}

      {/* E. Python Snake Arcade: 8-Bit Kinetic Snake Glide & HUD Tag */}
      {project.id === 'snake-game' && (
        <>
          <div className="absolute top-0 left-0 w-12 h-1 bg-emerald-400/90 shadow-[0_0_8px_rgba(52,211,153,0.9)] opacity-0 group-hover:opacity-100 group-hover:animate-snake pointer-events-none rounded-full" />
          <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-void/95 border border-emerald-500/40 text-[9px] font-mono text-emerald-400 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-1.5 pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-sm bg-emerald-400" />
            <span>60 FPS // 32x24 MATRIX</span>
          </div>
        </>
      )}

      {/* F. Weather App: Atmospheric Mist & Barometric Isobar Telemetry */}
      {project.id === 'weather-app' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-tr from-sky-400/10 via-transparent to-silver-100/10 opacity-0 group-hover:opacity-100 group-hover:animate-mist pointer-events-none" />
          <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-void/90 border border-sky-400/40 text-[9px] font-mono text-sky-300 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-1.5 pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            <span>BAROMETER: 1013 hPa // RADAR</span>
          </div>
        </>
      )}

      {/* G. Notepad Application: Ruled Paper Texture & Text Buffer Tag */}
      {project.id === 'notepad-app' && (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[length:100%_18px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-silver-200/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-void/90 border border-monochrome-subtle text-[9px] font-mono text-silver-300 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
            UTF-8 BUFFER // STREAM I/O
          </div>
        </>
      )}

      {/* H. Random Name Generator: Algorithmic Cypher Hash Roll */}
      {project.id === 'name-generator' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
          <CypherBadge isHovered={isHovered} />
        </>
      )}
    </div>
  );
}

export default function ProjectsSection() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [viewMode, setViewMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('view') === 'grid' ? 'grid' : 'showcase';
    }
    return 'showcase';
  });
  const [activeProjectId, setActiveProjectId] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('project') || projects[0].id;
    }
    return projects[0].id;
  });

  const detailRef = useRef(null);
  const deckScrollRef = useRef(null);

  const filterTabs = [
    { id: 'all', label: 'All Systems' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'python', label: 'Python & CV' },
    { id: 'tools', label: 'Utilities' }
  ];

  const visibleProjects = selectedFilter === 'all'
    ? projects
    : projects.filter(p => p.category === selectedFilter);

  // Current active project
  const activeIndex = visibleProjects.findIndex(p => p.id === activeProjectId);
  const activeProject = (activeIndex !== -1 ? visibleProjects[activeIndex] : visibleProjects[0]) || projects[0];

  // Select project (updates spotlight stage and URL state)
  const handleSelectProject = (project, scrollToDetail = false) => {
    if (typeof window !== 'undefined') window.__hasUserInteracted = true;
    setActiveProjectId(project.id);
    
    if (typeof window !== 'undefined' && window.history) {
      window.history.pushState(
        { projectId: project.id }, 
        '', 
        `?project=${project.id}${scrollToDetail ? '#project-detail' : '#projects'}`
      );
    }

    if (scrollToDetail && detailRef.current) {
      setTimeout(() => {
        if (window.lenis) {
          window.lenis.scrollTo(detailRef.current, { offset: -90, duration: 1.0 });
        } else {
          const top = detailRef.current.getBoundingClientRect().top + window.scrollY - 90;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }, 50);
    }
  };

  const handleNextProject = () => {
    const nextIdx = (activeIndex + 1) % visibleProjects.length;
    handleSelectProject(visibleProjects[nextIdx]);
  };

  const handlePrevProject = () => {
    const prevIdx = (activeIndex - 1 + visibleProjects.length) % visibleProjects.length;
    handleSelectProject(visibleProjects[prevIdx]);
  };

  const handleScrollDeck = (direction) => {
    if (deckScrollRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      deckScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleBackToGallery = () => {
    const projectsEl = document.getElementById('projects');
    if (projectsEl) {
      if (window.lenis) {
        window.lenis.scrollTo(projectsEl, { offset: -80 });
      } else {
        projectsEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="projects" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-monochrome-subtle mb-10">
          <div>
            <div className="inline-flex items-center gap-2.5 text-xs font-mono tracking-widest-mono uppercase text-silver-500 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-silver-400" />
              <span>01 // Selected Systems</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tightest text-silver-100">
              Engineered Works.
            </h2>
          </div>

          <p className="text-silver-400 text-xs sm:text-sm max-w-md font-normal leading-relaxed">
            Verified software platforms, computer vision pipelines, and developer utilities. Explore via the interactive spotlight stage or switch to the expanded grid.
          </p>
        </div>

        {/* Controls Toolbar: Filters + View Mode Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          
          {/* Category Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-200 ${
                  selectedFilter === tab.id
                    ? 'bg-silver-200 text-void font-semibold shadow-sm'
                    : 'bg-obsidian/70 border border-monochrome-subtle text-silver-400 hover:text-silver-200 hover:border-monochrome-hover'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* View Mode Toggle: Interactive Showcase vs Expanded Grid */}
          <div className="flex items-center gap-1.5 p-1 rounded-full border border-monochrome-subtle bg-obsidian/80 text-xs font-mono">
            <button
              onClick={() => setViewMode('showcase')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all duration-200 ${
                viewMode === 'showcase'
                  ? 'bg-silver-200 text-void font-medium shadow-sm'
                  : 'text-silver-400 hover:text-white'
              }`}
              title="Interactive Spotlight Stage View"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Showcase</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all duration-200 ${
                viewMode === 'grid'
                  ? 'bg-silver-200 text-void font-medium shadow-sm'
                  : 'text-silver-400 hover:text-white'
              }`}
              title="Expanded 3-Column Grid View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid View</span>
            </button>
          </div>
        </div>

        {/* ============================================================= */}
        {/* VIEW MODE 1: INTERACTIVE SPOTLIGHT STAGE & KINETIC SYSTEM DECK */}
        {/* ============================================================= */}
        {viewMode === 'showcase' && activeProject && (
          <div className="space-y-10 animate-in fade-in duration-300">
            
            {/* Master Spotlight Stage */}
            <div className="kinetic-card rounded-3xl p-6 sm:p-8 lg:p-10 border border-monochrome-hover shadow-2xl bg-obsidian/85 relative overflow-hidden">
              
              {/* Background ambient gradient glow */}
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-silver-400/5 rounded-full blur-3xl pointer-events-none" />

              {/* Stage Layout: Left Monitor (7 cols), Right Console (5 cols) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Left: High-Impact Visual Stage Monitor */}
                <div className="lg:col-span-7 group rounded-2xl overflow-hidden border border-monochrome-subtle bg-graphite shadow-2xl relative">
                  <ProjectVisualFrame project={activeProject} size="large" />

                  {/* Stage Quick Action Overlay */}
                  <div className="p-4 bg-void/90 border-t border-monochrome-subtle flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs font-mono text-silver-300">
                        {activeProject.liveUrl ? 'Online Live System' : (activeProject.liveNote || 'Local Architecture')}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {activeProject.liveUrl && (
                        <a
                          href={activeProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-silver-200 text-void text-xs font-mono font-medium hover:bg-white transition-colors"
                        >
                          <span>Launch Live</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      <a
                        href={activeProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-monochrome-subtle bg-graphite hover:bg-steel text-silver-300 text-xs font-mono transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Source</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Right: Architecture & Telemetry Console */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                  
                  <div>
                    {/* Index & Badge */}
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span className="text-xs font-mono text-silver-500 uppercase tracking-widest-mono">
                        SYSTEM 0{activeIndex + 1} OF 0{visibleProjects.length}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider uppercase bg-graphite border border-monochrome-subtle text-silver-300">
                        {activeProject.badges[0]}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-silver-100 tracking-tight mb-2">
                      {activeProject.title}
                    </h3>

                    {/* Tagline */}
                    <p className="text-xs sm:text-sm font-mono text-silver-400 mb-4">
                      {activeProject.tagline}
                    </p>

                    {/* 1-sentence description */}
                    <p className="text-silver-400 text-sm leading-relaxed mb-6 font-normal">
                      {activeProject.description}
                    </p>

                    {/* Key Technical Highlights */}
                    <div className="space-y-2 mb-6">
                      <span className="text-[11px] font-mono text-silver-500 uppercase tracking-wider block">
                        Architectural Highlights:
                      </span>
                      <ul className="space-y-1.5 text-xs text-silver-300">
                        {activeProject.highlights.slice(0, 3).map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-silver-400 font-mono mt-0.5">▹</span>
                            <span className="leading-snug">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-8">
                      {activeProject.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded bg-graphite border border-monochrome-subtle text-[11px] font-mono text-silver-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stage Footer Controls */}
                  <div className="pt-6 border-t border-monochrome-subtle flex flex-wrap items-center justify-between gap-4">
                    <button
                      onClick={() => handleSelectProject(activeProject, true)}
                      className="inline-flex items-center gap-2 text-xs font-mono font-medium text-silver-200 hover:text-white uppercase tracking-wider group"
                    >
                      <span>Inspect Full Architecture</span>
                      <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                    </button>

                    {/* Next / Prev Stepper */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handlePrevProject}
                        className="p-2 rounded-lg border border-monochrome-subtle bg-graphite hover:bg-steel text-silver-300 hover:text-white transition-colors"
                        aria-label="Previous System"
                        title="Previous System"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleNextProject}
                        className="p-2 rounded-lg border border-monochrome-subtle bg-graphite hover:bg-steel text-silver-300 hover:text-white transition-colors"
                        aria-label="Next System"
                        title="Next System"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* Kinetic Selector Deck (Horizontal Reel) */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-xs font-mono text-silver-400 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-silver-400" />
                  <span>Interactive System Deck — Click Any Card to Inspect</span>
                </div>

                <div className="hidden sm:flex items-center gap-2">
                  <button
                    onClick={() => handleScrollDeck('left')}
                    className="p-1.5 rounded-lg border border-monochrome-subtle bg-graphite hover:bg-steel text-silver-300 hover:text-white transition-colors"
                    aria-label="Scroll Deck Left"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleScrollDeck('right')}
                    className="p-1.5 rounded-lg border border-monochrome-subtle bg-graphite hover:bg-steel text-silver-300 hover:text-white transition-colors"
                    aria-label="Scroll Deck Right"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Scrollable Horizontal Deck with Preserved Card Dimensions */}
              <div 
                ref={deckScrollRef}
                className="flex items-stretch gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-silver-600/30"
              >
                {visibleProjects.map((project, idx) => {
                  const isCurrent = activeProject.id === project.id;

                  return (
                    <article
                      key={project.id}
                      onClick={() => handleSelectProject(project, false)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleSelectProject(project, false);
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-label={`Select ${project.title}`}
                      className={`group kinetic-card rounded-2xl overflow-hidden cursor-pointer flex flex-col justify-between transition-all duration-300 snap-start shrink-0 w-[300px] sm:w-[350px] focus-visible:ring-2 focus-visible:ring-silver-400 focus-visible:outline-none ${
                        isCurrent 
                          ? 'ring-2 ring-silver-200 border-white/40 shadow-2xl -translate-y-1.5 bg-obsidian' 
                          : 'hover:-translate-y-1 opacity-75 hover:opacity-100'
                      }`}
                    >
                      {/* Preserved 16:10 Frame with Domain Animation */}
                      <ProjectVisualFrame project={project} />

                      {/* Content block */}
                      <div className="p-5 flex flex-col justify-between flex-grow">
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className="text-base font-display font-bold text-silver-100 tracking-tight group-hover:text-white transition-colors">
                              {project.title}
                            </h4>
                            <span className="text-[10px] font-mono text-silver-500">
                              0{idx + 1}
                            </span>
                          </div>

                          <p className="text-silver-400 text-xs leading-relaxed line-clamp-2 mb-4 font-normal">
                            {project.description}
                          </p>
                        </div>

                        {/* Tech Pills */}
                        <div className="pt-3 border-t border-monochrome-subtle flex items-center justify-between gap-2">
                          <div className="flex flex-wrap gap-1">
                            {project.tech.slice(0, 3).map((tech) => (
                              <span
                                key={tech}
                                className="px-2 py-0.5 rounded bg-graphite border border-monochrome-subtle text-[10px] font-mono text-silver-400"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>

                          <span className={`text-[10px] font-mono transition-colors ${
                            isCurrent ? 'text-white font-medium' : 'text-silver-500 group-hover:text-silver-200'
                          }`}>
                            {isCurrent ? '● Active' : 'Select →'}
                          </span>
                        </div>

                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* ============================================================= */}
        {/* VIEW MODE 2: EXPANDED 3-COLUMN GALLERY GRID                   */}
        {/* ============================================================= */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
            {visibleProjects.map((project, idx) => {
              const isCurrent = activeProject?.id === project.id;

              return (
                <article
                  key={project.id}
                  onClick={() => handleSelectProject(project, true)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelectProject(project, true);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`View architectural details for ${project.title}`}
                  className={`group kinetic-card rounded-2xl overflow-hidden cursor-pointer flex flex-col justify-between transition-all duration-300 focus-visible:ring-2 focus-visible:ring-silver-400 focus-visible:outline-none ${
                    isCurrent ? 'ring-1 ring-silver-300 border-monochrome-active shadow-xl' : 'hover:-translate-y-1'
                  }`}
                >
                  {/* Visual Viewport with Fixed Clean 16:10 Ratio & Domain-Specific Creative Treatments */}
                  <ProjectVisualFrame project={project} />

                  {/* Content Block */}
                  <div className="p-5 flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <h3 className="text-lg font-display font-bold text-silver-100 tracking-tight group-hover:text-white transition-colors">
                          {project.title}
                        </h3>
                        <ArrowUpRight className="w-4 h-4 text-silver-500 group-hover:text-silver-200 transition-colors shrink-0 mt-0.5" />
                      </div>

                      <p className="text-silver-400 text-xs leading-relaxed line-clamp-2 mb-4 font-normal">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Pills & Actions */}
                    <div className="pt-3 border-t border-monochrome-subtle flex items-center justify-between gap-2">
                      <div className="flex flex-wrap gap-1">
                        {project.tech.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded bg-graphite border border-monochrome-subtle text-[10px] font-mono text-silver-400"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.tech.length > 3 && (
                          <span className="px-1.5 py-0.5 text-[10px] font-mono text-silver-600">
                            +{project.tech.length - 3}
                          </span>
                        )}
                      </div>

                      <span className="text-[11px] font-mono text-silver-400 group-hover:text-white transition-colors">
                        Details →
                      </span>
                    </div>

                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* ============================================================= */}
        {/* DEDICATED ON-PAGE PROJECT DETAIL SPECIFICATION SECTION        */}
        {/* ============================================================= */}
        {activeProject && (
          <div 
            ref={detailRef}
            id="project-detail"
            className="mt-20 pt-14 border-t border-monochrome-active animate-in fade-in slide-in-from-bottom-4 duration-300"
          >
            <div className="kinetic-card rounded-3xl p-6 sm:p-10 shadow-2xl bg-obsidian/90">
              
              {/* Detail Navigation Controls */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-monochrome-subtle mb-8">
                <button
                  onClick={handleBackToGallery}
                  className="inline-flex items-center gap-2 text-xs font-mono text-silver-400 hover:text-white uppercase tracking-wider transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Return to Showcase</span>
                </button>

                <div className="flex items-center gap-2 text-xs font-mono text-silver-500">
                  <span className="hidden sm:inline">System Index:</span>
                  <button
                    onClick={handlePrevProject}
                    className="p-1.5 rounded-lg border border-monochrome-subtle bg-graphite hover:bg-steel text-silver-300 hover:text-white transition-colors"
                    aria-label="Previous Project"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-2 text-silver-300 font-medium">
                    {activeIndex + 1} / {visibleProjects.length}
                  </span>
                  <button
                    onClick={handleNextProject}
                    className="p-1.5 rounded-lg border border-monochrome-subtle bg-graphite hover:bg-steel text-silver-300 hover:text-white transition-colors"
                    aria-label="Next Project"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Detail Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                
                {/* Visual Viewport with Direct Verified Image */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="rounded-2xl overflow-hidden border border-monochrome-subtle bg-graphite aspect-[16/10] shadow-xl relative group">
                    <img
                      src={activeProject.image}
                      alt={activeProject.title}
                      className={`w-full h-full ${
                        activeProject.id === 'wanderlust'
                          ? 'object-contain object-center bg-[#070709] p-1 sm:p-2'
                          : 'object-cover object-top'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Direct Action Links */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    {activeProject.liveUrl && (
                      <a
                        href={activeProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-silver-200 text-void font-mono text-xs font-semibold uppercase tracking-wider hover:bg-white transition-all shadow-md"
                      >
                        <span>Launch Live Demo</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}

                    <a
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-monochrome-subtle bg-graphite hover:bg-steel text-silver-300 font-mono text-xs font-semibold uppercase tracking-wider transition-all"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Inspect Repository</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-silver-500" />
                    </a>
                  </div>
                </div>

                {/* Architectural Specifications */}
                <div className="lg:col-span-5 space-y-6">
                  
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest-mono text-silver-500 block mb-1">
                      {activeProject.category === 'fullstack' ? 'Full Stack Platform' : activeProject.category === 'python' ? 'Python & CV System' : 'System Utility'}
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-display font-bold text-silver-100 tracking-tight mb-2">
                      {activeProject.title}
                    </h3>
                    <p className="text-sm font-mono text-silver-400">
                      {activeProject.tagline}
                    </p>
                  </div>

                  {/* Engineering Role */}
                  <div className="p-4 rounded-xl border border-monochrome-subtle bg-graphite/60">
                    <div className="flex items-center gap-2 text-xs font-mono text-silver-400 uppercase tracking-wider mb-1">
                      <Terminal className="w-3.5 h-3.5 text-silver-300" />
                      <span>Engineering Scope</span>
                    </div>
                    <p className="text-xs text-silver-300 font-mono leading-relaxed">
                      {activeProject.role}
                    </p>
                  </div>

                  {/* Architecture Summary */}
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-widest-mono text-silver-500 mb-2">
                      Architectural Summary
                    </h4>
                    <p className="text-sm text-silver-400 leading-relaxed font-normal">
                      {activeProject.longDescription}
                    </p>
                  </div>

                  {/* Verified Capabilities */}
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-widest-mono text-silver-500 mb-2">
                      Verified Technical Features
                    </h4>
                    <ul className="space-y-2">
                      {activeProject.highlights.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-silver-400 font-normal">
                          <CheckCircle2 className="w-3.5 h-3.5 text-silver-300 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Verified Tech Stack */}
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-widest-mono text-silver-500 mb-2">
                      Technologies & Libraries
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {activeProject.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded bg-graphite border border-monochrome-subtle text-xs font-mono text-silver-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
