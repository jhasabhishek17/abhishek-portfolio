'use client'
import { useEffect, useState } from 'react'
import { Loader2, GitCommit, Star, Users, BookOpen } from 'lucide-react'
import { getGitHubProfile, getGitHubStats, getContributionGraphUrl } from '@/lib/api'

interface GitHubProfile {
  login: string
  name: string
  bio: string
  avatar_url: string
  public_repos: number
  followers: number
  following: number
  html_url: string
}

interface GitHubStats {
  totalStars: number
  totalCommits: number
  totalForks: number
}

export default function GitHubActivity() {
  const [profile, setProfile] = useState<GitHubProfile | null>(null)
  const [ghStats, setGhStats] = useState<GitHubStats | null>(null)
  const [loading, setLoading] = useState(true)
  const graphUrl = getContributionGraphUrl()
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || ''

  useEffect(() => {
    Promise.all([getGitHubProfile(), getGitHubStats()]).then(([p, s]) => {
      setProfile(p)
      setGhStats(s)
      setLoading(false)
    })
  }, [])

  const statCards = [
    { label: 'Public Repos', value: profile?.public_repos ?? '—', icon: <BookOpen size={16} /> },
    { label: 'Total Stars', value: ghStats?.totalStars ?? '—', icon: <Star size={16} /> },
    { label: 'Followers', value: profile?.followers ?? '—', icon: <Users size={16} /> },
    { label: 'Total Commits', value: ghStats?.totalCommits ? `${ghStats.totalCommits}+` : '—', icon: <GitCommit size={16} /> },
  ]

  return (
    <section id="github" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <p className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: 'var(--accent2)' }}>
          <span style={{ color: 'var(--accent)' }}>// </span>open source
        </p>
        <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-4">GitHub Activity</h2>
        <p className="mb-10 font-light" style={{ color: 'var(--muted)' }}>
          Live stats and contribution graph synced from GitHub.
        </p>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 size={24} className="animate-spin" style={{ color: 'var(--accent)' }} />
            <span className="ml-3 font-mono text-sm" style={{ color: 'var(--muted)' }}>Syncing GitHub data...</span>
          </div>
        ) : (
          <>
            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {statCards.map(s => (
                <div
                  key={s.label}
                  className="rounded-xl p-5 flex flex-col gap-2 transition-all duration-200"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--accent)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                >
                  <span style={{ color: 'var(--accent2)' }}>{s.icon}</span>
                  <span className="text-2xl font-bold font-mono">{s.value}</span>
                  <span className="text-xs font-mono uppercase tracking-wider" style={{ color: 'var(--muted)' }}>{s.label}</span>
                </div>
              ))}
            </div>

            {/* Contribution Graph */}
            {username && (
              <div
                className="rounded-2xl p-6 overflow-hidden"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
              >
                <p className="font-mono text-xs mb-4" style={{ color: 'var(--muted)' }}>
                  $ git log --all --oneline | wc -l
                </p>
                <div className="overflow-x-auto">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://ghchart.rshah.org/7c3aed/${username}`}
                    alt="GitHub Contribution Graph"
                    className="w-full min-w-[600px]"
                    style={{ filter: 'brightness(1.1)' }}
                  />
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-mono text-xs" style={{ color: 'var(--muted)' }}>
                    @{profile?.login || username} on GitHub
                  </span>
                  <a
                    href={profile?.html_url || `https://github.com/${username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs transition-colors"
                    style={{ color: 'var(--accent2)' }}
                  >
                    View profile ↗
                  </a>
                </div>
              </div>
            )}

            {/* GitHub Stats Cards via github-readme-stats */}
            {username && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div
                  className="rounded-xl p-4 overflow-hidden"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=transparent&title_color=7c3aed&icon_color=06b6d4&text_color=e8e8f0&border_color=2a2a3a&hide_border=false&count_private=true`}
                    alt="GitHub Stats"
                    className="w-full"
                  />
                </div>
                <div
                  className="rounded-xl p-4 overflow-hidden"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=transparent&stroke=2a2a3a&ring=7c3aed&fire=06b6d4&currStreakLabel=e8e8f0&sideLabels=e8e8f0&dates=7070a0&border=2a2a3a&background=111118`}
                    alt="GitHub Streak"
                    className="w-full"
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
