import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { HeroQuoteCard } from '@/components/quote/HeroQuoteCard';
import { QuoteButton } from '@/components/quote/QuoteButton';
import { Button, buttonIconClass } from '@/components/ui/Button';
import { Parallax } from '@/components/ui/Parallax';
import { siteConfig } from '@/content/site';
import { Star } from 'lucide-react';
import { heroTrustpoints } from '@/content/benefits';
import { company } from '@/content/company';

const heroImage = {
  src: '/images/hero/hero.webp',
  alt: 'JETCLEAN Reinigungskraft in einem modernen Berliner Büro mit Blick auf den Fernsehturm',
};

/** Büro-Foto als Fläche hinter Bild und Anfrage-Karte */
function OfficeBackdrop({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={className}>
      <Image
        src="/images/hero/office.webp"
        alt=""
        fill
        priority
        sizes="(min-width: 1024px) 62vw, 100vw"
        className="object-cover object-left"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/55 to-white/10" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/40" />
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-surface-gradient" aria-labelledby="hero-title">
      {/* Desktop: Foto hinter der rechten Hälfte, mit sanftem Parallax */}
      <Parallax
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[62%] lg:block"
        distance={80}
      >
        <OfficeBackdrop className="absolute inset-x-0 -inset-y-24" />
      </Parallax>
      {/* Weiche Farbflächen */}
      <div aria-hidden="true" className="blob -top-32 -left-32 size-[30rem] bg-brand-500/25" />
      <div
        aria-hidden="true"
        className="blob top-1/2 left-[30%] size-[24rem] bg-navy-200/40 [animation-delay:-8s]"
      />

      <div className="relative container-site pt-6 pb-5 sm:pt-10 sm:pb-7 lg:pt-20 lg:pb-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8 xl:gap-10">
          {/* Text */}
          <div className="lg:col-span-7 xl:col-span-5">
            <p className="hidden text-xs font-semibold tracking-[0.16em] text-brand-600 uppercase lg:block">
              Seit über {company.yearsOfExperience} Jahren in Berlin
            </p>
            <h1
              id="hero-title"
              className="max-w-[22ch] text-[1.75rem] leading-[1.15] tracking-[-0.02em] sm:max-w-none sm:text-5xl sm:leading-[1.08] lg:mt-4 lg:text-[2.875rem] lg:leading-[1.06] xl:text-[3rem] 2xl:text-[3.375rem]"
            >
              {/* Mobil/Tablet: kurze Überschrift, Desktop: ausführlich */}
              <span className="lg:hidden">
                Gebäude&shy;reinigung in Berlin,{' '}
                <span className="text-accent">auf die Sie sich verlassen können.</span>
              </span>
              <span className="hidden lg:inline">
                Gebäude&shy;reinigung für Berliner Unternehmen,{' '}
                <span className="text-accent">auf die Sie sich verlassen können.</span>
              </span>
            </h1>
            <p className="mt-5 hidden max-w-xl text-xl font-medium text-navy-800 lg:block">
              {company.tagline}
            </p>
            <p className="mt-3 hidden max-w-xl text-base leading-relaxed text-muted lg:block">
              Feste Teams, ein persönlicher Ansprechpartner und dokumentierte Qualität – für Büros,
              Praxen, Gewerbe und Hausverwaltungen in ganz Berlin.
            </p>

            {/* Vertrauenspunkte und Buttons: erst ab Desktop, mobil folgt direkt die Anfrage-Karte */}
            <ul className="mt-7 hidden max-w-xl grid-cols-2 gap-x-6 gap-y-4 text-sm font-medium text-navy-800 lg:grid xl:grid-cols-3">
              {heroTrustpoints.map((point) => (
                <li key={point.label} className="flex items-center gap-3">
                  <point.icon
                    className="size-6 shrink-0 text-brand-500"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  {point.label}
                </li>
              ))}
            </ul>

            <div className="mt-8 hidden flex-col gap-3 sm:flex-row sm:items-center sm:gap-6 lg:flex">
              <QuoteButton source="hero" size="lg" />
              <Button
                href="/referenzen"
                variant="link"
                size="lg"
                className="justify-center font-semibold text-navy-900 hover:text-brand-600"
              >
                Referenzen ansehen
                <ArrowRight className={buttonIconClass} aria-hidden="true" />
              </Button>
            </div>
          </div>

          {/* Bild – schmales Hochformat auf XL, auf Mobile/Tablet Teil des Foto-Panels unten */}
          <figure className="relative hidden xl:col-span-3 xl:block">
            <div className="relative h-full min-h-[34rem] [mask-image:linear-gradient(to_right,transparent,black_14%,black_86%,transparent)]">
              <Image
                src={heroImage.src}
                alt={heroImage.alt}
                fill
                priority
                fetchPriority="high"
                sizes="22vw"
                className="object-cover"
                quality={80}
              />
            </div>
            {siteConfig.reviews ? (
              <figcaption className="absolute bottom-10 -left-6 z-10 flex animate-float items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-lift ring-1 ring-line backdrop-blur">
                <span className="flex items-center gap-0.5 text-brand-500" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-3.5 fill-current" />
                  ))}
                </span>
                <span className="text-sm leading-tight">
                  <strong className="block font-display text-base text-navy-950">
                    {siteConfig.reviews.rating.toFixed(1).replace('.', ',')} von 5
                  </strong>
                  <span className="text-muted">{siteConfig.reviews.count} Bewertungen</span>
                </span>
              </figcaption>
            ) : null}
          </figure>

          {/* Anfrage-Karte – Desktop rechts */}
          <div className="hidden lg:col-span-5 lg:block xl:col-span-4" data-testid="hero-form">
            <HeroQuoteCard source="hero" />
          </div>
        </div>
      </div>

      {/* Mobile/Tablet: Foto-Panel mit Reinigungskraft und Anfrage-Karte */}
      <div className="relative lg:hidden" data-testid="hero-form-mobile">
        <OfficeBackdrop className="pointer-events-none absolute inset-0" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-[46%] [mask-image:linear-gradient(to_right,black_70%,transparent)] sm:w-[34%]"
        >
          <Image
            src={heroImage.src}
            alt=""
            fill
            sizes="(min-width: 640px) 34vw, 46vw"
            className="object-cover object-[35%_top]"
            quality={75}
          />
        </div>
        <div className="relative container-site py-6 sm:py-10">
          <div className="ml-auto max-w-md sm:mr-0">
            <HeroQuoteCard source="hero-mobile" />
          </div>
        </div>
      </div>
      <div className="container-site pt-6 pb-8 lg:hidden">
        <ul className="grid grid-cols-3 gap-x-4 gap-y-3 text-[0.8125rem] leading-snug font-medium text-navy-800">
          {heroTrustpoints.map((point) => (
            <li key={point.label} className="flex items-center gap-2">
              <point.icon
                className="size-5 shrink-0 text-brand-500"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              {point.label}
            </li>
          ))}
        </ul>
        <Button
          href="/referenzen"
          variant="link"
          size="md"
          className="mt-4 font-semibold text-navy-900 hover:text-brand-600"
        >
          Referenzen ansehen
          <ArrowRight className={buttonIconClass} aria-hidden="true" />
        </Button>
      </div>
    </section>
  );
}
