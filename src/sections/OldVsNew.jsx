import { useScrollReveal } from '../lib/useScrollReveal.js';
import { Container, Eyebrow } from '../components/ui.jsx';

const OLD = [
  'Discover a useful link',
  'Open it in Chrome or Safari',
  'Copy the URL',
  'Open another app',
  'Create a folder or category',
  'Paste the URL',
  'Add notes, maybe',
  'Eventually forget why you saved it',
];

const NEW = [
  'Share the link',
  'Land in StoreQL',
  'Save — with or without a note',
];

export default function OldVsNew() {
  const scope = useScrollReveal();

  return (
    <section id="flow" ref={scope} className="bg-ink py-28 md:py-36 overflow-hidden">
      <Container>
        <div data-reveal className="max-w-xl">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="mt-4 font-display text-[2.4rem] leading-[1.1] text-cream sm:text-[2.9rem] text-balance">
            Eight steps, quietly reduced to three.
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Old way */}
          <div data-reveal className="rounded-2xl border border-inkline bg-charcoal-alt/60 p-8 md:p-10">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-cream/30">
              The old way
            </p>
            <ol className="mt-6 space-y-3.5">
              {OLD.map((step, i) => (
                <li key={step} className="flex items-start gap-4">
                  <span className="font-mono text-[0.72rem] text-cream/22 pt-0.5 tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[0.95rem] text-cream/40 leading-snug">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* New way */}
          <div
            data-reveal
            className="relative rounded-2xl border border-accent/25 bg-gradient-to-b from-accent-soft-dark/50 to-charcoal-alt/60 p-8 md:p-10"
          >
            {/* Glow accent */}
            <div className="pointer-events-none absolute -top-px inset-x-6 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

            <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-accent-bright">
              With StoreQL
            </p>
            <ol className="mt-6 space-y-6">
              {NEW.map((step, i) => (
                <li key={step} className="flex items-start gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent font-mono text-[0.72rem] font-bold text-cream">
                    {i + 1}
                  </span>
                  <span className="text-[1.12rem] text-cream leading-snug pt-0.5">{step}</span>
                </li>
              ))}
            </ol>
            <p className="mt-10 border-t border-accent/20 pt-6 font-display text-[1.35rem] text-accent-bright/85 text-balance leading-snug">
              "I found it. I saved it. I know why I saved it."
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
