import type { Metadata } from 'next';
import { Leaf } from 'lucide-react';
import Image from 'next/image';
import { CtaSection } from '@/components/sections/CtaSection';
import { PageHero } from '@/components/sections/PageHero';
import { IconBox } from '@/components/ui/IconBox';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { sustainabilityContent } from '@/content/about';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Nachhaltigkeit – umweltschonende Gebäudereinigung in Berlin',
  description:
    'Nachhaltige Gebäudereinigung in Berlin: umweltschonende Reinigungsmittel, exakte Dosierung, ressourcenschonende Verfahren und faire Arbeit bei JETCLEAN.',
  path: '/nachhaltigkeit',
});

export default function SustainabilityPage() {
  return (
    <>
      <PageHero
        eyebrow={sustainabilityContent.eyebrow}
        title={sustainabilityContent.headline}
        text={sustainabilityContent.intro}
        breadcrumbs={[{ name: 'Nachhaltigkeit', path: '/nachhaltigkeit' }]}
        image={sustainabilityContent.image}
      />
      <section className="section-y" aria-labelledby="pillars-title">
        <div className="container-site">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <SectionHeading
                id="pillars-title"
                eyebrow="Konkret"
                title="Was Nachhaltigkeit bei uns im Alltag bedeutet."
              />
              <Reveal variant="image" className="mt-8" as="figure">
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-card">
                  <Image
                    src="/images/before-after/after.webp"
                    alt="Helles Büro mit Pflanzen nach der Reinigung"
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/90 px-3.5 py-1.5 text-sm font-semibold text-navy-950 shadow-soft backdrop-blur">
                    <Leaf className="size-4 text-success-600" aria-hidden="true" />
                    Umweltschonend gereinigt
                  </div>
                </div>
              </Reveal>
            </div>
            <RevealGroup as="ul" className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
              {sustainabilityContent.pillars.map((pillar) => (
                <RevealItem
                  key={pillar.title}
                  as="li"
                  className="card-hover rounded-3xl border border-line bg-white p-6 shadow-soft"
                >
                  <IconBox icon={Leaf} tone="success" size="sm" />
                  <h3 className="mt-4 text-base font-bold">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{pillar.text}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>
      <CtaSection
        source="sustainability"
        title="Nachhaltig sauber – auch für Ihr Objekt."
        text="Wir beraten Sie gern zu einem Reinigungskonzept, das Ihre Nachhaltigkeitsziele unterstützt."
      />
    </>
  );
}
