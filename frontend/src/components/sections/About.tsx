'use client'
import { GraduationCap, MapPin, Calendar, Cpu, Mail, Award } from 'lucide-react'
import { personalInfo } from '@/lib/portfolio-data'

export default function About() {
  const infoCards = [
    { icon: <GraduationCap size={18} />, label: 'Degree', value: personalInfo.degree },
    { icon: <Award size={18} />, label: 'CGPA', value: personalInfo.cgpa + ' / 10.0' },
    { icon: <MapPin size={18} />, label: 'Location', value: personalInfo.location },
    { icon: <Calendar size={18} />, label: 'Graduating', value: personalInfo.graduationYear },
    { icon: <Cpu size={18} />, label: 'Interests', value: 'Full-Stack · ML · Cloud · DSA' },
    { icon: <Mail size={18} />, label: 'Email', value: personalInfo.email },
  ]

  return (
    <section id="about" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <p className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--accent2)' }}>
          <span style={{ color: 'var(--accent)' }}>// </span>introduction
        </p>
        <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-10">About Me</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-4">
            <p className="font-light leading-relaxed" style={{ color: 'var(--muted)' }}>
              Hi! I'm <span style={{ color: 'var(--accent2)', fontWeight: 500 }}>{personalInfo.name}</span>, a final-year B.Tech student in{' '}
              <span style={{ color: 'var(--accent2)', fontWeight: 500 }}>Computer Science & Engineering</span> at {personalInfo.college}.
              I'm deeply passionate about building software that solves real-world problems — from sleek frontends to robust backend APIs and intelligent ML systems.
            </p>
            <p className="font-light leading-relaxed" style={{ color: 'var(--muted)' }}>
              I've spent the last four years honing my skills in data structures & algorithms, full-stack development, and machine learning.
              I love participating in hackathons, contributing to open source, and challenging myself on competitive programming platforms.
            </p>
            <p className="font-light leading-relaxed" style={{ color: 'var(--muted)' }}>
              When I'm not coding, I'm reading tech blogs, exploring new frameworks, or contributing to student communities.
              I'm currently{' '}
              <span style={{ color: 'var(--accent3)', fontWeight: 500 }}>actively seeking full-time SWE roles</span>{' '}
              and exciting opportunities.
            </p>

            <div
              className="mt-6 rounded-xl p-5 font-mono text-xs"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              <p style={{ color: 'var(--accent2)' }}>$ cat about.json</p>
              <pre className="mt-2 leading-relaxed" style={{ color: 'var(--muted)', whiteSpace: 'pre-wrap' }}>
{`{
  "name": "${personalInfo.name}",
  "role": "Final Year CS Student",
  "status": "${personalInfo.availableForWork ? 'open_to_work' : 'not_available'}",
  "passion": ["problem_solving", "clean_code", "scalable_systems"],
  "currently_learning": ["System Design", "DevOps", "LLMs"]
}`}
              </pre>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {infoCards.map(card => (
              <div
                key={card.label}
                className="flex items-center gap-3 rounded-xl px-4 py-4 transition-all duration-200"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(124,58,237,0.15)', color: 'var(--accent2)' }}
                >
                  {card.icon}
                </div>
                <div>
                  <div className="font-mono text-xs" style={{ color: 'var(--muted)' }}>{card.label}</div>
                  <div className="text-sm font-medium">{card.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
