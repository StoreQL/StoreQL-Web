const SOURCES = [
  'Instagram', 'Chrome', 'Safari', 'WhatsApp', 'Telegram',
  'YouTube', 'TikTok', 'Reddit', 'and anywhere else',
];

export default function SourceMarquee() {
  // Duplicate 4× so there's always content visible and no gap
  const row = [...SOURCES, ...SOURCES, ...SOURCES, ...SOURCES];
  return (
    <div className="relative border-y border-inkline bg-charcoal-alt py-5 overflow-hidden w-full">
      {/* Fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-charcoal-alt to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-charcoal-alt to-transparent z-10" />

      <div className="flex animate-marquee will-change-transform" style={{ width: 'max-content' }}>
        {row.map((s, i) => (
          <span
            key={i}
            className="flex items-center gap-8 font-display text-[1.4rem] text-cream/30 whitespace-nowrap px-4"
          >
            {s}
            <span className="h-1.5 w-1.5 rounded-full bg-accent/40 shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}
