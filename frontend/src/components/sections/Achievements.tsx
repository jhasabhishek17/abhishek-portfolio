import { achievements } from '@/lib/portfolio-data'

export default function Achievements() {
  return (
    <section id="achievements" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <p className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--accent2)' }}>
          <span style={{ color: 'var(--accent)' }}>// </span>recognition & wins
        </p>
        <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-4">Achievements</h2>
        <p className="mb-12 font-light" style={{ color: 'var(--muted)' }}>
          Milestones and recognitions earned along the way.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((ach, i) => (
            <div
              key={i}
              className="flex items-start gap-4 rounded-2xl p-5 transition-all duration-200"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'var(--accent3)'
                el.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'var(--border)'
                el.style.transform = 'translateY(0)'
              }}
            >
              <span className="text-2xl flex-shrink-0 mt-0.5">{ach.icon}</span>
              <div>
                <p className="font-semibold text-sm leading-snug mb-1">{ach.title}</p>
                <p className="font-mono text-xs" style={{ color: 'var(--muted)' }}>{ach.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
