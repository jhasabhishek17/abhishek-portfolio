'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Github, Linkedin, Code2, ArrowRight } from 'lucide-react'
import { personalInfo, stats } from '@/lib/portfolio-data'
import { getGitHubProfile } from '@/lib/api'

const roles = ['Full Stack Developer', 'Problem Solver', 'Open Source Contributor', 'CS Engineer']

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0)
  const [avatarUrl, setAvatarUrl] = useState(personalInfo.profileImage || '')

  useEffect(() => {
    const id = setInterval(() => setRoleIdx(i => (i + 1) % roles.length), 2500)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (!personalInfo.profileImage) {
      getGitHubProfile().then(p => { if (p?.avatar_url) setAvatarUrl(p.avatar_url) })
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="glow-purple" style={{ width: 600, height: 600, top: '5%', left: '-8%' }} />
      <div className="glow-cyan" style={{ width: 450, height: 450, bottom: '15%', right: '0%' }} />
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 font-mono text-xs"
              style={{ border: '1px solid rgba(6,182,212,0.3)', color: 'var(--accent2)' }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--accent3)' }} />
              {personalInfo.availableForWork ? 'Available for opportunities' : 'Currently unavailable'}
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-3"
              style={{ background: 'linear-gradient(135deg,#e8e8f0 30%,#7c3aed 70%,#06b6d4 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              {personalInfo.name}
            </h1>
            <div className="font-mono text-base mb-4" style={{ color: 'var(--muted)' }}>
              <span style={{ color: 'var(--accent2)' }}>$ </span>
              <span key={roleIdx} className="fade-up inline-block" style={{ color: 'var(--accent2)' }}>{roles[roleIdx]}</span>
              <span className="animate-pulse" style={{ color: 'var(--accent)' }}>_</span>
            </div>
            <p className="text-lg mb-8 font-light max-w-xl" style={{ color: 'var(--muted)' }}>{personalInfo.tagline}</p>
            <div className="flex flex-wrap gap-3 mb-10">
              <a href="#projects" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all"
                style={{ background: 'var(--accent)', color: '#fff' }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = '#6d28d9')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'var(--accent)')}>
                <Code2 size={16} /> View Projects
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all"
                style={{ border: '1px solid var(--border)', color: 'var(--text)' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--accent2)'; el.style.color = 'var(--accent2)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'var(--border)'; el.style.color = 'var(--text)' }}>
                Get In Touch <ArrowRight size={16} />
              </a>
            </div>
            <div className="flex gap-4">
              {[{ href: personalInfo.github, icon: <Github size={18} /> }, { href: personalInfo.linkedin, icon: <Linkedin size={18} /> }].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="p-2 rounded-lg transition-all" style={{ color: 'var(--muted)', border: '1px solid var(--border)' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = 'var(--accent2)'; el.style.borderColor = 'var(--accent2)' }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = 'var(--muted)'; el.style.borderColor = 'var(--border)' }}>
                  {s.icon}
                </a>
              ))}
            </div>
            <div className="flex flex-wrap gap-8 mt-10 pt-8" style={{ borderTop: '1px solid var(--border)' }}>
              {[
                { n: stats.projectsBuilt, l: 'Projects Built' },
                { n: stats.internships, l: 'Internships' },
                { n: stats.certifications, l: 'Certifications' },
                { n: stats.problemsSolved, l: 'DSA Problems' },
              ].map(s => (
                <div key={s.l}>
                  <div className="font-mono text-2xl font-bold">
                    <span style={{ color: 'var(--accent)' }}>{s.n}+</span>
                  </div>
                  <div className="font-mono text-xs uppercase tracking-widest mt-0.5" style={{ color: 'var(--muted)' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          {avatarUrl && (
            <div className="relative flex-shrink-0">
              <div className="w-56 h-56 lg:w-72 lg:h-72 rounded-2xl overflow-hidden" style={{ border: '2px solid var(--border)' }}>
                <Image src={avatarUrl} alt={personalInfo.name} width={288} height={288} className="w-full h-full object-cover" priority />
              </div>
              <div className="absolute -bottom-3 -right-3 w-16 h-16 rounded-xl" style={{ background: 'rgba(124,58,237,0.2)', border: '1px solid var(--accent)' }} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
