import { ArrowRight } from 'lucide-react';
import { Button, buttonIconClass } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { TextReveal } from '@/components/ui/TextReveal';
import { beforeAfter } from '@/content/references';
import { BeforeAfterSlider } from './BeforeAfterSlider';

export function BeforeAfterSection() {
  return (
    <section className="py-16 sm:py-24 lg:py-32" aria-labelledby="before-after-title">
      <div className="container-site">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <TextReveal
            as="h2"
            inView
            className="text-[2.25rem] leading-[1.02] tracking-[-0.03em] sm:text-5xl lg:text-6xl"
            lines={[<span key="1">Der Unterschied</span>, <span key="2">ist sichtbar.</span>]}
          />
          <span id="before-after-title" className="sr-only">
            {beforeAfter.headline}
          </span>
          <p className="max-w-sm text-base text-muted">
            Bewegen Sie den Regler – derselbe Raum, nur der Zustand ändert sich.
          </p>
        </div>
        <Reveal variant="image" className="mt-10 sm:mt-14">
          <BeforeAfterSlider
            before={beforeAfter.before}
            after={beforeAfter.after}
            className="aspect-[4/3] rounded-[1.75rem] sm:aspect-[16/9] sm:rounded-[2rem] lg:rounded-[2.25rem]"
          />
        </Reveal>
        <div className="mt-8 flex justify-center">
          <Button href="/referenzen" variant="link" className="font-semibold text-navy-950">
            {beforeAfter.cta}
            <ArrowRight className={buttonIconClass} aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  );
}
