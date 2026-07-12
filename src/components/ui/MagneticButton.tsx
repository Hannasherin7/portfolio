import type { ReactNode } from 'react'
import { useMagnetic } from '../../hooks/useMagnetic'

type Props = {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'solid' | 'ghost'
  className?: string
  cursorLabel?: string
  download?: boolean
  target?: string
}

/**
 * Magnetic, gradient-glow button with a ripple/press feel. Renders as <a> when
 * href is provided, otherwise <button>.
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  variant = 'solid',
  className = '',
  cursorLabel,
  download,
  target,
}: Props) {
  const { ref, onMove, onLeave } = useMagnetic<HTMLDivElement>(0.4)
  const inner = useMagnetic<HTMLSpanElement>(0.25)

  const base =
    'relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-[transform,box-shadow] duration-300 will-change-transform active:scale-[0.96]'
  const styles =
    variant === 'solid'
      ? 'text-ink bg-white shadow-[0_10px_40px_-12px_rgba(255,255,255,0.5)] hover:shadow-[0_18px_60px_-12px_rgba(124,92,255,0.7)]'
      : 'text-white glass hover:border-white/25'

  const content = (
    <span
      ref={inner.ref}
      onMouseMove={inner.onMove}
      onMouseLeave={inner.onLeave}
      className="pointer-events-none relative z-10 inline-flex items-center gap-2"
    >
      {children}
    </span>
  )

  const shared = {
    className: `${base} ${styles} ${className} group overflow-hidden`,
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    'data-cursor': 'hover',
    'data-cursor-label': cursorLabel,
  }

  const glow =
    variant === 'solid' ? (
      <span className="absolute inset-0 z-0 rounded-full bg-gradient-to-r from-accent via-accent2 to-accent3 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-40" />
    ) : (
      <span className="absolute inset-0 z-0 rounded-full bg-gradient-to-r from-accent/30 to-accent2/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    )

  if (href) {
    return (
      <a
        ref={ref as never}
        href={href}
        download={download}
        target={target}
        rel={target === '_blank' ? 'noreferrer' : undefined}
        {...shared}
      >
        {glow}
        {content}
      </a>
    )
  }

  return (
    <button ref={ref as never} onClick={onClick} {...shared}>
      {glow}
      {content}
    </button>
  )
}
