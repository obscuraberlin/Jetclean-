import { ArrowRight, Phone } from 'lucide-react';
import { Accordion } from '@/components/ui/Accordion';
import { Button, buttonIconClass } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { company } from '@/content/company';
import { faqs, homepageFaqCount } from '@/content/faqs';
import { telHref } from '@/lib/utils';

type FaqSectionProps = {
  /** Alle FAQs statt der Startseiten-Auswahl anzeigen */
  all?: boolean;
  id?: string;
};

export function FaqSection({ all = false, id = 'faq' }: FaqSectionProps) {
  const items = all ? faqs : faqs.slice(0, homepageFaqCount);
  return (
    <section className="section-y" aria-labelledby={`${id}-title`} id={id}>
      <div className="container-site grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <SectionHeading
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
