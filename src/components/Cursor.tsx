import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap'

/**
 * Custom animated cursor with a trailing dot, grow-on-hover and text labels.
 * Any element carrying `data-cursor="hover"` grows the ring; add
 * `data-cursor-label="View"` to show a text label inside it.
 */
export default function Cursor() {
  const ring = useRef<HTMLDivElement>(null)
  const dot = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState('')
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const ringX = gsap.quickTo(ring.current, 'x', { duration: 0.55, ease: 'power3.out' })
    const ringY = gsap.quickTo(ring.current, 'y', { duration: 0.55, ease: 'power3.out' })
    const dotX = gsap.quickTo(dot.current, 'x', { duration: 0.12, ease: 'power3.out' })
    const dotY = gsap.quickTo(dot.current, 'y', { duration: 0.12, ease: 'power3.out' })

    const onMove = (e: MouseEvent) => {
      setVisible(true)
      ringX(e.clientX)
      ringY(e.clientY)
      dotX(e.clientX)
      dotY(e.clientY)

      const el = (e.target as HTMLElement)?.closest('[data-cursor]') as HTMLElement | null
      if (el) {
        setHovering(true)
        setLabel(el.dataset.cursorLabel ?? '')
      } else {
        setHovering(false)
        setLabel('')
      }
    }

    const onLeave = () => setVisible(false)
    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] hidden md:block"
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.3s' }}
      aria-hidden
    >
      <div
        ref={ring}
        className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full border border-white/40 backdrop-invert-0 transition-[width,height,background-color,border-color] duration-300 ease-out"
        style={{
          width: hovering ? 76 : 34,
          height: hovering ? 76 : 34,
          backgroundColor: hovering ? 'rgba(124,92,255,0.18)' : 'transparent',
          borderColor: hovering ? 'rgba(124,92,255,0.7)' : 'rgba(255,255,255,0.4)',
          mixBlendMode: hovering ? 'normal' : 'difference',
        }}
      >
        {label && (
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
            {label}
          </span>
        )}
      </div>
      <div
        ref={dot}
        className="absolute left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white transition-opacity duration-200"
        style={{ opacity: hovering ? 0 : 1 }}
      />
    </div>
  )
}
