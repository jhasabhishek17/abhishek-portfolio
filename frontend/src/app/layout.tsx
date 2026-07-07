import type { Metadata } from 'next'
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'
import { personalInfo } from '@/lib/portfolio-data'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' })

export const metadata: Metadata = {
  title: `${personalInfo.name} | ${personalInfo.title}`,
  description: personalInfo.tagline,
  openGraph: { title: `${personalInfo.name} | Developer Portfolio`, description: personalInfo.tagline, type: 'website' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans bg-bg text-white antialiased`}>
        {children}
        <Toaster position="bottom-right" toastOptions={{ style: { background: '#111118', color: '#e8e8f0', border: '1px solid #2a2a3a' } }} />
      </body>
    </html>
  )
}
