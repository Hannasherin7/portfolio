import { useRef, type ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'

type Props = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  blur?: boolean
  once?: boolean
}

/** Fade + translate (+ optional blur-to-sharp) reveal with premium easing. */
export default function Reveal({
  children,
  className = '',
  delay = 0,
  y = 40,
  blur = true,
  once = true,
}: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, margin: '-12% 0px -12% 0px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y, filter: blur ? 'blur(12px)' : 'blur(0px)' }}
      animate={
        inView
          ? { opacity: 1, y: 0, filter: 'blur(0px)' }
          : { opacity: 0, y, filter: blur ? 'blur(12px)' : 'blur(0px)' }
      }
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  )
}
