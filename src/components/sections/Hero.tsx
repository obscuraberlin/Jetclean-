import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { HeroQuoteCard } from '@/components/quote/HeroQuoteCard';
import { QuoteButton } from '@/components/quote/QuoteButton';
import { Button, buttonIconClass } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Parallax } from '@/components/ui/Parallax';
import { HeroBackdrop } from './hero/HeroBackdrop';
import { HeroMobileSlider } from './hero/HeroMobileSlider';
import { HeroSlideCaption } from './hero/HeroSlideCaption';
import { HeroSlideProvider } from './hero/HeroSlideContext';
import { siteConfig } from '@/content/site';
import { Star } from 'lucide-react';
import { heroTrustpoints } from '@/content/benefits';
import { company } from '@/content/company';

const heroImage = {
  src: '/images/hero/hero.webp',
  alt: 'JETCLEAN Reinigungskraft in einem modernen Berliner Büro mit Blick auf den Fernsehturm',
};

export function Hero() {
  return (
    <HeroSlideProvider>
      <section
        className="relative overflow-hidden bg-surface-gradient"
        aria-labelledby="hero-title"
      >
        {/* Desktop: Foto hinter der rechten Hälfte, mit sanftem Parallax */}
        <Parallax
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[62%] lg:block"
          distance={80}
        >
          <HeroBackdrop className="absolute inset-x-0 -inset-y-24" />
        </Parallax>
        {/* Weiche Farbflächen */}
        <div aria-hidden="true" className="blob -top-32 -left-32 size-[30rem] bg-brand-500/25" />
        <div
          aria-hidden="true"
          className="blob top-1/2 left-[30%] size-[24rem] bg-navy-200/40 [animation-delay:-8s]"
        />

        <div className="relative container-site hidden pt-6 pb-5 sm:pt-10 sm:pb-7 lg:block lg:pt-24 lg:pb-28 2xl:pt-32 2xl:pb-36">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
            {/* Text */}
            <div className="text-center lg:col-span-7 xl:col-span-5">
              <div className="mx-auto max-w-xl lg:max-w-none">
                <p className="hidden text-xs font-semibold tracking-[0.16em] text-brand-600 uppercase lg:block">
                  Seit über {company.yearsOfExperience} Jahren in Berlin
                </p>
                <h1
                  id="hero-title"
                  className="max-w-[22ch] text-[1.75rem] leading-[1.15] tracking-[-0.02em] sm:max-w-none sm:text-5xl sm:leading-[1.08] lg:mt-4 lg:text-[2.875rem] lg:leading-[1.06] xl:text-[3rem] 2xl:text-[3.375rem]"
                >
                  Gebäude&shy;reinigung für Berliner Unternehmen,{' '}
                  <span className="text-accent">auf die Sie sich verlassen können.</span>
                </h1>
                <p className="mx-auto mt-5 hidden max-w-xl text-xl font-medium text-navy-800 lg:block">
                  {company.tagline}
                </p>
                <p className="mx-auto mt-3 hidden max-w-xl text-base leading-relaxed text-muted lg:block">
                  Feste Teams, ein persönlicher Ansprechpartner und dokumentierte Qualität – für
                  Büros, Praxen, Gewerbe und Hausverwaltungen in ganz Berlin.
                </p>
                <HeroSlideCaption className="mt-6" />

                {/* Vertrauenspunkte und Buttons: erst ab Desktop, mobil folgt direkt die Anfrage-Karte */}
                <ul className="mx-auto mt-7 hidden max-w-xl grid-cols-2 gap-x-6 gap-y-4 text-sm font-medium text-navy-800 lg:grid xl:grid-cols-3">
                  {heroTrustpoints.map((point) => (
                    <li key={point.label} className="flex items-center justify-center gap-3">
                      <point.icon
                        className="size-6 shrink-0 text-brand-500"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                      {point.label}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 hidden flex-col gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-6 lg:flex">
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
            </div>

            {/* Bild – schmales Hochformat auf XL, auf Mobile/Tablet Teil des Foto-Panels unten */}
            <figure className="relative hidden xl:col-span-3 xl:block">
              <div className="relative h-full min-h-[34rem] overflow-hidden rounded-3xl shadow-lift ring-1 ring-white/60">
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
                <figcaption className="absolute bottom-6 -left-5 z-10 flex animate-float items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-lift ring-1 ring-line backdrop-blur">
                  <span className="flex items-center" aria-hidden="true">
                    {siteConfig.reviews.avatars.slice(0, 3).map((avatar, index) => (
                      <Avatar
                        key={avatar.name}
                        name={avatar.name}
                        src={avatar.src}
                        tone={avatar.tone}
                        className="-ml-2 size-8 border-2 border-white text-[0.625rem] first:ml-0"
                        sizes="32px"
                        style={{ zIndex: 5 - index }}
                      />
                    ))}
                  </span>
                  <span className="text-sm leading-tight">
                    <strong className="flex items-center gap-1 font-display text-base text-navy-950">
                      {siteConfig.reviews.rating.toFixed(1).replace('.', ',')}
                      <Star className="size-3.5 fill-current text-brand-500" aria-hidden="true" />
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

        {/* Mobile/Tablet: Foto-Hero mit großer Schrift, darunter die Anfrage-Karte */}
        <div className="relative lg:hidden" data-testid="hero-form-mobile">
          <HeroMobileSlider portrait={heroImage} />
          <div className="relative container-site -mt-6 pb-8">
            <div className="mx-auto max-w-md">
              <HeroQuoteCard source="hero-mobile" />
            </div>
          </div>
        </div>
      </section>
    </HeroSlideProvider>
  );
}
