'use client';

import { useSyncExternalStore } from 'react';

/** SSR-sicherer Media-Query-Hook (Server-Snapshot = `false`). */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (callback) => {
      const media = window.matchMedia(query);
      media.addEventListener('change', callback);
      return () => media.removeEventListener('change', callback);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
