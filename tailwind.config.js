/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Semantic tokens driven by CSS variables so the whole palette flips
        // between light/dark. Using the `<alpha-value>` placeholder keeps
        // Tailwind opacity modifiers (e.g. bg-white/10) working.
        ink: 'rgb(var(--bg-rgb) / <alpha-value>)',
        surface: 'rgb(var(--surface-rgb) / <alpha-value>)',
        veil: 'var(--veil)',
        line: 'var(--line)',
        mist: 'rgb(var(--mist-rgb) / <alpha-value>)',
        // `white`/`black` are remapped to the theme foreground/background so
        // existing text-white / bg-white/x / bg-black/x utilities invert too.
        white: 'rgb(var(--fg-rgb) / <alpha-value>)',
        black: 'rgb(var(--bg-rgb) / <alpha-value>)',
        accent: '#7c5cff',
        accent2: '#2ee6c9',
        accent3: '#ff8a5c',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.05em',
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
        power: 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
      keyframes: {
        floaty: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        drift: {
          '0%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(6%, -4%) scale(1.08)' },
          '66%': { transform: 'translate(-5%, 5%) scale(0.96)' },
          '100%': { transform: 'translate(0,0) scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        drift: 'drift 22s ease-in-out infinite',
        shimmer: 'shimmer 6s linear infinite',
      },
    },
  },
  plugins: [],
}
