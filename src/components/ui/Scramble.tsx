import { createElement, useEffect, useRef, type ElementType } from 'react'

const GLYPHS = '!<>-_\\/[]{}—=+*^?#________ABCDEF0123456789'

type Props = {
  text: string
  as?: ElementType
  className?: string
  /** ms per settle step */
  speed?: number
  /** replay whenever the element is hovered */
  hover?: boolean
  /** start when scrolled into view (default) vs immediately */
  onView?: boolean
  delay?: number
}

/**
 * Decode / scramble text effect — characters churn through random glyphs and
 * resolve left-to-right. Runs once on scroll-in, and optionally replays on hover.
 */
export default function Scramble({
  text,
  as = 'span',
  className = '',
  speed = 28,
  hover = false,
  onView = true,
  delay = 0,
}: Props) {
  const ref = useRef<HTMLElement>(null)
  const raf = useRef(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const run = () => {
      cancelAnimationFrame(raf.current)
      const start = performance.now()
      const total = text.length
      const step = () => {
        const elapsed = performance.now() - start
        const settled = Math.floor(elapsed / speed)
        let out = ''
        let done = true
        for (let i = 0; i < total; i++) {
          if (text[i] === ' ') {
            out += ' '
            continue
          }
          if (i < settled) {
            out += text[i]
          } else {
            done = false
            out += GLYPHS[(Math.floor(elapsed / 20) + i * 7) % GLYPHS.length]
          }
        }
        el.textContent = out
        if (!done) raf.current = requestAnimationFrame(step)
        else el.textContent = text
      }
      step()
    }

    el.textContent = text

    let started = false
    const trigger = () => {
      if (started) return
      started = true
      window.setTimeout(run, delay)
    }

    let io: IntersectionObserver | null = null
    if (onView) {
      io = new IntersectionObserver(
        (es) => {
          if (es[0].isIntersecting) {
            trigger()
            io?.disconnect()
          }
        },
        { threshold: 0.4 },
      )
      io.observe(el)
    } else {
      trigger()
    }

    const onEnter = () => run()
    if (hover) el.addEventListener('mouseenter', onEnter)

    return () => {
      cancelAnimationFrame(raf.current)
      io?.disconnect()
      if (hover) el.removeEventListener('mouseenter', onEnter)
    }
  }, [text, speed, hover, onView, delay])

  return createElement(as, { ref, className }, text)
}
