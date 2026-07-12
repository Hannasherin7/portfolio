import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import { education, profile, stats } from '../data/content'
import SectionHeading from './ui/SectionHeading'
import AnimatedText from './ui/AnimatedText'
import Reveal from './ui/Reveal'

function Stat({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  const [shown, setShown] = useState('0')
  const num = parseFloat(value.replace(/[^\d.]/g, ''))
  const suffix = value.replace(/[\d.,]/g, '')

  useEffect(() => {
    if (!inView || Number.isNaN(num)) {
      if (Number.isNaN(num)) setShown(value)
      return
    }
    let raf = 0
    const start = performance.now()
    const dur = 1400
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1)
      const eased = 1 - Math.pow(1 - p, 4)
      setShown(Math.round(num * eased).toString())
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, num, value])

  return (
    <div ref={ref} className="rounded-2xl border border-line glass p-5">
      <div className="font-display text-3xl font-semibold text-white sm:text-4xl">
        {shown}
        <span className="text-accent2">{suffix}</span>
      </div>
      <div className="mt-1 text-xs text-mist">{label}</div>
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="relative py-28 sm:py-36">
      <div className="container-x">
        <SectionHeading index="01" eyebrow="About" title="Turning complex logic into calm, usable products." />

        <div className="mt-14 grid grid-cols-1 gap-14 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <AnimatedText
              as="p"
              by="lines"
              text={profile.intro}
              className="max-w-2xl text-lg leading-relaxed text-white/80"
            />

            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((s) => (
                <Stat key={s.label} value={s.value} label={s.label} />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="eyebrow mb-2 flex items-center gap-2">
              <GraduationCap size={14} /> Education
            </div>
            {education.map((e, i) => (
              <Reveal key={e.degree} delay={i * 0.08}>
                <div
                  data-cursor="hover"
                  className="group rounded-2xl border border-line glass p-6 transition-transform duration-500 ease-expo hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-display text-lg font-semibold leading-snug">{e.degree}</h3>
                    <span className="whitespace-nowrap rounded-full border border-line px-3 py-1 text-xs text-accent2">
                      {e.score}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-mist">{e.school}</div>
                  <div className="mt-1 text-xs text-mist/70">{e.period}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
