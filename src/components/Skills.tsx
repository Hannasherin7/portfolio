import { useEffect, useRef } from 'react'
import { skillGroups } from '../data/content'
import { gsap, ScrollTrigger } from '../lib/gsap'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'

const MARQUEE = [
  'PHP', 'Laravel', 'React', 'Node.js', 'Express', 'Java', 'Spring Boot',
  'MySQL', 'MongoDB', 'REST APIs', 'JWT', 'Git', 'Agile',
]

// Skill name → Devicon slug. Items without a brand logo fall back to text only.
const LOGO: Record<string, string> = {
  PHP: 'php',
  Laravel: 'laravel',
  'Node.js': 'nodejs',
  'Express.js': 'express',
  Java: 'java',
  'Spring Boot': 'spring',
  'React.js': 'react',
  HTML5: 'html5',
  CSS3: 'css3',
  Bootstrap: 'bootstrap',
  JavaScript: 'javascript',
  TypeScript: 'typescript',
  MySQL: 'mysql',
  MongoDB: 'mongodb',
  Git: 'git',
  Postman: 'postman',
}

const devicon = (slug: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}/${slug}-original.svg`

/** Small brand logo; hides itself if the CDN icon fails so the pill degrades to text. */
function TechLogo({ name }: { name: string }) {
  const slug = LOGO[name]
  if (!slug) return null
  return (
    <img
      src={devicon(slug)}
      alt=""
      aria-hidden
      loading="lazy"
      className="h-4 w-4 object-contain"
      onError={(e) => {
        ;(e.currentTarget as HTMLImageElement).style.display = 'none'
      }}
    />
  )
}

function Marquee() {
  const track = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = track.current
    if (!el) return
    // velocity-skewed marquee driven by scroll
    const tween = gsap.to(el, { xPercent: -50, ease: 'none', repeat: -1, duration: 22 })
    let dir = 1
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const v = self.getVelocity()
        const target = v < 0 ? -1 : 1
        if (target !== dir) {
          dir = target
          tween.timeScale(dir)
        }
      },
    })
    return () => {
      tween.kill()
      st.kill()
    }
  }, [])

  return (
    <div className="relative flex overflow-hidden border-y border-line py-6 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
      <div ref={track} className="flex shrink-0 gap-8 pr-8">
        {[...MARQUEE, ...MARQUEE].map((s, i) => (
          <span
            key={i}
            className="flex items-center gap-8 font-display text-2xl font-medium text-white/70 sm:text-4xl"
          >
            {s}
            <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <section className="relative py-10">
      <Marquee />

      <div className="container-x mt-24">
        <SectionHeading index="02" eyebrow="Toolkit" title="The stack I ship with." />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.08}>
              <div
                data-cursor="hover"
                className="group h-full rounded-2xl border border-line glass p-6 transition-all duration-500 ease-expo hover:-translate-y-1.5 hover:border-white/20"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="font-display text-xs text-accent2">0{i + 1}</span>
                  <h3 className="font-display text-lg font-semibold">{g.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <span
                      key={it}
                      className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white/[0.03] px-3 py-1.5 text-xs text-white/80 transition-colors group-hover:border-white/15"
                    >
                      <TechLogo name={it} />
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
