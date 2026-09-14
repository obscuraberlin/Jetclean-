'use client';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, type ReactNode } from 'react';

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /** Verschiebung in Pixeln über die sichtbare Strecke */
  distance?: number;
  /** 'hero': Element beginnt am oberen Rand; 'inview': Element wandert durch den Viewport */
  mode?: 'hero' | 'inview';
};

/** Sanfter Scroll-Parallax für Bilder und Dekor. */
export function Parallax({ children, className, distance = 60, mode = 'hero' }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: mode === 'hero' ? ['start start', 'end start'] : ['start end', 'end start'],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    mode === 'hero' ? [0, distance] : [distance / 2, -distance / 2],
  );
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}
