import React, { useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolioData';
import { Menu, X, ArrowUpRight, FileText } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { label: 'Work', href: '#projects' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (window.lenis) {
      window.lenis.scrollTo(href, { offset: -80 });
    } else {
      const el = document.querySelector(href);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['hero', 'projects', 'about', 'skills', 'contact'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 250) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="kinetic-nav rounded-full px-5 py-2.5 sm:px-6 sm:py-3 flex items-center justify-between shadow-2xl border border-monochrome-subtle">
          
          {/* Monogram Brand */}
          <a 
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-8 h-8 rounded-full bg-graphite border border-monochrome-subtle flex items-center justify-center font-display font-bold text-xs tracking-wider text-silver-200 group-hover:border-monochrome-hover group-hover:text-white transition-all duration-200">
              AJ
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-sm tracking-tight text-silver-100 group-hover:text-white transition-colors">
                Abhishek Jha
              </span>
              <span className="text-[10px] font-mono text-silver-600 -mt-1 hidden sm:block">
                Full Stack Engineer
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest-mono uppercase">
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative py-1 transition-colors ${
                    isActive ? 'text-white font-medium' : 'text-silver-500 hover:text-silver-200'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-white rounded-full" />
                  )}
                </a>
              );
            })}
          </div>

          {/* Actions: Resume CTA & Mobile Trigger */}
          <div className="flex items-center gap-3">
            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-monochrome-subtle bg-graphite hover:border-monochrome-hover text-xs font-mono text-silver-300 hover:text-white transition-all duration-200 hover:-translate-y-0.5"
            >
              <FileText className="w-3.5 h-3.5 text-silver-400" />
              <span>Resume</span>
              <ArrowUpRight className="w-3 h-3 text-silver-500" />
            </a>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full border border-monochrome-subtle bg-graphite text-silver-300 hover:text-white focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </nav>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-4 top-20 kinetic-card rounded-3xl p-6 shadow-2xl border border-monochrome-hover animate-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-4">
            {navLinks.map((link, idx) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-lg font-display font-medium text-silver-200 hover:text-white py-2 border-b border-monochrome-subtle flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-xs font-mono text-silver-600">0{idx + 1}</span>
              </a>
            ))}
            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-silver-200 text-void font-mono text-xs font-semibold tracking-wider uppercase shadow-md hover:bg-white"
            >
              <FileText className="w-4 h-4" />
              <span>Inspect Resume (PDF)</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
