import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
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
      />
      <section className="section-y-sm" aria-label="Branchen im Überblick">
        <div className="container-site">
          <RevealGroup as="ul" className="grid gap-5 md:grid-cols-2 lg:gap-6">
            {industries.map((industry) => (
              <RevealItem
                key={industry.slug}
                as="li"
                className="flex flex-col rounded-3xl border border-line bg-white p-6 shadow-soft sm:p-7"
              >
                <div className="flex items-start gap-4">
                  <IconBox icon={industry.icon} tone="brand" size="lg" />
                  <div className="min-w-0">
                    <h2 className="text-xl font-bold">{industry.title}</h2>
                    <p className="mt-1 text-sm font-medium text-navy-700">{industry.teaser}</p>
                  </div>
                </div>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">
                  {industry.description}
                </p>
                <ul className="mt-4 space-y-1.5 text-sm text-navy-800">
                  {industry.needs.map((need) => (
                    <li key={need} className="flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-brand-500" aria-hidden="true" />
                      {need}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2 border-t border-line pt-5">
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
