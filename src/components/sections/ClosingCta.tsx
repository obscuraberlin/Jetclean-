import { QuoteButton } from '@/components/quote/QuoteButton';
import { Reveal } from '@/components/ui/Reveal';
import { TextReveal } from '@/components/ui/TextReveal';
import { company } from '@/content/company';
import { telHref } from '@/lib/utils';

/** Der Abschluss der Geschichte: große Headline, ein Satz, ein CTA, viel Platz. */
export function ClosingCta() {
  return (
    <section className="py-28 sm:py-40 lg:py-52" aria-labelledby="closing-title">
      <div className="container-site text-center">
        <TextReveal
          as="h2"
          inView
          className="mx-auto max-w-4xl text-[2.5rem] leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-[5rem]"
          lines={[
            <span key="1">Bereit für Räume,</span>,
            <span key="2">die jeden Tag überzeugen?</span>,
          ]}
        />
        <span id="closing-title" className="sr-only">
          Bereit für Räume, die jeden Tag überzeugen?
        </span>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-7 max-w-xl text-lg text-navy-700 sm:text-xl">
            In wenigen Angaben zu Ihrem persönlichen Reinigungskonzept.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-8">
            <QuoteButton source="closing" size="lg" withIcon={false} className="px-9">
              Kostenloses Angebot anfragen
            </QuoteButton>
            <a
              href={telHref(company.contact.phoneE164)}
              className="font-display text-lg font-bold text-navy-950 transition-colors hover:text-brand-600"
            >
              {company.contact.phoneDisplay}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
