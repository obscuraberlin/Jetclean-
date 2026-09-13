import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type BadgeProps = {
  children: ReactNode;
  tone?: 'brand' | 'neutral' | 'success' | 'navy';
  className?: string;
};

const tones = {
  brand: 'bg-brand-50 text-brand-700 ring-brand-100',
  neutral: 'bg-surface text-navy-700 ring-line',
  success: 'bg-success-50 text-success-700 ring-success-100',
  navy: 'bg-navy-950 text-white ring-navy-900',
};

export function Badge({ children, tone = 'brand', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide ring-1 ring-inset',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Kennzeichnung für nicht verifizierte Beispielinhalte (Testimonials, Logos, Cases). */
export function PlaceholderBadge({ className }: { className?: string }) {
  return (
    <Badge tone="neutral" className={cn('font-medium text-muted', className)}>
      Beispielinhalt
    </Badge>
  );
}
