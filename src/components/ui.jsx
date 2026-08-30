export function Container({ className = '', children }) {
  return <div className={`mx-auto w-full max-w-[1180px] px-6 md:px-10 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, className = '' }) {
  return (
    <span
      className={`font-mono text-[0.7rem] uppercase tracking-[0.22em] text-accent-bright/90 ${className}`}
    >
      {children}
    </span>
  );
}

export function Button({ as: Tag = 'button', variant = 'primary', className = '', children, ...props }) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[0.95rem] font-medium transition-colors duration-200 focus-visible:outline-2';
  const variants = {
    primary: 'bg-cream text-ink hover:bg-white',
    accent: 'bg-accent text-cream hover:bg-accent-deep',
    ghost: 'bg-transparent text-cream/90 border border-cream/20 hover:border-cream/50 hover:text-cream',
    darkGhost: 'bg-transparent text-ink border border-ink/15 hover:border-ink/40',
  };
  return (
    <Tag className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </Tag>
  );
}
