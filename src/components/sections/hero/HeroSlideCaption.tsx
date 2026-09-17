'use client';

import { AnimatePresence, motion } from 'motion/react';
import { heroSlides } from '@/content/heroSlides';
import { easePremium } from '@/lib/motion';
import { cn } from '@/lib/utils';
import { useHeroSlide } from './HeroSlideContext';
import { HeroSlideDots } from './HeroSlideDots';

/** Desktop: kleine Zeile unter der Headline, die mit dem Slider wechselt, plus Punkte. */
export function HeroSlideCaption({ className }: { className?: string }) {
  const { index, reduce } = useHeroSlide();
  const slide = heroSlides[index] ?? heroSlides[0]!;
  return (
    <div className={cn('flex flex-col items-center gap-3', className)}>
      <div className="relative min-h-[1.75rem] w-full">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={slide.id}
            className="text-sm font-semibold tracking-[0.12em] text-brand-600 uppercase"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={reduce ? { duration: 0 } : { duration: 0.45, ease: easePremium }}
          >
            {slide.lines.join(' ')}
          </motion.p>
        </AnimatePresence>
      </div>
      <HeroSlideDots tone="dark" />
    </div>
  );
}
