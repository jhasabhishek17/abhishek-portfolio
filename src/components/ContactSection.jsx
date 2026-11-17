import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import { Mail, Copy, Check, Github, Linkedin, FileText, Send, MapPin, ArrowUpRight } from 'lucide-react';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    const subject = encodeURIComponent(`Engineering Inquiry from ${formState.name}`);
    const body = encodeURIComponent(`Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`);
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-28 sm:py-36 relative border-t border-monochrome-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2.5 text-xs font-mono tracking-widest-mono uppercase text-silver-500 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-silver-400" />
            <span>04 // Contact & Inquiry</span>
          </div>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold tracking-tightest text-silver-100">
            Initiate Contact.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Coordinates (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <p className="text-silver-400 text-base sm:text-lg leading-relaxed">
              Open to engineering roles, technical collaboration, and discussions on full-stack architecture and computational software.
            </p>

            {/* Email Ledger Card */}
            <div className="p-6 rounded-2xl kinetic-card flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-silver-500 uppercase tracking-wider">Primary Channel</span>
                <span className="text-xs font-mono text-silver-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-silver-300 animate-pulse" />
                  Active
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-obsidian border border-monochrome-subtle">
                <a 
                  href={`mailto:${personalInfo.email}`} 
                  className="font-mono text-sm sm:text-base text-silver-200 hover:text-white font-medium truncate"
                >
                  {personalInfo.email}
                </a>
                
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-graphite hover:bg-gunmetal border border-monochrome-subtle text-silver-400 hover:text-white transition-colors shrink-0"
                  aria-label="Copy Email Address"
                >
                  {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {copied && (
                <span className="text-xs font-mono text-silver-300 -mt-2">
                  ✓ Address copied to system clipboard
                </span>
              )}
            </div>

            {/* Verified Links */}
            <div className="space-y-3">
              <span className="text-xs font-mono text-silver-500 uppercase tracking-wider block">Verified Coordinates</span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl border border-monochrome-subtle hover:border-monochrome-hover bg-obsidian hover:bg-graphite flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Github className="w-4 h-4 text-silver-300" />
                    <span className="text-xs font-mono text-silver-200 font-medium">GitHub</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-silver-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl border border-monochrome-subtle hover:border-monochrome-hover bg-obsidian hover:bg-graphite flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Linkedin className="w-4 h-4 text-silver-300" />
                    <span className="text-xs font-mono text-silver-200 font-medium">LinkedIn</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-silver-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href={personalInfo.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl border border-monochrome-subtle hover:border-monochrome-hover bg-obsidian hover:bg-graphite flex items-center justify-between group transition-all sm:col-span-2"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-silver-300" />
                    <div>
                      <span className="text-xs font-mono text-silver-200 font-medium block">Curriculum Vitae</span>
                      <span className="text-[11px] font-mono text-silver-500">1-page ATS Verified PDF</span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-silver-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* Geographical Base */}
            <div className="pt-4 border-t border-monochrome-subtle flex items-center justify-between text-xs font-mono text-silver-500">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-silver-400" />
                {personalInfo.location}
              </span>
              <span>IST (UTC+5:30)</span>
            </div>

          </div>

          {/* Right Column: Transmission Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl kinetic-card shadow-2xl">
              <h3 className="text-2xl font-display font-bold text-silver-100 mb-2">
                Send Direct Message
              </h3>
              <p className="text-xs sm:text-sm font-mono text-silver-500 mb-8">
                Dispatches directly to jhasabhishek17@gmail.com
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-xs font-mono text-silver-500 uppercase tracking-wider mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3.5 rounded-xl border border-monochrome-subtle bg-obsidian text-silver-100 placeholder-silver-600 text-sm focus:border-silver-400 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-mono text-silver-500 uppercase tracking-wider mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="name@organization.com"
                    className="w-full px-4 py-3.5 rounded-xl border border-monochrome-subtle bg-obsidian text-silver-100 placeholder-silver-600 text-sm focus:border-silver-400 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-mono text-silver-500 uppercase tracking-wider mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Describe your inquiry, project scope, or opportunity..."
                    className="w-full px-4 py-3.5 rounded-xl border border-monochrome-subtle bg-obsidian text-silver-100 placeholder-silver-600 text-sm focus:border-silver-400 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitted}
                  className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-xl bg-silver-200 text-void font-mono text-xs font-semibold tracking-wider uppercase hover:bg-white hover:shadow-lg hover:shadow-white/10 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50"
                >
                  {submitted ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Opening Client...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Transmit Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
