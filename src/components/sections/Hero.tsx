import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { HeroConfigurator } from '@/components/quote/HeroConfigurator';
import { QuoteButton } from '@/components/quote/QuoteButton';
import { Button, buttonIconClass } from '@/components/ui/Button';
import { Parallax } from '@/components/ui/Parallax';
import { Reveal } from '@/components/ui/Reveal';
import { TextReveal } from '@/components/ui/TextReveal';
import { company } from '@/content/company';

const trust = ['Fester Ansprechpartner', 'Planbare Einsatzzeiten', 'Dokumentierte Qualität'];

/**
 * Hero als Bühne: große Typografie, darunter eine fast bildschirmfüllende Bildfläche
 * mit dem Konfigurator als schwebendes Interface.
 */
export function Hero() {
  return (
    <section className="relative" aria-labelledby="hero-title">
      <div className="container-site pt-6 sm:pt-12 lg:pt-16">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="min-w-0 lg:col-span-8">
            <Reveal>
              <p className="text-[0.6875rem] font-semibold tracking-[0.2em] text-brand-600 uppercase sm:text-xs">
                Seit über {company.yearsOfExperience} Jahren in Berlin
              </p>
            </Reveal>
            <TextReveal
              as="h1"
              delay={0.1}
              className="mt-3 text-[2.4rem] leading-[0.98] tracking-[-0.035em] sm:mt-4 sm:text-6xl lg:text-[4.75rem] xl:text-[5.25rem] 2xl:text-[6rem]"
              lines={[
                <span key="1">Professionelle</span>,
                <span key="2">Gebäudereinigung</span>,
                <span key="3" className="text-accent">
                  in Berlin.
                </span>,
              ]}
            />
            <span id="hero-title" className="sr-only">
              Professionelle Gebäudereinigung in Berlin
            </span>
          </div>
          <Reveal className="order-3 lg:order-none lg:col-span-4 lg:pb-3" delay={0.35}>
            <p className="max-w-md text-base leading-relaxed text-navy-700 sm:text-xl">
              Feste Teams und ein persönlicher Ansprechpartner – für Büros, Praxen und Gewerbe, die
              jeden Tag überzeugen sollen.
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-navy-800 lg:mt-5">
              {trust.map((item) => (
                <li key={item} className="inline-flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-success-500" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap items-center gap-4 lg:mt-7">
              <QuoteButton source="hero" size="md" withIcon={false}>
                Angebot anfragen
              </QuoteButton>
              <Button
                href="/leistungen"
                variant="link"
                size="md"
                className="font-semibold text-navy-950"
              >
                Leistungen entdecken
                <ArrowRight className={buttonIconClass} aria-hidden="true" />
              </Button>
            </div>
          </Reveal>
          {/* Bildbühne – auf Mobile direkt unter der Headline */}
          <div className="order-2 lg:order-none lg:col-span-12 lg:mt-4">
            <Reveal variant="image">
              <div className="relative h-[58svh] min-h-[400px] overflow-hidden rounded-[1.75rem] sm:rounded-[2rem] lg:h-[68vh] lg:min-h-[560px] lg:rounded-[2.25rem]">
                <Parallax
                  className="absolute inset-x-0 -inset-y-10"
                  distance={70}
                  offset={['start start', 'end start']}
                >
                  <Image
                    src="/images/hero/office.webp"
                    alt="Helle Berliner Bürofläche mit Blick auf die Skyline, gereinigt von JETCLEAN"
                    fill
                    priority
                    sizes="(min-width: 1280px) 80rem, 100vw"
                    className="object-cover object-[60%_center]"
                  />
                </Parallax>
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-navy-950/45 via-navy-950/5 to-transparent"
                />
                <div
                  aria-hidden="true"
                  className="absolute bottom-0 left-[4%] hidden h-[92%] w-[26%] [mask-image:linear-gradient(to_right,transparent,black_18%,black_82%,transparent)] lg:block"
                >
                  <Image
                    src="/images/hero/hero.webp"
                    alt=""
                    fill
                    sizes="26vw"
                    className="object-cover object-top"
                  />
                </div>
                <p className="absolute bottom-5 left-5 font-display text-sm font-bold text-white/90 lg:bottom-8 lg:left-8">
                  {company.claim}
                </p>
                <div className="absolute right-6 bottom-6 hidden w-[24rem] lg:block xl:right-10 xl:bottom-10 xl:w-[26rem]">
                  <HeroConfigurator source="hero" />
                </div>
              </div>
            </Reveal>
          </div>
          {/* Mobile/Tablet: Konfigurator nach den CTAs */}
          <div className="order-4 lg:hidden">
            <HeroConfigurator source="hero-mobile" />
          </div>
        </div>
      </div>
    </section>
  );
}
