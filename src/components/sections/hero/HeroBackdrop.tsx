'use client';

import Image from 'next/image';
import { heroSlides } from '@/content/heroSlides';
import { cn } from '@/lib/utils';
import { useHeroSlide } from './HeroSlideContext';

/**
 * Desktop: Foto-Fläche hinter Bild und Anfrage-Karte – wechselt synchron mit dem Slider,
 * bleibt aber weich und hell überblendet, damit Text und Karte lesbar bleiben.
 */
export function HeroBackdrop({ className }: { className?: string }) {
  const { index, reduce } = useHeroSlide();
  return (
    <div aria-hidden="true" className={cn('overflow-hidden', className)}>
      {heroSlides.map((slide, i) => (
        <div
          key={slide.id}
          className={cn(
            'absolute inset-0 transition-opacity duration-[1400ms] ease-out',
            i === index ? 'opacity-100' : 'opacity-0',
          )}
        >
          <Image
            src={slide.image.src}
            alt=""
            fill
            priority={i === 0}
            sizes="(min-width: 1024px) 62vw, 100vw"
            className={cn(
              'object-cover blur-[2px]',
              !reduce && 'transition-transform duration-[7000ms] ease-linear',
              i === index && !reduce ? 'scale-110' : 'scale-105',
            )}
            style={{ objectPosition: i === 0 ? 'left center' : slide.image.position }}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-white/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/10 to-white/60" />
    </div>
  );
}
