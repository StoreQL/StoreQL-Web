import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './useScrollReveal.js';

/**
 * Initializes Lenis for inertia-smoothed scrolling and drives it from
 * GSAP's own ticker (rather than a separate requestAnimationFrame loop)
 * so every ScrollTrigger-based animation in the app — reveals, the
 * pinned phone showcase — stays perfectly in sync with the smoothed
 * scroll position instead of drifting a frame behind it.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.1,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Route in-page anchor links (nav, footer, CTA buttons) through Lenis
    // so jumping to a section is just as smoothed as scrolling to it.
    const onClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { duration: 1.2, offset: -20 });
    };
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
}
