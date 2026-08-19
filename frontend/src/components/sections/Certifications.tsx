'use client'
import { certifications } from '@/lib/portfolio-data'
import { ExternalLink } from 'lucide-react'

export default function Certifications() {
  return (
    <section id="certifications" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <p className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--accent2)' }}>
          <span style={{ color: 'var(--accent)' }}>// </span>credentials
        </p>
        <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-4">Certifications</h2>
        <p className="mb-12 font-light" style={{ color: 'var(--muted)' }}>
          Industry-recognized credentials that validate my expertise.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((cert, i) => (
            <div
              key={i}
              className="rounded-xl p-5 transition-all duration-200 flex flex-col gap-2"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'var(--accent2)'
                el.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'var(--border)'
                el.style.transform = 'translateY(0)'
              }}
            >
              <p className="font-mono text-xs uppercase tracking-widest" style={{ color: 'var(--accent2)' }}>
                {cert.issuer}
              </p>
              <p className="font-semibold text-sm leading-snug flex-1">{cert.name}</p>
              <div className="flex items-center justify-between">
                <p className="font-mono text-xs" style={{ color: 'var(--muted)' }}>{cert.date}</p>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 font-mono text-xs transition-colors"
                    style={{ color: 'var(--accent2)' }}
                  >
                    View <ExternalLink size={11} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
