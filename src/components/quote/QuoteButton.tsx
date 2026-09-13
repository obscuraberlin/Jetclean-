'use client';

import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';
import {
  Button,
  buttonIconClass,
  type ButtonSize,
  type ButtonVariant,
} from '@/components/ui/Button';
import { track } from '@/lib/analytics';
import { useQuote } from './QuoteProvider';

type QuoteButtonProps = {
  /** Kennung, woher der Klick kam (für Lead-Attribution) */
  source: string;
  children?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  withIcon?: boolean;
};

/** Primärer CTA – öffnet den Angebots-Flow als Modal/Bottom-Sheet. */
export function QuoteButton({
  source,
  children = 'Kostenloses Angebot erhalten',
  variant = 'primary',
  size = 'md',
  className,
  withIcon = true,
}: QuoteButtonProps) {
  const { open } = useQuote();
  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={() => {
        track('cta_click', { source });
        open(source);
      }}
      data-quote-source={source}
    >
      {children}
      {withIcon ? <ArrowRight className={buttonIconClass} aria-hidden="true" /> : null}
    </Button>
  );
}
