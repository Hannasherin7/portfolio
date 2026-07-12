import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '../lib/gsap'

/**
 * Wires Lenis smooth scrolling into GSAP's ticker so ScrollTrigger stays
 * perfectly in sync. Exposes the instance on window for anchor scrolling.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
      wheelMultiplier: 1,
    })

    // @ts-expect-error attach for global anchor navigation
    window.__lenis = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      // @ts-expect-error cleanup
      window.__lenis = undefined
    }
  }, [])
}

export function scrollTo(target: string) {
  // @ts-expect-error global instance
  const lenis: Lenis | undefined = window.__lenis
  if (lenis) {
    lenis.scrollTo(target, { offset: 0, duration: 1.3 })
  } else {
    document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
  }
}
