/**
 * Logo.jsx
 * ---------------------------------------------------------------
 * Uses the app's real mark — the sunglasses-cat avatar cropped
 * straight from a StoreQL screenshot — at src/assets/logo.png.
 * It's already a filled circle, so it drops cleanly onto any
 * background, light or dark, at any size.
 * ---------------------------------------------------------------
 */
import logoPng from '../assets/logo.png';

export function LogoMark({ className = 'h-8 w-8' }) {
  return (
    <img
      src={logoPng}
      alt="StoreQL"
      className={`${className} rounded-full object-cover`}
    />
  );
}

export default function Logo({ className = '', markClassName = 'h-8 w-8', wordmark = true, dark = false }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark className={markClassName} />
      {wordmark && (
        <span
          className={`font-display text-[1.4rem] leading-none tracking-tight ${
            dark ? 'text-ink' : 'text-cream'
          }`}
        >
          StoreQL
        </span>
      )}
    </div>
  );
}
