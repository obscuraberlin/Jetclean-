'use client';

import { useSyncExternalStore } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

function subscribe(callback: () => void) {
  const media = window.matchMedia(QUERY);
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
}

/**
 * SSR-sicherer Reduced-Motion-Hook. Server-Snapshot ist `false`, damit Server- und
 * Hydration-Markup identisch sind; direkt nach der Hydration wird der echte Wert verwendet.
 */
export function useReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
