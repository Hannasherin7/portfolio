import { useEffect, useRef, useState } from 'react'
import SplitType from 'split-type'
import { ArrowDown, Sparkles, Command, Download } from 'lucide-react'
import { Github, Linkedin } from './ui/BrandIcons'
import { gsap } from '../lib/gsap'
import { profile } from '../data/content'
import MagneticButton from './ui/MagneticButton'
import Scramble from './ui/Scramble'
import { scrollTo } from '../hooks/useSmoothScroll'

const ROLES = profile.roles

export default function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLDivElement>(null)
  const title = useRef<HTMLHeadingElement>(null)
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % ROLES.length), 2600)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (!ready || !title.current) return
    const split = new SplitType(title.current, { types: 'chars', tagName: 'span' })
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      tl.from('[data-hero-eyebrow]', { y: 24, opacity: 0, duration: 0.8 })
        .from(split.chars, { yPercent: 130, opacity: 0, duration: 1.05, stagger: 0.026 }, '-=0.4')
        .from('[data-hero-sub]', { y: 26, opacity: 0, duration: 0.8 }, '-=0.6')
        .from('[data-hero-cta]', { y: 26, opacity: 0, duration: 0.8, stagger: 0.08 }, '-=0.6')
        .from('[data-hero-win]', { opacity: 0, y: 40, duration: 1, stagger: 0.12 }, '-=0.7')
        .from('[data-hero-scroll]', { opacity: 0, y: -10, duration: 0.7 }, '-=0.4')
    }, root)
    return () => {
      ctx.revert()
      split.revert()
    }
  }, [ready])

  useEffect(() => {
    const el = root.current
    if (!el) return
    gsap.to('[data-hero-parallax]', {
      yPercent: 22,
      ease: 'none',
      scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
    })
    gsap.to('[data-hero-fade]', {
      opacity: 0,
      ease: 'none',
      scrollTrigger: { trigger: el, start: 'top top', end: 'center top', scrub: true },
    })
  }, [])

  return (
    <section id="home" ref={root} className="relative flex min-h-[100svh] items-center overflow-hidden pt-28">
      <div className="container-x grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-[1.35fr_0.95fr]">
        {/* LEFT */}
        <div data-hero-parallax>
          <div
            data-hero-eyebrow
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3 py-1.5 font-mono text-[11px] text-mist"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent2 animate-pulse" />
            <span className="text-accent2">●</span> available_for_work · {profile.location}
          </div>

          <h1
            ref={title}
            className="glitch font-display text-[13.5vw] font-semibold leading-[0.9] tracking-tightest sm:text-[9vw] lg:text-[7.4rem]"
            data-cursor="hover"
          >
            Full&nbsp;Stack<br />
            <span className="text-gradient">Developer.</span>
          </h1>

          <div data-hero-sub className="mt-7 max-w-xl">
            <div className="flex items-center gap-2 font-mono text-sm text-white/90">
              <span className="text-accent">~/hanna</span>
              <span className="text-mist">%</span>
              <span className="text-mist">whoami →</span>
              <Scramble
                key={roleIndex}
                text={ROLES[roleIndex]}
                onView={false}
                speed={22}
                className="text-accent2"
              />
            </div>
            <p className="mt-4 leading-relaxed text-mist">{profile.tagline}</p>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <span data-hero-cta>
              <MagneticButton onClick={() => scrollTo('#projects')} cursorLabel="Explore">
                View my work <Sparkles size={16} />
              </MagneticButton>
            </span>
            <span data-hero-cta>
              <MagneticButton
                href={profile.resumes[0].file}
                target="_blank"
                variant="ghost"
                cursorLabel="Résumé"
              >
                <Download size={15} /> Résumé
              </MagneticButton>
            </span>
            <span data-hero-cta>
              <MagneticButton
                onClick={() => (window as unknown as { __openPalette?: () => void }).__openPalette?.()}
                variant="ghost"
                cursorLabel="Run"
              >
                <Command size={15} /> Command menu
                <span className="ml-1 kbd">⌘K</span>
              </MagneticButton>
            </span>
          </div>

          <div data-hero-cta className="mt-8 flex items-center gap-5 font-mono text-xs text-mist">
            <a href={profile.socials.github} target="_blank" rel="noreferrer" data-cursor="hover" className="flex items-center gap-2 hover:text-white">
              <Github size={14} /> github
            </a>
            <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" data-cursor="hover" className="flex items-center gap-2 hover:text-white">
              <Linkedin size={14} /> linkedin
            </a>
            <a href={`mailto:${profile.email}`} data-cursor="hover" className="hover:text-white">
              ✉ email
            </a>
          </div>
        </div>

        {/* RIGHT — stacked "app windows" */}
        <div className="relative mx-auto w-full max-w-sm lg:mx-0">
          {/* portrait window */}
          <div
            data-hero-win
            data-cursor="hover"
            className="group relative z-10 overflow-hidden rounded-2xl border border-line glass"
          >
            <div className="flex items-center gap-3 border-b border-line px-4 py-2.5">
              <span className="win-dots" />
              <span className="ml-2 font-mono text-[11px] text-mist">hanna_sherin.jpg</span>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-accent/25 via-surface to-accent2/20">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-7xl font-bold text-white/15">HS</span>
              </div>
              <img
                src="/profile.jpg"
                alt={profile.name}
                onError={(e) => ((e.currentTarget as HTMLImageElement).style.opacity = '0')}
                className="absolute inset-0 h-full w-full object-cover object-center grayscale transition-all duration-700 ease-expo group-hover:scale-105 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_120%,rgba(124,92,255,0.35),transparent)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
              <div className="absolute bottom-3 left-4 font-mono text-[11px] text-white/80">
                <span className="text-accent2">●</span> {profile.name} · Kerala, IN
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* scroll indicator */}
      <button
        data-hero-scroll
        data-hero-fade
        onClick={() => scrollTo('#about')}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-mist"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">scroll</span>
        <span className="flex h-9 w-5 justify-center rounded-full border border-line pt-1.5">
          <span className="h-1.5 w-1 rounded-full bg-white animate-[floaty_1.6s_ease-in-out_infinite]" />
        </span>
        <ArrowDown size={14} className="animate-bounce" />
      </button>
    </section>
  )
}
