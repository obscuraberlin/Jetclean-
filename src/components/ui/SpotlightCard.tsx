'use client';

import { motion } from 'motion/react';
import { useRef, type PointerEvent, type ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { easePremium } from '@/lib/motion';
import { cn } from '@/lib/utils';

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  /** Index für die Staffelung beim Einblenden */
  index?: number;
  as?: 'li' | 'div' | 'article';
};

/**
 * Glas-Karte für dunkle Flächen: ein weicher Lichtkegel folgt dem Zeiger (Desktop),
 * beim Scrollen fliegen die Karten gestaffelt und leicht gedreht ein.
 */
export function SpotlightCard({ children, className, index = 0, as = 'li' }: SpotlightCardProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    const node = ref.current;
    if (!node || event.pointerType === 'touch') return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
    node.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
  };

  const Tag = motion[as];
  const fromLeft = index % 2 === 0;
  return (
    <Tag
      ref={ref as never}
      onPointerMove={onPointerMove}
      className={cn(
        'group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] backdrop-blur-sm',
        'transition-[border-color,transform,box-shadow] duration-500 ease-(--ease-premium)',
        'hover:border-brand-400/50 hover:shadow-[0_24px_60px_-20px_rgb(253_83_18/0.45)] motion-safe:hover:-translate-y-1',
        className,
      )}
      initial={
        reduce
          ? false
          : { opacity: 0, y: 32, x: fromLeft ? -16 : 16, rotate: fromLeft ? -1.5 : 1.5 }
      }
      whileInView={{ opacity: 1, y: 0, x: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: easePremium, delay: reduce ? 0 : index * 0.12 }}
    >
      {/* Spotlight – folgt dem Zeiger */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(22rem circle at var(--spot-x, 50%) var(--spot-y, 50%), rgb(253 83 18 / 0.22), transparent 55%)',
        }}
      />
      {/* Glanzkante oben */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
      />
      {children}
    </Tag>
  );
}
