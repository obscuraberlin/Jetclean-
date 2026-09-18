'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import { QuoteButton } from '@/components/quote/QuoteButton';
import { company } from '@/content/company';
import { heroSlides } from '@/content/heroSlides';
import { easePremium } from '@/lib/motion';
import { cn } from '@/lib/utils';
import { useHeroSlide } from './HeroSlideContext';
import { HeroSlideDots } from './HeroSlideDots';

type HeroMobileSliderProps = {
  portrait: { src: string; alt: string };
};

/**
 * Mobile/Tablet-Hero: drei Fotos im Wechsel, Headline und Text ändern sich passend.
 * Die H1 bleibt dasselbe Element – nur ihr Inhalt wird animiert ausgetauscht.
 */
export function HeroMobileSlider({ portrait }: HeroMobileSliderProps) {
  const { index, setPaused, reduce, next, prev } = useHeroSlide();
  const slide = heroSlides[index] ?? heroSlides[0]!;
  const textTransition = reduce ? { duration: 0 } : { duration: 0.55, ease: easePremium };

  return (
    <div
      className="relative min-h-[32rem] overflow-hidden sm:min-h-[36rem]"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') next();
        if (event.key === 'ArrowLeft') prev();
      }}
    >
      {/* Fotos: alle im DOM, Wechsel per Opacity (kein Layout-Shift) */}
      {heroSlides.map((item, i) => (
        <div
          key={item.id}
          aria-hidden="true"
          className={cn(
            'absolute inset-0 transition-opacity duration-[1200ms] ease-out',
            i === index ? 'opacity-100' : 'opacity-0',
          )}
        >
          <Image
            src={item.image.src}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className={cn(
              'object-cover',
              !reduce && 'transition-transform duration-[7000ms] ease-linear',
              i === index && !reduce ? 'scale-[1.06]' : 'scale-100',
            )}
            style={{ objectPosition: item.image.position }}
          />
        </div>
      ))}
      {/* Porträt nur auf dem ersten Slide */}
      <div
        aria-hidden="true"
        className={cn(
          'absolute inset-y-0 right-0 w-[60%] [mask-image:linear-gradient(to_left,black_55%,transparent)] transition-opacity duration-[1200ms] sm:w-[44%]',
          index === 0 ? 'opacity-100' : 'opacity-0',
        )}
      >
        <Image
          src={portrait.src}
          alt=""
          fill
          sizes="(min-width: 640px) 42vw, 58vw"
          className="object-cover object-[60%_top]"
          quality={75}
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/40 to-navy-950/15"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-navy-950/70 via-navy-950/30 to-transparent"
      />

      <div
        className="relative container-site flex min-h-[32rem] flex-col items-start justify-end pt-14 pb-11 text-left sm:min-h-[36rem]"
        aria-live="polite"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={`eyebrow-${slide.id}`}
            className="text-[0.6875rem] font-semibold tracking-[0.22em] text-white/85 uppercase"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={textTransition}
          >
            {slide.eyebrow}
          </motion.p>
        </AnimatePresence>
        <h1 className="mt-4 font-display text-[2.5rem] leading-[1.02] font-extrabold tracking-[-0.02em] text-white uppercase sm:text-6xl">
          <span className="sr-only">Gebäudereinigung für Berliner Unternehmen: </span>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={`lines-${slide.id}`}
              className="block"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: reduce ? 0 : 0.1 } },
                exit: { transition: { staggerChildren: reduce ? 0 : 0.04 } },
              }}
            >
              {slide.lines.map((line, i) => (
                <motion.span
                  key={line}
                  className={cn('block', i === 1 && 'text-brand-400')}
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    visible: { opacity: 1, y: 0, transition: textTransition },
                    exit: {
                      opacity: 0,
                      y: -10,
                      transition: { ...textTransition, duration: reduce ? 0 : 0.3 },
                    },
                  }}
                >
                  {line}
                </motion.span>
              ))}
            </motion.span>
          </AnimatePresence>
        </h1>
        <div className="relative mt-5 min-h-[4.5rem] max-w-md sm:min-h-[3.5rem]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={`text-${slide.id}`}
              className="text-[0.9375rem] leading-relaxed text-white/85 sm:text-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ ...textTransition, delay: reduce ? 0 : 0.1 }}
            >
              {slide.text}
            </motion.p>
          </AnimatePresence>
        </div>
        <div className="mt-6 flex justify-start">
          <QuoteButton source="hero-mobile-cta" size="lg">
            Angebot anfordern
          </QuoteButton>
        </div>
        <HeroSlideDots className="mt-6 justify-start" />
        <span className="sr-only">
          {company.shortName} – Slide {index + 1} von {heroSlides.length}
        </span>
      </div>
    </div>
  );
}
