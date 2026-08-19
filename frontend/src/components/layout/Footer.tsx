'use client'
import { personalInfo } from '@/lib/portfolio-data'
import { Github, Linkedin, Twitter, Heart } from 'lucide-react'

export default function Footer() {
  const socials = [
    { href: personalInfo.github, icon: <Github size={16} />, label: 'GitHub' },
    { href: personalInfo.linkedin, icon: <Linkedin size={16} />, label: 'LinkedIn' },
    ...(personalInfo.twitter ? [{ href: personalInfo.twitter, icon: <Twitter size={16} />, label: 'Twitter' }] : []),
  ]

  return (
    <footer style={{ borderTop: '1px solid var(--border)' }}>
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs" style={{ color: 'var(--muted)' }}>
          Built with <Heart size={11} className="inline" style={{ color: 'var(--accent)' }} /> by{' '}
          <span style={{ color: 'var(--accent2)' }}>{personalInfo.name}</span> · {new Date().getFullYear()}
        </p>
        <div className="flex gap-4">
          {socials.map(s => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="transition-colors duration-200"
              style={{ color: 'var(--muted)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent2)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
