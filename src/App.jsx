import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import Hero from './sections/Hero.jsx';
import SourceMarquee from './sections/SourceMarquee.jsx';
import OldVsNew from './sections/OldVsNew.jsx';
import MatterSpotlight from './sections/MatterSpotlight.jsx';
import FeatureGrid from './sections/FeatureGrid.jsx';

import CTA from './sections/CTA.jsx';
import { useSmoothScroll } from './lib/useSmoothScroll.js';

export default function App() {
  useSmoothScroll();

  return (
    <div className="relative bg-ink" style={{ overflowX: 'hidden', width: '100%', maxWidth: '100vw' }}>
      <div className="grain" />
      <Nav />
      <main>
        <Hero />
        <SourceMarquee />
        <OldVsNew />
        <MatterSpotlight />
        <FeatureGrid />

        <CTA />
      </main>
      <Footer />
    </div>
  );
}
