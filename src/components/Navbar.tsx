import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Search } from 'lucide-react'
import { navLinks } from '../data/content'
import { scrollTo } from '../hooks/useSmoothScroll'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('#home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean) as Element[]
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  const go = (href: string) => {
    setOpen(false)
    setTimeout(() => scrollTo(href), open ? 500 : 0)
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[100] transition-all duration-500 ease-expo ${
          scrolled ? 'py-3' : 'py-6'
        }`}
      >
        <div className="container-x">
          <div
            className={`flex items-center justify-between rounded-full px-5 transition-all duration-500 ease-expo ${
              scrolled ? 'glass py-2.5' : 'py-1'
            }`}
          >
            <button
              onClick={() => go('#home')}
              data-cursor="hover"
              className="group flex items-center gap-2 font-display text-lg font-semibold tracking-tight"
            >
              <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent2 text-ink">
                <span className="text-sm font-bold">H</span>
              </span>
              <span className="hidden sm:inline">
                Hanna<span className="text-mist">.dev</span>
              </span>
            </button>

            <nav className="hidden items-center gap-1 md:flex">
              {navLinks.map((l) => (
                <button
                  key={l.href}
                  onClick={() => go(l.href)}
                  data-cursor="hover"
                  className="group relative rounded-full px-4 py-2 text-sm text-mist transition-colors hover:text-white"
                >
                  <span className={active === l.href ? 'text-white' : ''}>{l.label}</span>
                  <span
                    className={`absolute inset-x-4 -bottom-0.5 h-px origin-left bg-white transition-transform duration-300 ${
                      active === l.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </button>
              ))}
            </nav>

            <div className="hidden items-center gap-2 md:flex">
              <ThemeToggle />
              <button
                onClick={() => (window as unknown as { __openPalette?: () => void }).__openPalette?.()}
                data-cursor="hover"
                data-cursor-label="Run"
                className="flex items-center gap-2 rounded-full border border-line px-3 py-2 font-mono text-xs text-mist transition-colors hover:text-white"
              >
                <Search size={13} /> <span className="kbd">⌘K</span>
              </button>
              <button
                onClick={() => go('#contact')}
                data-cursor="hover"
                className="flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm text-white transition-colors hover:bg-white hover:text-ink"
              >
                Let's talk <ArrowUpRight size={15} />
              </button>
            </div>

            <div className="flex items-center gap-1 md:hidden">
              <ThemeToggle />
              <button
                onClick={() => setOpen((v) => !v)}
                className="flex h-10 w-10 flex-col items-center justify-center gap-1.5"
                aria-label="Menu"
              >
                <span
                  className={`h-px w-6 bg-white transition-all duration-300 ${open ? 'translate-y-[3.5px] rotate-45' : ''}`}
                />
                <span
                  className={`h-px w-6 bg-white transition-all duration-300 ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[99] flex flex-col justify-center bg-ink/80 backdrop-blur-2xl md:hidden"
          >
            <nav className="container-x flex flex-col gap-2">
              {navLinks.map((l, i) => (
                <motion.button
                  key={l.href}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 40, opacity: 0 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => go(l.href)}
                  className="text-left font-display text-5xl font-semibold tracking-tightest text-white"
                >
                  <span className="text-mist mr-3 text-lg align-middle">0{i + 1}</span>
                  {l.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
