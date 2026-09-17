import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Button, buttonIconClass } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { company } from '@/content/company';

/**
 * „Reinigungsfirma Berlin“ – Text der bisherigen Website, Foto in Hausform (Logo-Zitat).
 */
export function BerlinIntro() {
  return (
    <section className="relative overflow-hidden section-y" aria-labelledby="berlin-title">
      <div aria-hidden="true" className="blob top-10 right-[-10rem] size-[26rem] bg-brand-500/10" />
      <div className="relative container-site grid items-center gap-8 lg:grid-cols-12 lg:gap-16">
        <Reveal variant="image" className="lg:col-span-5" as="figure">
          <div className="relative mx-auto aspect-square w-full max-w-[17rem] sm:max-w-md">
            <div
              aria-hidden="true"
              className="absolute inset-[6%] bg-brand-500/15 [clip-path:polygon(50%_0%,100%_42%,100%_100%,0%_100%,0%_42%)]"
            />
            <div className="absolute inset-0 overflow-hidden [clip-path:polygon(50%_6%,94%_44%,94%_94%,6%_94%,6%_44%)]">
              <Image
                src="/images/hero/hero.webp"
                alt="JETCLEAN Reinigungskraft bei der Arbeit in einem Berliner Büro"
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover object-top"
              />
            </div>
          </div>
        </Reveal>
        <div className="lg:col-span-7">
          <SectionHeading
            id="berlin-title"
            eyebrow="Reinigungsfirma Berlin"
            title="Gebäudereinigung in Berlin."
          />
          <p className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-navy-800 sm:text-lg">
            Mit {company.shortName} haben Sie einen Partner für Raumpflege, Gebäudereinigung und
            Grundstückspflege, der Berlin wie seine Westentasche kennt – buchbar in allen Bezirken.
            Mit modernen Geräten und vernünftigen Reinigungsmitteln erzielen wir genau den
            Reinigungserfolg, den Sie erwarten.
          </p>
          <div className="mt-7 flex justify-center">
            <Button href="/ueber-uns" variant="secondary">
              Mehr über uns
              <ArrowRight className={buttonIconClass} aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
