/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        void: '#050507',
        obsidian: '#0a0a0e',
        graphite: '#13141a',
        gunmetal: '#1e2029',
        steel: '#363946',
        silver: {
          100: '#ffffff',
          200: '#f1f2f5',
          300: '#e2e4ea',
          400: '#c5c8d4',
          500: '#9fa3b4',
          600: '#75788a',
        },
        monochrome: {
          subtle: 'rgba(255, 255, 255, 0.06)',
          hover: 'rgba(255, 255, 255, 0.14)',
          active: 'rgba(255, 255, 255, 0.28)',
          highlight: 'rgba(255, 255, 255, 0.85)',
        }
      },
      fontFamily: {
        display: ['Space Grotesk', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      letterSpacing: {
        'tightest': '-0.045em',
        'tighter': '-0.03em',
        'tight': '-0.015em',
        'widest-mono': '0.18em',
      },
      animation: {
        'pulse-subtle': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'sheen': 'sheen 8s ease-in-out infinite',
      },
      keyframes: {
        sheen: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.85' },
        }
      }
    },
  },
  plugins: [],
}
