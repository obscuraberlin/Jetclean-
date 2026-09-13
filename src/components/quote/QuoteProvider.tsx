'use client';

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { track } from '@/lib/analytics';

/** Werte, die z. B. aus der kompakten Hero-Karte in den Dialog übernommen werden. */
export type QuotePrefill = {
  service?: string;
  area_size?: string;
  frequency?: string;
  postal_code?: string;
};

type OpenOptions = {
  /** Vorbelegte Werte */
  prefill?: QuotePrefill;
  /** Schritt (0-basiert), mit dem der Dialog startet */
  step?: number;
};

type QuoteContextValue = {
  isOpen: boolean;
  source: string;
  prefill: QuotePrefill | null;
  initialStep: number;
  /** Zähler, der bei jedem Öffnen steigt – für ein frisches Formular */
  openCount: number;
  open: (source?: string, options?: OpenOptions) => void;
  close: () => void;
};

const QuoteContext = createContext<QuoteContextValue | null>(null);

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState('modal');
  const [prefill, setPrefill] = useState<QuotePrefill | null>(null);
  const [initialStep, setInitialStep] = useState(0);
  const [openCount, setOpenCount] = useState(0);

  const open = useCallback((nextSource = 'modal', options?: OpenOptions) => {
    setSource(nextSource);
    setPrefill(options?.prefill ?? null);
    setInitialStep(options?.step ?? 0);
    setOpenCount((count) => count + 1);
    setIsOpen(true);
    track('quote_opened', { source: nextSource });
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, source, prefill, initialStep, openCount, open, close }),
    [isOpen, source, prefill, initialStep, openCount, open, close],
  );

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}

export function useQuote() {
  const context = useContext(QuoteContext);
  if (!context) throw new Error('useQuote muss innerhalb von <QuoteProvider> verwendet werden.');
  return context;
}
