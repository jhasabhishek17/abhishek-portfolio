'use client'
import { useState } from 'react'
import { X, Play, CheckCircle2, Award, BookOpen, HelpCircle, Check, CreditCard } from 'lucide-react'

interface EduPlatformDemoProps {
  onClose: () => void
}

export default function EduPlatformDemo({ onClose }: EduPlatformDemoProps) {
  const [activeLesson, setActiveLesson] = useState(2)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [quizSubmitted, setQuizSubmitted] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)

  const syllabus = [
    { id: 1, title: 'Module 1: JavaScript ES6+ Async & Promises', duration: '45 mins', completed: true },
    { id: 2, title: 'Module 2: React 18 Components & Custom Hooks', duration: '60 mins', completed: true },
    { id: 3, title: 'Module 3: Node.js & Express REST API Architecture', duration: '55 mins', completed: false },
    { id: 4, title: 'Module 4: PostgreSQL & MongoDB Database Indexing', duration: '50 mins', completed: false },
  ]

  const quiz = {
    question: "What keyword is used to define custom hooks in React?",
    options: ["useCustom", "use[Name]", "createHook", "reactHook"],
    correctIndex: 1,
    explanation: "Custom hooks in React are JavaScript functions whose names start with 'use' (e.g. useAuth, useFetch)."
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden flex flex-col shadow-2xl border"
        style={{ background: 'var(--surface)', borderColor: 'rgba(59, 130, 246, 0.4)' }}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b" style={{ borderColor: 'var(--border)', background: 'var(--surface2)' }}>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl" style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa' }}>
              <BookOpen size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg">EduPlatform — Course & Video Simulator</h3>
                <span className="text-xs px-2 py-0.5 rounded font-mono bg-blue-500/20 text-blue-400 border border-blue-500/30">Interactive App</span>
              </div>
              <p className="text-xs text-muted-foreground font-light">Full-Stack Video Streaming & Interactive Quiz Engine</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10" style={{ color: 'var(--muted)' }}>
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex-1 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Video Player Simulator */}
            <div className="lg:col-span-2 space-y-4">
              <div className="relative aspect-video rounded-xl bg-slate-900 border border-white/10 overflow-hidden flex flex-col items-center justify-center group shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                <div className="z-10 flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform cursor-pointer">
                    <Play size={28} className="ml-1" />
                  </div>
                  <span className="text-xs font-mono text-white/90">Playing: {syllabus.find(s=>s.id===activeLesson)?.title}</span>
                </div>

                {/* Video Bar Controls */}
                <div className="absolute bottom-0 inset-x-0 p-3 z-10 flex items-center gap-3 bg-black/60 backdrop-blur-sm text-xs font-mono">
                  <Play size={14} className="text-blue-400" />
                  <div className="flex-1 h-1.5 rounded-full bg-white/20 overflow-hidden">
                    <div className="h-full bg-blue-500 w-1/3" />
                  </div>
                  <span className="text-gray-300 text-[11px]">18:45 / 55:00</span>
                </div>
              </div>

              {/* Course Info */}
              <div className="p-4 rounded-xl space-y-2" style={{ background: 'var(--surface2)', border: '1px solid var(--border)' }}>
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-sm">Full-Stack Web Development Bootcamp</h4>
                  <button 
                    onClick={() => setShowCheckout(!showCheckout)} 
                    className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                  >
                    <CreditCard size={12} /> {showCheckout ? 'Hide Checkout' : 'Enroll / Stripe Checkout'}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground font-light">
                  Instructor: Abhishek • 3,420 Students Enrolled • 4.9 ★★★★★ Rating
                </p>
              </div>

              {showCheckout && (
                <div className="p-4 rounded-xl border border-blue-500/40 bg-blue-950/40 space-y-3 animate-fadeIn">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono font-bold text-blue-300">💳 Mock Stripe Payment Portal</span>
                    <span className="text-xs font-mono text-emerald-400 font-bold">$49.00 USD</span>
                  </div>
                  <p className="text-xs text-gray-300">Simulating real-time Stripe checkout integration with instant course access key.</p>
                  <button 
                    onClick={() => { alert('Payment Successful! Course access granted.'); setShowCheckout(false) }}
                    className="w-full py-2 rounded-lg text-xs font-mono font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all"
                  >
                    Confirm Demo Purchase ($49)
                  </button>
                </div>
              )}
            </div>

            {/* Syllabus & Interactive Quiz */}
            <div className="space-y-4">
              {/* Syllabus */}
              <div className="p-4 rounded-xl space-y-3" style={{ background: 'var(--surface2)', border: '1px solid var(--border)' }}>
                <span className="text-xs font-mono font-semibold text-blue-400 uppercase tracking-wider block">// Course Modules</span>
                <div className="space-y-2">
                  {syllabus.map(s => (
                    <button
                      key={s.id}
                      onClick={() => setActiveLesson(s.id)}
                      className={`w-full p-2.5 rounded-lg text-left text-xs font-medium flex items-center justify-between transition-all ${activeLesson===s.id ? 'bg-blue-600/20 text-blue-300 border border-blue-500/40' : 'bg-black/20 text-gray-300 border border-transparent hover:bg-white/5'}`}
                    >
                      <span className="truncate pr-2">{s.title}</span>
                      {s.completed ? <CheckCircle2 size={14} className="text-green-400 flex-shrink-0" /> : <Play size={12} className="text-gray-400 flex-shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quiz Module */}
              <div className="p-4 rounded-xl space-y-3" style={{ background: 'var(--surface2)', border: '1px solid var(--border)' }}>
                <span className="text-xs font-mono font-semibold text-purple-400 uppercase tracking-wider flex items-center gap-1">
                  <HelpCircle size={14} /> Knowledge Quiz Check
                </span>
                <p className="text-xs font-medium text-gray-200">{quiz.question}</p>
                <div className="space-y-1.5">
                  {quiz.options.map((opt, i) => (
                    <button
                      key={opt}
                      onClick={() => { setSelectedAnswer(i); setQuizSubmitted(false) }}
                      className={`w-full p-2 rounded-lg text-xs text-left transition-all font-mono border ${selectedAnswer===i ? 'bg-purple-600/20 border-purple-500 text-purple-300' : 'bg-black/30 border-white/5 text-gray-300 hover:bg-white/5'}`}
                    >
                      {String.fromCharCode(65 + i)}. {opt}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setQuizSubmitted(true)}
                  disabled={selectedAnswer === null}
                  className="w-full py-2 rounded-lg text-xs font-mono font-semibold bg-purple-600 hover:bg-purple-500 text-white disabled:opacity-50 transition-all"
                >
                  Submit Quiz Answer
                </button>

                {quizSubmitted && (
                  <div className={`p-3 rounded-lg text-xs font-mono border ${selectedAnswer===quiz.correctIndex ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300' : 'bg-rose-950/60 border-rose-500/40 text-rose-300'}`}>
                    {selectedAnswer === quiz.correctIndex ? (
                      <div className="flex items-center gap-1.5"><Check size={14} /> Correct! {quiz.explanation}</div>
                    ) : (
                      <div>Incorrect! Correct answer: {quiz.options[quiz.correctIndex]}.</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
