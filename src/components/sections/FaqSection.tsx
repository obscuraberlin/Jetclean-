import { ArrowRight, Phone } from 'lucide-react';
import { Accordion } from '@/components/ui/Accordion';
import { Button, buttonIconClass } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TextReveal } from '@/components/ui/TextReveal';
import { company } from '@/content/company';
import { faqs, homepageFaqCount } from '@/content/faqs';
import { telHref } from '@/lib/utils';

type FaqSectionProps = {
  /** Alle FAQs statt der Startseiten-Auswahl anzeigen */
  all?: boolean;
  id?: string;
  /** Große, ruhige Variante (Startseite) */
  variant?: 'split' | 'quiet';
};

export function FaqSection({ all = false, id = 'faq', variant = 'split' }: FaqSectionProps) {
  const items = all ? faqs : faqs.slice(0, homepageFaqCount);
  if (variant === 'quiet') {
    return (
      <section
        className="bg-surface py-20 sm:py-28 lg:py-36"
        aria-labelledby={`${id}-title`}
        id={id}
      >
        <div className="container-site">
          <div className="mx-auto max-w-4xl">
            <TextReveal
              as="h2"
              inView
              className="text-[2.5rem] leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-7xl"
              lines={[<span key="1">Fragen?</span>, <span key="2">Wir machen es einfach.</span>]}
            />
            <span id={`${id}-title`} className="sr-only">
              Häufige Fragen
            </span>
            <Reveal className="mt-12 sm:mt-16">
              <Accordion items={items} defaultOpen={null} variant="plain" />
            </Reveal>
            <p className="mt-8 text-base text-muted">
              Noch etwas unklar?{' '}
              <a
                href={telHref(company.contact.phoneE164)}
                className="font-semibold text-navy-950 hover:text-brand-600"
              >
                {company.contact.phoneDisplay}
              </a>
              {company.openingHours ? ` · ${company.openingHours.display}` : ''}
            </p>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="section-y" aria-labelledby={`${id}-title`} id={id}>
      <div className="container-site grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <SectionHeading
            align="left"
            id={`${id}-title`}
            eyebrow="Häufige Fragen"
            title="Schnelle Antworten auf Ihre Fragen."
          />
          <div className="mt-6 rounded-2xl border border-line bg-surface p-5">
            <p className="flex items-center gap-2 font-semibold text-navy-950">
              <Phone className="size-4 text-brand-500" aria-hidden="true" />
              Noch Fragen? Wir sind für Sie da.
            </p>
            <a
              href={telHref(company.contact.phoneE164)}
              className="mt-2 block font-display text-xl font-bold text-navy-950 hover:text-brand-600"
            >
              {company.contact.phoneDisplay}
            </a>
            {company.openingHours ? (
              <p className="text-sm text-muted">{company.openingHours.display}</p>
            ) : null}
            {!all ? (
              <Button href="/kontakt" variant="link" size="sm" className="mt-3">
                Kontakt aufnehmen
                <ArrowRight className={buttonIconClass} aria-hidden="true" />
              </Button>
            ) : null}
          </div>
        </div>
        <Reveal className="lg:col-span-8">
          <Accordion items={items} defaultOpen={0} />
        </Reveal>
      </div>
    </section>
  );
}
