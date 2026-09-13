import Image from 'next/image';
import { Badge, PlaceholderBadge } from '@/components/ui/Badge';
import { Reveal } from '@/components/ui/Reveal';
import { caseStudies } from '@/content/references';
import { getServiceBySlug } from '@/content/services';
import { siteConfig } from '@/content/site';
import { cn } from '@/lib/utils';

export function CaseStudies() {
  return (
    <div className="space-y-8 lg:space-y-12">
      {caseStudies.map((study, index) => (
        <Reveal key={study.id} as="article">
          <div
            className={cn(
              'grid overflow-hidden rounded-3xl border border-line bg-white shadow-soft lg:grid-cols-12',
              index % 2 === 1 && 'lg:[&>figure]:order-2',
            )}
          >
            <figure className="relative aspect-[16/10] lg:col-span-5 lg:aspect-auto lg:min-h-[22rem]">
              <Image
                src={study.image.src}
                alt={study.image.alt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </figure>
            <div className="p-6 sm:p-8 lg:col-span-7 lg:p-10">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="brand">{study.industry}</Badge>
                {study.services.map((slug) => {
                  const service = getServiceBySlug(slug);
                  return service ? (
                    <Badge key={slug} tone="neutral">
                      {service.title}
                    </Badge>
                  ) : null;
                })}
                {study.isPlaceholder && siteConfig.showPlaceholderBadges ? (
                  <PlaceholderBadge />
                ) : null}
              </div>
              <h3 className="mt-4 text-xl font-bold sm:text-2xl">{study.title}</h3>
              <dl className="mt-5 grid gap-5 sm:grid-cols-3">
                <CaseBlock label="Herausforderung" text={study.challenge} />
                <CaseBlock label="Lösung" text={study.solution} />
                <CaseBlock label="Ergebnis" text={study.result} />
              </dl>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

function CaseBlock({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold tracking-[0.12em] text-brand-600 uppercase">{label}</dt>
      <dd className="mt-1.5 text-sm leading-relaxed text-navy-800">{text}</dd>
    </div>
  );
}
