'use client';

import { useEffect } from 'react';

let lockCount = 0;
let savedScrollY = 0;

/**
 * Sperrt das Scrollen des Bodys (auch auf iOS zuverlässig), solange `active` true ist.
 * Mehrere gleichzeitige Locks werden gezählt, damit verschachtelte Overlays sich nicht stören.
 */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const body = document.body;
    if (lockCount === 0) {
      savedScrollY = window.scrollY;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      body.style.position = 'fixed';
      body.style.top = `-${savedScrollY}px`;
      body.style.left = '0';
      body.style.right = '0';
      body.style.width = '100%';
      body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;
    }
    lockCount += 1;

    return () => {
      lockCount -= 1;
      if (lockCount === 0) {
        body.style.position = '';
        body.style.top = '';
        body.style.left = '';
        body.style.right = '';
        body.style.width = '';
        body.style.overflow = '';
        body.style.paddingRight = '';
        window.scrollTo({ top: savedScrollY, behavior: 'instant' });
      }
    };
  }, [active]);
}
