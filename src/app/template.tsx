'use client';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import { motion } from 'motion/react';
import type { ReactNode } from 'react';

/**
 * Sanfter Einblend-Übergang beim Seitenwechsel. Bewusst nur Opazität: ein Transform auf
 * diesem Wrapper würde `position: fixed` (Sticky-CTA, Kontaktmenü) aushebeln.
 */
export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
