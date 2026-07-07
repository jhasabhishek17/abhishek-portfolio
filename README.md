# 🚀 Abhishek's Developer Portfolio

Full-stack portfolio with **live GitHub sync** — projects, stats, and contribution graph update automatically.

## Tech Stack
| Layer | Tech |
|-------|------|
| Frontend | Next.js 14, TypeScript, Tailwind CSS |
| Backend | Node.js, Express.js |
| GitHub API | REST API v3 (profile, repos, stats) |
| Email | Nodemailer + Gmail SMTP |
| Deploy (FE) | Vercel |
| Deploy (BE) | Railway |

## Quick Start

### 1. Clone & install
```bash
git clone https://github.com/YOUR_USERNAME/abhishek-portfolio.git
cd abhishek-portfolio

# Frontend
cd frontend && npm install && cp .env.example .env.local
# Edit .env.local → set NEXT_PUBLIC_GITHUB_USERNAME

# Backend
cd ../backend && npm install && cp .env.example .env
# Edit .env → set GITHUB_TOKEN, EMAIL_USER, EMAIL_PASS
```

### 2. Run locally
```bash
# Terminal 1 — backend
cd backend && npm run dev      # http://localhost:5000

# Terminal 2 — frontend
cd frontend && npm run dev     # http://localhost:3000
```

## Getting a GitHub Token
1. Go to https://github.com/settings/tokens → Classic
2. Scopes: `read:user`, `public_repo`
3. Paste token into `backend/.env` as `GITHUB_TOKEN`

## Gmail App Password (for contact form)
1. Enable 2FA on Gmail
2. Go to https://myaccount.google.com/apppasswords
3. Generate password → paste into `backend/.env` as `EMAIL_PASS`

## Deploy

### Frontend → Vercel
```bash
cd frontend
npx vercel --prod
# Add env vars in Vercel dashboard
```

### Backend → Railway
1. Push to GitHub
2. railway.app → New Project → from GitHub → select /backend
3. Add env vars in Railway dashboard
4. Copy Railway URL → update NEXT_PUBLIC_BACKEND_URL in Vercel

## Customize
Edit **`frontend/src/lib/portfolio-data.ts`** to update:
- Name, bio, location, email, social links
- Skills, experience, achievements, certifications
- Featured projects

GitHub repos sync **automatically** from your account!
