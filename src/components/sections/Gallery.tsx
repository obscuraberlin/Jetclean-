'use client';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useScrollLock } from '@/hooks/useScrollLock';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';

export type GalleryImage = {
  src: string;
  alt: string;
  ratio: 'portrait' | 'landscape' | 'square' | 'wide';
};

const ratios: Record<GalleryImage['ratio'], string> = {
  portrait: 'aspect-[4/5] w-[68vw] sm:w-[22rem]',
  landscape: 'aspect-[4/3] w-[78vw] sm:w-[30rem]',
  square: 'aspect-square w-[68vw] sm:w-[24rem]',
  wide: 'aspect-[16/9] w-[84vw] sm:w-[36rem]',
};

export const galleryImages: GalleryImage[] = [
  {
    src: '/images/services/glasreinigung.webp',
    alt: 'Glasreinigung mit Blick auf die Berliner Skyline',
    ratio: 'portrait',
  },
  {
    src: '/images/cases/office.webp',
    alt: 'Gereinigter Besprechungsraum eines Berliner Unternehmens',
    ratio: 'landscape',
  },
  {
    src: '/images/hero/hero.webp',
    alt: 'JETCLEAN Mitarbeiterin im Büro mit Reinigungswagen',
    ratio: 'portrait',
  },
  { src: '/images/scene/clean.webp', alt: 'Helle Bürofläche nach der Reinigung', ratio: 'wide' },
  {
    src: '/images/services/treppenhausreinigung.webp',
    alt: 'Treppenhausreinigung in einem Berliner Wohnhaus',
    ratio: 'square',
  },
  { src: '/images/cases/medical.webp', alt: 'Hygienisch gereinigte Praxis', ratio: 'landscape' },
];

/** Horizontale Galerie mit großen Bildern, harmonisch unterschiedlichen Formaten und Lightbox. */
export function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  const reduce = useReducedMotion();

  return (
    <section className="py-16 sm:py-24 lg:py-32" aria-labelledby="gallery-title">
      <div className="container-site flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h2
          id="gallery-title"
          className="text-[2.25rem] leading-[1.02] tracking-[-0.03em] sm:text-5xl"
        >
          Unsere Arbeit.
        </h2>
        <p className="max-w-xs text-base text-muted">
          Einblicke aus Berliner Büros, Praxen und Wohnhäusern.
        </p>
      </div>
      <ul
        className="mt-10 scrollbar-none flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:gap-8 sm:px-[max(1.5rem,calc((100vw-80rem)/2+2rem))]"
        aria-label="Galerie"
      >
        {galleryImages.map((image, index) => (
          <li key={image.src} className={cn('shrink-0 snap-start', index % 2 === 1 && 'sm:mt-12')}>
            <button
              type="button"
              onClick={() => setActive(index)}
              className={cn(
                'group relative block overflow-hidden rounded-[1.5rem] bg-navy-100 ring-1 ring-black/[0.04] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500 sm:rounded-[1.75rem]',
                ratios[image.ratio],
              )}
              aria-label={`${image.alt} – vergrößern`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 640px) 36rem, 84vw"
                className="object-cover transition-transform duration-700 ease-(--ease-premium) motion-safe:group-hover:scale-[1.03]"
              />
            </button>
          </li>
        ))}
      </ul>
      <Lightbox index={active} onChange={setActive} reduce={reduce} />
    </section>
  );
}

function Lightbox({
  index,
  onChange,
  reduce,
}: {
  index: number | null;
  onChange: (i: number | null) => void;
  reduce: boolean;
}) {
  const open = index !== null;
  useScrollLock(open);
  const step = useCallback(
    (delta: number) => {
      if (index === null) return;
      onChange((index + delta + galleryImages.length) % galleryImages.length);
    },
    [index, onChange],
  );
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onChange(null);
      if (event.key === 'ArrowRight') step(1);
      if (event.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onChange, step]);

  if (typeof document === 'undefined') return null;
  const image = index !== null ? galleryImages[index] : null;
  return createPortal(
    <AnimatePresence>
      {open && image ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/92 p-4 sm:p-10"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label={image.alt}
          onClick={() => onChange(null)}
        >
          <motion.div
            key={image.src}
            className="relative aspect-[4/3] w-full max-w-5xl overflow-hidden rounded-[1.5rem] sm:rounded-[2rem]"
            initial={reduce ? false : { scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image src={image.src} alt={image.alt} fill sizes="90vw" className="object-cover" />
          </motion.div>
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-sm text-white/80">
            {image.alt}
          </p>
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute top-4 right-4 flex size-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20"
            aria-label="Schließen"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            className="absolute top-1/2 left-3 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20 sm:left-6"
            aria-label="Vorheriges Bild"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            className="absolute top-1/2 right-3 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur hover:bg-white/20 sm:right-6"
            aria-label="Nächstes Bild"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
