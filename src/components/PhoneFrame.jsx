export default function PhoneFrame({ children, className = '', screenClassName = '', showNotch = true }) {
  return (
    <div
      className={`relative w-[320px] h-[660px] rounded-[48px] bg-charcoal p-[11px] shadow-[0_2px_2px_rgba(0,0,0,0.35),0_48px_96px_-20px_rgba(0,0,0,0.75)] ring-1 ring-inkline/50 ${className}`}
    >
      {/* Side buttons — volume */}
      <div className="pointer-events-none absolute -left-[3px] top-[110px] h-[32px] w-[3px] rounded-l-sm bg-charcoal/80" />
      <div className="pointer-events-none absolute -left-[3px] top-[155px] h-[54px] w-[3px] rounded-l-sm bg-charcoal/80" />
      <div className="pointer-events-none absolute -left-[3px] top-[220px] h-[54px] w-[3px] rounded-l-sm bg-charcoal/80" />
      {/* Side button — power */}
      <div className="pointer-events-none absolute -right-[3px] top-[160px] h-[72px] w-[3px] rounded-r-sm bg-charcoal/80" />
      <div
        className={`relative h-full w-full overflow-hidden rounded-[38px] bg-ink ${screenClassName}`}
      >
        {showNotch && (
          <div className="absolute left-1/2 top-2.5 z-20 h-[20px] w-[90px] -translate-x-1/2 rounded-full bg-charcoal" />
        )}
        {children}
      </div>
    </div>
  );
}
