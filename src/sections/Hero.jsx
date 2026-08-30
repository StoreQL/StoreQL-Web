import { motion, useReducedMotion } from 'framer-motion';
import { Container, Eyebrow, Button } from '../components/ui.jsx';
import HeroPhoneDemo from '../components/HeroPhoneDemo.jsx';

// Word-by-word reveal
const wordVariants = {
  hidden: { y: '110%', opacity: 0 },
  show: (i) => ({
    y: 0,
    opacity: 1,
    transition: { delay: 0.1 + i * 0.045, duration: 0.72, ease: [0.22, 1, 0.36, 1] },
  }),
};

function RevealLine({ text, className = '', delayStart = 0 }) {
  const prefersReduced = useReducedMotion();
  const words = text.split(' ');
  if (prefersReduced) return <span className={className}>{text}</span>;
  return (
    <span className={`inline-block align-bottom ${className}`}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom mr-[0.25em] last:mr-0">
          <motion.span
            className="inline-block"
            variants={wordVariants}
            initial="hidden"
            animate="show"
            custom={i + delayStart}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// Floating stats badge
function StatBadge({ value, label, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center gap-2.5 rounded-2xl border border-inkline bg-charcoal/80 px-4 py-2.5 backdrop-blur-sm"
    >
      <span className="font-display text-[1.25rem] font-semibold text-cream">{value}</span>
      <span className="text-[0.72rem] leading-snug text-cream/50">{label}</span>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-ink pt-[148px] pb-24 md:pb-36">
      {/* Radial glow behind phone */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-[700px] w-[900px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-accent/8 blur-[160px]" />
      {/* Secondary subtle warm glow */}
      <div className="pointer-events-none absolute top-1/3 right-0 h-[400px] w-[400px] translate-x-1/3 rounded-full bg-accent-bright/6 blur-[120px]" />

      {/* Very subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-cream) 1px,transparent 1px),linear-gradient(90deg,var(--color-cream) 1px,transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      <Container className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        {/* ── Left: Copy ── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <Eyebrow>One place for every link that matters</Eyebrow>
          </motion.div>

          <h1 className="mt-6 font-display text-[2.75rem] leading-[1.04] text-cream sm:text-[3.5rem] lg:text-[4rem] text-balance">
            <RevealLine text="You find it." />
            <br />
            <RevealLine text="StoreQL" delayStart={3} />
            {' '}
            <span className="text-accent-bright">
              <RevealLine text="stores it." delayStart={4} />
            </span>
            <br />
            <RevealLine text="Find it anytime." delayStart={5} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="mt-7 max-w-[440px] text-[1.05rem] leading-[1.75] text-cream/55"
          >
            Share from Instagram, Chrome, WhatsApp — anywhere. StoreQL saves it in one place, fetches the details automatically, and lets you add a quick note so you always know why you saved it.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.05 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Button as="a" href="#cta" variant="accent">
              Join the waitlist
            </Button>
            <Button as="a" href="#flow" variant="ghost">
              See how it works
            </Button>
          </motion.div>

          {/* Micro stats */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.25 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <StatBadge value="10s" label="Save any link" delay={1.3} />
            <StatBadge value="1" label="Place for everything" delay={1.4} />
            <StatBadge value="∞" label="Sources supported" delay={1.5} />
          </motion.div>
        </div>

        {/* ── Right: Phone demo ── */}
        <HeroPhoneDemo />
      </Container>
    </section>
  );
}

