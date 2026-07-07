'use client'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Send, Mail, Github, Linkedin, MapPin, Loader2 } from 'lucide-react'
import { personalInfo } from '@/lib/portfolio-data'
import { sendContactForm } from '@/lib/api'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields.')
      return
    }
    setSending(true)
    try {
      await sendContactForm(form)
      toast.success('Message sent! I\'ll get back to you soon.')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      toast.error('Failed to send message. Please try again or email directly.')
    } finally {
      setSending(false)
    }
  }

  const inputClass = `w-full px-4 py-3 rounded-xl text-sm font-light outline-none transition-all duration-200`
  const inputStyle = {
    background: 'var(--surface2)',
    border: '1px solid var(--border)',
    color: 'var(--text)',
  }

  const socials = [
    { icon: <Mail size={18} />, label: personalInfo.email, href: `mailto:${personalInfo.email}` },
    { icon: <Github size={18} />, label: 'GitHub', href: personalInfo.github },
    { icon: <Linkedin size={18} />, label: 'LinkedIn', href: personalInfo.linkedin },
    { icon: <MapPin size={18} />, label: personalInfo.location, href: '#' },
  ]

  return (
    <section id="contact" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <p className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--accent2)' }}>
          <span style={{ color: 'var(--accent)' }}>// </span>let's connect
        </p>
        <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-4">Get In Touch</h2>
        <p className="mb-12 font-light" style={{ color: 'var(--muted)' }}>
          Open to full-time roles, internships, freelance projects, or just a good tech conversation.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left info */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div
              className="rounded-2xl p-6"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              <h3 className="text-lg font-semibold mb-2">Open to Opportunities 🚀</h3>
              <p className="text-sm font-light" style={{ color: 'var(--muted)' }}>
                I'm actively looking for full-time Software Engineer roles starting{' '}
                <span style={{ color: 'var(--accent2)' }}>mid-2026</span> after graduation.
                Also open to remote internships and freelance work.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--muted)' }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = 'var(--accent2)'
                    el.style.color = 'var(--accent2)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = 'var(--border)'
                    el.style.color = 'var(--muted)'
                  }}
                >
                  {s.icon}
                  <span className="font-mono text-xs">{s.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right form */}
          <div
            className="lg:col-span-3 rounded-2xl p-8"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs mb-2" style={{ color: 'var(--muted)' }}>
                    Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className={inputClass}
                    style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs mb-2" style={{ color: 'var(--muted)' }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className={inputClass}
                    style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
                    onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs mb-2" style={{ color: 'var(--muted)' }}>
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Job opportunity / Project collaboration / etc."
                  value={form.subject}
                  onChange={e => setForm({ ...form, subject: e.target.value })}
                  className={inputClass}
                  style={inputStyle}
                  onFocus={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                />
              </div>

              <div>
                <label className="block font-mono text-xs mb-2" style={{ color: 'var(--muted)' }}>
                  Message *
                </label>
                <textarea
                  rows={5}
                  placeholder="Tell me about your project, role, or just say hi..."
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  className={inputClass}
                  style={{ ...inputStyle, resize: 'vertical' }}
                  onFocus={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={sending}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{ background: 'var(--accent)', color: '#fff' }}
                onMouseEnter={e => !sending && ((e.currentTarget as HTMLElement).style.background = '#6d28d9')}
                onMouseLeave={e => !sending && ((e.currentTarget as HTMLElement).style.background = 'var(--accent)')}
              >
                {sending ? (
                  <><Loader2 size={16} className="animate-spin" /> Sending...</>
                ) : (
                  <><Send size={16} /> Send Message</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
