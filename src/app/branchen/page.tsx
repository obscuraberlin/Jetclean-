import type { Metadata } from 'next';
import { ArrowRight, Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { CtaSection } from '@/components/sections/CtaSection';
import { PageHero } from '@/components/sections/PageHero';
import { IconBox } from '@/components/ui/IconBox';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { industries } from '@/content/industries';
import { getServiceBySlug } from '@/content/services';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Branchen – Gebäudereinigung für Büros, Praxen, Gewerbe & Hausverwaltungen',
  description:
    'JETCLEAN reinigt für Büros, Praxen, Gewerbe, Hausverwaltungen, Immobilienunternehmen, Kanzleien und Agenturen in Berlin – mit Reinigungskonzepten, die zu Ihrer Branche passen.',
  path: '/branchen',
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Branchen"
        title={
          <>
            Reinigungskonzepte, die zu <span className="text-accent">Ihrer Branche</span> passen.
          </>
        }
        text="Jede Branche hat eigene Anforderungen an Hygiene, Zeiten und Diskretion. Wir kennen sie – und planen die Reinigung entsprechend."
        breadcrumbs={[{ name: 'Branchen', path: '/branchen' }]}
        image={{
          src: '/images/cases/office.webp',
          alt: 'Besprechungsraum eines Berliner Unternehmens nach der Reinigung',
        }}
      />
      <section className="section-y-sm" aria-label="Branchen im Überblick">
        <div className="container-site">
          <RevealGroup as="ul" className="grid gap-5 md:grid-cols-2 lg:gap-6">
            {industries.map((industry) => (
              <RevealItem
                key={industry.slug}
                as="li"
                className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-soft transition-[transform,box-shadow] duration-300 ease-(--ease-premium) hover:shadow-card motion-safe:hover:-translate-y-1"
              >
                <div className="relative aspect-[16/7] overflow-hidden">
                  <Image
                    src={industry.image.src}
                    alt={industry.image.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 ease-(--ease-premium) motion-safe:group-hover:scale-[1.03]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-navy-950/10 to-transparent"
                  />
                  <IconBox
                    icon={industry.icon}
                    tone="soft"
                    size="md"
                    className="absolute top-4 left-4"
                  />
                  <div className="absolute right-5 bottom-4 left-5">
                    <h2 className="text-xl font-bold text-white sm:text-2xl">{industry.title}</h2>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <p className="text-sm font-semibold text-brand-600">{industry.teaser}</p>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                    {industry.description}
                  </p>
                  <ul className="mt-4 grid gap-2 text-sm text-navy-800 sm:grid-cols-1">
                    {industry.needs.map((need) => (
                      <li key={need} className="flex items-center gap-2.5">
                        <span
                          className="flex size-5 shrink-0 items-center justify-center rounded-full bg-success-50 text-success-600"
                          aria-hidden="true"
                        >
                          <Check className="size-3" strokeWidth={3} />
                        </span>
                        {need}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-wrap gap-2 border-t border-line pt-5 [&:not(:first-child)]:mt-5">
                    {industry.services.map((slug) => {
                      const service = getServiceBySlug(slug);
                      return service ? (
                        <Link
                          key={slug}
                          href={`/leistungen/${service.slug}`}
                          className="inline-flex items-center gap-1 rounded-full bg-surface px-3 py-1.5 text-xs font-semibold text-navy-800 ring-1 ring-line transition-colors hover:bg-brand-50 hover:text-brand-700 hover:ring-brand-200"
                        >
                          {service.title}
                          <ArrowRight className="size-3" aria-hidden="true" />
                        </Link>
                      ) : null;
                    })}
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
      <CtaSection
        source="industries"
        title="Ihre Branche ist nicht dabei?"
        text="Kein Problem – wir entwickeln für jedes Objekt ein passendes Reinigungskonzept. Sprechen Sie uns an."
      />
    </>
  );
}
