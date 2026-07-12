import { useRef, useCallback } from 'react'
import { gsap } from '../lib/gsap'

/**
 * Magnetic hover: element eases toward the cursor while hovered and springs
 * back on leave. `strength` scales the pull; `damp` scales how far children move.
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.35) {
  const ref = useRef<T>(null)

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const x = (e.clientX - (r.left + r.width / 2)) * strength
      const y = (e.clientY - (r.top + r.height / 2)) * strength
      gsap.to(el, { x, y, duration: 0.6, ease: 'power3.out' })
    },
    [strength],
  )

  const onLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.4)' })
  }, [])

  return { ref, onMove, onLeave }
}
