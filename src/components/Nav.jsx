import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import Logo from './Logo.jsx';

const LINKS = [
  { label: 'Product',      href: '#product' },
  { label: 'How it works', href: '#flow' },
  { label: 'Note',         href: '#matter' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on desktop resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <>
      <div className="fixed top-4 md:top-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        <motion.header
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`pointer-events-auto flex items-center justify-between w-full max-w-[840px] h-[52px] md:h-[56px] rounded-full px-3.5 md:px-5 py-2 transition-all duration-300 ${
            scrolled
              ? 'bg-ink/85 backdrop-blur-2xl border border-white/12 shadow-[0_16px_40px_-8px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.06)]'
              : 'bg-ink/65 backdrop-blur-xl border border-white/8 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.03)]'
          }`}
        >
          {/* Brand Logo */}
          <a
            href="#top"
            aria-label="StoreQL home"
            className="flex items-center gap-2 group transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <Logo markClassName="h-10 w-10" className="gap-2.5" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {LINKS.map((l, idx) => (
              <a
                key={l.href}
                href={l.href}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`relative px-4 py-1.5 text-[0.84rem] font-medium transition-colors duration-200 ${
                  hoveredIdx === idx ? 'text-cream' : 'text-cream/70'
                }`}
              >
                {hoveredIdx === idx && (
                  <motion.span
                    layoutId="navHoverPill"
                    className="absolute inset-0 rounded-full bg-white/[0.12] border border-white/[0.14] shadow-sm backdrop-blur-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                  />
                )}
                <span className="relative z-10">{l.label}</span>
              </a>
            ))}
          </nav>

          {/* Right Action CTA */}
          <div className="flex items-center gap-2">
            <a
              href="#cta"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-1.5 text-[0.8rem] font-semibold text-white shadow-[0_2px_12px_rgba(181,69,27,0.35)] hover:bg-accent-deep hover:shadow-[0_4px_16px_rgba(181,69,27,0.45)] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Join waitlist</span>
              <ArrowUpRight size={13} className="opacity-80" />
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="md:hidden flex items-center justify-center h-8 w-8 rounded-full border border-white/10 bg-white/5 text-cream/90 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {menuOpen ? <X size={15} /> : <Menu size={15} />}
            </button>
          </div>
        </motion.header>
      </div>

      {/* Mobile Glass Dropdown Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            />

            {/* Floating Drawer */}
            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.96 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-4 top-[72px] z-50 mx-auto max-w-[420px] rounded-3xl border border-white/12 bg-ink/90 p-5 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
            >
              <nav className="flex flex-col gap-1">
                {LINKS.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-2xl px-4 py-2.5 text-[0.9rem] font-medium text-cream/75 hover:bg-white/8 hover:text-cream transition-all"
                  >
                    {l.label}
                  </a>
                ))}
              </nav>

              <div className="mt-3 pt-3 border-t border-white/10">
                <a
                  href="#cta"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-1.5 w-full rounded-full bg-accent py-2.5 text-[0.88rem] font-semibold text-white shadow-lg shadow-accent/25 hover:bg-accent-deep transition-colors"
                >
                  <span>Join waitlist</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
