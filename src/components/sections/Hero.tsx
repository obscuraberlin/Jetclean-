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
      <div className="container-site pt-8 sm:pt-12 lg:pt-16">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="min-w-0 lg:col-span-8">
            <Reveal>
              <p className="text-[0.6875rem] font-semibold tracking-[0.2em] text-brand-600 uppercase sm:text-xs">
                Seit über {company.yearsOfExperience} Jahren in Berlin
              </p>
            </Reveal>
            <TextReveal
              as="h1"
              delay={0.1}
              className="mt-4 text-[2.4rem] leading-[0.98] tracking-[-0.035em] sm:text-6xl lg:text-[4.75rem] xl:text-[5.25rem] 2xl:text-[6rem]"
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
          <Reveal className="lg:col-span-4 lg:pb-3" delay={0.35}>
            <p className="max-w-md text-lg leading-relaxed text-navy-700 sm:text-xl">
              Feste Teams und ein persönlicher Ansprechpartner – für Büros, Praxen und Gewerbe, die
              jeden Tag überzeugen sollen.
            </p>
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-navy-800">
              {trust.map((item) => (
                <li key={item} className="inline-flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-success-500" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap items-center gap-3">
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
        </div>
      </div>

      {/* Bildbühne */}
      <div className="container-site mt-8 sm:mt-10 lg:mt-14">
        <Reveal variant="image">
          <div className="relative h-[62svh] min-h-[440px] overflow-hidden rounded-[1.75rem] sm:rounded-[2rem] lg:h-[68vh] lg:min-h-[560px] lg:rounded-[2.25rem]">
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
            {/* Mitarbeiterin im Bild (Hochformat, links) */}
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
            <p className="absolute bottom-6 left-6 hidden font-display text-sm font-bold text-white/90 sm:block lg:bottom-8 lg:left-8">
              {company.claim}
            </p>
            {/* Konfigurator – schwebend im Bild (Desktop) */}
            <div className="absolute right-6 bottom-6 hidden w-[24rem] lg:block xl:right-10 xl:bottom-10 xl:w-[26rem]">
              <HeroConfigurator source="hero" />
            </div>
          </div>
        </Reveal>
        {/* Mobile/Tablet: Konfigurator unter dem Bild */}
        <div className="-mt-10 px-2 sm:px-6 lg:hidden">
          <HeroConfigurator source="hero-mobile" />
        </div>
      </div>
    </section>
  );
}
