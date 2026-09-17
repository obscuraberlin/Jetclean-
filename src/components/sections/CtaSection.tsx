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
  title = 'Heute noch ein Angebot erhalten.',
  text = 'Vertrauen Sie uns alle Ihre gewerblichen Reinigungsbedürfnisse an – wir melden uns innerhalb eines Werktags mit einem kostenlosen, unverbindlichen Angebot.',
  source = 'cta-section',
}: CtaSectionProps) {
  return (
    <section className="relative" aria-labelledby="cta-title">
      {/* Foto in voller Breite mit großer Aussage */}
      <div className="relative min-h-[26rem] overflow-hidden sm:min-h-[30rem]">
        <Image
          src="/images/services/glasreinigung.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          aria-hidden="true"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-navy-950/45" />
        <div className="relative container-site flex min-h-[26rem] items-center justify-center py-20 text-center sm:min-h-[30rem]">
          <Reveal>
            <h2
              id="cta-title"
              className="mx-auto max-w-4xl text-4xl leading-[1.02] text-white drop-shadow-[0_2px_18px_rgb(0_0_0/0.35)] sm:text-6xl lg:text-7xl"
            >
              Benötigen Sie einen Reinigungsservice?
            </h2>
          </Reveal>
        </div>
      </div>
      {/* Oranger Angebotsblock, überlappt das Foto */}
      <div className="container-site -mt-16 pb-16 sm:-mt-20 sm:pb-24 lg:-mt-24 lg:pb-28">
        <Reveal>
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl bg-brand-500 px-6 py-9 text-center text-white shadow-lift sm:px-12 sm:py-12">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(28rem_circle_at_100%_100%,rgb(255_255_255/0.18),transparent_60%)]"
            />
            <div className="relative">
              <p className="font-display text-2xl leading-tight font-bold sm:text-4xl">{title}</p>
              <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
                {text}
              </p>
              <div className="mt-7 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
                <QuoteButton
                  source={source}
                  size="lg"
                  variant="inverse"
                  className="w-full text-brand-600 sm:w-auto"
                >
                  Kostenloses Angebot
                </QuoteButton>
                <a
                  href={telHref(company.contact.phoneE164)}
                  className="inline-flex items-center gap-2 font-display text-xl font-bold text-white hover:underline"
                >
                  <Phone className="size-5" aria-hidden="true" />
                  {company.contact.phoneDisplay}
                </a>
              </div>
              <Link
                href="/kontakt#rueckruf"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white/85 underline-offset-4 hover:text-white hover:underline"
              >
                <PhoneCall className="size-4" aria-hidden="true" />
                Lieber zurückrufen lassen? Rückruf anfordern
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
