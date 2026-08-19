'use client'
import { useState } from 'react'
import { X, Sparkles, FileText, CheckCircle, AlertTriangle, Cpu, RefreshCw } from 'lucide-react'

interface ResumeScreenerDemoProps {
  onClose: () => void
}

export default function ResumeScreenerDemo({ onClose }: ResumeScreenerDemoProps) {
  const [resumeText, setResumeText] = useState(
    "Abhishek — Full Stack Developer with experience in React, Next.js, Node.js, Express, TypeScript, Python, REST APIs, PostgreSQL, Docker, AWS, and Algorithms."
  )
  const [jobDescription, setJobDescription] = useState(
    "We are hiring a Full Stack Engineer proficient in React, Node.js, TypeScript, REST APIs, and Docker to build high-scale web platforms."
  )
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState<{
    score: number
    matchedSkills: string[]
    missingSkills: string[]
    recommendation: string
  }>({
    score: 94,
    matchedSkills: ["React", "Node.js", "TypeScript", "REST APIs", "Docker"],
    missingSkills: ["Kubernetes", "GraphQL"],
    recommendation: "Strong Match! Excellent fit for the Full Stack Engineer role.",
  })

  const handleAnalyze = () => {
    setAnalyzing(true)
    setTimeout(() => {
      const skills = ["React", "Node.js", "TypeScript", "Python", "REST APIs", "Docker", "AWS", "SQL"]
      const textUpper = (resumeText + ' ' + jobDescription).toUpperCase()
      const matched = skills.filter(s => textUpper.includes(s.toUpperCase()))

      const score = Math.min(98, 75 + matched.length * 3)

      setResult({
        score: score,
        matchedSkills: matched,
        missingSkills: ["System Design", "CI/CD Pipeline"],
        recommendation: score >= 90 
          ? "🎉 Top Candidate! High proficiency in required tech stack." 
          : "✅ Good Match! Strong foundation with minor skill gaps.",
      })
      setAnalyzing(false)
    }, 600)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden flex flex-col shadow-2xl border"
        style={{ background: 'var(--surface)', borderColor: 'rgba(6, 182, 212, 0.4)' }}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b" style={{ borderColor: 'var(--border)', background: 'var(--surface2)' }}>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl" style={{ background: 'rgba(6, 182, 212, 0.2)', color: '#67e8f9' }}>
              <Cpu size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg">AI Resume Screener — Live NLP Simulator</h3>
                <span className="text-xs px-2 py-0.5 rounded font-mono" style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#67e8f9', border: '1px solid rgba(6, 182, 212, 0.3)' }}>NLP Engine</span>
              </div>
              <p className="text-xs text-muted-foreground font-light">NLP Candidate Ranking & Skill Extraction Engine</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10" style={{ color: 'var(--muted)' }}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex-1 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Resume Input */}
            <div className="space-y-2">
              <label className="block text-xs font-mono font-semibold flex items-center gap-1.5" style={{ color: 'var(--muted)' }}>
                <FileText size={14} className="text-cyan-400" /> Candidate Resume / CV Content
              </label>
              <textarea
                rows={5}
                value={resumeText}
                onChange={e => setResumeText(e.target.value)}
                className="w-full p-3 text-xs rounded-xl outline-none font-mono"
                style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)', resize: 'vertical' }}
              />
            </div>

            {/* Job Description Input */}
            <div className="space-y-2">
              <label className="block text-xs font-mono font-semibold flex items-center gap-1.5" style={{ color: 'var(--muted)' }}>
                <Sparkles size={14} className="text-cyan-400" /> Target Job Description
              </label>
              <textarea
                rows={5}
                value={jobDescription}
                onChange={e => setJobDescription(e.target.value)}
                className="w-full p-3 text-xs rounded-xl outline-none font-mono"
                style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)', resize: 'vertical' }}
              />
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={analyzing}
            className="w-full py-3 rounded-xl text-xs font-mono font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-60"
            style={{ background: 'linear-gradient(90deg, #06b6d4, #3b82f6)', color: '#fff' }}
          >
            {analyzing ? <RefreshCw size={16} className="animate-spin" /> : <Sparkles size={16} />}
            {analyzing ? 'Running NLP Similarity Algorithm...' : '⚡ Run AI Resume Match & Scoring'}
          </button>

          {/* Results Display */}
          {result && (
            <div className="p-5 rounded-2xl border space-y-4" style={{ background: 'var(--surface2)', borderColor: 'rgba(6, 182, 212, 0.3)' }}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-4 border-white/10">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">// NLP Match Analysis</span>
                  <h4 className="text-base font-bold">{result.recommendation}</h4>
                </div>
                <div className="flex items-center gap-2 bg-cyan-950/60 border border-cyan-500/30 px-4 py-2 rounded-xl">
                  <span className="text-2xl font-bold font-mono text-cyan-300">{result.score}%</span>
                  <span className="text-xs font-mono text-muted-foreground">Match Score</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <span className="text-xs font-mono font-semibold flex items-center gap-1 text-emerald-400">
                    <CheckCircle size={14} /> Matched Skills & Keywords ({result.matchedSkills.length})
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {result.matchedSkills.map(s => (
                      <span key={s} className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                        ✓ {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono font-semibold flex items-center gap-1 text-amber-400">
                    <AlertTriangle size={14} /> Recommended Skill Enhancements
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {result.missingSkills.map(s => (
                      <span key={s} className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                        + {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
