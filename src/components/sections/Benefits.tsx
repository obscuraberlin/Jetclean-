import { IconBox } from '@/components/ui/IconBox';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { benefits } from '@/content/benefits';

export function Benefits() {
  return (
    <section className="section-y" aria-labelledby="benefits-title">
      <div className="container-site">
        <SectionHeading
          id="benefits-title"
          eyebrow="Ihre Vorteile"
          title="Mehr als nur Gebäudereinigung."
        />
        <RevealGroup
          as="ul"
          className="mt-8 grid grid-cols-2 gap-x-5 gap-y-8 sm:mt-12 lg:grid-cols-4 lg:gap-8"
        >
          {benefits.map((benefit) => (
            <RevealItem key={benefit.title} as="li" className="flex flex-col gap-3">
              <IconBox icon={benefit.icon} tone="brand" size="md" />
              <h3 className="text-base font-bold sm:text-lg">{benefit.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{benefit.text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
