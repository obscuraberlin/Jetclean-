import { Phone } from 'lucide-react';
import { QuoteButton } from '@/components/quote/QuoteButton';
import { Reveal } from '@/components/ui/Reveal';
import { company } from '@/content/company';
import { telHref } from '@/lib/utils';

type CtaSectionProps = {
  title?: string;
  text?: string;
  source?: string;
};

/** Abschließender Conversion-Block (dunkel, ruhig, ein klarer CTA). */
export function CtaSection({
  title = 'Bereit für ein sauberes Arbeitsumfeld?',
  text = 'Beschreiben Sie uns in 60 Sekunden Ihr Objekt – wir melden uns mit einem kostenlosen, unverbindlichen Angebot.',
  source = 'cta-section',
}: CtaSectionProps) {
  return (
    <section className="section-y-sm" aria-labelledby="cta-title">
      <div className="container-site">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-navy-950 bg-[radial-gradient(36rem_circle_at_100%_0%,rgb(238_98_18/0.32),transparent_60%)] px-6 py-10 text-white sm:px-10 sm:py-14 lg:px-16 lg:py-16">
            <div className="relative grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8">
                <h2 id="cta-title" className="text-[1.75rem] leading-tight text-white sm:text-4xl">
                  {title}
                </h2>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-navy-200 sm:text-lg">
                  {text}
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:col-span-4 lg:flex-col lg:items-stretch">
                <QuoteButton source={source} size="lg" className="w-full sm:w-auto lg:w-full">
                  Kostenloses Angebot
                </QuoteButton>
                <a
                  href={telHref(company.contact.phoneE164)}
                  className="inline-flex h-13 items-center justify-center gap-2 rounded-full border border-white/20 px-6 text-base font-semibold text-white transition-colors hover:bg-white/10"
                >
                  <Phone className="size-4 text-brand-400" aria-hidden="true" />
                  {company.contact.phoneDisplay}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
