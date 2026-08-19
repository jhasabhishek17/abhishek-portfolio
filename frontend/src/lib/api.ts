import axios from 'axios'

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001'
const GH_USER = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'jhasabhishek17'

export async function getGitHubProfile() {
  try {
    const res = await axios.get(`${BACKEND}/api/github/profile`, { timeout: 4000 })
    return res.data
  } catch {
    if (!GH_USER || GH_USER === 'your-github-username') return null
    try {
      const res = await axios.get(`https://api.github.com/users/${GH_USER}`)
      return {
        login: res.data.login,
        name: res.data.name,
        bio: res.data.bio,
        avatar_url: res.data.avatar_url,
        html_url: res.data.html_url,
        public_repos: res.data.public_repos,
        followers: res.data.followers,
        following: res.data.following,
        location: res.data.location,
        blog: res.data.blog,
        company: res.data.company,
        created_at: res.data.created_at,
      }
    } catch {
      return null
    }
  }
}

export async function getGitHubRepos() {
  try {
    const res = await axios.get(`${BACKEND}/api/github/repos`, { timeout: 4000 })
    return res.data
  } catch {
    if (!GH_USER || GH_USER === 'your-github-username') return []
    try {
      const res = await axios.get(`https://api.github.com/users/${GH_USER}/repos`, {
        params: { sort: 'updated', per_page: 30, type: 'owner' },
      })
      return res.data
        .filter((r: any) => !r.fork)
        .map((r: any) => ({
          id: r.id,
          name: r.name,
          description: r.description,
          html_url: r.html_url,
          homepage: r.homepage,
          stargazers_count: r.stargazers_count,
          forks_count: r.forks_count,
          language: r.language,
          topics: r.topics,
          updated_at: r.updated_at,
        }))
        .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
    } catch {
      return []
    }
  }
}

export async function getGitHubStats() {
  try {
    const res = await axios.get(`${BACKEND}/api/github/stats`, { timeout: 4000 })
    return res.data
  } catch {
    const repos = await getGitHubRepos()
    if (!repos || repos.length === 0) return null
    const totalStars = repos.reduce((acc: number, r: any) => acc + (r.stargazers_count || 0), 0)
    const totalForks = repos.reduce((acc: number, r: any) => acc + (r.forks_count || 0), 0)
    return { totalStars, totalForks, totalCommits: 50, repoCount: repos.length }
  }
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export async function sendContactForm(data: ContactFormData) {
  return (await axios.post(`${BACKEND}/api/contact`, data)).data
}

export function getContributionGraphUrl() {
  return `https://ghchart.rshah.org/${GH_USER}`
}

