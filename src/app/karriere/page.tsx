import type { Metadata } from 'next';
import { Check, Mail, Phone } from 'lucide-react';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { PageHero } from '@/components/sections/PageHero';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { careersContent } from '@/content/about';
import { company } from '@/content/company';
import { buildMetadata } from '@/lib/seo';
import { telHref } from '@/lib/utils';

export const metadata: Metadata = buildMetadata({
  title: 'Karriere – Jobs in der Gebäudereinigung Berlin',
  description:
    'Arbeiten bei JETCLEAN in Berlin: feste Anstellung, faire Bezahlung, planbare Einsatzzeiten und ein Team, das zusammenhält. Jetzt bewerben – auch initiativ.',
  path: '/karriere',
});

export default function CareersPage() {
  const subject = encodeURIComponent('Bewerbung bei JETCLEAN');
  return (
    <>
      <PageHero
        eyebrow={careersContent.eyebrow}
        title={careersContent.headline}
        text={careersContent.intro}
        breadcrumbs={[{ name: 'Karriere', path: '/karriere' }]}
        image={{
          src: '/images/hero/hero.webp',
          alt: 'JETCLEAN Mitarbeiterin bei der Arbeit in einem Berliner Büro',
        }}
      />
      <section className="section-y" aria-labelledby="perks-title">
        <div className="container-site grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <SectionHeading
              align="left"
              id="perks-title"
              eyebrow="Das bieten wir"
              title="Gute Arbeit verdient gute Bedingungen."
            />
            <RevealGroup as="ul" className="mt-6 grid gap-3 sm:grid-cols-2">
              {careersContent.perks.map((perk) => (
                <RevealItem
                  key={perk}
                  as="li"
                  className="flex items-start gap-3 rounded-2xl border border-line bg-white p-4 text-[0.9375rem] leading-snug text-navy-800 shadow-soft"
                >
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-success-50 text-success-600">
                    <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {perk}
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
          <Reveal className="lg:col-span-6">
            <div className="rounded-3xl border border-brand-100 bg-brand-50/60 p-6 sm:p-8">
              <h2 className="text-2xl">
                {careersContent.openPositions.length > 0 ? 'Offene Stellen' : 'Initiativbewerbung'}
              </h2>
              {careersContent.openPositions.length > 0 ? (
                <ul className="mt-5 divide-y divide-line">
                  {careersContent.openPositions.map((position) => (
                    <li key={position.title} className="py-4">
                      <h3 className="text-base font-bold">{position.title}</h3>
                      <p className="text-sm text-muted">
                        {position.type} · {position.location}
                      </p>
                      <p className="mt-1 text-sm text-navy-800">{position.description}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-navy-800">
                  Aktuell sind keine konkreten Stellen ausgeschrieben – wir freuen uns aber
                  jederzeit über Initiativbewerbungen für Reinigung, Objektleitung und Büro.
                </p>
              )}
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {careersContent.applicationHint}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button href={`mailto:${company.contact.email}?subject=${subject}`}>
                  <Mail className="size-4" aria-hidden="true" />
                  Per E-Mail bewerben
                </Button>
                <Button href={telHref(company.contact.phoneE164)} variant="secondary">
                  <Phone className="size-4" aria-hidden="true" />
                  {company.contact.phoneDisplay}
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
