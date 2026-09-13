import { ArrowRight, Check } from 'lucide-react';
import Image from 'next/image';
import { QuoteButton } from '@/components/quote/QuoteButton';
import { QuoteForm } from '@/components/quote/QuoteForm';
import { Button, buttonIconClass } from '@/components/ui/Button';
import { heroTrustpoints } from '@/content/benefits';
import { company } from '@/content/company';

const heroImage = {
  src: '/images/hero/hero.webp',
  alt: 'JETCLEAN Reinigungskraft in einem modernen Berliner Büro mit Blick auf den Fernsehturm',
};

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-surface-gradient" aria-labelledby="hero-title">
      {/* Dezenter Lichtschein oben rechts */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-10%] h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(closest-side,rgb(242_106_27/0.10),transparent)]"
      />
      <div className="relative container-site pt-10 pb-12 sm:pt-14 sm:pb-16 lg:pt-20 lg:pb-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8 xl:gap-10">
          {/* Text */}
          <div className="lg:col-span-7 xl:col-span-5">
            <p className="text-xs font-semibold tracking-[0.16em] text-brand-600 uppercase">
              Seit über {company.yearsOfExperience} Jahren in Berlin
            </p>
            <h1
              id="hero-title"
              className="mt-4 text-[2.375rem] leading-[1.06] sm:text-5xl lg:text-[3rem] xl:text-[3.125rem] 2xl:text-[3.5rem]"
            >
              Gebäudereinigung für Berliner Unternehmen,{' '}
              <span className="text-accent">auf die Sie sich verlassen können.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg font-medium text-navy-800 sm:text-xl">
              {company.tagline}
            </p>
            <p className="mt-3 hidden max-w-xl text-base leading-relaxed text-muted sm:block">
              Feste Teams, ein persönlicher Ansprechpartner und dokumentierte Qualität – für Büros,
              Praxen, Gewerbe und Hausverwaltungen in ganz Berlin.
            </p>

            <ul className="mt-7 grid max-w-xl grid-cols-2 gap-x-6 gap-y-3 text-sm font-medium text-navy-800">
              {heroTrustpoints.map((point) => (
                <li key={point} className="flex items-center gap-2.5">
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-success-50 text-success-600">
                    <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <QuoteButton source="hero" size="lg" className="lg:hidden" />
              <Button href="/referenzen" variant="secondary" size="lg">
                Referenzen ansehen
                <ArrowRight className={buttonIconClass} aria-hidden="true" />
              </Button>
            </div>
          </div>

          {/* Bild – kompakt auf Mobile/Tablet, schmales Hochformat auf XL */}
          <figure className="relative lg:hidden xl:col-span-3 xl:block">
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl sm:aspect-[2/1] xl:aspect-auto xl:h-full xl:min-h-[34rem]">
              <Image
                src={heroImage.src}
                alt={heroImage.alt}
                fill
                priority
                fetchPriority="high"
                sizes="(min-width: 1280px) 22vw, (min-width: 640px) 90vw, 100vw"
                className="object-cover"
                quality={80}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-navy-950/40 via-transparent to-transparent"
              />
              <figcaption className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3.5 py-1.5 font-display text-sm font-bold text-navy-950 shadow-soft backdrop-blur">
                {company.claim}
              </figcaption>
            </div>
          </figure>

          {/* Angebotsformular – nur Desktop */}
          <div className="hidden lg:col-span-5 lg:block xl:col-span-4" data-testid="hero-form">
            <QuoteForm source="hero" variant="card" />
          </div>
        </div>
      </div>
    </section>
  );
}
