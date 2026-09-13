import type { ReactNode } from 'react';
import { Breadcrumbs, type Crumb } from '@/components/ui/Breadcrumbs';
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
};

/** Einheitlicher Seitenkopf für Unterseiten. */
export function PageHero({
  eyebrow,
  title,
  text,
  breadcrumbs,
  children,
  className,
  compact,
}: PageHeroProps) {
  return (
    <section className={cn('bg-surface-gradient', className)}>
      <div
        className={cn(
          'container-site',
          compact ? 'pt-6 pb-8 sm:pt-8 sm:pb-10' : 'pt-6 pb-10 sm:pt-8 sm:pb-14 lg:pb-20',
        )}
      >
        <Breadcrumbs items={breadcrumbs} />
        <div className={cn('mt-6 sm:mt-8', !compact && 'max-w-3xl')}>
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
                : 'text-4xl leading-[1.08] sm:text-5xl lg:text-[3.375rem]',
            )}
          >
            {title}
          </h1>
          {text ? (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{text}</p>
          ) : null}
          {children ? <div className="mt-7">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
