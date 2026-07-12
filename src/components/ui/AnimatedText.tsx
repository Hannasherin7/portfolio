import { createElement, useEffect, useRef, type ElementType } from 'react'
import SplitType from 'split-type'
import { gsap } from '../../lib/gsap'

type Props = {
  text: string
  as?: ElementType
  className?: string
  by?: 'chars' | 'words' | 'lines'
  stagger?: number
  delay?: number
  once?: boolean
  start?: string
}

/**
 * Scroll-triggered text reveal powered by SplitType. Splits into chars/words/
 * lines, masks each line, and staggers them up with an expo ease. Reverses on
 * scroll-up unless `once` is set.
 */
export default function AnimatedText({
  text,
  as = 'span',
  className = '',
  by = 'words',
  stagger = 0.045,
  delay = 0,
  once = false,
  start = 'top 88%',
}: Props) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const split = new SplitType(el, {
      types: by === 'chars' ? 'lines,words,chars' : by === 'lines' ? 'lines' : 'lines,words',
      tagName: 'span',
    })
    const targets =
      by === 'chars' ? split.chars : by === 'lines' ? split.lines : split.words
    if (!targets) return

    // wrap lines for mask effect
    split.lines?.forEach((l) => (l.style.overflow = 'hidden'))

    gsap.set(targets, { yPercent: 120, opacity: 0 })
    const anim = gsap.to(targets, {
      yPercent: 0,
      opacity: 1,
      duration: 1,
      ease: 'expo.out',
      stagger,
      delay,
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: once ? 'play none none none' : 'play none none reverse',
      },
    })

    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
      split.revert()
    }
  }, [text, by, stagger, delay, once, start])

  return createElement(as, { ref, className }, text)
}
