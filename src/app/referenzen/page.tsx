import type { Metadata } from 'next';
import { CaseStudies } from '@/components/sections/CaseStudies';
import { BeforeAfterSlider } from '@/components/sections/BeforeAfterSlider';
import { CtaSection } from '@/components/sections/CtaSection';
import { LogoStrip } from '@/components/sections/LogoStrip';
import { PageHero } from '@/components/sections/PageHero';
import { Testimonials } from '@/components/sections/Testimonials';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { beforeAfter } from '@/content/references';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Referenzen – Gebäudereinigung für Berliner Unternehmen',
  description:
    'Referenzen und Beispiele aus der Gebäudereinigung in Berlin: Bürogebäude, Praxen und Hausverwaltungen, die JETCLEAN betreut – mit Herausforderung, Lösung und Ergebnis.',
  path: '/referenzen',
});

export default function ReferencesPage() {
  return (
    <>
      <PageHero
        eyebrow="Referenzen"
        title={
          <>
            Ergebnisse, die man <span className="text-accent">sehen kann.</span>
          </>
        }
        text="Ausgewählte Objekte aus Berlin: welche Herausforderung bestand, wie wir sie gelöst haben und was sich seitdem verändert hat."
        breadcrumbs={[{ name: 'Referenzen', path: '/referenzen' }]}
      />
      <LogoStrip />
      <section className="section-y" aria-labelledby="cases-title">
        <div className="container-site">
          <SectionHeading
            id="cases-title"
            eyebrow="Ausgewählte Objekte"
            title="Drei Beispiele aus unserer Arbeit."
          />
          <div className="mt-8 lg:mt-12">
            <CaseStudies />
          </div>
        </div>
      </section>
      <section className="bg-surface section-y" aria-labelledby="ba-title">
        <div className="container-site">
          <SectionHeading
            id="ba-title"
            eyebrow="Vorher / Nachher"
            title={beforeAfter.headline}
            text={beforeAfter.text}
          />
          <Reveal variant="image" className="mt-8 lg:mt-12">
            <BeforeAfterSlider
              before={beforeAfter.before}
              after={beforeAfter.after}
              className="md:aspect-[21/9]"
            />
          </Reveal>
        </div>
      </section>
      <Testimonials />
      <CtaSection source="references" />
    </>
  );
}
