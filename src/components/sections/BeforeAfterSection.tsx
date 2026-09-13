import { ArrowRight } from 'lucide-react';
import { Button, buttonIconClass } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { beforeAfter } from '@/content/references';
import { BeforeAfterSlider } from './BeforeAfterSlider';

export function BeforeAfterSection() {
  return (
    <section className="bg-surface section-y" aria-labelledby="before-after-title">
      <div className="container-site grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
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
            <Button href="/referenzen" variant="secondary">
              {beforeAfter.cta}
              <ArrowRight className={buttonIconClass} aria-hidden="true" />
            </Button>
          </div>
        </div>
        <Reveal variant="image" className="lg:col-span-7">
          <BeforeAfterSlider before={beforeAfter.before} after={beforeAfter.after} />
        </Reveal>
      </div>
    </section>
  );
}
