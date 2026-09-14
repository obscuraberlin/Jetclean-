import Image from 'next/image';
import { QuoteButton } from '@/components/quote/QuoteButton';
import { Parallax } from '@/components/ui/Parallax';
import { Reveal } from '@/components/ui/Reveal';
import { TextReveal } from '@/components/ui/TextReveal';

type ImageMomentProps = {
  src?: string;
  alt?: string;
  lines?: string[];
  cta?: string;
  source?: string;
};

/** Großes Foto, minimaler Text, ein CTA – das Bild bewegt sich minimal langsamer als die Seite. */
export function ImageMoment({
  src = '/images/hero/office.webp',
  alt = 'Gereinigte Berliner Bürofläche mit Blick auf die Stadt',
  lines = ['Eine saubere Arbeitsumgebung', 'ist die Basis für Ihren Erfolg.'],
  cta = 'Reinigungskonzept anfragen',
  source = 'image-moment',
}: ImageMomentProps) {
  return (
    <section className="py-8 sm:py-12" aria-label={lines.join(' ')}>
      <div className="container-site">
        <Reveal variant="image">
          <div className="relative h-[70svh] min-h-[460px] overflow-hidden rounded-[1.75rem] sm:rounded-[2rem] lg:rounded-[2.5rem]">
            <Parallax className="absolute inset-x-0 -inset-y-12" distance={90}>
              <Image
                src={src}
                alt={alt}
                fill
                sizes="(min-width: 1280px) 80rem, 100vw"
                className="object-cover"
              />
            </Parallax>
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-navy-950/20 to-transparent"
            />
            <div className="absolute inset-x-0 bottom-0 p-7 sm:p-12 lg:p-16">
              <TextReveal
                as="p"
                inView
                className="max-w-3xl font-display text-[2rem] leading-[1.04] font-bold tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl"
                lines={lines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              />
              <div className="mt-7">
                <QuoteButton source={source} size="lg" withIcon={false}>
                  {cta}
                </QuoteButton>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
