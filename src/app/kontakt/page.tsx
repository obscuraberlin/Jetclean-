import type { Metadata } from 'next';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { CallbackForm } from '@/components/quote/CallbackForm';
import { QuoteForm } from '@/components/quote/QuoteForm';
import { FaqSection } from '@/components/sections/FaqSection';
import { PageHero } from '@/components/sections/PageHero';
import { ServiceArea } from '@/components/sections/ServiceArea';
import { company, fullAddress } from '@/content/company';
import { buildMetadata } from '@/lib/seo';
import { telHref } from '@/lib/utils';

export const metadata: Metadata = buildMetadata({
  title: 'Kontakt – Angebot für Gebäudereinigung in Berlin anfragen',
  description: `Kontaktieren Sie JETCLEAN in Berlin: kostenloses Angebot anfragen, anrufen oder E-Mail schreiben. ${company.contact.phoneDisplay} – wir melden uns schnellstmöglich.`,
  path: '/kontakt',
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Kontakt"
        title={
          <>
            Sprechen wir über <span className="text-accent">Ihr Objekt.</span>
          </>
        }
        text="Beschreiben Sie uns kurz, was gereinigt werden soll – oder rufen Sie direkt an. Wir melden uns persönlich bei Ihnen."
        breadcrumbs={[{ name: 'Kontakt', path: '/kontakt' }]}
        image={{ src: '/images/hero/contact.webp', alt: 'Büro von JETCLEAN in Berlin' }}
      />
      <section className="section-y-sm" aria-label="Kontaktmöglichkeiten">
        <div className="container-site grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-4 lg:col-span-5">
            <ContactCard icon={Phone} title="Telefon">
              <a
                href={telHref(company.contact.phoneE164)}
                className="font-display text-xl font-bold text-navy-950 hover:text-brand-600"
              >
                {company.contact.phoneDisplay}
              </a>
              {company.openingHours ? (
                <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
                  <Clock className="size-3.5" aria-hidden="true" />
                  {company.openingHours.display}
                </p>
              ) : null}
            </ContactCard>
            <ContactCard icon={Mail} title="E-Mail">
              <a
                href={`mailto:${company.contact.email}`}
                className="font-semibold text-navy-950 hover:text-brand-600"
              >
                {company.contact.email}
              </a>
            </ContactCard>
            <ContactCard icon={MapPin} title="Adresse">
              <address className="not-italic">
                {company.name}
                <br />
                {fullAddress}
              </address>
              <p className="mt-1 text-sm text-muted">Einsatzgebiet: {company.serviceArea.label}</p>
            </ContactCard>
          </div>
          <div className="lg:col-span-7" id="anfrage">
            <h2 className="mb-4 text-2xl">Kostenloses Angebot anfragen</h2>
            <QuoteForm source="kontakt" variant="page" />
          </div>
        </div>
      </section>
      <section className="section-y-sm pt-0" aria-labelledby="rueckruf-title" id="rueckruf">
        <div className="container-site">
          <h2 id="rueckruf-title" className="sr-only">
            Rückruf anfordern
          </h2>
          <CallbackForm source="kontakt-callback" className="scroll-mt-24" />
        </div>
      </section>
      <ServiceArea withCta={false} />
      <FaqSection all id="faq" />
    </>
  );
}

function ContactCard({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Phone;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 rounded-2xl border border-line bg-white p-5 shadow-soft">
      <span
        className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600"
        aria-hidden="true"
      >
        <Icon className="size-5" strokeWidth={1.75} />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold tracking-[0.12em] text-muted uppercase">{title}</p>
        <div className="mt-1 text-[0.9375rem] text-navy-800">{children}</div>
      </div>
    </div>
  );
}
