import { IconBox } from '@/components/ui/IconBox';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { benefits } from '@/content/benefits';

export function Benefits() {
  return (
    <section className="relative overflow-hidden section-y" aria-labelledby="benefits-title">
      <div aria-hidden="true" className="blob -top-20 -left-32 size-[26rem] bg-brand-500/10" />
      <div
        aria-hidden="true"
        className="blob right-[-8rem] bottom-[-6rem] size-[22rem] bg-navy-200/40 [animation-delay:-6s]"
      />
      <div className="relative container-site">
        <SectionHeading
          id="benefits-title"
          eyebrow="Ihre Vorteile"
          title="Mehr als nur Gebäudereinigung."
        />
        <RevealGroup
          as="ul"
          className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
        >
          {benefits.map((benefit) => (
            <RevealItem
              key={benefit.title}
              as="li"
              className="flex card-hover flex-col gap-3 rounded-3xl border border-line bg-white p-5 shadow-soft sm:p-6"
            >
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
