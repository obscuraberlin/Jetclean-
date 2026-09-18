import { SectionHeading } from '@/components/ui/SectionHeading';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { benefits } from '@/content/benefits';

/**
 * „Ihre Vorteile“ – dunkle Bühne mit Rasterlinien, Glas-Karten mit großer Ziffer,
 * leuchtendem Icon und Spotlight-Effekt.
 */
export function Benefits() {
  return (
    <section
      className="relative overflow-hidden bg-navy-950 section-y text-white [&_h2]:text-white [&_p]:text-navy-200"
      aria-labelledby="benefits-title"
    >
      {/* Rasterlinien + Lichtquellen */}
      <div
        aria-hidden="true"
        className="absolute inset-0 [background-image:linear-gradient(to_right,rgb(255_255_255/0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.5)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_75%)] [background-size:3.5rem_3.5rem] opacity-[0.12]"
      />
      <div aria-hidden="true" className="blob -top-24 left-[10%] size-[28rem] bg-brand-500/30" />
      <div
        aria-hidden="true"
        className="blob right-[-6rem] bottom-[-8rem] size-[26rem] bg-brand-400/20 [animation-delay:-7s]"
      />

      <div className="relative container-site">
        <SectionHeading
          id="benefits-title"
          eyebrow="Ihre Vorteile"
          title={
            <>
              Mehr als nur{' '}
              <span className="bg-gradient-to-r from-brand-300 via-brand-400 to-brand-500 bg-clip-text text-transparent">
                Gebäudereinigung.
              </span>
            </>
          }
          text="Vier Gründe, warum Berliner Unternehmen seit Jahren mit uns arbeiten."
        />

        <ul className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {benefits.map((benefit, index) => (
            <SpotlightCard
              key={benefit.title}
              index={index}
              className="flex items-start gap-4 p-5 sm:flex-col sm:gap-5 sm:p-6 lg:p-7"
            >
              {/* Große Ziffer als Wasserzeichen */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-3 right-4 font-display text-7xl font-extrabold tracking-tighter text-white/[0.06] transition-colors duration-500 group-hover:text-brand-400/20 sm:text-8xl"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              {/* Leuchtendes Icon */}
              <span className="relative flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-[0_12px_30px_-10px_rgb(253_83_18/0.8)] transition-transform duration-500 ease-(--ease-premium) motion-safe:group-hover:scale-110 motion-safe:group-hover:rotate-[-6deg] sm:size-14">
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-2xl ring-1 ring-white/30 ring-inset"
                />
                <benefit.icon className="size-6 sm:size-7" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <span className="relative min-w-0">
                <h3 className="text-base font-bold text-white sm:text-lg">{benefit.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed">{benefit.text}</p>
                {/* Akzentlinie wächst beim Hover */}
                <span
                  aria-hidden="true"
                  className="mt-4 block h-0.5 w-8 rounded-full bg-gradient-to-r from-brand-400 to-brand-500 transition-[width] duration-500 ease-(--ease-premium) group-hover:w-16"
                />
              </span>
            </SpotlightCard>
          ))}
        </ul>
      </div>
    </section>
  );
}
