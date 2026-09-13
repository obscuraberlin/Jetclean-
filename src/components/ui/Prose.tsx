import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** Lesefreundliche Typografie für längere Texte (Rechtstexte, Über uns). */
export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'max-w-3xl text-[0.9375rem] leading-relaxed text-navy-800 [&_a]:text-brand-600 [&_a]:underline [&_a]:underline-offset-2 [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-2xl [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-lg [&_li]:mt-1 [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5',
        className,
      )}
    >
      {children}
    </div>
  );
}
