import Link from 'next/link';
import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
  /** Kompakte Variante ohne Untertitel */
  compact?: boolean;
  /** Weißes Logo auf dunklem Grund */
  inverse?: boolean;
  asLink?: boolean;
};

/**
 * JETCLEAN Wortmarke.
 * PLATZHALTER: Nachbau der Vorlage als Inline-SVG/HTML. Sobald die offizielle Logodatei
 * vorliegt, hier durch `<Image src="/images/logo.svg" ... />` ersetzen (siehe docs/IMAGES.md).
 */
export function Logo({ className, compact, inverse, asLink = true }: LogoProps) {
  const content = (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark className="size-9 shrink-0 sm:size-10" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-display text-[1.375rem] font-extrabold tracking-[-0.03em] sm:text-2xl',
            inverse ? 'text-white' : 'text-navy-950',
          )}
        >
          JET<span className="text-brand-500">CLEAN</span>
        </span>
        {!compact ? (
          <span
            className={cn(
              'mt-1 text-[0.5rem] font-semibold tracking-[0.22em] whitespace-nowrap uppercase sm:text-[0.5625rem]',
              inverse ? 'text-navy-300' : 'text-navy-500',
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

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false">
      <rect x="2" y="2" width="36" height="36" rx="11" fill="#0b1329" />
      <path
        d="M11 20.5 20 12l9 8.5"
        fill="none"
        stroke="#ee6212"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.5 19v8.5a1.5 1.5 0 0 0 1.5 1.5h10a1.5 1.5 0 0 0 1.5-1.5V19"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m16.75 23.5 2.3 2.3 4.5-4.6"
        fill="none"
        stroke="#ee6212"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
