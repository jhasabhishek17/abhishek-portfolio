'use client'
import { useState, useEffect } from 'react'
import { X, Send, Users, CheckCircle2, Clock, Plus, Code, Sparkles, MessageSquare } from 'lucide-react'

interface DevConnectDemoProps {
  onClose: () => void
}

export default function DevConnectDemo({ onClose }: DevConnectDemoProps) {
  const [activeTab, setActiveTab] = useState<'kanban' | 'chat' | 'developers'>('kanban')
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Sarah Chen', time: '10:14 AM', text: 'Hey team! I updated the design specs for DevConnect v2 on Figma.' },
    { id: 2, sender: 'Abhishek', time: '10:16 AM', text: 'Great! I am linking the new REST endpoints with Node.js & Socket.io.' },
    { id: 3, sender: 'Alex Ramirez', time: '10:18 AM', text: 'Awesome! All database queries are indexed and benchmarked under 20ms response time.' },
  ])
  const [newMessage, setNewMessage] = useState('')
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Integrate OAuth 2.0 Auth Flow', category: 'Backend', priority: 'High', status: 'In Progress', assignee: 'Abhishek' },
    { id: 2, title: 'Redesign Developer Dashboard', category: 'UI/UX', priority: 'Medium', status: 'In Review', assignee: 'Sarah Chen' },
    { id: 3, title: 'Setup Docker Container & CI/CD', category: 'DevOps', priority: 'High', status: 'Done', assignee: 'Emily Watson' },
    { id: 4, title: 'Optimize MongoDB Indexing', category: 'Database', priority: 'Low', status: 'To Do', assignee: 'Alex Ramirez' },
  ])
  const [newTaskTitle, setNewTaskTitle] = useState('')

  const handleSendMessage = () => {
    if (!newMessage.trim()) return
    const msg = {
      id: Date.now(),
      sender: 'You (Visitor)',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: newMessage,
    }
    setMessages([...messages, msg])
    setNewMessage('')
  }

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return
    const t = {
      id: Date.now(),
      title: newTaskTitle,
      category: 'Feature',
      priority: 'Medium',
      status: 'To Do',
      assignee: 'Abhishek',
    }
    setTasks([...tasks, t])
    setNewTaskTitle('')
  }

  const toggleTaskStatus = (id: number) => {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        const nextStatus = t.status === 'To Do' ? 'In Progress' : t.status === 'In Progress' ? 'Done' : 'To Do'
        return { ...t, status: nextStatus }
      }
      return t
    }))
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden flex flex-col shadow-2xl border"
        style={{ background: 'var(--surface)', borderColor: 'rgba(124, 58, 237, 0.4)' }}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b" style={{ borderColor: 'var(--border)', background: 'var(--surface2)' }}>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl" style={{ background: 'rgba(124,58,237,0.2)', color: '#a78bfa' }}>
              <Code size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg">DevConnect — Interactive Live Demo</h3>
                <span className="text-xs px-2 py-0.5 rounded font-mono" style={{ background: 'rgba(34,197,94,0.15)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.3)' }}>Live Demo</span>
              </div>
              <p className="text-xs text-muted-foreground font-light">Developer Collaboration & Task Workspace Simulator</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg transition-colors hover:bg-white/10"
            style={{ color: 'var(--muted)' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b px-6 pt-3 gap-3 font-mono text-xs" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
          <button
            onClick={() => setActiveTab('kanban')}
            className={`pb-3 px-3 flex items-center gap-1.5 border-b-2 font-medium transition-all ${activeTab==='kanban' ? 'border-purple-500 text-purple-400' : 'border-transparent text-gray-400 hover:text-white'}`}
          >
            <Sparkles size={14} /> Kanban Task Board ({tasks.length})
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`pb-3 px-3 flex items-center gap-1.5 border-b-2 font-medium transition-all ${activeTab==='chat' ? 'border-purple-500 text-purple-400' : 'border-transparent text-gray-400 hover:text-white'}`}
          >
            <MessageSquare size={14} /> Real-Time Chat Room ({messages.length})
          </button>
          <button
            onClick={() => setActiveTab('developers')}
            className={`pb-3 px-3 flex items-center gap-1.5 border-b-2 font-medium transition-all ${activeTab==='developers' ? 'border-purple-500 text-purple-400' : 'border-transparent text-gray-400 hover:text-white'}`}
          >
            <Users size={14} /> Team Directory (4 Online)
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 flex-1 overflow-y-auto space-y-6">
          {activeTab === 'kanban' && (
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Create a new task..."
                  value={newTaskTitle}
                  onChange={e => setNewTaskTitle(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAddTask()}
                  className="flex-1 px-4 py-2 text-sm rounded-xl outline-none"
                  style={{ background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text)' }}
                />
                <button
                  onClick={handleAddTask}
                  className="px-4 py-2 rounded-xl text-xs font-mono font-medium flex items-center gap-1 transition-all"
                  style={{ background: 'var(--accent)', color: '#fff' }}
                >
                  <Plus size={14} /> Add Task
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(['To Do', 'In Progress', 'Done'] as const).map(status => (
                  <div key={status} className="p-4 rounded-xl space-y-3" style={{ background: 'var(--surface2)', border: '1px solid var(--border)' }}>
                    <div className="flex justify-between items-center text-xs font-mono font-semibold" style={{ color: 'var(--muted)' }}>
                      <span>{status.toUpperCase()}</span>
                      <span className="px-2 py-0.5 rounded-full bg-white/5">{tasks.filter(t => t.status === status).length}</span>
                    </div>

                    <div className="space-y-2">
                      {tasks.filter(t => t.status === status).map(t => (
                        <div 
                          key={t.id} 
                          onClick={() => toggleTaskStatus(t.id)}
                          className="p-3 rounded-lg bg-black/30 border border-white/5 space-y-2 hover:border-purple-500/50 cursor-pointer transition-all group"
                        >
                          <div className="flex justify-between items-start">
                            <span className="text-sm font-medium leading-snug group-hover:text-purple-300">{t.title}</span>
                          </div>
                          <div className="flex items-center justify-between text-xs font-mono text-muted-foreground pt-1">
                            <span className="px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-300 text-[10px]">{t.category}</span>
                            <span className="flex items-center gap-1 text-[11px]" style={{ color: 'var(--muted)' }}>
                              {t.status === 'Done' ? <CheckCircle2 size={12} className="text-green-400" /> : <Clock size={12} className="text-amber-400" />}
                              {t.assignee}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'chat' && (
            <div className="flex flex-col h-96 rounded-xl border p-4 space-y-4" style={{ background: 'var(--surface2)', borderColor: 'var(--border)' }}>
              <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                {messages.map(m => (
                  <div key={m.id} className="p-3 rounded-xl bg-black/30 border border-white/5 space-y-1">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="font-semibold text-purple-400">{m.sender}</span>
                      <span className="text-muted-foreground text-[10px]">{m.time}</span>
                    </div>
                    <p className="text-sm text-gray-200">{m.text}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 pt-2 border-t border-white/10">
                <input
                  type="text"
                  placeholder="Type a real-time message..."
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 px-4 py-2 text-sm rounded-xl outline-none"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }}
                />
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 rounded-xl text-xs font-mono font-medium flex items-center gap-1.5"
                  style={{ background: 'var(--accent)', color: '#fff' }}
                >
                  <Send size={14} /> Send
                </button>
              </div>
            </div>
          )}

          {activeTab === 'developers' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: 'Abhishek', role: 'Lead Full Stack Dev', status: 'Online', skills: ['React', 'Node.js', 'MongoDB', 'TypeScript'] },
                { name: 'Sarah Chen', role: 'UI/UX Designer', status: 'In Meeting', skills: ['Figma', 'Tailwind', 'CSS3'] },
                { name: 'Alex Ramirez', role: 'Backend Engineer', status: 'Online', skills: ['Python', 'FastAPI', 'PostgreSQL'] },
                { name: 'Emily Watson', role: 'DevOps Engineer', status: 'Away', skills: ['Docker', 'Kubernetes', 'AWS'] },
              ].map((dev, i) => (
                <div key={i} className="p-4 rounded-xl flex flex-col gap-2" style={{ background: 'var(--surface2)', border: '1px solid var(--border)' }}>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-sm">{dev.name}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${dev.status==='Online'?'bg-emerald-500/20 text-emerald-400':dev.status==='In Meeting'?'bg-amber-500/20 text-amber-400':'bg-gray-500/20 text-gray-400'}`}>
                      ● {dev.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground font-light">{dev.role}</p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {dev.skills.map(s => (
                      <span key={s} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
