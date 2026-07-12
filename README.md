# Hanna Sherin — Portfolio

An immersive, Awwwards-style single-page portfolio. Built with **React + TypeScript + Vite**,
**Tailwind CSS**, **GSAP + ScrollTrigger**, **Lenis** smooth scrolling, **Framer Motion**,
**SplitType** and **Lucide** icons.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build -> dist/
npm run preview  # preview the production build
```

## Two things to add (personal assets)

1. **Your photo** → save it as `public/profile.jpg`
   (the hero shows a stylised "HS" placeholder until then).
2. **Your résumés** → drop these PDFs into `public/resumes/`:
   - `hanna_sherin_full_stack_developer.pdf`
   - `hanna_sherin_php_laravel_developer.pdf`
   - `hanna_sherin_java_programmer.pdf`

All text content lives in one place: **`src/data/content.ts`** — edit there.

## What's inside

- **Cinematic scroll** — Lenis synced into GSAP's ticker so every ScrollTrigger stays smooth.
- **Loader** — counter + progress line + clip-path wipe into the hero.
- **Custom cursor** — trailing dot, grow-on-hover, text labels (`data-cursor` / `data-cursor-label`).
- **Living background** — drifting mesh blobs, canvas particle field, mouse-follow glow, grain.
- **Hero** — SplitType char reveal, rotating role, magnetic CTAs, parallax, scroll indicator.
- **Projects** — pinned **horizontal scroll** with 3D tilt / glow cards (vertical stack on mobile).
- **Experience** — scroll-drawn timeline. **Skills** — velocity-reactive marquee.
- Everything respects `prefers-reduced-motion`.

## Structure

```
src/
  App.tsx                 # composition + loading state
  data/content.ts         # ← all your content
  lib/gsap.ts             # GSAP + ScrollTrigger registration
  hooks/                  # useSmoothScroll, useMagnetic
  components/             # Loader, Cursor, Background, Navbar, Hero, About,
                          # Skills, Experience, Projects, Certifications, Contact
  components/ui/          # AnimatedText, MagneticButton, Reveal, SectionHeading, BrandIcons
```

> Note: the toolchain warns that Vite 8 prefers Node 20.19+/22.12+. It builds and runs fine on
> 20.18, but upgrading Node removes the warning.
