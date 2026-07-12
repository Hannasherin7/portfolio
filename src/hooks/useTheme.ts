import { useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'
const THEME_COLORS: Record<Theme, string> = { dark: '#050506', light: '#f7f7f5' }

/** The theme currently painted on <html> (set by the boot script or apply()). */
function currentTheme(): Theme {
  if (typeof document === 'undefined') return 'dark'
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

/** Commit a theme to the DOM, storage and browser chrome. */
function apply(theme: Theme) {
  document.documentElement.dataset.theme = theme
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    /* private mode / storage disabled — theme still applies for the session */
  }
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', THEME_COLORS[theme])
}

/**
 * Theme state derived from the <html data-theme> attribute, so every consumer
 * (navbar toggles, command palette, …) stays in sync regardless of which one
 * flips it. `apply` mutates the attribute; a MutationObserver pushes the change
 * back into React state everywhere.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(currentTheme)

  useEffect(() => {
    const root = document.documentElement
    const sync = () => setTheme(currentTheme())
    sync() // reconcile with whatever the boot script resolved
    const observer = new MutationObserver(sync)
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])

  const set = (t: Theme) => apply(t)
  const toggle = () => apply(currentTheme() === 'dark' ? 'light' : 'dark')

  return { theme, toggle, setTheme: set }
}
