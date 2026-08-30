import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import logoPng from '../assets/logo.png';
import createPng from '../assets/create.png';
import dummyPostImg from '../assets/dummy_post.png';

/**
 * A self-playing, looping interactive demo of the StoreQL capture flow:
 * 1. Browsing Instagram travel post → taps Share button on post
 * 2. Share sheet opens → taps StoreQL icon
 * 3. StoreQL captures & fetches details automatically
 * 4. Adds a quick note on why it's worth keeping
 * 5. Taps Save → instantly added to top of Home feed
 */

const TIMELINE = [
  { id: 'browse',      start: 0,    end: 1100, scene: 'instagram', label: 'Share from anywhere' },
  { id: 'tapPostShare',start: 1100, end: 1800, scene: 'instagram', label: 'Share from anywhere' },
  { id: 'sheetUp',     start: 1800, end: 2500, scene: 'instagram', label: 'Share from anywhere' },
  { id: 'tapStoreQL',  start: 2500, end: 3200, scene: 'instagram', label: 'Share from anywhere' },
  { id: 'capturing',   start: 3200, end: 4300, scene: 'storeql',   label: 'StoreQL fetches details' },
  { id: 'resolved',    start: 4300, end: 5000, scene: 'storeql',   label: 'StoreQL fetches details' },
  { id: 'typing',      start: 5000, end: 7200, scene: 'storeql',   label: 'Add a quick note' },
  { id: 'tapSave',     start: 7200, end: 7900, scene: 'storeql',   label: 'Add a quick note' },
  { id: 'saved',       start: 7900, end: 8800, scene: 'storeql',   label: 'Saved — done' },
  { id: 'feedNew',     start: 8800, end: 11000, scene: 'home',     label: 'Saved — done' },
];
const LOOP_MS = TIMELINE[TIMELINE.length - 1].end;
const NOTE_TEXT = 'Must visit this seaside cafe on our trip';
const STEP_LABELS = ['Share from anywhere', 'StoreQL fetches details', 'Add a quick note', 'Saved — done'];

function clamp(v, min = 0, max = 1) {
  return Math.min(max, Math.max(min, v));
}

function useLoopClock(loopMs, active) {
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const id = setInterval(() => {
      setElapsed((performance.now() - start) % loopMs);
    }, 35);
    return () => clearInterval(id);
  }, [loopMs, active]);
  return elapsed;
}

function getSegment(elapsed) {
  return TIMELINE.find((seg) => elapsed >= seg.start && elapsed < seg.end) || TIMELINE[0];
}

