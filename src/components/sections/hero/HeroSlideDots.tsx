'use client';

import { heroSlides } from '@/content/heroSlides';
import { cn } from '@/lib/utils';
import { useHeroSlide } from './HeroSlideContext';

type HeroSlideDotsProps = {
  className?: string;
  /** Helle Variante für dunkle Hintergründe */
  tone?: 'light' | 'dark';
};

/** Punkte zum manuellen Wechseln der Hero-Slides (Tab-Semantik). */
export function HeroSlideDots({ className, tone = 'light' }: HeroSlideDotsProps) {
  const { index, goTo } = useHeroSlide();
  return (
    <div
      className={cn('flex items-center justify-center gap-2', className)}
      role="tablist"
      aria-label="Hero-Slides"
    >
      {heroSlides.map((slide, i) => {
        const active = i === index;
        return (
          <button
            key={slide.id}
            type="button"
            role="tab"
            aria-selected={active}
            aria-label={`Slide ${i + 1}: ${slide.label}`}
            onClick={() => goTo(i)}
            className={cn(
              'h-2 rounded-full transition-all duration-500',
              active ? 'w-8' : 'w-2 hover:w-4',
              tone === 'light'
                ? active
                  ? 'bg-brand-500'
                  : 'bg-white/55 hover:bg-white/80'
                : active
                  ? 'bg-brand-500'
                  : 'bg-navy-900/25 hover:bg-navy-900/45',
            )}
          />
        );
      })}
    </div>
  );
}
