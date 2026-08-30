import { FolderOpen, Wand2, Tags, Search, CloudOff, ShieldCheck } from 'lucide-react';
import { useScrollReveal } from '../lib/useScrollReveal.js';
import { Container, Eyebrow } from '../components/ui.jsx';

const FEATURES = [
  {
    icon: FolderOpen,
    title: 'Folders',
    body: 'Group links by project or topic — Travel, Business, Math & Science. Skip it entirely and sort later.',
  },
  {
    icon: Wand2,
    title: 'Automatic metadata',
    body: "Title, description, domain and thumbnail arrive on their own. If a site blocks us, the link still saves — details fill in later.",
  },
  {
    icon: Tags,
    title: 'Lightweight tags',
    body: 'Add a tag in one tap or none at all. Tags describe, they never gate a save.',
  },
  {
    icon: Search,
    title: 'One search, everything',
    body: 'Titles, URLs, domains, Notes, folders and tags — one field finds all of it.',
  },
  {
    icon: CloudOff,
    title: 'Built for bad signal',
    body: "Share on a dead subway connection and it still saves. StoreQL syncs the moment you're back online.",
  },
  {
    icon: ShieldCheck,
    title: 'Yours, verified',
    body: 'Every save is tied to your account — never guessed, never shared across devices without your permission.',
  },
];

export default function FeatureGrid() {
  const scope = useScrollReveal();
  return (
    <section id="product" ref={scope} className="bg-ink py-28 md:py-36 overflow-hidden">
      <Container>
        <div data-reveal className="max-w-xl">
          <Eyebrow>What's inside</Eyebrow>
          <h2 className="mt-4 font-display text-[2.4rem] leading-[1.1] text-cream sm:text-[2.9rem] text-balance">
            Everything a capture app needs. Nothing it doesn't.
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-inkline sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, body }, idx) => (
            <div
              key={title}
              data-reveal
              className="group relative bg-ink p-8 transition-colors duration-300 hover:bg-charcoal-alt"
              style={{ transitionDelay: `${idx * 40}ms` }}
            >
              {/* Hover accent line at top */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/0 to-transparent transition-all duration-500 group-hover:via-accent/50" />

              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-inkline bg-charcoal-alt transition-colors duration-300 group-hover:border-accent/30 group-hover:bg-accent/10">
                <Icon size={18} strokeWidth={1.5} className="text-accent-bright transition-colors duration-300 group-hover:text-accent-bright" />
              </div>

              <h3 className="mt-5 font-display text-[1.2rem] text-cream">{title}</h3>
              <p className="mt-2.5 text-[0.9rem] leading-relaxed text-cream/45 group-hover:text-cream/60 transition-colors duration-300">{body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
