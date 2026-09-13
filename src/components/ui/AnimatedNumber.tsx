'use client';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import { animate, useInView } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

type AnimatedNumberProps = {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  durationMs?: number;
};

/** Zählt beim erstmaligen Sichtbarwerden von 0 auf `value` hoch (einmalig). */
export function AnimatedNumber({
  value,
  suffix = '',
  prefix = '',
  className,
  durationMs = 900,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);
  const shown = reduce ? value : display;

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, value, {
      duration: durationMs / 1000,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, value, reduce, durationMs]);

  return (
    <span ref={ref} className={className} aria-label={`${prefix}${value}${suffix}`}>
      {prefix}
      {shown}
      {suffix}
    </span>
  );
}
