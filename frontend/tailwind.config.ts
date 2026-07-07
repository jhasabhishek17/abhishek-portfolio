import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        bg: '#0a0a0f', surface: '#111118', surface2: '#16161f',
        border: '#2a2a3a', accent: '#7c3aed', accent2: '#06b6d4',
        accent3: '#10b981', muted: '#7070a0',
      },
    },
  },
  plugins: [],
}
export default config
