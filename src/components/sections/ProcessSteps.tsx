import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';

export const processSteps = [
  {
    title: 'Anfrage',
    text: 'Sie beschreiben Ihr Objekt in 60 Sekunden über das Formular oder telefonisch.',
  },
  {
    title: 'Kostenlose Besichtigung',
    text: 'Wir sehen uns die Flächen an und klären Anforderungen, Zeiten und Besonderheiten.',
  },
  {
    title: 'Transparentes Angebot',
    text: 'Sie erhalten ein Angebot mit klarem Leistungsverzeichnis – ohne versteckte Kosten.',
  },
  {
    title: 'Start mit festem Team',
    text: 'Ihr festes Team beginnt – begleitet von Ihrem persönlichen Ansprechpartner.',
  },
] as const;

type ProcessStepsProps = {
  id?: string;
  className?: string;
  eyebrow?: string;
  title?: string;
};

/** „So läuft es ab“ – vier Schritte von der Anfrage bis zum Start. */
export function ProcessSteps({
  id = 'process',
  className,
  eyebrow = 'So läuft es ab',
  title = 'In vier Schritten zum passenden Reinigungskonzept.',
}: ProcessStepsProps) {
  return (
    <section className={cn('section-y', className)} aria-labelledby={`${id}-title`} id={id}>
      <div className="container-site">
        <SectionHeading id={`${id}-title`} eyebrow={eyebrow} title={title} />
        <RevealGroup as="ol" className="mt-8 grid gap-6 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <RevealItem
              key={step.title}
              as="li"
              className="relative rounded-3xl border border-line bg-white p-6 pt-7 shadow-soft"
            >
              <span
                className="absolute -top-4 left-6 flex size-9 items-center justify-center rounded-full bg-brand-500 font-display text-sm font-bold text-white shadow-brand"
                aria-hidden="true"
              >
                {index + 1}
              </span>
              <h3 className="text-base font-bold">
                <span className="sr-only">Schritt {index + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{step.text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
