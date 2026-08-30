import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { Container, Eyebrow } from '../components/ui.jsx';

export default function ThemeShowcase() {
  const [dark, setDark] = useState(true);

  return (
    <section className="bg-cream py-28 md:py-36 text-ink">
      <Container className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <div>
          <Eyebrow className="text-accent">Down to the token</Eyebrow>
          <h2 className="mt-4 font-display text-[2.4rem] leading-[1.1] text-ink sm:text-[2.8rem] text-balance">
            One palette. Built for light rooms and late nights.
          </h2>
          <p className="mt-6 max-w-md text-[1.02rem] leading-relaxed text-slate">
            Warm off-whites, deep charcoal instead of pure black, a single
            confident terracotta accent — no gradients doing the heavy lifting.
            The same token set runs the whole app, light or dark.
          </p>

          <button
            onClick={() => setDark((d) => !d)}
            className="mt-8 inline-flex items-center gap-3 rounded-full border border-ink/12 bg-white px-5 py-3 text-[0.9rem] font-medium text-ink transition-colors hover:border-ink/30"
          >
            <motion.span
              key={dark ? 'moon' : 'sun'}
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-accent"
            >
              {dark ? <Moon size={16} /> : <Sun size={16} />}
            </motion.span>
            Preview {dark ? 'light' : 'dark'} mode
          </button>
        </div>

        <motion.div
          animate={{ backgroundColor: dark ? '#17160F' : '#FAF9F6' }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl p-8 shadow-[var(--shadow-card)]"
        >
          <motion.div
            animate={{
              backgroundColor: dark ? '#2A2823' : '#FFFFFF',
              borderColor: dark ? '#37342C' : '#E7E5DF',
            }}
            transition={{ duration: 0.5 }}
            className="rounded-xl border p-5"
          >
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 shrink-0 rounded-lg bg-gradient-to-br from-accent-soft to-accent" />
              <div>
                <motion.p
                  animate={{ color: dark ? '#FAF9F6' : '#17160F' }}
                  className="text-[0.95rem] font-medium"
                >
                  Budget Calculator
                </motion.p>
                <p className="font-mono text-[0.65rem] text-ash">moneyletter.com</p>
              </div>
            </div>
            <motion.p
              animate={{ color: dark ? '#C9C6BE' : '#5A574F' }}
              className="mt-3 text-[0.85rem] leading-relaxed"
            >
              "Budget ration — check this before the quarter closes."
            </motion.p>
            <div className="mt-4 flex items-center justify-between">
              <span
                className="rounded-full px-2.5 py-1 font-mono text-[0.62rem]"
                style={{
                  backgroundColor: dark ? '#4A2E22' : '#E7C7B4',
                  color: dark ? '#D97A4C' : '#7E2F11',
                }}
              >
                Business
              </span>
              <span className="font-mono text-[0.62rem] text-ash">2h ago</span>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
