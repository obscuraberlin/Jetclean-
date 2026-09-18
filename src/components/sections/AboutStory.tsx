import { ArrowRight, HeartHandshake, Leaf, Quote, Users } from 'lucide-react';
import { Button, buttonIconClass } from '@/components/ui/Button';
import { IconBox } from '@/components/ui/IconBox';
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
 * „Über uns“ auf der Startseite: Familienunternehmen seit 2004, drei Werte und der Imagefilm.
 */
export function AboutStory() {
  return (
    <section
      className="relative overflow-hidden bg-surface section-y"
      aria-labelledby="about-title"
      id="ueber-uns"
    >
      <div aria-hidden="true" className="blob top-10 right-[-10rem] size-[26rem] bg-brand-500/10" />
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
        {/* Imagefilm direkt unter dem Einleitungstext */}
        <Reveal variant="image" className="mx-auto mt-8 max-w-3xl sm:mt-10">
          <VideoEmbed />
        </Reveal>

        {/* Zitat des Geschäftsführers mit Unterschrift */}
        <Reveal className="mx-auto mt-8 max-w-3xl sm:mt-10">
          <figure className="relative overflow-hidden rounded-3xl border border-line bg-white px-6 pt-8 pb-6 text-center shadow-card sm:px-10 sm:pt-10 sm:pb-8">
            <Quote
              aria-hidden="true"
              className="absolute top-4 left-5 size-14 text-brand-500/15 sm:size-20"
              strokeWidth={1}
            />
            <blockquote className="relative font-display text-lg leading-snug font-bold text-navy-950 sm:text-2xl">
              „{founderQuote.text}“ <span className="text-brand-600">{founderQuote.hashtag}</span>
            </blockquote>
            <figcaption className="relative mt-5 flex flex-col items-center gap-1">
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
            </figcaption>
          </figure>
        </Reveal>

        <RevealGroup as="ul" className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-4 lg:gap-5">
          {values.map((value) => (
            <RevealItem
              key={value.title}
              as="li"
              className="flex card-hover items-start gap-3 rounded-2xl border border-line bg-white p-4 shadow-soft sm:flex-col sm:gap-3 sm:rounded-3xl sm:p-6"
            >
              <IconBox icon={value.icon} tone="brand" size="md" />
              <span>
                <h3 className="text-base font-bold sm:text-lg">{value.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{value.text}</p>
              </span>
            </RevealItem>
          ))}
        </RevealGroup>
        <div className="mt-8 flex justify-center">
          <Button href="/ueber-uns" variant="secondary">
            Mehr über uns
            <ArrowRight className={buttonIconClass} aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  );
}
