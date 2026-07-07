'use client'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { personalInfo } from '@/lib/portfolio-data'

const navLinks = [
  { label: 'about', href: '#about' },
  { label: 'skills', href: '#skills' },
  { label: 'projects', href: '#projects' },
  { label: 'experience', href: '#experience' },
  { label: 'github', href: '#github' },
  { label: 'achievements', href: '#achievements' },
  { label: 'contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{ background: scrolled ? 'rgba(10,10,15,0.9)' : 'transparent', backdropFilter: scrolled ? 'blur(12px)' : 'none', borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent' }}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="font-mono text-lg font-medium" style={{ color: 'var(--accent2)' }}>
          <span style={{ color: 'var(--accent)' }}>&lt;</span>{personalInfo.name}<span style={{ color: 'var(--accent)' }}>/&gt;</span>
        </a>
        <ul className="hidden md:flex gap-8 list-none">
          {navLinks.map(l => (
            <li key={l.href}>
              <a href={l.href} className="font-mono text-xs tracking-widest transition-colors" style={{ color: 'var(--muted)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent2)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}>{l.label}</a>
            </li>
          ))}
        </ul>
        <a href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
          style={{ border: '1px solid var(--accent)', color: 'var(--accent)' }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(124,58,237,0.1)')}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'transparent')}>
          Resume ↗
        </a>
        <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)} style={{ color: 'var(--muted)' }}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden px-6 pb-6" style={{ background: 'rgba(10,10,15,0.98)', borderTop: '1px solid var(--border)' }}>
          <ul className="flex flex-col gap-4 list-none pt-4">
            {navLinks.map(l => (
              <li key={l.href}>
                <a href={l.href} className="font-mono text-sm" style={{ color: 'var(--muted)' }} onClick={() => setMenuOpen(false)}>{l.label}</a>
              </li>
            ))}
            <li><a href={personalInfo.resumeUrl} className="font-mono text-sm" style={{ color: 'var(--accent)' }}>resume ↗</a></li>
          </ul>
        </div>
      )}
    </nav>
  )
}
