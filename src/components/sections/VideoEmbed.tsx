'use client';

import { Play } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useId, useState } from 'react';
import { siteConfig } from '@/content/site';
import { track } from '@/lib/analytics';

/**
 * Unternehmensfilm als 2-Klick-Lösung: Bis zum Klick nur ein lokales Vorschaubild,
 * erst danach lädt der YouTube-Player im erweiterten Datenschutzmodus (youtube-nocookie.com).
 */
export function VideoEmbed({
  className,
  poster = '/images/hero/office.webp',
}: {
  className?: string;
  poster?: string;
}) {
  const video = siteConfig.video;
  const [active, setActive] = useState(false);
  const noticeId = useId();
  if (!video) return null;

  return (
    <div className={className}>
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
              src={poster}
              alt=""
              fill
              sizes="(min-width: 1280px) 60rem, 100vw"
              className="object-cover opacity-80"
              aria-hidden="true"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/25 to-navy-950/10"
            />
            <button
              type="button"
              onClick={() => {
                setActive(true);
                track('cta_click', { source: 'video-play' });
              }}
              aria-describedby={noticeId}
              className="group absolute inset-0 flex flex-col items-center justify-center gap-3 text-white focus-visible:outline-4 focus-visible:outline-offset-[-6px] focus-visible:outline-brand-500 sm:gap-4"
              data-testid="video-play"
            >
              <span className="flex size-16 items-center justify-center rounded-full bg-brand-500 text-white shadow-brand transition-transform duration-300 ease-(--ease-premium) motion-safe:group-hover:scale-105 sm:size-24">
                <Play className="ml-1 size-7 fill-current sm:size-11" aria-hidden="true" />
              </span>
              <span className="font-display text-base font-bold sm:text-2xl">
                Imagefilm ansehen{video.duration ? ` · ${video.duration}` : ''}
              </span>
              <span className="sr-only">{video.title}</span>
            </button>
          </>
        )}
      </div>
      {!active ? (
        <p
          id={noticeId}
          className="mt-2.5 px-2 text-center text-[0.6875rem] leading-snug text-muted sm:text-xs"
        >
          Mit Klick wird das Video von YouTube (Google) im erweiterten Datenschutzmodus geladen;
          dabei werden Daten an Google übertragen – Details in unserer{' '}
          <Link href="/datenschutz" className="underline underline-offset-2 hover:text-navy-900">
            Datenschutzerklärung
          </Link>
          .
        </p>
      ) : null}
    </div>
  );
}
