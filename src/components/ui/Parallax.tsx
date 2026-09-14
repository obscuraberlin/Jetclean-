'use client';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, type ReactNode } from 'react';

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /** Verschiebung in Pixeln über die sichtbare Strecke */
  distance?: number;
  axis?: 'x' | 'y';
  /** Bereich, in dem das Element sichtbar ist (Standard: gesamter Weg durch den Viewport) */
  offset?: ['start end', 'end start'] | ['start start', 'end start'];
};

/** Sehr dezenter Scroll-Parallax für Bilder und Dekor. */
export function Parallax({
  children,
  className,
  distance = 40,
  axis = 'y',
  offset = ['start end', 'end start'],
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset });
  const value = useTransform(scrollYProgress, [0, 1], [-distance / 2, distance / 2]);
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div ref={ref} className={className} style={axis === 'y' ? { y: value } : { x: value }}>
      {children}
    </motion.div>
  );
}
