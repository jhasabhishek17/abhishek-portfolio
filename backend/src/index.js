require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

const githubRoutes = require('./routes/github')
const contactRoutes = require('./routes/contact')
const leetcodeRoutes = require('./routes/leetcode')
const projectsRoutes = require('./routes/projects')

const app = express()
const PORT = process.env.PORT || 5001

// ── Security & Middleware ─────────────────────────────────────
app.use(helmet())
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    /\.vercel\.app$/,
  ],
  methods: ['GET', 'POST'],
  credentials: true,
}))
app.use(express.json({ limit: '10kb' }))

// ── Routes ────────────────────────────────────────────────────
app.use('/api/github', githubRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/leetcode', leetcodeRoutes)
app.use('/api/projects', projectsRoutes)

// ── Health check ──────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// ── 404 handler ───────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// ── Error handler ─────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`🚀 Portfolio backend running on http://localhost:${PORT}`)
  console.log(`   GitHub username: ${process.env.GITHUB_USERNAME || '(not set)'}`)
})
