import type { Metadata } from 'next';
import { CtaSection } from '@/components/sections/CtaSection';
import { PageHero } from '@/components/sections/PageHero';
import { ServiceCard } from '@/components/sections/ServiceCard';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { company } from '@/content/company';
import { services } from '@/content/services';
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
      <CtaSection source="services-index" />
    </>
  );
}
