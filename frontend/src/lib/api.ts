import axios from 'axios'
const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000'
const GH_USER = process.env.NEXT_PUBLIC_GITHUB_USERNAME || ''
export async function getGitHubProfile() {
  try { return (await axios.get(`${BACKEND}/api/github/profile`)).data } catch { return null }
}
export async function getGitHubRepos() {
  try { return (await axios.get(`${BACKEND}/api/github/repos`)).data } catch { return [] }
}
export async function getGitHubStats() {
  try { return (await axios.get(`${BACKEND}/api/github/stats`)).data } catch { return null }
}
export interface ContactFormData { name: string; email: string; subject: string; message: string }
export async function sendContactForm(data: ContactFormData) {
  return (await axios.post(`${BACKEND}/api/contact`, data)).data
}
export function getContributionGraphUrl() { return `https://ghchart.rshah.org/${GH_USER}` }
