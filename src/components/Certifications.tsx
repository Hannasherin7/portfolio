import { BadgeCheck } from 'lucide-react'
import { certifications } from '../data/content'
import SectionHeading from './ui/SectionHeading'
import Reveal from './ui/Reveal'

export default function Certifications() {
  return (
    <section className="relative py-28 sm:py-32">
      <div className="container-x">
        <SectionHeading index="05" eyebrow="Credentials" title="Certified & always learning." />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {certifications.map((c, i) => (
            <Reveal key={c} delay={i * 0.06}>
              <div
                data-cursor="hover"
                className="group flex items-center gap-4 rounded-2xl border border-line glass p-5 transition-all duration-500 ease-expo hover:-translate-y-1 hover:border-white/20"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent2 transition-transform duration-500 group-hover:rotate-12">
                  <BadgeCheck size={18} />
                </span>
                <span className="text-sm text-white/85">{c}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
