'use client';

import { Play } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useId, useState } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { company } from '@/content/company';
import { siteConfig } from '@/content/site';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/utils';

type VideoTrailerProps = {
  id?: string;
  className?: string;
  eyebrow?: string;
  title?: string;
  text?: string;
};

/**
 * Unternehmensfilm als 2-Klick-Lösung: Bis zum Klick wird nur ein lokales Vorschaubild gezeigt,
 * erst danach lädt der YouTube-Player im erweiterten Datenschutzmodus (youtube-nocookie.com).
 */
export function VideoTrailer({
  id = 'film',
  className,
  eyebrow = 'Unser Film',
  title = 'Ein Blick in unsere Arbeit.',
  text = `So arbeiten wir in Berliner Büros, Praxen und Wohnhäusern – ${company.hashtag}.`,
}: VideoTrailerProps) {
  const video = siteConfig.video;
  const [active, setActive] = useState(false);
  const noticeId = useId();
  if (!video) return null;

  return (
    <section
      className={cn('relative overflow-hidden section-y', className)}
      aria-labelledby={`${id}-title`}
      id={id}
    >
      <div aria-hidden="true" className="blob top-1/3 -left-40 size-[28rem] bg-navy-200/50" />
      <div className="relative container-site">
        <SectionHeading id={`${id}-title`} eyebrow={eyebrow} title={title} text={text} />
        <Reveal variant="image" className="mt-8 lg:mt-12">
          <div className="relative aspect-video overflow-hidden rounded-3xl bg-navy-950 shadow-lift">
            {active ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1&hl=de`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 size-full"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            ) : (
              <>
                <Image
                  src="/images/hero/office.webp"
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 80rem, 100vw"
                  className="object-cover opacity-80"
                  aria-hidden="true"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-navy-950/10"
                />
                <button
                  type="button"
                  onClick={() => {
                    setActive(true);
                    track('cta_click', { source: 'video-play' });
                  }}
                  aria-describedby={noticeId}
                  className="group absolute inset-0 flex flex-col items-center justify-center gap-4 text-white focus-visible:outline-4 focus-visible:outline-offset-[-6px] focus-visible:outline-brand-500"
                  data-testid="video-play"
                >
                  <span className="flex size-20 items-center justify-center rounded-full bg-brand-500 text-white shadow-brand transition-transform duration-300 ease-(--ease-premium) motion-safe:group-hover:scale-105 sm:size-24">
                    <Play className="ml-1 size-9 fill-current sm:size-11" aria-hidden="true" />
                  </span>
                  <span className="font-display text-lg font-bold sm:text-2xl">
                    Film ansehen{video.duration ? ` · ${video.duration}` : ''}
                  </span>
                  <span className="sr-only">{video.title}</span>
                </button>
                <p
                  id={noticeId}
                  className="absolute inset-x-0 bottom-0 px-5 py-4 text-center text-xs leading-relaxed text-white/75 sm:px-8"
                >
                  Mit Klick auf „Film ansehen“ wird das Video von YouTube (Google) im erweiterten
                  Datenschutzmodus geladen. Dabei werden Daten an Google übertragen – Details in
                  unserer{' '}
                  <Link
                    href="/datenschutz"
                    className="underline underline-offset-2 hover:text-white"
                  >
                    Datenschutzerklärung
                  </Link>
                  .
                </p>
              </>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
