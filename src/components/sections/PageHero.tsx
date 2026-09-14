import { Award, Clock, MapPin, Users } from 'lucide-react';
import Image from 'next/image';
import type { ReactNode } from 'react';
import { Breadcrumbs, type Crumb } from '@/components/ui/Breadcrumbs';
import { company } from '@/content/company';
import { cn } from '@/lib/utils';

type PageHeroProps = {
  eyebrow?: string;
  title: ReactNode;
  text?: ReactNode;
  breadcrumbs: Crumb[];
  children?: ReactNode;
  className?: string;
  /** Kompaktere Variante (z. B. Rechtstexte) */
  compact?: boolean;
  /** Foto rechts neben dem Text (Desktop) bzw. unter dem Text (Mobile) */
  image?: { src: string; alt: string };
  /** Kurze Fakten-Chips unter dem Text */
  facts?: boolean;
};

const facts = [
  { icon: Award, label: `Über ${company.yearsOfExperience} Jahre Erfahrung` },
  { icon: Users, label: 'Fester Ansprechpartner' },
  { icon: MapPin, label: company.serviceArea.label },
  { icon: Clock, label: company.openingHours?.display ?? '' },
].filter((fact) => fact.label);

/** Einheitlicher Seitenkopf für Unterseiten. */
export function PageHero({
  eyebrow,
  title,
  text,
  breadcrumbs,
  children,
  className,
  compact,
  image,
  facts: showFacts = Boolean(image),
}: PageHeroProps) {
  return (
    <section className={cn('relative overflow-hidden bg-surface-gradient', className)}>
      {/* dezente Farbfläche */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-[-10%] size-[28rem] rounded-full bg-brand-500/10 blur-3xl"
      />
      <div
        className={cn(
          'relative container-site',
          compact ? 'pt-6 pb-8 sm:pt-8 sm:pb-10' : 'pt-6 pb-10 sm:pt-8 sm:pb-14 lg:pb-16',
        )}
      >
        <Breadcrumbs items={breadcrumbs} />
        <div
          className={cn(
            'mt-6 sm:mt-8',
            image
              ? 'grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12'
              : !compact && 'mx-auto max-w-3xl',
          )}
        >
          <div className={cn('text-center', image && 'lg:col-span-7')}>
            {eyebrow ? (
              <p className="text-xs font-semibold tracking-[0.16em] text-brand-600 uppercase">
                {eyebrow}
              </p>
            ) : null}
            <h1
              className={cn(
                'mt-3',
                compact
                  ? 'text-3xl sm:text-4xl'
                  : 'text-4xl leading-[1.08] sm:text-5xl lg:text-[3.25rem]',
              )}
            >
              {title}
            </h1>
            {text ? (
              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                {text}
              </p>
            ) : null}
            {children ? <div className="mt-7 flex flex-col items-center">{children}</div> : null}
            {showFacts ? (
              <ul
                className="mt-7 flex flex-wrap justify-center gap-2.5"
                aria-label="Auf einen Blick"
              >
                {facts.map((fact) => (
                  <li
                    key={fact.label}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-sm font-medium text-navy-800 shadow-soft ring-1 ring-line"
                  >
                    <fact.icon className="size-4 text-brand-500" aria-hidden="true" />
                    {fact.label}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          {image ? (
            <figure className="relative lg:col-span-5">
              <div
                aria-hidden="true"
                className="absolute -right-4 -bottom-4 h-2/3 w-2/3 rounded-[2rem] bg-brand-500/15"
              />
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lift">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-navy-950/25 via-transparent to-transparent"
                />
                <figcaption className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3.5 py-1.5 font-display text-sm font-bold text-navy-950 shadow-soft backdrop-blur">
                  {company.claim}
                </figcaption>
              </div>
            </figure>
          ) : null}
        </div>
      </div>
    </section>
  );
}
