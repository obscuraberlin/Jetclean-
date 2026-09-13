import type { Metadata } from 'next';
import Image from 'next/image';
import { Check } from 'lucide-react';
import { CtaSection } from '@/components/sections/CtaSection';
import { VideoTrailer } from '@/components/sections/VideoTrailer';
import { PageHero } from '@/components/sections/PageHero';
import { AnimatedNumber } from '@/components/ui/AnimatedNumber';
import { IconBox } from '@/components/ui/IconBox';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { aboutContent } from '@/content/about';
import { company } from '@/content/company';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Über uns – JETCLEAN Gebäudeservice GmbH Berlin',
  description: `Seit über ${company.yearsOfExperience} Jahren Gebäudereinigung in Berlin: Lernen Sie JETCLEAN kennen – unsere Haltung, unsere Werte und warum Unternehmen uns vertrauen.`,
  path: '/ueber-uns',
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={aboutContent.eyebrow}
        title={aboutContent.headline}
        text={aboutContent.intro}
        breadcrumbs={[{ name: 'Über uns', path: '/ueber-uns' }]}
        image={{
          src: '/images/hero/hero.webp',
          alt: 'JETCLEAN Reinigungskraft in einem Berliner Büro',
        }}
      />

      <section className="section-y" aria-labelledby="story-title">
        <div className="container-site grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal variant="image" className="lg:col-span-6" as="figure">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image
                src={aboutContent.image.src}
                alt={aboutContent.image.alt}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute bottom-5 left-5 rounded-2xl bg-white/90 px-5 py-4 shadow-soft backdrop-blur">
                <p className="font-display text-4xl font-extrabold text-navy-950">
                  <AnimatedNumber value={company.yearsOfExperience} suffix="+" />
                </p>
                <p className="text-sm font-medium text-muted">Jahre Gebäudereinigung in Berlin</p>
              </div>
            </div>
          </Reveal>
          <div className="lg:col-span-6">
            <SectionHeading
              align="left"
              id="story-title"
              eyebrow="Unsere Geschichte"
              title="Gewachsen in Berlin. Verlässlich seit dem ersten Objekt."
            />
            <div className="mt-6 space-y-4 text-[0.9375rem] leading-relaxed text-navy-800 sm:text-base">
              {aboutContent.story.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-6">
              {[
                { value: `${company.yearsOfExperience}+`, label: 'Jahre in Berlin' },
                { value: '1', label: 'fester Ansprechpartner je Objekt' },
                {
                  value: company.openingHours?.display.split(',')[0] ?? 'Mo – Fr',
                  label: 'persönlich erreichbar',
                },
              ].map((fact) => (
                <div key={fact.label}>
                  <dt className="font-display text-2xl font-extrabold text-brand-600 sm:text-3xl">
                    {fact.value}
                  </dt>
                  <dd className="mt-1 text-xs leading-snug text-muted sm:text-sm">{fact.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="section-y-sm pt-0" aria-labelledby="highlights-title">
        <div className="container-site">
          <div className="rounded-3xl border border-brand-100 bg-brand-50/60 p-6 sm:p-8 lg:p-10">
            <SectionHeading
              id="highlights-title"
              eyebrow="Das macht uns aus"
              title={`${company.hashtag} – ${company.motto}`}
            />
            <RevealGroup as="ul" className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {aboutContent.highlights.map((item) => (
                <RevealItem
                  key={item}
                  as="li"
                  className="flex items-start gap-3 rounded-2xl bg-white p-4 text-[0.9375rem] leading-snug text-navy-800 shadow-soft"
                >
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-success-50 text-success-600">
                    <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {item}
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      <VideoTrailer id="film" eyebrow="Unser Film" title="Lernen Sie uns in Bewegung kennen." />

      <section className="bg-surface section-y" aria-labelledby="values-title">
        <div className="container-site">
          <SectionHeading id="values-title" eyebrow="Unsere Werte" title="Wofür wir stehen." />
          <RevealGroup
            as="ul"
            className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-5"
          >
            {aboutContent.values.map((value) => (
              <RevealItem
                key={value.title}
                as="li"
                className="flex card-hover flex-col gap-3 rounded-3xl border border-line bg-white p-5 shadow-soft sm:p-6"
              >
                <IconBox icon={value.icon} tone="brand" />
                <h3 className="text-base font-bold sm:text-lg">{value.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{value.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CtaSection
        source="about"
        title="Lernen Sie uns persönlich kennen."
        text="Ein Anruf oder eine kurze Anfrage genügt – wir besichtigen Ihr Objekt und erstellen ein passendes Angebot."
      />
    </>
  );
}
