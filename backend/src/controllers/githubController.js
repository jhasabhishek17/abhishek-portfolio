const axios = require('axios')

const GITHUB_USERNAME = process.env.GITHUB_USERNAME
const GITHUB_TOKEN = process.env.GITHUB_TOKEN

const githubAPI = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: 'application/vnd.github.v3+json',
    'X-GitHub-Api-Version': '2022-11-28',
  },
})

// Simple in-memory cache (resets on server restart)
const cache = new Map()
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

function getCache(key) {
  const entry = cache.get(key)
  if (!entry) return null
  if (Date.now() - entry.ts > CACHE_TTL) { cache.delete(key); return null }
  return entry.data
}
function setCache(key, data) {
  cache.set(key, { data, ts: Date.now() })
}

// GET /api/github/profile
exports.getProfile = async (req, res) => {
  try {
    const cached = getCache('profile')
    if (cached) return res.json(cached)

    const { data } = await githubAPI.get(`/users/${GITHUB_USERNAME}`)
    const profile = {
      login: data.login,
      name: data.name,
      bio: data.bio,
      avatar_url: data.avatar_url,
      html_url: data.html_url,
      public_repos: data.public_repos,
      followers: data.followers,
      following: data.following,
      location: data.location,
      blog: data.blog,
      company: data.company,
      created_at: data.created_at,
    }
    setCache('profile', profile)
    res.json(profile)
  } catch (err) {
    console.error('GitHub profile error:', err.message)
    res.status(502).json({ error: 'Failed to fetch GitHub profile' })
  }
}

// GET /api/github/repos
exports.getRepos = async (req, res) => {
  try {
    const cached = getCache('repos')
    if (cached) return res.json(cached)

    const { data } = await githubAPI.get(`/users/${GITHUB_USERNAME}/repos`, {
      params: {
        sort: 'updated',
        per_page: 30,
        type: 'owner',
      },
    })

    const repos = data
      .filter(r => !r.fork)
      .map(r => ({
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
      .sort((a, b) => b.stargazers_count - a.stargazers_count)

    setCache('repos', repos)
    res.json(repos)
  } catch (err) {
    console.error('GitHub repos error:', err.message)
    res.status(502).json({ error: 'Failed to fetch GitHub repos' })
  }
}

// GET /api/github/stats  — aggregated star/fork/commit counts
exports.getStats = async (req, res) => {
  try {
    const cached = getCache('stats')
    if (cached) return res.json(cached)

    const { data: repos } = await githubAPI.get(`/users/${GITHUB_USERNAME}/repos`, {
      params: { per_page: 100, type: 'owner' },
    })

    const totalStars = repos.reduce((acc, r) => acc + r.stargazers_count, 0)
    const totalForks = repos.reduce((acc, r) => acc + r.forks_count, 0)

    // Commit count via search API (approximate)
    let totalCommits = 0
    try {
      const { data: searchData } = await githubAPI.get('/search/commits', {
        params: { q: `author:${GITHUB_USERNAME}`, per_page: 1 },
        headers: { Accept: 'application/vnd.github.cloak-preview+json' },
      })
      totalCommits = searchData.total_count || 0
    } catch {
      // search API might be rate-limited — skip silently
    }

    const stats = { totalStars, totalForks, totalCommits, repoCount: repos.filter(r => !r.fork).length }
    setCache('stats', stats)
    res.json(stats)
  } catch (err) {
    console.error('GitHub stats error:', err.message)
    res.status(502).json({ error: 'Failed to fetch GitHub stats' })
  }
}
