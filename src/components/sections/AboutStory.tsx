import { ArrowRight, HeartHandshake, Leaf, Users } from 'lucide-react';
import { Button, buttonIconClass } from '@/components/ui/Button';
import { IconBox } from '@/components/ui/IconBox';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
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
          text={`${company.shortName} ist seit ${company.foundedYear} in Berlin zu Hause: familiengeführt, mittelständisch und mit dem Anspruch, dass sich Kunden um nichts kümmern müssen. Was uns seit dem ersten Tag ausmacht, sind drei Dinge.`}
        />
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
        <Reveal variant="image" className="mx-auto mt-8 max-w-3xl sm:mt-10">
          <VideoEmbed />
        </Reveal>
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
