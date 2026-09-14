import { Reveal } from '@/components/ui/Reveal';
import { TextReveal } from '@/components/ui/TextReveal';

const points = ['Fester Ansprechpartner', 'Planbare Einsatzzeiten', 'Dokumentierte Qualität'];

/** Nur Headline, zwei Sätze, drei Punkte – und viel Weißraum. */
export function Statement() {
  return (
    <section className="py-24 sm:py-32 lg:py-44" aria-labelledby="statement-title">
      <div className="container-site text-center">
        <p className="text-[0.6875rem] font-semibold tracking-[0.2em] text-brand-600 uppercase sm:text-xs">
          Mehr als Reinigung.
        </p>
        <TextReveal
          as="h2"
          inView
          className="mx-auto mt-5 max-w-4xl text-[2.5rem] leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-7xl"
          lines={[
            <span key="1">Ein verlässlicher Teil</span>,
            <span key="2">Ihres Unternehmens.</span>,
          ]}
        />
        <span id="statement-title" className="sr-only">
          Mehr als Reinigung: ein verlässlicher Teil Ihres Unternehmens
        </span>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-navy-700 sm:text-xl">
            Sie sollen unsere Arbeit gar nicht bemerken – außer daran, dass alles sauber ist.
            Deshalb arbeiten wir mit festen Teams, klaren Absprachen und kurzen Wegen.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <ul className="mx-auto mt-12 flex max-w-3xl flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-0 sm:divide-x sm:divide-line">
            {points.map((point) => (
              <li key={point} className="font-display text-lg font-bold text-navy-950 sm:px-8">
                {point}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
