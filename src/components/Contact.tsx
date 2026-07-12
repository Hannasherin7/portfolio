import { ArrowUp, Mail, Phone, Globe } from 'lucide-react'
import { Github, Linkedin } from './ui/BrandIcons'
import { profile } from '../data/content'
import AnimatedText from './ui/AnimatedText'
import MagneticButton from './ui/MagneticButton'
import Reveal from './ui/Reveal'
import { scrollTo } from '../hooks/useSmoothScroll'

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden pt-28 sm:pt-36">
      {/* radial lighting */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%] bg-[radial-gradient(80%_100%_at_50%_100%,rgba(124,92,255,0.25),transparent)]" />

      <div className="container-x relative">
        <div className="mx-auto max-w-4xl text-center">
          <div className="eyebrow mx-auto mb-6 w-fit">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent2 animate-pulse" /> Open to opportunities
          </div>
          <AnimatedText
            as="h2"
            by="chars"
            stagger={0.02}
            text="Let's build something great."
            className="mx-auto font-display text-5xl font-semibold leading-[0.98] tracking-tightest sm:text-7xl lg:text-8xl"
          />
          <Reveal delay={0.2}>
            <p className="mx-auto mt-7 max-w-xl text-lg text-mist">
              Have a role, a project, or just want to say hi? My inbox is always open.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <MagneticButton href={`mailto:${profile.email}`} cursorLabel="Email">
                <Mail size={16} /> {profile.email}
              </MagneticButton>
              <MagneticButton href={`tel:${profile.phone.replace(/\s/g, '')}`} variant="ghost" cursorLabel="Call">
                <Phone size={16} /> {profile.phone}
              </MagneticButton>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
              {[
                { icon: Github, href: profile.socials.github, label: 'GitHub' },
                { icon: Linkedin, href: profile.socials.linkedin, label: 'LinkedIn' },
                { icon: Globe, href: profile.socials.portfolio, label: 'Portfolio' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="hover"
                  data-cursor-label={label}
                  className="group flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm text-white/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:text-white"
                >
                  <Icon size={16} className="transition-transform duration-300 group-hover:scale-110" />
                  {label}
                </a>
              ))}
            </div>
          </Reveal>

          {/* résumés */}
          <Reveal delay={0.5}>
            <div className="mt-10">
              <div className="mb-3 text-xs uppercase tracking-[0.28em] text-mist">Résumé — pick a focus</div>
              <div className="flex flex-wrap justify-center gap-3">
                {profile.resumes.map((r) => (
                  <a
                    key={r.label}
                    href={r.file}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="hover"
                    data-cursor-label="Open"
                    className="rounded-full bg-white/[0.04] border border-line px-4 py-2 text-sm text-white/80 transition-colors hover:bg-white hover:text-ink"
                  >
                    {r.label}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* footer */}
        <footer className="relative mt-28 border-t border-line py-10">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="font-display text-lg font-semibold">
              Hanna<span className="text-mist">.dev</span>
            </div>
            <p className="text-xs text-mist">
              © {new Date().getFullYear()} {profile.name}. Designed & built with care.
            </p>
            <button
              onClick={() => scrollTo('#home')}
              data-cursor="hover"
              data-cursor-label="Top"
              className="group flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-white/80 transition-colors hover:border-white/25"
            >
              Back to top
              <ArrowUp size={15} className="transition-transform duration-300 group-hover:-translate-y-1" />
            </button>
          </div>
        </footer>
      </div>
    </section>
  )
}
