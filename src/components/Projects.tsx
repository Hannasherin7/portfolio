import { useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { projects, profile } from '../data/content'
import { gsap, ScrollTrigger } from '../lib/gsap'
import AnimatedText from './ui/AnimatedText'

type Project = (typeof projects)[number]

function ProjectCard({ p, index }: { p: Project; index: number }) {
  const card = useRef<HTMLDivElement>(null)
  const shine = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent) => {
    const el = card.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    gsap.to(el, {
      rotateY: (px - 0.5) * 12,
      rotateX: (0.5 - py) * 12,
      duration: 0.5,
      ease: 'power3.out',
      transformPerspective: 900,
    })
    if (shine.current) {
      gsap.to(shine.current, {
        opacity: 1,
        background: `radial-gradient(320px circle at ${px * 100}% ${py * 100}%, ${p.accent}33, transparent 60%)`,
        duration: 0.3,
      })
    }
  }

  const onLeave = () => {
    if (card.current)
      gsap.to(card.current, { rotateX: 0, rotateY: 0, duration: 0.7, ease: 'elastic.out(1,0.5)' })
    if (shine.current) gsap.to(shine.current, { opacity: 0, duration: 0.4 })
  }

  return (
    <article
      ref={card}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-cursor="hover"
      data-cursor-label="View"
      className="group relative flex h-[62vh] max-h-[560px] w-[86vw] shrink-0 flex-col justify-between overflow-hidden rounded-[2rem] border border-line glass p-8 [transform-style:preserve-3d] sm:w-[440px] sm:p-10"
    >
      {/* animated border glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ boxShadow: `inset 0 0 0 1px ${p.accent}55, 0 30px 80px -40px ${p.accent}` }}
      />
      <div ref={shine} className="pointer-events-none absolute inset-0 opacity-0" />

      {/* preview visual as an app window (swap for real screenshots in /public) */}
      <div className="relative mb-6 overflow-hidden rounded-2xl border border-line [transform:translateZ(40px)]">
        <div className="flex items-center gap-2 border-b border-line bg-white/[0.03] px-3 py-2">
          <span className="win-dots" />
          <span className="ml-2 font-mono text-[10px] text-mist">
            {p.title.toLowerCase().replace(/\s+/g, '-')}.app
          </span>
        </div>
        <div className="relative aspect-[16/9] overflow-hidden">
          <div
            className="absolute inset-0 transition-transform duration-700 ease-expo group-hover:scale-110"
            style={{
              background: `radial-gradient(120% 120% at 20% 10%, ${p.accent}55, transparent 50%), radial-gradient(120% 120% at 90% 90%, ${p.accent}33, #0a0a0f 60%)`,
            }}
          />
          <div className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:28px_28px]" />
          <span className="absolute left-4 top-3 font-display text-6xl font-bold text-white/10">
            0{index + 1}
          </span>
          <span
            className="absolute bottom-3 right-3 rounded-full px-2.5 py-0.5 font-mono text-[11px] font-medium text-ink"
            style={{ background: p.accent }}
          >
            {p.year}
          </span>
        </div>
      </div>

      <div className="[transform:translateZ(25px)]">
        <div className="mb-3 flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <span key={s} className="rounded-full border border-line px-2.5 py-1 text-[11px] text-white/70">
              {s}
            </span>
          ))}
        </div>
        <h3 className="font-display text-2xl font-semibold sm:text-3xl">{p.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-mist">{p.desc}</p>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-xs uppercase tracking-[0.2em] text-white/50">{p.tag}</span>
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-sm font-medium text-white"
          >
            <span className="relative overflow-hidden">
              <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                View code
              </span>
              <span className="absolute left-0 top-full inline-block transition-transform duration-300 group-hover:-translate-y-full">
                View code
              </span>
            </span>
            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  const section = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sec = section.current
    const tr = track.current
    if (!sec || !tr) return
    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      const distance = tr.scrollWidth - window.innerWidth + 120
      const tween = gsap.to(tr, {
        x: -distance,
        ease: 'none',
        scrollTrigger: {
          trigger: sec,
          start: 'top top',
          end: () => `+=${distance}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
      return () => {
        tween.scrollTrigger?.kill()
        tween.kill()
      }
    })

    return () => {
      mm.revert()
      ScrollTrigger.refresh()
    }
  }, [])

  return (
    <section id="projects" ref={section} className="relative overflow-hidden py-24 md:py-0">
      <div className="md:flex md:h-[100svh] md:flex-col md:justify-center">
        <div className="container-x mb-12 md:mb-10">
          <div className="mb-5 flex items-center gap-4">
            <span className="font-display text-sm text-accent2">04</span>
            <span className="h-px w-10 bg-line" />
            <span className="eyebrow">Selected work</span>
          </div>
          <AnimatedText
            as="h2"
            text="Things I've designed & shipped."
            by="words"
            className="max-w-3xl font-display text-4xl font-semibold tracking-tightest sm:text-5xl lg:text-6xl"
          />
        </div>

        <div
          ref={track}
          className="flex flex-col gap-6 px-6 md:flex-row md:gap-8 md:px-[max(3rem,calc((100vw-1240px)/2+3rem))]"
        >
          {projects.map((p, i) => (
            <ProjectCard key={p.title} p={p} index={i} />
          ))}

          <div className="flex h-[62vh] max-h-[560px] w-[86vw] shrink-0 flex-col items-center justify-center gap-4 rounded-[2rem] border border-dashed border-line text-center sm:w-[360px]">
            <p className="font-display text-2xl font-semibold">More on GitHub</p>
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              className="flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-ink"
            >
              Browse repos <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
