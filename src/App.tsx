import { useEffect, useState } from 'react'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { ScrollTrigger } from './lib/gsap'
import Loader from './components/Loader'
import Cursor from './components/Cursor'
import Background from './components/Background'
import CommandPalette from './components/CommandPalette'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Certifications from './components/Certifications'
import Contact from './components/Contact'

export default function App() {
  const [loading, setLoading] = useState(true)
  useSmoothScroll()

  // lock scroll while the loader is on screen
  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : ''
    // @ts-expect-error global lenis
    const lenis = window.__lenis
    if (lenis) loading ? lenis.stop() : lenis.start()
  }, [loading])

  // recalc ScrollTrigger once everything (fonts/images) settles
  useEffect(() => {
    if (loading) return
    const id = setTimeout(() => ScrollTrigger.refresh(), 300)
    return () => clearTimeout(id)
  }, [loading])

  return (
    <>
      <Cursor />
      <Background />
      <CommandPalette />
      {loading && <Loader onDone={() => setLoading(false)} />}

      <Navbar />
      <main className="relative z-10">
        <Hero ready={!loading} />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <div className="scanlines" aria-hidden />
    </>
  )
}
