import { useState } from 'react'
import { GraduationCap } from 'lucide-react'
import { education, profile } from '../data/content'
import SectionHeading from './ui/SectionHeading'
import AnimatedText from './ui/AnimatedText'
import Reveal from './ui/Reveal'

/** University logo tile — shows the image if it loads, else an acronym badge. */
function SchoolLogo({ src, badge, name }: { src?: string; badge: string; name: string }) {
  const [failed, setFailed] = useState(false)
  const showImg = src && !failed
  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-line bg-white/[0.04]">
      {showImg ? (
        <img
          src={src}
          alt={`${name} logo`}
          loading="lazy"
          className="h-full w-full object-contain p-1.5"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="font-display text-[11px] font-bold tracking-tight text-accent2">
          {badge}
        </span>
      )}
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
                  <div className="flex items-start gap-4">
                    <SchoolLogo src={e.logo} badge={e.badge} name={e.university} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="font-display text-lg font-semibold leading-snug">{e.degree}</h3>
                        <span className="whitespace-nowrap rounded-full border border-line px-3 py-1 text-xs text-accent2">
                          {e.score}
                        </span>
                      </div>
                      <div className="mt-2 text-sm text-mist">{e.school}</div>
                      <div className="mt-0.5 text-xs text-mist/70">{e.university}</div>
                      <div className="mt-1 text-xs text-mist/70">{e.period}</div>
                    </div>
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
