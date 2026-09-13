'use client';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import { motion } from 'motion/react';
import type { ReactNode } from 'react';

/** Sanfter Einblend-Übergang beim Seitenwechsel (Fade + leichtes Aufsteigen). */
export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
