'use client';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, type ReactNode } from 'react';

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /** Verschiebung in Pixeln über die sichtbare Strecke (positiv = langsamer als der Inhalt) */
  distance?: number;
};

/** Sanfter Scroll-Parallax für Hintergrundbilder und Dekor. */
export function Parallax({ children, className, distance = 60 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, distance]);
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}
