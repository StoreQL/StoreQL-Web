import { useState } from 'react';
import { motion } from 'framer-motion';
import { Apple, PlayCircle, ArrowRight, Check, Loader2 } from 'lucide-react';
import { Container, Eyebrow } from '../components/ui.jsx';

const GOOGLE_SCRIPT_URL = import.meta.env.VITE_WAITLIST_API_URL || '';

export default function CTA() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email.includes('@')) return;

    setLoading(true);
    setError('');

    // 1. Detect location & timezone in background
    let locationData = {
      city: '',
      region: '',
      country: '',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || '',
    };

    try {
      const geoRes = await fetch('https://ipapi.co/json/', { cache: 'no-store' });
      if (geoRes.ok) {
        const geo = await geoRes.json();
        locationData.city = geo.city || '';
        locationData.region = geo.region || '';
        locationData.country = geo.country_name || geo.country || '';
        if (geo.timezone) locationData.timezone = geo.timezone;
      }
    } catch {
      // Fallback silently if ad-blocker or offline
    }

    try {
      if (GOOGLE_SCRIPT_URL) {
        // 2. Send email + location details to Google Sheet
        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            city: locationData.city,
            region: locationData.region,
            country: locationData.country,
            timezone: locationData.timezone,
            timestamp: new Date().toLocaleString(),
            source: 'storeql-web',
          }),
        });
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Failed to submit email:', err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
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
            <span>You're on the list ({email}) — we'll be in touch!</span>
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
              disabled={loading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="w-full flex-1 rounded-full border border-cream/12 bg-charcoal-alt px-5 py-3.5 text-[0.95rem] text-cream placeholder:text-cream/30 outline-none focus:border-accent-bright/60 transition-colors disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-[0.95rem] font-medium text-cream transition-colors hover:bg-accent-deep shrink-0 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Joining...</span>
                </>
              ) : (
                <>
                  <span>Join waitlist</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        )}

        {error && (
          <p className="mt-3 text-xs text-danger">{error}</p>
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
