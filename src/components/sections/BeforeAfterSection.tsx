import { ArrowRight } from 'lucide-react';
import { Button, buttonIconClass } from '@/components/ui/Button';
import { Parallax } from '@/components/ui/Parallax';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import Image from 'next/image';
import { beforeAfter } from '@/content/references';
import { BeforeAfterSlider } from './BeforeAfterSlider';

export function BeforeAfterSection() {
  return (
    <section
      className="relative overflow-hidden bg-navy-950 section-y text-white [&_h2]:text-white [&_p]:text-navy-200"
      aria-labelledby="before-after-title"
    >
      <Image
        src="/images/before-after/after.webp"
        alt=""
        fill
        sizes="100vw"
        className="photo-backdrop"
        aria-hidden="true"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-navy-950/60 via-navy-950/30 to-navy-950/85"
      />
      <div className="relative container-site grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            id="before-after-title"
            eyebrow="Vorher / Nachher"
            title={beforeAfter.headline}
            text={beforeAfter.text}
          />
          <p className="mt-4 text-sm text-muted">
            Bewegen Sie den Regler, um den Unterschied zu sehen.
          </p>
          <div className="mt-6">
            <Button href="/referenzen" variant="inverse">
              {beforeAfter.cta}
              <ArrowRight className={buttonIconClass} aria-hidden="true" />
            </Button>
          </div>
        </div>
        <Reveal variant="image" className="lg:col-span-7">
          <Parallax mode="inview" distance={36}>
            <BeforeAfterSlider before={beforeAfter.before} after={beforeAfter.after} />
          </Parallax>
        </Reveal>
      </div>
    </section>
  );
}
