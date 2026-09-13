'use client';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import { motion, type Variants } from 'motion/react';
import type { ElementType, ReactNode } from 'react';
import { fadeUp, imageReveal, staggerContainer, viewportGroup, viewportOnce } from '@/lib/motion';

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Verzögerung in Sekunden */
  delay?: number;
  variant?: 'fadeUp' | 'image';
  as?: 'div' | 'section' | 'li' | 'article' | 'figure' | 'span';
};

/**
 * Einmaliger Entrance-Reveal beim Scrollen (Fade + leichter Translate).
 * Bei `prefers-reduced-motion` wird der Inhalt ohne Animation gerendert.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  variant = 'fadeUp',
  as = 'div',
}: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = motion[as] as ElementType;
  if (reduce) {
    const Plain = as as ElementType;
    return <Plain className={className}>{children}</Plain>;
  }
  const variants: Variants = variant === 'image' ? imageReveal : fadeUp;
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={variants}
      transition={delay ? { delay } : undefined}
      style={variant === 'image' ? { willChange: 'transform, opacity, clip-path' } : undefined}
    >
      {children}
    </Tag>
  );
}

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  as?: 'div' | 'ul' | 'ol' | 'section';
};

/** Container, dessen `RevealItem`-Kinder gestaffelt erscheinen. */
export function RevealGroup({ children, className, stagger = 0.08, as = 'div' }: RevealGroupProps) {
  const reduce = useReducedMotion();
  if (reduce) {
    const Plain = as as ElementType;
    return <Plain className={className}>{children}</Plain>;
  }
  const Tag = motion[as] as ElementType;
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportGroup}
      variants={staggerContainer(stagger)}
    >
      {children}
    </Tag>
  );
}

export function RevealItem({
  children,
  className,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'li' | 'article';
}) {
  const reduce = useReducedMotion();
  if (reduce) {
    const Plain = as as ElementType;
    return <Plain className={className}>{children}</Plain>;
  }
  const Tag = motion[as] as ElementType;
  return (
    <Tag className={className} variants={fadeUp}>
      {children}
    </Tag>
  );
}
