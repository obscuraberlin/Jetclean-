import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { company } from '@/content/company';
import { siteConfig } from '@/content/site';
import { cn } from '@/lib/utils';
import { VideoEmbed } from './VideoEmbed';

type VideoTrailerProps = {
  id?: string;
  className?: string;
  eyebrow?: string;
  title?: string;
  text?: string;
};

/** Eigenständige Film-Sektion (Unterseiten). Auf der Startseite ist der Film Teil von „Über uns“. */
export function VideoTrailer({
  id = 'film',
  className,
  eyebrow = 'Unser Film',
  title = 'Ein Blick in unsere Arbeit.',
  text = `So arbeiten wir in Berliner Büros, Praxen und Wohnhäusern – ${company.hashtag}.`,
}: VideoTrailerProps) {
  if (!siteConfig.video) return null;
  return (
    <section
      className={cn('relative overflow-hidden section-y', className)}
      aria-labelledby={`${id}-title`}
      id={id}
    >
      <div aria-hidden="true" className="blob top-1/3 -left-40 size-[28rem] bg-navy-200/50" />
      <div className="relative container-site">
        <SectionHeading id={`${id}-title`} eyebrow={eyebrow} title={title} text={text} />
        <Reveal variant="image" className="mx-auto mt-8 max-w-3xl lg:mt-10">
          <VideoEmbed />
        </Reveal>
      </div>
    </section>
  );
}
