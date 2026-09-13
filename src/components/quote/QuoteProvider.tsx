'use client';

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { track } from '@/lib/analytics';

type QuoteContextValue = {
  isOpen: boolean;
  source: string;
  open: (source?: string) => void;
  close: () => void;
};

const QuoteContext = createContext<QuoteContextValue | null>(null);

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState('modal');

  const open = useCallback((nextSource = 'modal') => {
    setSource(nextSource);
    setIsOpen(true);
    track('quote_opened', { source: nextSource });
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ isOpen, source, open, close }), [isOpen, source, open, close]);

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>;
}

export function useQuote() {
  const context = useContext(QuoteContext);
  if (!context) throw new Error('useQuote muss innerhalb von <QuoteProvider> verwendet werden.');
  return context;
}
