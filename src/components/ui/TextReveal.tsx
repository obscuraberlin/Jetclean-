'use client';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import { motion } from 'motion/react';
import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type TextRevealProps = {
  /** Zeilen der Headline – jede Zeile wird aus einer unsichtbaren Maske geschoben */
  lines: ReactNode[];
  as?: 'h1' | 'h2' | 'p' | 'span';
  className?: string;
  lineClassName?: string;
  delay?: number;
  /** Beim Sichtbarwerden statt beim Laden animieren */
  inView?: boolean;
};

/** Headline-Zeilen, die weich aus einer Maskierung herausgleiten (kein simples Fade-in). */
export function TextReveal({
  lines,
  as = 'h1',
  className,
  lineClassName,
  delay = 0,
  inView = false,
}: TextRevealProps) {
  const reduce = useReducedMotion();
  const Tag = as as ElementType;
  return (
    <Tag className={className}>
      {lines.map((line, index) => (
        <span
          key={index}
          className={cn('-mb-[0.08em] block overflow-hidden pb-[0.08em]', lineClassName)}
        >
          {reduce ? (
            <span className="block">{line}</span>
          ) : (
            <motion.span
              className="block will-change-transform"
              initial={{ y: '110%', rotate: 1.5 }}
              {...(inView
                ? { whileInView: { y: 0, rotate: 0 }, viewport: { once: true, amount: 0.6 } }
                : { animate: { y: 0, rotate: 0 } })}
              transition={{
                duration: 0.9,
                delay: delay + index * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {line}
            </motion.span>
          )}
        </span>
      ))}
    </Tag>
  );
}
