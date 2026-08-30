export default function PhoneFrame({ children, className = '', screenClassName = '', showNotch = true }) {
  return (
    <div
      className={`relative w-[300px] h-[612px] rounded-[42px] bg-charcoal p-[10px] shadow-[0_1px_1px_rgba(0,0,0,0.4),0_40px_80px_-24px_rgba(0,0,0,0.7)] ring-1 ring-inkline/60 ${className}`}
    >
      <div
        className={`relative h-full w-full overflow-hidden rounded-[32px] bg-ink ${screenClassName}`}
      >
        {showNotch && (
          <div className="absolute left-1/2 top-2 z-20 h-[22px] w-[104px] -translate-x-1/2 rounded-full bg-charcoal" />
        )}
        {children}
      </div>
    </div>
  );
}
