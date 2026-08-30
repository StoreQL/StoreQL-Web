import { useScrollReveal } from '../lib/useScrollReveal.js';
import { Container, Eyebrow } from '../components/ui.jsx';

const OLD = [
  'Find something useful online',
  'Send it to yourself on WhatsApp',
  'Or screenshot it to remember later',
  'Close the app and forget about it',
  'Days later — need it but can\'t find it',
  'Search through months of messages',
  'Check your Camera Roll, Notes, Bookmarks…',
  'Give up, or find it too late',
];

const NEW = [
  'Find anything interesting online',
  'Share it to StoreQL in one tap',
  'Add a quick note why you saved it',
  'Find it instantly whenever you need it',
];

export default function OldVsNew() {
  const scope = useScrollReveal();

  return (
    <section id="flow" ref={scope} className="bg-ink py-28 md:py-36 overflow-hidden">
      <Container>
        <div data-reveal className="max-w-xl">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="mt-4 font-display text-[2.4rem] leading-[1.1] text-cream sm:text-[2.9rem] text-balance">
            Stop losing links you actually care about.
          </h2>
          <p className="mt-4 max-w-[440px] text-[1rem] leading-[1.75] text-cream/45">
            We've all sent a link to ourselves on WhatsApp or dropped it in Notes — and then never found it again. StoreQL fixes that.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Old way */}
          <div data-reveal className="rounded-2xl border border-inkline bg-charcoal-alt/60 p-8 md:p-10">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-cream/30">
              Sound familiar?
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
              "One place. Every link. Always findable."
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
