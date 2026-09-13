'use client';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import { motion, useScroll, useSpring } from 'motion/react';

/** Dünne Fortschrittslinie in Markenfarbe am oberen Rand. */
export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });
  if (reduce) return null;
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-brand-600 via-brand-500 to-brand-400"
      style={{ scaleX }}
    />
  );
}
