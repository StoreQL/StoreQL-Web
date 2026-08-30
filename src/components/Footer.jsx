import Logo from './Logo.jsx';
import { Container } from './ui.jsx';

export default function Footer() {
  return (
    <footer className="border-t border-inkline bg-ink py-14">
      <Container className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between">
        <div>
          <Logo markClassName="h-7 w-7" />
          <p className="mt-3 max-w-[240px] text-[0.85rem] leading-relaxed text-cream/40">
            Store Quick Links. A personal capture system for the things you find
            and the reasons you kept them.
          </p>
        </div>

        <div className="flex gap-16 text-center md:text-left">
          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-wide text-cream/35">Product</p>
            <ul className="mt-3 space-y-2 text-[0.85rem] text-cream/55">
              <li><a href="#product" className="hover:text-cream">Features</a></li>
              <li><a href="#flow" className="hover:text-cream">How it works</a></li>
              <li><a href="#matter" className="hover:text-cream">Note</a></li>
            </ul>
          </div>
          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-wide text-cream/35">Get it</p>
            <ul className="mt-3 space-y-2 text-[0.85rem] text-cream/55">
              <li><a href="#cta" className="hover:text-cream">Join waitlist</a></li>
              <li><a href="#cta" className="hover:text-cream">iOS</a></li>
              <li><a href="#cta" className="hover:text-cream">Android</a></li>
            </ul>
          </div>
        </div>
      </Container>

      <Container className="mt-12">
        <div className="hairline" />
        <p className="mt-6 text-center font-mono text-[0.7rem] text-cream/30">
          © {new Date().getFullYear()} StoreQL. Built for saving your important links.
        </p>
      </Container>
    </footer>
  );
}
