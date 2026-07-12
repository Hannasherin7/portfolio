import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap'
import { profile } from '../data/content'

/**
 * Minimal editorial intro: the name fades up, a hairline progress bar fills to
 * 100%, then the whole panel wipes upward (clip-path) to reveal the hero.
 */
export default function Loader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null)
  const bar = useRef<HTMLDivElement>(null)
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const counter = { v: 0 }
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

      tl.from('[data-load-in]', { y: 28, opacity: 0, duration: 0.9, stagger: 0.12 })
        .to(
          counter,
          {
            v: 100,
            duration: 2.4,
            ease: 'power1.inOut',
            onUpdate: () => setPct(Math.round(counter.v)),
          },
          0.2,
        )
        .to(bar.current, { scaleX: 1, duration: 2.4, ease: 'power1.inOut' }, 0.2)
        .to(root.current, {
          clipPath: 'inset(0% 0% 100% 0%)',
          duration: 1.05,
          ease: 'expo.inOut',
          onComplete: onDone,
        })
    }, root)

    return () => ctx.revert()
  }, [onDone])

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-ink px-6"
      style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
    >
      <div className="w-full max-w-md text-center">
        <p data-load-in className="eyebrow mb-6 justify-center">
          {profile.role}
        </p>
        <h1
          data-load-in
          className="font-display text-5xl font-semibold tracking-tightest sm:text-6xl"
        >
          {profile.name}
        </h1>

        {/* progress */}
        <div data-load-in className="mt-12 flex items-center gap-4">
          <div className="h-px flex-1 overflow-hidden bg-white/10">
            <div
              ref={bar}
              className="h-full w-full origin-left bg-gradient-to-r from-accent via-accent2 to-accent3"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>
          <span className="font-mono text-xs tabular-nums text-mist">
            {String(pct).padStart(3, '0')}
          </span>
        </div>
      </div>
    </div>
  )
}
