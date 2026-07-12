import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import AuroraShader from './AuroraShader'

/** Floating particle field on canvas — GPU-light, DPR-aware, respects reduced motion. */
function Particles() {
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const c = canvas.current
    if (!c) return
    const ctx = c.getContext('2d')
    if (!ctx) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    let w = 0
    let h = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    // Particle tint follows the active theme's foreground colour.
    const root = document.documentElement
    let rgb = '255,255,255'
    const readColor = () => {
      const v = getComputedStyle(root).getPropertyValue('--fg-rgb').trim()
      if (v) rgb = v.split(/\s+/).join(',')
    }
    readColor()
    const themeObserver = new MutationObserver(readColor)
    themeObserver.observe(root, { attributes: true, attributeFilter: ['data-theme'] })
    type P = { x: number; y: number; z: number; vx: number; vy: number }
    let pts: P[] = []

    const resize = () => {
      w = c.clientWidth
      h = c.clientHeight
      c.width = w * dpr
      c.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.min(90, Math.floor((w * h) / 22000))
      pts = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random() * 0.8 + 0.2,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
      }))
    }
    resize()
    window.addEventListener('resize', resize)

    const tick = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of pts) {
        p.x += p.vx * p.z
        p.y += p.vy * p.z
        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.z * 1.6, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rgb},${0.06 + p.z * 0.14})`
        ctx.fill()
      }
      raf = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      themeObserver.disconnect()
    }
  }, [])

  return <canvas ref={canvas} className="absolute inset-0 h-full w-full" />
}

export default function Background() {
  const glow = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const size = 900
    const x = gsap.quickTo(glow.current, 'x', { duration: 0.9, ease: 'power2.out' })
    const y = gsap.quickTo(glow.current, 'y', { duration: 0.9, ease: 'power2.out' })
    const onMove = (e: MouseEvent) => {
      x(e.clientX - size / 2)
      y(e.clientY - size / 2)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-ink">
      {/* base vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_-10%,rgb(var(--vignette-1))_0%,rgb(var(--vignette-2))_55%)]" />

      {/* live WebGL aurora, concentrated around the hero */}
      <div
        className="absolute inset-x-0 top-0 h-[130vh] opacity-70 [mask-image:radial-gradient(90%_75%_at_50%_28%,#000_20%,transparent_75%)]"
        style={{ mixBlendMode: 'screen' }}
      >
        <AuroraShader />
      </div>

      {/* drifting mesh blobs */}
      <div className="absolute -left-40 -top-40 h-[46rem] w-[46rem] rounded-full bg-accent/20 blur-[130px] animate-drift" />
      <div
        className="absolute right-[-10rem] top-[20%] h-[40rem] w-[40rem] rounded-full bg-accent2/15 blur-[140px] animate-drift"
        style={{ animationDelay: '-7s' }}
      />
      <div
        className="absolute bottom-[-12rem] left-[25%] h-[42rem] w-[42rem] rounded-full bg-accent3/15 blur-[150px] animate-drift"
        style={{ animationDelay: '-14s' }}
      />

      {/* fine grid */}
      <div className="absolute inset-0 opacity-[0.15] [background-image:linear-gradient(var(--grid-line)_1px,transparent_1px),linear-gradient(90deg,var(--grid-line)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(80%_80%_at_50%_40%,#000,transparent)]" />

      <Particles />

      {/* mouse-follow radial glow */}
      <div
        ref={glow}
        className="absolute left-0 top-0 h-[900px] w-[900px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(124,92,255,0.12), rgba(46,230,201,0.05) 40%, transparent 62%)',
        }}
      />

      <div className="grain" />
    </div>
  )
}
