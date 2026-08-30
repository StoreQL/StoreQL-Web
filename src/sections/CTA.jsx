import { useState } from 'react';
import { motion } from 'framer-motion';
import { Apple, PlayCircle, ArrowRight, Check } from 'lucide-react';
import { Container, Eyebrow } from '../components/ui.jsx';

export default function CTA() {
  const [email, setEmail]         = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email.includes('@')) return;
    setSubmitted(true);
  }

  return (
    <section id="cta" className="relative overflow-hidden bg-ink py-28 md:py-40">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-accent/12 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 translate-y-1/2 rounded-full bg-accent-bright/6 blur-[120px]" />

      <Container className="relative flex flex-col items-center text-center">
        <Eyebrow>Coming soon, on your phone</Eyebrow>

        <h2 className="mt-6 max-w-2xl font-display text-[2.5rem] leading-[1.07] text-cream sm:text-[3.2rem] text-balance">
          Store what you find.{' '}
          <span className="text-accent-bright">Remember why it matters.</span>
        </h2>

        <p className="mt-6 max-w-[440px] text-[1.05rem] leading-[1.75] text-cream/50">
          StoreQL is in private beta for iOS and Android. Leave your email and
          we'll send an invite the moment your device is ready.
        </p>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="mt-10 flex items-center gap-3 rounded-2xl border border-success/35 bg-success/10 px-7 py-4 text-[0.95rem] text-cream"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-success/25">
              <Check size={14} className="text-success" />
            </div>
            You're on the list — we'll be in touch.
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-10 flex w-full max-w-[460px] flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              id="waitlist-email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="w-full flex-1 rounded-full border border-cream/12 bg-charcoal-alt px-5 py-3.5 text-[0.95rem] text-cream placeholder:text-cream/30 outline-none focus:border-accent-bright/60 transition-colors"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-[0.95rem] font-medium text-cream transition-colors hover:bg-accent-deep shrink-0"
            >
              Join waitlist <ArrowRight size={16} />
            </button>
          </form>
        )}

        {/* Platform badges */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
          {[
            { icon: Apple,      store: 'App Store',    platform: 'iOS' },
            { icon: PlayCircle, store: 'Google Play',  platform: 'Android' },
          ].map(({ icon: Icon, store, platform }) => (
            <div
              key={store}
              className="flex items-center gap-3 rounded-2xl border border-cream/10 bg-charcoal-alt/60 px-5 py-3.5 text-cream/65 backdrop-blur-sm transition-colors hover:border-cream/20 hover:text-cream"
            >
              <Icon size={22} strokeWidth={1.5} />
              <div className="text-left leading-tight">
                <p className="text-[0.58rem] font-mono uppercase tracking-wider text-cream/35">Coming to</p>
                <p className="text-[0.88rem] font-medium">{store}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
