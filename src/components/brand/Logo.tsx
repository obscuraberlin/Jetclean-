import Link from 'next/link';
import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
  /** Kompakte Variante ohne Untertitel */
  compact?: boolean;
  /** Helle Variante auf dunklem Grund */
  inverse?: boolean;
  asLink?: boolean;
};

/**
 * JETCLEAN Logo – Bildmarke als Vektor-Nachbau des Originals (Haus, Blatt, Swoosh),
 * Wortmarke als Text in der Display-Schrift. Die Quelle der Bildmarke liegt zusätzlich
 * als eigenständige Datei unter /public/images/brand/jetclean-mark.svg.
 */
export function Logo({ className, compact, inverse, asLink = true }: LogoProps) {
  const content = (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <LogoMark className="h-9 w-auto shrink-0 sm:h-10" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-display text-xl font-extrabold tracking-[-0.02em] sm:text-2xl',
            inverse ? 'text-white' : 'text-[#ee6f12]',
          )}
        >
          JETCLEAN
        </span>
        {!compact ? (
          <span
            className={cn(
              'mt-1 hidden text-[0.5rem] font-medium tracking-[0.22em] whitespace-nowrap uppercase sm:block sm:text-[0.5625rem]',
              inverse ? 'text-navy-200' : 'text-navy-950',
            )}
          >
            Gebäudeservice GmbH
          </span>
        ) : null}
      </span>
    </span>
  );

  if (!asLink) return content;
  return (
    <Link href="/" title="Zur Startseite" className="inline-flex rounded-lg">
      {content}
    </Link>
  );
}

/** Bildmarke: Haus mit Fenster, Blatt und Swoosh (viewBox 300×220). */
export function LogoMark({ className, id = 'jc' }: { className?: string; id?: string }) {
  return (
    <svg viewBox="0 0 300 220" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-swoosh`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#f7931e" />
          <stop offset="1" stopColor="#e85d04" />
        </linearGradient>
        <linearGradient id={`${id}-leaf`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#6aa823" />
          <stop offset="1" stopColor="#8dc93b" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${id}-swoosh)`}
        d="M12 154C50 128 100 130 155 165C195 190 235 188 262 168C236 200 176 206 124 182C88 165 48 156 12 154Z"
      />
      <rect x="121" y="70" width="16" height="76" fill="#111111" />
      <rect x="253" y="70" width="16" height="84" fill="#111111" />
      <path fill="#111111" d="M80 92L193 6L298 92H278L193 27L100 92Z" />
      <path d="M173 92V72a20 20 0 0 1 40 0v20Z" fill="#f26f11" />
      <rect x="191" y="52" width="4" height="40" fill="#ffffff" />
      <rect x="173" y="72" width="40" height="4" fill="#ffffff" />
      <path
        fill={`url(#${id}-leaf)`}
        d="M192 186C178 150 204 100 283 80C287 132 250 180 192 186Z"
      />
      <path
        d="M196 180C220 140 248 110 278 86"
        fill="none"
        stroke="#ffffff"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
