import { skills } from '@/lib/portfolio-data'

export default function Skills() {
  return (
    <section id="skills" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <p className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--accent2)' }}>
          <span style={{ color: 'var(--accent)' }}>// </span>tech stack
        </p>
        <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-4">Skills</h2>
        <p className="mb-12 font-light" style={{ color: 'var(--muted)' }}>
          Technologies and tools I work with regularly.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map(group => (
            <div
              key={group.category}
              className="rounded-2xl p-6 transition-all duration-200"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'var(--accent)'
                el.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'var(--border)'
                el.style.transform = 'translateY(0)'
              }}
            >
              <p className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--accent2)' }}>
                {group.category}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.items.map(skill => (
                  <span
                    key={skill}
                    className="font-mono text-xs px-3 py-1.5 rounded-lg transition-all duration-150 cursor-default"
                    style={{ border: '1px solid var(--border)', color: 'var(--muted)' }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement
                      el.style.borderColor = 'var(--accent2)'
                      el.style.color = 'var(--accent2)'
                      el.style.background = 'rgba(6,182,212,0.05)'
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement
                      el.style.borderColor = 'var(--border)'
                      el.style.color = 'var(--muted)'
                      el.style.background = 'transparent'
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
