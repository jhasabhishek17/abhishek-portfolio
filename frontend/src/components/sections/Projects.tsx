'use client'
import { useEffect, useState } from 'react'
import { ExternalLink, Github, Star, GitFork, Loader2 } from 'lucide-react'
import { featuredProjects } from '@/lib/portfolio-data'
import { getGitHubRepos } from '@/lib/api'

interface Repo { id:number; name:string; description:string; html_url:string; homepage:string; stargazers_count:number; forks_count:number; language:string; topics:string[] }
const langColors: Record<string,string> = { TypeScript:'#3178c6',JavaScript:'#f7df1e',Python:'#3776ab','C++':'#00599c',Java:'#b07219',Go:'#00add8',Rust:'#dea584',HTML:'#e34c26',CSS:'#563d7c' }

export default function Projects() {
  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<'featured'|'github'>('featured')

  useEffect(() => { getGitHubRepos().then(d => { setRepos(d||[]); setLoading(false) }) }, [])

  return (
    <section id="projects" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <p className="font-mono text-xs uppercase tracking-widest mb-2" style={{color:'var(--accent2)'}}><span style={{color:'var(--accent)'}}>// </span>what I've built</p>
        <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-4">Projects</h2>
        <p className="mb-10 font-light" style={{color:'var(--muted)'}}>Featured work and live GitHub repositories.</p>
        <div className="inline-flex gap-1 p-1 rounded-xl mb-10" style={{background:'var(--surface)',border:'1px solid var(--border)'}}>
          {(['featured','github'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} className="px-5 py-2 rounded-lg text-sm font-medium transition-all capitalize"
              style={{background:tab===t?'var(--accent)':'transparent',color:tab===t?'#fff':'var(--muted)'}}>
              {t==='github'?'⭐ GitHub Repos':'🏅 Featured'}
            </button>
          ))}
        </div>
        {tab==='featured' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredProjects.map((p,i) => (
              <div key={i} className="rounded-2xl p-6 flex flex-col gap-3 transition-all group relative overflow-hidden"
                style={{background:'var(--surface)',border:p.featured?'1px solid rgba(124,58,237,0.4)':'1px solid var(--border)',gridColumn:p.featured?'span 2':undefined}}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor='var(--accent)';(e.currentTarget as HTMLElement).style.transform='translateY(-3px)'}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor=p.featured?'rgba(124,58,237,0.4)':'var(--border)';(e.currentTarget as HTMLElement).style.transform='translateY(0)'}}>
                <div className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{background:'linear-gradient(90deg,var(--accent),var(--accent2))'}} />
                {p.featured && <span className="inline-block px-2 py-0.5 rounded text-xs font-mono w-fit" style={{background:'rgba(124,58,237,0.15)',color:'#a78bfa',border:'1px solid rgba(124,58,237,0.3)'}}>⭐ Featured</span>}
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <p className="text-sm font-light flex-1" style={{color:'var(--muted)'}}>{p.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tech.map(t=><span key={t} className="text-xs font-mono px-2 py-0.5 rounded" style={{background:'rgba(6,182,212,0.1)',color:'#67e8f9',border:'1px solid rgba(6,182,212,0.2)'}}>{t}</span>)}
                </div>
                <div className="flex gap-4 pt-1">
                  {p.liveUrl&&<a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs font-mono transition-colors" style={{color:'var(--muted)'}} onMouseEnter={e=>(e.currentTarget.style.color='var(--accent2)')} onMouseLeave={e=>(e.currentTarget.style.color='var(--muted)')}><ExternalLink size={13}/> Live</a>}
                  {p.githubUrl&&<a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs font-mono transition-colors" style={{color:'var(--muted)'}} onMouseEnter={e=>(e.currentTarget.style.color='var(--accent2)')} onMouseLeave={e=>(e.currentTarget.style.color='var(--muted)')}><Github size={13}/> Source</a>}
                </div>
              </div>
            ))}
          </div>
        )}
        {tab==='github' && (
          loading
            ? <div className="flex justify-center items-center py-16"><Loader2 size={24} className="animate-spin" style={{color:'var(--accent)'}}/><span className="ml-3 font-mono text-sm" style={{color:'var(--muted)'}}>Fetching GitHub repos...</span></div>
            : repos.length===0
              ? <p className="text-center py-12 font-mono text-sm" style={{color:'var(--muted)'}}>No repos found. Check NEXT_PUBLIC_GITHUB_USERNAME in .env.local</p>
              : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {repos.map(r=>(
                    <a key={r.id} href={r.html_url} target="_blank" rel="noopener noreferrer" className="block rounded-xl p-5 transition-all"
                      style={{background:'var(--surface)',border:'1px solid var(--border)'}}
                      onMouseEnter={e=>{const el=e.currentTarget as HTMLElement;el.style.borderColor='var(--accent)';el.style.transform='translateY(-2px)'}}
                      onMouseLeave={e=>{const el=e.currentTarget as HTMLElement;el.style.borderColor='var(--border)';el.style.transform='translateY(0)'}}>
                      <div className="flex justify-between items-start mb-2"><span className="font-semibold text-sm truncate pr-2">{r.name}</span><Github size={14} style={{color:'var(--muted)',flexShrink:0}}/></div>
                      <p className="text-xs mb-3 line-clamp-2 font-light" style={{color:'var(--muted)'}}>{r.description||'No description'}</p>
                      <div className="flex items-center gap-3 text-xs font-mono" style={{color:'var(--muted)'}}>
                        {r.language&&<span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{background:langColors[r.language]||'#888'}}/>{r.language}</span>}
                        <span className="flex items-center gap-1"><Star size={11}/>{r.stargazers_count}</span>
                        <span className="flex items-center gap-1"><GitFork size={11}/>{r.forks_count}</span>
                      </div>
                    </a>
                  ))}
                </div>
        )}
      </div>
    </section>
  )
}
