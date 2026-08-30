import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/useScrollReveal.js';
import { Container, Eyebrow } from '../components/ui.jsx';

const CARDS = [
  { type: 'Reference', rot: -14, x: -110, content: 'Good starting point for the Sports folder.' },
  { type: 'Idea',      rot: -6,  x: -55,  content: 'This creator has a really good CTA structure.' },
  {
    type: 'Note',
    rot: 0, x: 0,
    content: 'Weighted sessions — worth trying this week.',
    front: true,
  },
  { type: 'Reminder', rot: 6,  x: 55,  content: 'Run the numbers through the budget calculator.' },
  { type: 'Question', rot: 14, x: 110, content: 'Would this work for our onboarding flow?' },
];

export default function MatterSpotlight() {
  const wrapRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const cfg = CARDS[i];
        gsap.fromTo(
          card,
          { rotate: 0, x: 0, y: 40, opacity: 0 },
          {
            rotate: cfg.rot,
            x: cfg.x,
            y: cfg.front ? -14 : 0,
            opacity: 1,
            duration: 1.1,
            ease: 'power3.out',
            delay: i * 0.07,
            scrollTrigger: { trigger: el, start: 'top 72%', once: true },
          }
        );
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="matter" className="relative overflow-hidden bg-cream py-28 md:py-36 text-ink">
      <Container className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        {/* ── Copy ── */}
        <div>
          <Eyebrow className="text-accent">The core idea</Eyebrow>
          <h2 className="mt-4 font-display text-[2.5rem] leading-[1.08] text-ink sm:text-[3rem] text-balance">
            A link tells you <span className="text-accent">what</span>. A Note tells you{' '}
            <span className="text-accent">why</span>.
          </h2>
          <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-slate">
            A Note is a single, fast thought attached to anything you save — not a document,
            not a project tracker. Just the one sentence that future-you will thank
            present-you for writing.
          </p>

          <div className="mt-8 flex flex-wrap gap-2.5">
            {['Note', 'Idea', 'Reference', 'Reminder', 'Question', 'To-do'].map((t) => (
              <span
                key={t}
                className="rounded-full border border-ink/12 bg-white px-3.5 py-1.5 font-mono text-[0.7rem] uppercase tracking-wide text-slate"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* ── Card Fan ── */}
        {/*
          Use `overflow-hidden` on the outer clip to prevent cards from causing
          a horizontal scrollbar. The fan only extends ~110px each side, which
          is well within the column width on desktop. On mobile the column is
          full-width so we clip at the section edge.
        */}
        <div className="relative overflow-hidden py-8">
          <div ref={wrapRef} className="relative mx-auto h-[340px] w-full max-w-[360px]">
            {CARDS.map((c, i) => (
              <div
                key={c.type}
                ref={(node) => (cardRefs.current[i] = node)}
                className={`absolute left-1/2 top-1/2 w-[230px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border p-5 ${
                  c.front
                    ? 'z-10 border-ink/10 bg-white shadow-[var(--shadow-card)]'
                    : 'border-ink/8 bg-fog shadow-[var(--shadow-soft)]'
                }`}
              >
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-accent">
                  {c.type}
                </span>
                <p className="mt-3 font-body text-[0.95rem] leading-snug text-ink">
                  "{c.content}"
                </p>
                {c.front && (
                  <p className="mt-4 font-mono text-[0.62rem] text-ash">Sports · 2h ago</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
