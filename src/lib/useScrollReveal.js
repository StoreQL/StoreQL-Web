import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Fades + lifts every [data-reveal] child inside the returned ref
 * into place as it enters the viewport, staggered by DOM order.
 * One shared implementation keeps every section's motion consistent.
 */
export function useScrollReveal({ y = 28, stagger = 0.09, start = 'top 82%' } = {}) {
  const scope = useRef(null);

  useEffect(() => {
    const el = scope.current;
    if (!el) return;
    const targets = el.querySelectorAll('[data-reveal]');
    if (!targets.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger,
          scrollTrigger: {
            trigger: el,
            start,
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [y, stagger, start]);

  return scope;
}

export { gsap, ScrollTrigger };
