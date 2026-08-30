import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/useScrollReveal.js';
import { Container, Eyebrow } from '../components/ui.jsx';
import PhoneFrame from '../components/PhoneFrame.jsx';
import homeShot from '../assets/screens/home.png';
import organizeShot from '../assets/screens/organize.png';
import searchShot from '../assets/screens/search.png';

const SCREENS = [
  { src: homeShot,     label: 'Home',     caption: 'Recent captures, right at the top — no dashboard to dig through.' },
  { src: organizeShot, label: 'Organize', caption: 'Every folder as a calm, minimal card. Filter by folder or tag in a tap.' },
  { src: searchShot,   label: 'Search',   caption: 'Titles, URLs, tags, notes and folders — one field finds all of it.' },
];

export default function PhoneShowcase() {
  const sectionRef = useRef(null);
  const trackRef   = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 900px)');
    if (!mq.matches) return;

    const ctx = gsap.context(() => {
      const track    = trackRef.current;
      const parent   = track.parentElement;
      const distance = track.scrollWidth - parent.offsetWidth;
      if (distance <= 0) return;

      gsap.to(track, {
        x: -distance,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${distance + window.innerHeight * 0.3}`,
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-charcoal-alt py-28 md:py-0 md:h-screen md:flex md:items-center"
      style={{ overflow: 'hidden' }}
    >
      <Container className="w-full">
        <div className="mb-12 max-w-xl">
          <Eyebrow>Inside the app</Eyebrow>
          <h2 className="mt-4 font-display text-[2.4rem] leading-[1.1] text-cream sm:text-[2.9rem] text-balance">
            Three screens. That&apos;s the whole app.
          </h2>
        </div>

        {/*
          On mobile: horizontal scroll is inside its own clipped wrapper so it
          never bleeds into the page horizontal axis.
          On desktop: GSAP drives x-translation on a flex row that starts within
          the container — overflow stays clipped at the section boundary.
        */}
        <div
          className="overflow-x-auto md:overflow-visible w-full"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <div
            ref={trackRef}
            className="flex gap-12 md:gap-16 pb-4 md:pb-0"
            style={{ width: 'max-content' }}
          >
            {SCREENS.map(({ src, label, caption }) => (
              <div key={label} className="shrink-0 w-[270px]">
                <PhoneFrame showNotch={false}>
                  <img
                    src={src}
                    alt={`StoreQL ${label} screen`}
                    className="h-full w-full object-cover object-top"
                  />
                </PhoneFrame>
                <p className="mt-5 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-accent-bright">
                  {label}
                </p>
                <p className="mt-2 max-w-[240px] text-[0.88rem] leading-relaxed text-cream/50">
                  {caption}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
