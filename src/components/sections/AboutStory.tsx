import { ArrowRight, HeartHandshake, Leaf, Quote, Users } from 'lucide-react';
import { Button, buttonIconClass } from '@/components/ui/Button';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { founderQuote } from '@/content/about';
import { company } from '@/content/company';
import { VideoEmbed } from './VideoEmbed';

const values = [
  {
    icon: HeartHandshake,
    title: 'Treue',
    text: 'Viele Kunden begleiten wir seit Jahren. Zusagen halten wir – auch wenn es einmal eng wird.',
  },
  {
    icon: Leaf,
    title: 'Nachhaltigkeit',
    text: 'Umweltschonende Reinigungsmittel, exakte Dosierung und kurze Wege innerhalb Berlins.',
  },
  {
    icon: Users,
    title: 'Nähe zu unseren Mitarbeitenden',
    text: 'Feste Teams, faire Bedingungen und kurze Entscheidungswege – das merken auch unsere Kunden.',
  },
];

/**
 * „Über uns“ als eine durchgehende Fläche: weich auslaufender Hintergrund, Film mit
 * Lichtschein, Zitat frei auf der Fläche, Werte als Zeilen – keine getrennten Kästen.
 */
export function AboutStory() {
  return (
    <section
      className="relative overflow-hidden section-y"
      aria-labelledby="about-title"
      id="ueber-uns"
    >
      {/* Auslaufender Hintergrund: warmes Licht oben, kühler Schimmer unten, weich in Weiß */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(90%_60%_at_50%_0%,rgb(253_83_18/0.12),transparent_70%),radial-gradient(70%_50%_at_100%_70%,rgb(31_45_71/0.08),transparent_70%),linear-gradient(to_bottom,white,var(--color-surface)_45%,white)]"
      />
      <div
        aria-hidden="true"
        className="blob top-[28%] left-1/2 size-[36rem] -translate-x-1/2 bg-brand-500/15 blur-3xl"
      />

      <div className="relative container-site">
        <SectionHeading
          id="about-title"
          eyebrow="Über uns"
          title={
            <>
              Ein Familienunternehmen aus Berlin –{' '}
              <span className="text-accent">seit {company.foundedYear}.</span>
            </>
          }
          text={`${company.shortName} ist seit ${company.foundedYear} in Berlin zu Hause: familiengeführt, mittelständisch und mit dem Anspruch, dass sich Kunden um nichts kümmern müssen.`}
        />

        {/* Film – Lichtschein statt Karte, geht weich in die Fläche über */}
        <Reveal variant="image" className="relative mx-auto mt-8 max-w-3xl sm:mt-10">
          <div
            aria-hidden="true"
            className="absolute inset-x-8 -inset-y-6 rounded-[3rem] bg-brand-500/20 blur-3xl"
          />
          <VideoEmbed className="relative" />
        </Reveal>

        {/* Zitat frei auf der Fläche */}
        <Reveal className="relative mx-auto mt-12 max-w-3xl text-center sm:mt-16">
          <Quote
            aria-hidden="true"
            className="mx-auto size-10 text-brand-500/40 sm:size-12"
            strokeWidth={1.25}
          />
          <blockquote className="mt-4 font-display text-xl leading-snug font-bold text-navy-950 sm:text-3xl">
            „{founderQuote.text}“ <span className="text-brand-600">{founderQuote.hashtag}</span>
          </blockquote>
          <div className="mt-5 flex flex-col items-center gap-1">
            <span
              className="font-signature text-4xl leading-none text-navy-900 sm:text-5xl"
              aria-hidden="true"
            >
              {founderQuote.signature}
            </span>
            <span className="text-sm text-muted">
              <strong className="font-semibold text-navy-900">{founderQuote.name}</strong>,{' '}
              {founderQuote.role} {company.shortName}
            </span>
          </div>
        </Reveal>

        {/* Werte als Zeilen, keine Kästen – auf Desktop drei Spalten mit feinen Trennlinien */}
        <div
          aria-hidden="true"
          className="mx-auto mt-12 h-px w-24 bg-gradient-to-r from-transparent via-brand-400 to-transparent sm:mt-16"
        />
        <RevealGroup
          as="ul"
          className="mx-auto mt-10 grid max-w-5xl gap-8 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-navy-900/10"
        >
          {values.map((value) => (
            <RevealItem
              key={value.title}
              as="li"
              className="flex items-start gap-4 sm:flex-col sm:items-center sm:px-6 sm:text-center lg:px-10"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white text-brand-600 shadow-soft ring-1 ring-brand-100 sm:size-14">
                <value.icon className="size-6 sm:size-7" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <span>
                <h3 className="text-base font-bold text-navy-950 sm:mt-1 sm:text-lg">
                  {value.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted sm:mt-2">{value.text}</p>
              </span>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-10 flex justify-center sm:mt-12">
          <Button href="/ueber-uns" variant="secondary">
            Mehr über uns
            <ArrowRight className={buttonIconClass} aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  );
}
