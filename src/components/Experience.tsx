import { useEffect, useRef } from 'react'
import { experience } from '../data/content'
import { gsap, ScrollTrigger } from '../lib/gsap'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'

export default function Experience() {
  const wrap = useRef<HTMLDivElement>(null)
  const line = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = wrap.current
    if (!el || !line.current) return
    const st = gsap.fromTo(
      line.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        transformOrigin: 'top',
        scrollTrigger: {
          trigger: el,
          start: 'top 65%',
          end: 'bottom 75%',
          scrub: true,
        },
      },
    )
    return () => {
      st.scrollTrigger?.kill()
      st.kill()
      ScrollTrigger.refresh()
    }
  }, [])

  return (
    <section id="work" className="relative py-28 sm:py-36">
      <div className="container-x">
        <SectionHeading index="03" eyebrow="Experience" title="Where I've been building." />

        <div ref={wrap} className="relative mt-16 pl-8 sm:pl-14">
          {/* rail */}
          <div className="absolute left-1 top-2 h-full w-px bg-line sm:left-2">
            <div ref={line} className="h-full w-full origin-top bg-gradient-to-b from-accent via-accent2 to-transparent" />
          </div>

          <div className="space-y-14">
            {experience.map((job, i) => (
              <Reveal key={job.company} delay={i * 0.05}>
                <div className="relative">
                  <span className="absolute -left-[1.85rem] top-2 flex h-4 w-4 items-center justify-center sm:-left-[3.35rem]">
                    <span className="absolute h-4 w-4 rounded-full bg-accent/30 animate-ping" />
                    <span className="h-2.5 w-2.5 rounded-full bg-accent2 ring-4 ring-ink" />
                  </span>

                  <div
                    data-cursor="hover"
                    className="group rounded-3xl border border-line glass p-7 transition-all duration-500 ease-expo hover:-translate-y-1 hover:border-white/20 sm:p-9"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <div>
                        <h3 className="font-display text-2xl font-semibold">{job.role}</h3>
                        <div className="mt-1 text-sm text-accent2">
                          {job.company} · <span className="text-mist">{job.place}</span>
                        </div>
                      </div>
                      <span className="rounded-full border border-line px-3 py-1 text-xs text-mist">
                        {job.period}
                      </span>
                    </div>

                    <ul className="mt-6 space-y-3">
                      {job.points.map((p) => (
                        <li key={p} className="flex gap-3 text-sm leading-relaxed text-white/75">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
