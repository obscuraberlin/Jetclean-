import type { Metadata } from 'next';
import Image from 'next/image';
import { CtaSection } from '@/components/sections/CtaSection';
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
              id="story-title"
              eyebrow="Unsere Geschichte"
              title="Gewachsen in Berlin. Verlässlich seit dem ersten Objekt."
            />
            <div className="mt-6 space-y-4 text-[0.9375rem] leading-relaxed text-navy-800 sm:text-base">
              {aboutContent.story.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface section-y" aria-labelledby="values-title">
        <div className="container-site">
          <SectionHeading id="values-title" eyebrow="Unsere Werte" title="Wofür wir stehen." />
          <RevealGroup
            as="ul"
            className="mt-8 grid grid-cols-2 gap-x-5 gap-y-8 lg:mt-12 lg:grid-cols-4 lg:gap-8"
          >
            {aboutContent.values.map((value) => (
              <RevealItem key={value.title} as="li" className="flex flex-col gap-3">
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
