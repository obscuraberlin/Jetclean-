'use client';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react';
import Image from 'next/image';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

const statements = [
  'Sauberkeit, die man sieht.',
  'Service, den man spürt.',
  'Qualität, auf die man sich verlassen kann.',
  'JETCLEAN Berlin.',
];

const scene = {
  dirty: { src: '/images/scene/dirty.webp', alt: 'Bürofläche vor der Reinigung' },
  clean: {
    src: '/images/scene/clean.webp',
    alt: 'Dieselbe Bürofläche nach der Reinigung durch JETCLEAN',
  },
};

/**
 * Der stärkste Designmoment: eine fast bildschirmfüllende Szene, die sich mit dem Scrollen
 * von „benutzt“ zu „professionell gereinigt“ verwandelt – gekoppelt an die Scrollposition
 * (vorwärts wie rückwärts). Reduced motion: statische Alternative.
 */
export function CinematicScene() {
  const reduce = useReducedMotion();
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  if (reduce) return <StaticScene />;

  return (
    <section
      ref={ref}
      className={cn('relative', isDesktop ? 'h-[320vh]' : 'h-[230vh]')}
      aria-label="Vom benutzten zum gereinigten Büro"
    >
      <div className="sticky top-0 flex h-[100svh] items-center">
        <div className="container-site w-full">
          <SceneStage progress={scrollYProgress} simplified={!isDesktop} />
        </div>
      </div>
    </section>
  );
}

function SceneStage({
  progress,
  simplified,
}: {
  progress: MotionValue<number>;
  simplified: boolean;
}) {
  // Kamera: langsame Fahrt durch den Raum
  const scale = useTransform(progress, [0, 1], simplified ? [1.06, 1] : [1.12, 1]);
  const x = useTransform(progress, [0, 1], simplified ? ['0%', '0%'] : ['-2.5%', '1.5%']);
  const y = useTransform(progress, [0, 1], ['1.5%', '-1.5%']);
  // Verwandlung: Klarheit wandert als weiche Kante von links nach rechts
  const wipe = useTransform(progress, [0.18, 0.72], [0, 100]);
  const mask = useTransform(
    wipe,
    (v) =>
      `linear-gradient(to right, black ${Math.max(0, v - 8)}%, transparent ${Math.min(112, v + 10)}%)`,
  );
  const dirtyOpacity = useTransform(progress, [0.55, 0.85], [1, 0]);
  const dirtyBlur = useTransform(
    progress,
    [0, 0.7],
    simplified ? ['blur(0px)', 'blur(0px)'] : ['blur(0px)', 'blur(6px)'],
  );
  const shade = useTransform(progress, [0, 0.8], [0.35, 0]);

  return (
    <div className="relative h-[82svh] min-h-[420px] overflow-hidden rounded-[1.75rem] bg-navy-950 sm:rounded-[2rem] lg:rounded-[2.5rem]">
      <motion.div className="absolute inset-0 will-change-transform" style={{ scale, x, y }}>
        <Image
          src={scene.dirty.src}
          alt={scene.dirty.alt}
          fill
          sizes="(min-width: 1280px) 80rem, 100vw"
          className="object-cover"
        />
        <motion.div
          className="absolute inset-0"
          style={{ opacity: dirtyOpacity, filter: dirtyBlur }}
        >
          <Image
            src={scene.dirty.src}
            alt=""
            fill
            sizes="(min-width: 1280px) 80rem, 100vw"
            className="object-cover"
            aria-hidden="true"
          />
        </motion.div>
        <motion.div className="absolute inset-0" style={{ maskImage: mask, WebkitMaskImage: mask }}>
          <Image
            src={scene.clean.src}
            alt={scene.clean.alt}
            fill
            sizes="(min-width: 1280px) 80rem, 100vw"
            className="object-cover"
          />
          {/* weiche Kante des Wischers */}
          <motion.div
            aria-hidden="true"
            className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            style={{ left: useTransform(wipe, (v) => `calc(${v}% - 6rem)`) }}
          />
        </motion.div>
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-navy-950"
        style={{ opacity: shade }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-navy-950/55 via-transparent to-navy-950/10"
      />

      {/* Aussagen – jede bekommt ihren eigenen Moment */}
      <div className="absolute inset-0 flex items-end p-6 sm:p-10 lg:p-14">
        <div className="relative h-[2.4em] w-full font-display text-[2rem] leading-tight font-bold tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
          {statements.map((text, index) => (
            <Statement
              key={text}
              text={text}
              index={index}
              progress={progress}
              total={statements.length}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Statement({
  text,
  index,
  progress,
  total,
}: {
  text: string;
  index: number;
  progress: MotionValue<number>;
  total: number;
}) {
  const start = 0.06 + (index * 0.84) / total;
  const last = index === total - 1;
  const end = last ? 1 : start + 0.84 / total;
  // Alle Stützstellen müssen innerhalb von [0, 1] liegen (Scroll-Timeline).
  const opacity = useTransform(
    progress,
    [start, start + 0.05, end - 0.05, end],
    [0, 1, 1, last ? 1 : 0],
  );
  const y = useTransform(
    progress,
    [start, start + 0.05, end - 0.05, end],
    [24, 0, 0, last ? 0 : -18],
  );
  return (
    <motion.p
      className="absolute inset-x-0 bottom-0 max-w-3xl will-change-[opacity,transform]"
      style={{ opacity, y }}
    >
      {text}
    </motion.p>
  );
}

function StaticScene() {
  return (
    <section className="py-16 sm:py-24" aria-label="Gereinigtes Büro">
      <div className="container-site">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] sm:aspect-[16/8]">
          <Image
            src={scene.clean.src}
            alt={scene.clean.alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent"
          />
          <ul className="absolute inset-x-0 bottom-0 space-y-1 p-6 font-display text-2xl font-bold text-white sm:p-10 sm:text-4xl">
            {statements.map((text) => (
              <li key={text}>{text}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
