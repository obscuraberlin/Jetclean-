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
  title = 'In vier Schritten zur Zusammenarbeit.',
}: ProcessStepsProps) {
  return (
    <section
      className={cn('bg-surface section-y', className)}
      aria-labelledby={`${id}-title`}
      id={id}
    >
      <div className="container-site">
        <SectionHeading id={`${id}-title`} eyebrow={eyebrow} title={title} />
        <RevealGroup
          as="ol"
          className="mt-8 grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-6 lg:mt-10 lg:grid-cols-4"
        >
          {processSteps.map((step, index) => (
            <RevealItem
              key={step.title}
              as="li"
              className="relative rounded-2xl border border-line bg-white p-4 pt-6 shadow-soft sm:rounded-3xl sm:p-6 sm:pt-7"
            >
              <span
                className="absolute -top-4 left-4 flex size-9 items-center justify-center rounded-full bg-brand-500 font-display text-sm font-bold text-white shadow-brand sm:left-6"
                aria-hidden="true"
              >
                {index + 1}
              </span>
              <h3 className="text-sm font-bold sm:text-base">
                <span className="sr-only">Schritt {index + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted sm:text-sm">{step.text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
