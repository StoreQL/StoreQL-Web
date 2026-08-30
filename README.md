# StoreQL — Marketing Website

A premium, motion-driven landing page for StoreQL, built to showcase the
mobile app: React + Vite, Tailwind CSS v4, Framer Motion, and GSAP
(ScrollTrigger).

## Stack
- **React + Vite** — app shell and dev server
- **Tailwind CSS v4** (`@tailwindcss/vite`) — all design tokens (colors,
  fonts, shadows) live in `src/index.css` under `@theme`, copied 1:1 from
  the app's `colors.js`
- **Framer Motion** — hero text reveals, the real-screenshot phone demo,
  the light/dark token preview, micro-interactions
- **GSAP + ScrollTrigger** — scroll-in reveals, the Matter card fan-out, and
  the pinned horizontal phone showcase
- **Lenis** — inertia-smoothed scrolling, synced to GSAP's ticker so
  ScrollTrigger stays frame-accurate with the smoothed scroll position
- **lucide-react** — icon set

## Fonts
Display: **Space Grotesk** · Body: **Manrope** · Metadata/mono: **JetBrains Mono**.
Change any of the three in `src/index.css` under `@theme` (`--font-display`,
`--font-body`, `--font-mono`) and the whole site updates.

## Structure
```
src/
  components/   Logo, Nav, Footer, PhoneFrame, AppScreensDemo, ui.jsx
  sections/     Hero, SourceMarquee, OldVsNew, MatterSpotlight,
                FeatureGrid, PhoneShowcase, ThemeShowcase, CTA
  lib/          useScrollReveal.js, useSmoothScroll.js
  assets/       logo.png + screens/ (real app screenshots)
```

`src/assets/logo.png` is the app's own mark — cropped straight from a
StoreQL screenshot — used in the nav, hero-adjacent, and footer via
`src/components/Logo.jsx`. Swap the file to update it everywhere.

The hero phone and the "Inside the app" section both show the real
product: `src/assets/screens/*.png` are your actual Home, Organize,
Search and Profile screenshots, cycled with Framer Motion — no mock-ups.

## Run it locally

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
# → opens at http://localhost:5173

# 3. Build for production
npm run build
# → outputs to dist/

# 4. Preview the production build
npm run preview
```

Requires Node 18+.

## Notes
- The waitlist form is fully styled and interactive (client-side only) —
  wire `handleSubmit` in `src/sections/CTA.jsx` to your real endpoint
  (e.g. your Express `/api/*` backend) when ready.
- Every color, weight, and radius traces back to the token list in
  `src/index.css` — change a value there and it updates everywhere.
- The horizontal phone showcase (`PhoneShowcase.jsx`) pins on desktop
  (≥900px) and gracefully degrades to a swipeable strip on mobile.
