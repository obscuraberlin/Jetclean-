import Image from 'next/image';
import { PlaceholderBadge } from '@/components/ui/Badge';
import { clientLogos, logoStripHeadline } from '@/content/references';
import { siteConfig } from '@/content/site';
import { cn } from '@/lib/utils';

/**
 * Durchlaufende Logo-Leiste (CSS-only Marquee). Bei reduced motion steht sie
 * still und ist horizontal scrollbar.
 */
export function LogoStrip() {
  const hasPlaceholders = clientLogos.some((logo) => logo.isPlaceholder);
  const items = [...clientLogos, ...clientLogos];

  return (
    <section className="border-y border-line bg-white" aria-label="Kunden und Partner">
      <div className="container-site py-8 sm:py-10">
        <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-sm font-medium text-muted">{logoStripHeadline}</p>
          {hasPlaceholders && siteConfig.showPlaceholderBadges ? <PlaceholderBadge /> : null}
        </div>

        {/* Durchlaufende Logo-Leiste (pausiert bei Hover, bei reduced motion statisch scrollbar) */}
        <div className="group mt-6 scrollbar-none overflow-x-auto mask-fade-x">
          <ul
            className="flex w-max items-center gap-10 motion-safe:animate-marquee motion-safe:group-hover:[animation-play-state:paused] lg:gap-16"
            aria-label="Kundenlogos"
          >
            {items.map((logo, index) => (
              <li
                key={`${logo.name}-${index}`}
                className="shrink-0"
                aria-hidden={index >= clientLogos.length ? true : undefined}
              >
                <LogoItem name={logo.name} src={logo.src} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function LogoItem({ name, src }: { name: string; src?: string }) {
  if (src) {
    return (
      <Image
        src={src}
        alt={name}
        width={140}
        height={40}
        className="h-9 w-auto opacity-90 mix-blend-multiply transition-opacity hover:opacity-100 sm:h-11"
      />
    );
  }
  return (
    <span
      className={cn(
        'inline-flex h-9 items-center font-display text-[0.9rem] font-extrabold tracking-tight whitespace-nowrap text-navy-500 select-none',
      )}
      title={name}
    >
      {name}
    </span>
  );
}
