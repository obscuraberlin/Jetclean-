import { BadgeCheck, CalendarClock, FileCheck2, PhoneCall, Repeat, Users } from 'lucide-react';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { SectionDivider } from '@/components/ui/SectionDivider';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { siteConfig } from '@/content/site';

const promises = [
  {
    icon: CalendarClock,
    title: 'Kostenlose Besichtigung',
    text: 'Wir sehen uns Ihr Objekt vor Ort an – unverbindlich und ohne Aufwand für Sie.',
  },
  {
    icon: FileCheck2,
    title: 'Angebot mit Leistungsverzeichnis',
    text: 'Sie wissen genau, was wann gereinigt wird. Keine versteckten Positionen.',
  },
  {
    icon: Users,
    title: 'Festes Team, fester Ansprechpartner',
    text: 'Immer dieselben Menschen in Ihrem Objekt – und eine Nummer für alle Fragen.',
  },
  {
    icon: Repeat,
    title: 'Vertretung organisiert',
    text: 'Bei Urlaub oder Krankheit stellen wir die Vertretung, bevor Sie es merken.',
  },
  {
    icon: BadgeCheck,
    title: 'Dokumentierte Qualität',
    text: 'Regelmäßige Sichtkontrollen und kurze Wege, wenn etwas nicht passt.',
  },
  {
    icon: PhoneCall,
    title: siteConfig.quote.responseTimePromise
      ? `Rückmeldung ${siteConfig.quote.responseTimePromise}`
      : 'Schnelle Rückmeldung',
    text: 'Auf jede Anfrage antwortet ein Mensch – telefonisch oder per E-Mail.',
  },
];

/** „Das bekommen Sie“ – konkrete Zusagen, die Einwände vor der Anfrage ausräumen. */
export function Promises() {
  return (
    <section className="relative text-white" aria-labelledby="promises-title">
      <SectionDivider className="text-navy-950" />
      <div className="relative overflow-hidden bg-navy-950 section-y">
        <div aria-hidden="true" className="blob -top-40 -right-20 size-[34rem] bg-brand-500/30" />
        <div
          aria-hidden="true"
          className="blob -bottom-40 -left-20 size-[28rem] bg-brand-400/15 [animation-delay:-10s]"
        />
        <p
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 font-display text-[22vw] leading-none font-extrabold tracking-tighter whitespace-nowrap text-white/[0.035] select-none"
        >
          JETCLEAN
        </p>
        <div className="relative container-site">
          <SectionHeading
            id="promises-title"
            eyebrow="Unser Versprechen"
            title={<span className="text-white">Das bekommen Sie bei JETCLEAN.</span>}
            text={
              <span className="text-navy-200">
                Sechs Zusagen, auf die Sie sich vom ersten Gespräch an verlassen können.
              </span>
            }
          />
          <RevealGroup
            as="ul"
            className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-5"
          >
            {promises.map((item) => (
              <RevealItem
                key={item.title}
                as="li"
                className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:bg-white/10"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-brand-500 text-white shadow-brand">
                  <item.icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-base font-bold text-white sm:text-lg">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-200">{item.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
      <SectionDivider className="text-navy-950" flip />
    </section>
  );
}
