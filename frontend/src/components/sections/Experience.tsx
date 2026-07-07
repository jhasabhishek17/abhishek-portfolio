import { experience } from '@/lib/portfolio-data'

export default function Experience() {
  return (
    <section id="experience" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <p className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--accent2)' }}>
          <span style={{ color: 'var(--accent)' }}>// </span>work experience
        </p>
        <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-4">Internships</h2>
        <p className="mb-12 font-light" style={{ color: 'var(--muted)' }}>
          Where I've applied my skills in real-world environments.
        </p>

        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-0 top-0 bottom-0 w-px"
            style={{ background: 'var(--border)' }}
          />

          <div className="flex flex-col gap-10">
            {experience.map((exp, i) => (
              <div key={i} className="relative pl-8">
                {/* Dot */}
                <div
                  className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 -translate-x-1.5"
                  style={{ background: 'var(--accent)', borderColor: 'var(--bg)' }}
                />

                <div
                  className="rounded-2xl p-6 transition-all duration-200"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--accent2)' }}>
                        {exp.company}
                      </p>
                      <h3 className="text-lg font-semibold">{exp.role}</h3>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-mono text-xs" style={{ color: 'var(--muted)' }}>{exp.period}</p>
                      <p className="font-mono text-xs mt-0.5" style={{ color: 'var(--accent3)' }}>
                        {exp.duration} · {exp.type}
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-1.5 mb-4">
                    {exp.description.map((point, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm font-light" style={{ color: 'var(--muted)' }}>
                        <span style={{ color: 'var(--accent)', marginTop: '2px' }}>▹</span>
                        {point}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map(t => (
                      <span
                        key={t}
                        className="font-mono text-xs px-2 py-0.5 rounded"
                        style={{
                          background: 'rgba(124,58,237,0.1)',
                          color: '#a78bfa',
                          border: '1px solid rgba(124,58,237,0.25)',
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
