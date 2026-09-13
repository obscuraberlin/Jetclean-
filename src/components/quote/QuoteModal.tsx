'use client';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useRef, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useScrollLock } from '@/hooks/useScrollLock';
import { QuoteForm } from './QuoteForm';
import { useQuote } from './QuoteProvider';

const subscribeNoop = () => () => {};

/**
 * Angebots-Flow als Dialog: auf Smartphones als Bottom-Sheet, ab Tablet zentriert.
 * Fokus-Trap, Escape, Scroll-Lock und `inert` für den Rest der Seite.
 */
export function QuoteModal() {
  const { isOpen, close, source, prefill, initialStep, openCount } = useQuote();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();
  const isDesktop = useMediaQuery('(min-width: 640px)');
  const mounted = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );

  useScrollLock(isOpen);
  useFocusTrap(panelRef, isOpen, { onEscape: close, initialFocusRef: closeButtonRef });

  const handleClose = useCallback(() => close(), [close]);

  if (!mounted) return null;

  const sheetMotion = isDesktop
    ? {
        initial: { opacity: 0, scale: 0.96, y: 12 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.98, y: 8 },
      }
    : { initial: { y: '100%' }, animate: { y: 0 }, exit: { y: '100%' } };

  return createPortal(
    <AnimatePresence>
      {isOpen ? (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6"
          data-testid="quote-modal"
        >
          <motion.button
            type="button"
            aria-label="Dialog schließen"
            tabIndex={-1}
            className="absolute inset-0 bg-navy-950/55 backdrop-blur-[2px]"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleClose}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="quote-dialog-title"
            className="relative flex max-h-[92dvh] w-full flex-col rounded-t-3xl bg-white shadow-lift sm:max-h-[90vh] sm:max-w-xl sm:rounded-3xl"
            initial={reduce ? false : sheetMotion.initial}
            animate={sheetMotion.animate}
            exit={reduce ? undefined : sheetMotion.exit}
            transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between gap-4 border-b border-line px-5 pt-4 pb-3 sm:px-7 sm:pt-5">
              <div className="min-w-0">
                <div
                  className="mx-auto mb-3 h-1 w-10 rounded-full bg-line-strong sm:hidden"
                  aria-hidden="true"
                />
                <h2
                  id="quote-dialog-title"
                  className="font-display text-lg font-bold text-navy-950"
                >
                  Kostenloses Reinigungsangebot
                </h2>
                <p className="mt-0.5 text-sm text-muted">Dauert ca. 60 Sekunden – unverbindlich.</p>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={handleClose}
                className="flex size-10 shrink-0 items-center justify-center rounded-full text-navy-500 transition-colors hover:bg-surface hover:text-navy-900"
                aria-label="Schließen"
                data-testid="quote-close"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
            <div
              className="overflow-y-auto overscroll-contain px-5 py-5 sm:px-7 sm:py-6"
              style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}
            >
              <QuoteForm
                key={openCount}
                source={source}
                variant="modal"
                onClose={handleClose}
                initialValues={prefill ?? undefined}
                initialStep={initialStep}
              />
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
