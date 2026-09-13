import type { Metadata } from 'next';
import { CtaSection } from '@/components/sections/CtaSection';
import { PageHero } from '@/components/sections/PageHero';
import { ServiceCard } from '@/components/sections/ServiceCard';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { company } from '@/content/company';
import { additionalServices, services } from '@/content/services';
import { QuoteButton } from '@/components/quote/QuoteButton';
import { Check } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Leistungen – Gebäudereinigung in Berlin',
  description:
    'Alle Reinigungsleistungen von JETCLEAN in Berlin: Büroreinigung, Unterhaltsreinigung, Glasreinigung, Treppenhausreinigung, Grundreinigung und Sonderreinigung für Unternehmen.',
  path: '/leistungen',
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Leistungen"
        title={
          <>
            Reinigungsleistungen für <span className="text-accent">Berliner Unternehmen.</span>
          </>
        }
        text={`Von der täglichen Unterhaltsreinigung bis zur Sonderreinigung: ${company.shortName} bietet alle Leistungen aus einer Hand – mit festen Teams und einem persönlichen Ansprechpartner.`}
        breadcrumbs={[{ name: 'Leistungen', path: '/leistungen' }]}
        image={{
          src: '/images/hero/office.webp',
          alt: 'Frisch gereinigtes Berliner Büro mit Blick auf die Stadt',
        }}
      />
      <section className="section-y-sm" aria-label="Alle Leistungen">
        <div className="container-site">
          <RevealGroup as="ul" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {services.map((service, index) => (
              <RevealItem key={service.slug} as="li">
                <ServiceCard
                  service={service}
                  priority={index < 3}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
      <section className="bg-surface section-y-sm" aria-labelledby="more-services-title">
        <div className="container-site grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold tracking-[0.16em] text-brand-600 uppercase">
              Auch das übernehmen wir
            </p>
            <h2 id="more-services-title" className="mt-3 text-3xl sm:text-4xl">
              Weitere Leistungen auf Anfrage.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Von der Bauendreinigung bis zum Winterdienst: Beschreiben Sie uns kurz Ihr Objekt –
              wir sagen Ihnen, was möglich ist, und machen ein passendes Angebot.
            </p>
            <div className="mt-6">
              <QuoteButton source="more-services" size="md" />
            </div>
          </div>
          <ul className="grid gap-2.5 sm:grid-cols-2 lg:col-span-7" aria-label="Weitere Leistungen">
            {additionalServices.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2.5 rounded-2xl bg-white px-4 py-3 text-sm font-medium text-navy-800 shadow-soft ring-1 ring-line"
              >
                <Check
                  className="size-4 shrink-0 text-success-600"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaSection source="services-index" />
    </>
  );
}
