'use client';

import { useEffect, type RefObject } from 'react';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

type Options = {
  onEscape?: () => void;
  /** Element-ID, das während des Traps `inert` gesetzt bekommt (Rest der Seite). */
  inertRootId?: string;
  /** Element, das initial fokussiert wird (sonst erstes fokussierbares) */
  initialFocusRef?: RefObject<HTMLElement | null>;
};

/**
 * Hält den Tastaturfokus innerhalb von `containerRef`, setzt den Rest der Seite `inert`,
 * schließt bei Escape und stellt den vorherigen Fokus beim Deaktivieren wieder her.
 */
export function useFocusTrap(
  containerRef: RefObject<HTMLElement | null>,
  active: boolean,
  { onEscape, inertRootId = 'app-root', initialFocusRef }: Options = {},
) {
  useEffect(() => {
    if (!active) return;
    const container = containerRef.current;
    if (!container) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const root = document.getElementById(inertRootId);
    root?.setAttribute('inert', '');

    const focusables = () =>
      Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      );

    const frame = requestAnimationFrame(() => {
      const target = initialFocusRef?.current ?? focusables()[0] ?? container;
      target.focus({ preventScroll: true });
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onEscape?.();
        return;
      }
      if (event.key !== 'Tab') return;
      const items = focusables();
      if (items.length === 0) {
        event.preventDefault();
        return;
      }
      const first = items[0]!;
      const last = items[items.length - 1]!;
      const current = document.activeElement as HTMLElement | null;
      if (event.shiftKey && (current === first || !container.contains(current))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && current === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('keydown', onKeyDown);
      root?.removeAttribute('inert');
      previouslyFocused?.focus?.({ preventScroll: true });
    };
  }, [active, containerRef, onEscape, inertRootId, initialFocusRef]);
}