/* ---------- Finger / Touch Pointer Component ---------- */
function FingerPointer({ progress = 0.5 }) {
  const isPressing = progress > 0.35 && progress < 0.85;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 8 }}
      animate={{ opacity: 1, scale: isPressing ? 0.92 : 1, y: isPressing ? 2 : 0 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
      className="pointer-events-none absolute z-50 -translate-x-2 -translate-y-1"
    >
      {/* Ripple ring on tap */}
      {isPressing && (
        <span className="absolute -left-2 -top-2 h-9 w-9 animate-ping rounded-full bg-accent/40 duration-500" />
      )}
      <span className="absolute -left-1 -top-1 h-6 w-6 rounded-full bg-accent/25" />

      {/* Realistic Touch Hand Pointer */}
      <svg
        viewBox="0 0 32 32"
        className="h-8 w-8 text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]"
        fill="currentColor"
      >
        <path
          d="M10 2a2 2 0 0 1 2 2v9.18a3.5 3.5 0 0 1 2-.68 3 3 0 0 1 2.5 1.34 3.5 3.5 0 0 1 2.5-.34 3 3 0 0 1 2.5 1.7 3 3 0 0 1 1.5 2.8v4c0 4.42-3.58 8-8 8s-8-3.58-8-8v-6a2 2 0 0 1 2-2c.35 0 .68.09.97.25V4a2 2 0 0 1 2-2z"
          stroke="#17160F"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}

/* ---------- Icons ---------- */
function IconHeart({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M12 20.2s-7.2-4.6-9.6-9.1C.7 7.7 2.4 4.4 5.7 3.8c2-.4 3.9.5 5 2.2 1.1-1.7 3-2.6 5-2.2 3.3.6 5 3.9 3.3 7.3-2.4 4.5-9.6 9.1-9.6 9.1z" />
    </svg>
  );
}

function IconComment({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M21 12a8 8 0 1 1-3.2-6.4L21 4l-1 3.6A7.9 7.9 0 0 1 21 12Z" />
    </svg>
  );
}

function IconShare({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 16V4M12 4 7.5 8.5M12 4l4.5 4.5M5 14v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconTag({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 4h7l9 9-7 7-9-9V4Z" strokeLinejoin="round" />
      <circle cx="8.5" cy="8.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconFolder({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2z" />
    </svg>
  );
}

function IconCheck({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.4">
      <path d="M5 12.5 9.5 17 19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StepDots({ activeIndex }) {
  return (
    <div className="absolute top-3 right-3 z-40 flex items-center gap-[5px] rounded-full bg-ink/75 px-2 py-[5px] backdrop-blur-md border border-white/8">
      {STEP_LABELS.map((label, i) => (
        <span
          key={label}
          className="h-[5px] rounded-full transition-all duration-300"
          style={{
            width: i === activeIndex ? 12 : 4,
            backgroundColor: i === activeIndex ? 'var(--color-accent-bright)' : 'rgba(255,255,255,0.22)',
          }}
        />
      ))}
    </div>
  );
}

/* ---------- Navigation Bars ---------- */

function InstagramBottomNav() {
  return (
    <div className="mt-auto border-t border-white/10 bg-[#0B0A08] px-4 pt-2 pb-2">
      <div className="flex items-center justify-between text-neutral-300">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.5" y2="16.5" />
        </svg>
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <line x1="12" y1="8" x2="12" y2="16" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="3" width="18" height="18" rx="4" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <polygon points="10 12 15 15 10 18 10 12" fill="currentColor" />
        </svg>
        <div className="h-5 w-5 rounded-full border border-white/40 bg-neutral-700" />
      </div>
      <div className="mx-auto mt-2 h-1 w-24 rounded-full bg-white/20" />
    </div>
  );
}

function StoreQLBottomNav({ active = 'home' }) {
  return (
    <div className="relative mt-auto border-t border-ink/8 bg-white px-2 pt-1 pb-2 shadow-[0_-2px_10px_rgba(23,22,15,0.03)]">
      {/* Center Cat Button */}
      <div className="absolute left-1/2 -top-[18px] -translate-x-1/2 cursor-pointer transition-transform hover:scale-105 active:scale-95">
        <img
          src={createPng}
          alt="Create"
          className="h-10 w-auto drop-shadow-[0_4px_8px_rgba(181,69,27,0.25)]"
        />
      </div>

      <div className="flex items-center justify-between px-1.5">
        <div className="flex flex-col items-center gap-0.5">
          <svg
            viewBox="0 0 24 24"
            className="h-4.5 w-4.5"
            fill={active === 'home' ? 'var(--color-accent)' : 'none'}
            stroke={active === 'home' ? 'var(--color-accent)' : '#8A877F'}
            strokeWidth="1.8"
          >
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
          <span
            className={`font-mono text-[8px] font-bold uppercase tracking-wider ${
              active === 'home' ? 'text-accent' : 'text-ash'
            }`}
          >
            Home
          </span>
        </div>

        <div className="flex flex-col items-center gap-0.5">
          <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 text-ash" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="4" y="8" width="16" height="12" rx="2" />
            <path d="M7 5h10M9 2h6" />
          </svg>
          <span className="font-mono text-[8px] font-bold uppercase tracking-wider text-ash/80">
            Spaces
          </span>
        </div>

        {/* Spacer for Center Button */}
        <div className="w-9" />

        <div className="flex flex-col items-center gap-0.5">
          <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 text-ash" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.5" y2="16.5" />
          </svg>
          <span className="font-mono text-[8px] font-bold uppercase tracking-wider text-ash/80">
            Search
          </span>
        </div>

        <div className="flex flex-col items-center gap-0.5">
          <div className="h-4.5 w-4.5 rounded-full overflow-hidden border border-ink/15 bg-neutral-300">
            <img src={logoPng} alt="Profile" className="h-full w-full object-cover" />
          </div>
          <span className="font-mono text-[8px] font-bold uppercase tracking-wider text-ash/80">
            Profile
          </span>
        </div>
      </div>

      <div className="mx-auto mt-1.5 h-1 w-24 rounded-full bg-ink/20" />
    </div>
  );
}

/* ---------- 1. Instagram Share Scene ---------- */
function InstagramScene({ segment, progress }) {
  const sheetProgress =
    segment.id === 'browse' || segment.id === 'tapPostShare'
      ? 0
      : segment.id === 'sheetUp'
      ? clamp(progress)
      : 1;

  const isTappingPostShare = segment.id === 'tapPostShare';
  const isTappingStoreQL = segment.id === 'tapStoreQL';

  return (
    <div className="absolute inset-0 flex flex-col bg-[#0B0A08] text-white rounded-[38px] overflow-hidden">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 p-[1.5px]">
            <div className="h-full w-full rounded-full bg-[#18181b]" />
          </div>
          <div>
            <p className="text-[11px] font-semibold leading-tight text-neutral-100">travel.escapes</p>
            <p className="text-[8.5px] text-neutral-400">Mediterranean Sea</p>
          </div>
        </div>
        <span className="text-[11px] text-neutral-400">•••</span>
      </div>

      {/* Post Image with Travel photo dummy_post.png */}
      <div className="relative mx-3 my-1.5 flex-1 overflow-hidden rounded-xl bg-neutral-900 shadow-inner flex flex-col justify-end">
        <img
          src={dummyPostImg}
          alt="Travel Destination"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        {/* Subtle bottom gradient & caption overlay */}
        <div className="relative z-10 bg-gradient-to-t from-black/85 via-black/35 to-transparent p-3 rounded-b-xl">
          <span className="rounded bg-black/60 px-1.5 py-0.5 font-mono text-[7.5px] uppercase tracking-wider text-white/90 backdrop-blur-sm">
            Travel
          </span>
          <p className="mt-1 text-[11px] font-medium leading-snug text-neutral-100 drop-shadow-sm">
            Hidden cliffside cafe overlooking the Mediterranean coast 🌊
          </p>
        </div>
      </div>

      {/* Action Row */}
      <div className="flex items-center justify-between px-4 py-1.5 text-neutral-300">
        <div className="relative flex items-center gap-3.5">
          <IconHeart className="h-4.5 w-4.5" />
          <IconComment className="h-4.5 w-4.5" />
          <div className="relative">
            <motion.span
              animate={isTappingPostShare ? { scale: [1, 1.25, 1] } : {}}
              transition={{ duration: 0.3 }}
              className="flex items-center"
              style={{ color: isTappingPostShare ? 'var(--color-accent-bright)' : undefined }}
            >
              <IconShare className="h-4.5 w-4.5" />
            </motion.span>

            {/* Finger tap directly on post share icon */}
            {isTappingPostShare && (
              <div className="absolute left-1/2 top-1/2">
                <FingerPointer progress={progress} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <InstagramBottomNav />

      {/* Share Sheet Drawer */}
      <div
        className="absolute inset-x-0 bottom-0 z-30 rounded-t-3xl border-t border-white/10 bg-[#1C1B18] px-4 pb-6 pt-3 shadow-[0_-10px_30px_rgba(0,0,0,0.7)]"
        style={{
          transform: `translateY(${(1 - sheetProgress) * 100}%)`,
          opacity: sheetProgress,
        }}
      >
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-neutral-600/70" />
        <p className="mb-2.5 text-[9.5px] font-semibold uppercase tracking-wider text-neutral-400">Share to</p>

        <div className="flex items-center justify-between px-1">
          {['Messages', 'WhatsApp', 'Notes'].map((app) => (
            <div key={app} className="flex flex-col items-center gap-1.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-neutral-800/80 border border-white/5 text-[9.5px] text-neutral-400">
                {app[0]}
              </div>
              <span className="text-[9px] text-neutral-400">{app}</span>
            </div>
          ))}

          {/* StoreQL App Target */}
          <div className="relative flex flex-col items-center gap-1.5">
            <motion.div
              animate={isTappingStoreQL ? { scale: [1, 0.88, 1.08, 1] } : {}}
              transition={{ duration: 0.3 }}
              className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-accent/40 bg-ink shadow-lg shadow-accent/25"
            >
              <img
                src={logoPng}
                alt="StoreQL"
                className="h-9 w-9 rounded-full object-cover"
              />
            </motion.div>
            <span className="text-[9px] font-semibold text-accent-bright">
              StoreQL
            </span>

            {/* Finger tap directly on StoreQL Icon */}
            {isTappingStoreQL && (
              <div className="absolute left-1/2 top-1/2">
                <FingerPointer progress={progress} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- 2. StoreQL Fast Capture Screen ---------- */
function StoreQLScene({ segment, progress }) {
  const isCapturing = segment.id === 'capturing';
  const isResolved = segment.id === 'resolved';
  const isTyping = segment.id === 'typing';
  const isTapSave = segment.id === 'tapSave';
  const isSaved = segment.id === 'saved';

  const typeProgress = isTyping ? clamp(progress / 0.7) : isTapSave || isSaved ? 1 : 0;
  const chipsOn = isTyping ? progress > 0.6 : isTapSave || isSaved;
  const typedLen = Math.round(NOTE_TEXT.length * typeProgress);

  return (
    <div className="absolute inset-0 flex flex-col bg-[#FAF9F6] text-ink rounded-[38px] overflow-hidden">
      <div className="flex-1 px-3.5 pt-4 overflow-hidden">
        {/* App Header */}
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logoPng} alt="StoreQL" className="h-5 w-5 rounded-full object-cover" />
            <span className="font-display text-[11.5px] font-semibold tracking-tight text-ink">StoreQL Capture</span>
          </div>
          <span className="rounded-full bg-accent/10 px-2 py-0.5 font-mono text-[7.5px] font-semibold text-accent uppercase tracking-wide">
            Instant Save
          </span>
        </div>

        {/* Captured Link Card with dummy_post.png thumbnail */}
        <div className="rounded-2xl border border-ink/8 bg-white p-2.5 shadow-[0_2px_8px_rgba(23,22,15,0.04)]">
          <div className="flex gap-2">
            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-neutral-200">
              {!isCapturing && (
                <img
                  src={dummyPostImg}
                  alt="Seaside Cafe"
                  className="h-full w-full object-cover object-center"
                />
              )}
              {isCapturing && (
                <div className="absolute inset-0 shimmer-bar" />
              )}
            </div>
            <div className="flex-1 space-y-1 pt-0.5 min-w-0">
              {isCapturing ? (
                <>
                  <div className="h-3 w-3/4 animate-pulse rounded-md bg-neutral-200" />
                  <div className="h-2 w-1/2 animate-pulse rounded-md bg-neutral-200/70" />
                </>
              ) : (
                <>
                  <p className="text-[11.5px] font-semibold leading-tight text-ink truncate">
                    Cliffside Mediterranean cafe & view
                  </p>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[9px] text-ash truncate">instagram.com</span>
                    <span className="text-ash/40">·</span>
                    <span className="font-mono text-[8.5px] text-accent font-medium">Auto-parsed</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Note Field */}
        <div
          className="mt-2 rounded-2xl border bg-white p-2.5 transition-all shadow-[0_2px_8px_rgba(23,22,15,0.04)]"
          style={{
            borderColor: isResolved || isTyping ? 'var(--color-accent)' : 'rgba(23,22,15,0.08)',
          }}
        >
          <div className="flex items-center justify-between mb-1">
            <p className="text-[8px] font-mono uppercase tracking-wider text-ash">
              Note (why it's worth keeping)
            </p>
            <span className="text-[7.5px] text-accent font-mono font-semibold">1 sentence</span>
          </div>
          <p className="min-h-[18px] text-[11px] leading-snug text-ink font-medium">
            {NOTE_TEXT.slice(0, typedLen)}
            {isTyping && (
              <span className="animate-pulse font-bold" style={{ color: 'var(--color-accent)' }}>
                |
              </span>
            )}
            {!isTyping && !isTapSave && !isSaved && typedLen === 0 && (
              <span className="text-ash/50 text-[10px]">Add quick reason for future-you...</span>
            )}
          </p>
        </div>

        {/* Folder & Tag Pills */}
        <div className="mt-2 flex flex-wrap items-center gap-1">
          <span
            className="flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[8.5px] font-medium transition-all"
            style={
              chipsOn
                ? { backgroundColor: 'var(--color-accent-soft)', color: 'var(--color-accent-deep)' }
                : { backgroundColor: '#F2F1ED', color: '#8A877F' }
            }
          >
            <IconFolder className="h-2.5 w-2.5" />
            Travel
          </span>
          <span
            className="flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[8.5px] font-medium transition-all"
            style={
              chipsOn
                ? { backgroundColor: '#F2F1ED', color: '#17160F' }
                : { backgroundColor: '#F2F1ED', color: '#8A877F' }
            }
          >
            <IconTag className="h-2.5 w-2.5" />
            #PlacesToVisit
          </span>
        </div>

        {/* Save Button with Finger Pointer */}
        <div className="relative mt-2.5 flex justify-end">
          <div className="relative">
            <motion.div
              animate={isTapSave || isSaved ? { scale: [1, 0.92, 1] } : {}}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-1.5 rounded-full bg-accent px-4 py-1.5 text-[10.5px] font-semibold text-white shadow-md shadow-accent/25"
            >
              <span>Save Link</span>
            </motion.div>

            {/* Finger tap directly on Save Link button */}
            {isTapSave && (
              <div className="absolute left-1/2 top-1/2">
                <FingerPointer progress={progress} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* StoreQL Bottom Nav */}
      <StoreQLBottomNav active="home" />

      {/* Saved Success Animation Overlay */}
      <AnimatePresence>
        {isSaved && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-30 flex items-center justify-center bg-[#FAF9F6]/95 backdrop-blur-sm"
          >
            <div className="flex flex-col items-center gap-2 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-success text-white shadow-lg shadow-success/30"
              >
                <IconCheck className="h-6 w-6" />
              </motion.div>
              <p className="text-[13px] font-bold text-ink">Captured to Travel</p>
              <p className="text-[10px] text-ash font-mono">Syncing across devices</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- 3. Home Feed Screen ---------- */
function HomeScene({ progress }) {
  const cardIn = clamp(progress / 0.35);
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden bg-[#FAF9F6] text-ink rounded-[38px]">
      <div className="flex-1 px-3.5 pt-4 overflow-hidden">
        {/* Header */}
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logoPng} alt="StoreQL" className="h-5 w-5 rounded-full object-cover" />
            <span className="font-display text-[12.5px] font-bold text-ink">StoreQL</span>
          </div>
          <span className="font-mono text-[8px] text-ash">3 captures today</span>
        </div>

        {/* Newly Captured Card with dummy_post.png thumbnail */}
        <div
          className="mb-2 flex items-start gap-2.5 rounded-2xl border border-accent/30 bg-white p-2.5 shadow-[0_4px_12px_rgba(181,69,27,0.08)] transition-all"
          style={{
            opacity: cardIn,
            transform: `translateY(${(1 - cardIn) * -16}px)`,
          }}
        >
          <div className="h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-neutral-100">
            <img
              src={dummyPostImg}
              alt="Seaside Cafe"
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[8px] text-ash">instagram.com · Just now</span>
              <span className="rounded-full bg-accent px-1.5 py-0.2 text-[7px] font-bold text-white uppercase">
                New
              </span>
            </div>
            <p className="truncate text-[11px] font-bold text-ink mt-0.5">
              Cliffside Mediterranean cafe & view
            </p>
            <p className="truncate text-[9.5px] italic text-accent-deep mt-0.5">
              "{NOTE_TEXT}"
            </p>
          </div>
        </div>

        {/* Existing Feed Items */}
        <div className="space-y-1.5 opacity-75">
          <div className="flex items-start gap-2.5 rounded-2xl border border-ink/8 bg-white p-2.5 shadow-sm">
            <div className="h-9 w-9 shrink-0 rounded-xl bg-neutral-200 flex items-center justify-center text-[10px]">
              💰
            </div>
            <div className="min-w-0 flex-1">
              <span className="font-mono text-[8px] text-ash">moneyletter.com · 2h ago</span>
              <p className="truncate text-[10.5px] font-semibold text-ink">Budget Calculator Q3</p>
              <p className="truncate text-[9px] text-ash italic">"Check before quarter closes"</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded-2xl border border-ink/8 bg-white p-2.5 shadow-sm">
            <div className="h-9 w-9 shrink-0 rounded-xl bg-neutral-200 flex items-center justify-center text-[10px]">
              🏋️
            </div>
            <div className="min-w-0 flex-1">
              <span className="font-mono text-[8px] text-ash">instagram.com · 5h ago</span>
              <p className="truncate text-[10.5px] font-semibold text-ink">Weighted sessions workout</p>
            </div>
          </div>
        </div>
      </div>

      {/* StoreQL Bottom Nav */}
      <StoreQLBottomNav active="home" />
    </div>
  );
}

/* ---------- Main Export Component ---------- */
export default function AppScreensDemo() {
  const prefersReduced = useReducedMotion();
  const elapsed = useLoopClock(LOOP_MS, !prefersReduced);
  const segment = getSegment(elapsed);
  const progress = clamp((elapsed - segment.start) / (segment.end - segment.start));
  const stepIndex = STEP_LABELS.indexOf(segment.label);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[38px] bg-ink">
      <AnimatePresence mode="wait">
        {segment.scene === 'instagram' && (
          <motion.div key="instagram" className="absolute inset-0 flex flex-col" exit={{ opacity: 0 }}>
            <InstagramScene segment={segment} progress={progress} />
          </motion.div>
        )}
        {segment.scene === 'storeql' && (
          <motion.div
            key="storeql"
            className="absolute inset-0 flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <StoreQLScene segment={segment} progress={progress} />
          </motion.div>
        )}
        {segment.scene === 'home' && (
          <motion.div
            key="home"
            className="absolute inset-0 flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <HomeScene progress={progress} />
          </motion.div>
        )}
      </AnimatePresence>

      <StepDots activeIndex={stepIndex} />
    </div>
  );
}
