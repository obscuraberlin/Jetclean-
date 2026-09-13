import { AnimatedNumber } from '@/components/ui/AnimatedNumber';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { company } from '@/content/company';
import { siteConfig } from '@/content/site';

/** Kennzahlen mit Zähl-Animation – nur belegbare Werte. */
export function StatsBand() {
  const stats = [
    { value: company.yearsOfExperience, suffix: '+', label: 'Jahre Erfahrung in Berlin' },
    { value: 12, suffix: '', label: 'Berliner Bezirke im Einsatz' },
    ...(siteConfig.reviews
      ? [
          {
            value: siteConfig.reviews.rating,
            suffix: ' ★',
            label: `bei ${siteConfig.reviews.count} Bewertungen (${siteConfig.reviews.platform})`,
            decimals: 1,
          },
        ]
      : []),
    { value: 1, suffix: '', label: 'fester Ansprechpartner je Objekt' },
  ];
  return (
    <section className="relative overflow-hidden section-y-sm" aria-label="Zahlen und Fakten">
      <div aria-hidden="true" className="blob -top-24 right-[10%] size-[22rem] bg-brand-500/15" />
      <div className="relative container-site">
        <RevealGroup
          as="ul"
          className="grid grid-cols-2 gap-4 rounded-3xl border border-line bg-white/80 p-6 shadow-card backdrop-blur sm:p-8 lg:grid-cols-4 lg:gap-6"
        >
          {stats.map((stat) => (
            <RevealItem key={stat.label} as="li" className="text-center">
              <p className="font-display text-4xl font-extrabold tracking-tight text-navy-950 sm:text-5xl">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
              </p>
              <p className="mt-2 text-sm text-muted">{stat.label}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
