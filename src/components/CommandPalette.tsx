import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  Command,
  CornerDownLeft,
  FileText,
  Home,
  Layers,
  Mail,
  Search,
  User,
  Briefcase,
  Send,
  SunMoon,
} from 'lucide-react'
import { Github, Linkedin } from './ui/BrandIcons'
import { profile } from '../data/content'
import { scrollTo } from '../hooks/useSmoothScroll'
import { useTheme } from '../hooks/useTheme'

type Cmd = {
  id: string
  label: string
  hint: string
  group: 'Navigate' | 'Links' | 'Actions'
  icon: React.ComponentType<{ size?: number }>
  run: () => void
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const [copied, setCopied] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { theme, toggle } = useTheme()

  const commands = useMemo<Cmd[]>(() => {
    const nav = (label: string, href: string, icon: Cmd['icon']): Cmd => ({
      id: href,
      label,
      hint: href,
      group: 'Navigate',
      icon,
      run: () => scrollTo(href),
    })
    return [
      nav('Home', '#home', Home),
      nav('About', '#about', User),
      nav('Work / Experience', '#work', Briefcase),
      nav('Projects', '#projects', Layers),
      nav('Contact', '#contact', Send),
      {
        id: 'email',
        label: 'Copy email',
        hint: profile.email,
        group: 'Actions',
        icon: Mail,
        run: () => {
          navigator.clipboard?.writeText(profile.email)
          setCopied(true)
        },
      },
      {
        id: 'resume',
        label: 'Open résumé (Full Stack)',
        hint: 'PDF',
        group: 'Actions',
        icon: FileText,
        run: () => window.open(profile.resumes[0].file, '_blank'),
      },
      {
        id: 'theme',
        label: theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme',
        hint: theme === 'dark' ? 'light' : 'dark',
        group: 'Actions',
        icon: SunMoon,
        run: () => toggle(),
      },
      {
        id: 'gh',
        label: 'GitHub',
        hint: 'Hannasherin7',
        group: 'Links',
        icon: Github,
        run: () => window.open(profile.socials.github, '_blank'),
      },
      {
        id: 'li',
        label: 'LinkedIn',
        hint: 'hanna-sherin',
        group: 'Links',
        icon: Linkedin,
        run: () => window.open(profile.socials.linkedin, '_blank'),
      },
    ]
  }, [theme, toggle])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return commands
    return commands.filter(
      (c) => c.label.toLowerCase().includes(q) || c.hint.toLowerCase().includes(q),
    )
  }, [query, commands])

  useEffect(() => setActive(0), [query])

  // global open/close hotkey
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((v) => !v)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    // expose an opener for the navbar trigger button
    // @ts-expect-error global
    window.__openPalette = () => setOpen(true)
  }, [])

  useEffect(() => {
    if (open) {
      setQuery('')
      setCopied(false)
      setTimeout(() => inputRef.current?.focus(), 40)
    }
  }, [open])

  const exec = (c?: Cmd) => {
    if (!c) return
    c.run()
    if (c.id !== 'email') setOpen(false)
  }

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      exec(results[active])
    }
  }

  const groups: Cmd['group'][] = ['Navigate', 'Actions', 'Links']
  let runningIndex = -1

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9998] flex items-start justify-center px-4 pt-[14vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-ink/70 backdrop-blur-md" />

          <motion.div
            role="dialog"
            aria-label="Command palette"
            onMouseDown={(e) => e.stopPropagation()}
            onKeyDown={onListKey}
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-surface/90 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)]"
          >
            {/* window chrome */}
            <div className="flex items-center gap-3 border-b border-line px-4 py-3">
              <Search size={16} className="text-mist" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search…"
                className="w-full bg-transparent font-mono text-sm text-white outline-none placeholder:text-mist"
              />
              <span className="kbd">esc</span>
            </div>

            {/* results */}
            <div className="max-h-[46vh] overflow-y-auto p-2">
              {results.length === 0 && (
                <div className="px-3 py-8 text-center font-mono text-sm text-mist">
                  no matches for "{query}"
                </div>
              )}
              {groups.map((g) => {
                const items = results.filter((c) => c.group === g)
                if (!items.length) return null
                return (
                  <div key={g} className="mb-1">
                    <div className="px-3 pb-1 pt-2 mono-label">{g}</div>
                    {items.map((c) => {
                      runningIndex += 1
                      const idx = runningIndex
                      const Icon = c.icon
                      const isActive = idx === active
                      return (
                        <button
                          key={c.id}
                          onMouseEnter={() => setActive(idx)}
                          onClick={() => exec(c)}
                          className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                            isActive ? 'bg-white/[0.07]' : ''
                          }`}
                        >
                          <span
                            className={`flex h-8 w-8 items-center justify-center rounded-lg border border-line ${
                              isActive ? 'bg-accent/20 text-accent2' : 'text-mist'
                            }`}
                          >
                            <Icon size={15} />
                          </span>
                          <span className="flex-1 text-sm text-white">
                            {c.id === 'email' && copied ? 'Copied to clipboard ✓' : c.label}
                          </span>
                          <span className="font-mono text-[11px] text-mist">{c.hint}</span>
                          {isActive ? (
                            <CornerDownLeft size={13} className="text-mist" />
                          ) : (
                            <ArrowRight size={13} className="text-transparent" />
                          )}
                        </button>
                      )
                    })}
                  </div>
                )
              })}
            </div>

            <div className="flex items-center justify-between border-t border-line px-4 py-2.5 font-mono text-[11px] text-mist">
              <span className="flex items-center gap-1.5">
                <Command size={12} /> command palette
              </span>
              <span className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="kbd">↑</span>
                  <span className="kbd">↓</span> navigate
                </span>
                <span className="flex items-center gap-1">
                  <span className="kbd">↵</span> select
                </span>
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
