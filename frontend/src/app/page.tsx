import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects'
import Experience from '@/components/sections/Experience'
import GitHubActivity from '@/components/sections/GitHubActivity'
import Achievements from '@/components/sections/Achievements'
import Certifications from '@/components/sections/Certifications'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <hr className="section-divider" />
      <About />
      <hr className="section-divider" />
      <Skills />
      <hr className="section-divider" />
      <Projects />
      <hr className="section-divider" />
      <Experience />
      <hr className="section-divider" />
      <GitHubActivity />
      <hr className="section-divider" />
      <Achievements />
      <hr className="section-divider" />
      <Certifications />
      <hr className="section-divider" />
      <Contact />
      <Footer />
    </main>
  )
}
