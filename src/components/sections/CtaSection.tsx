import { Phone, PhoneCall } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
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
    <section className="section-y" aria-labelledby="cta-title">
      <div className="container-site">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-navy-950 px-6 py-10 text-white sm:px-10 sm:py-14 lg:px-16 lg:py-16">
            {/* Foto, stark abgedunkelt, plus orangefarbener Lichtschein */}
            <Image
              src="/images/hero/office.webp"
              alt=""
              fill
              sizes="(min-width: 1280px) 80rem, 100vw"
              className="object-cover opacity-[0.22]"
              aria-hidden="true"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/55"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(36rem_circle_at_100%_0%,rgb(253_83_18/0.35),transparent_60%)]"
            />
            <div className="relative flex flex-col items-center gap-8 text-center">
              <div className="max-w-3xl">
                <h2 id="cta-title" className="text-[1.75rem] leading-tight text-white sm:text-4xl">
                  {title}
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-navy-200 sm:text-lg">
                  {text}
                </p>
                <Link
                  href="/kontakt#rueckruf"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white/85 underline-offset-4 hover:text-white hover:underline"
                >
                  <PhoneCall className="size-4 text-brand-400" aria-hidden="true" />
                  Lieber zurückrufen lassen? Rückruf anfordern
                </Link>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
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
