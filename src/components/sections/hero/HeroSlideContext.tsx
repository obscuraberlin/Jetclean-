'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import { heroSlideInterval, heroSlides } from '@/content/heroSlides';
import { useReducedMotion } from '@/hooks/useReducedMotion';

type HeroSlideState = {
  index: number;
  goTo: (index: number) => void;
  next: () => void;
  prev: () => void;
  /** Pausiert den automatischen Wechsel (Hover, Fokus, Touch) */
  setPaused: (paused: boolean) => void;
  reduce: boolean;
};

const HeroSlideContext = createContext<HeroSlideState | null>(null);

/**
 * Teilt den aktiven Slide zwischen Mobile-Slider und Desktop-Hintergrund.
 * Automatischer Wechsel pausiert bei Hover/Fokus, verstecktem Tab und
 * `prefers-reduced-motion` (dann nur manueller Wechsel).
 */
export function HeroSlideProvider({ children }: { children: ReactNode }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const reduce = useReducedMotion();
  const lastInteraction = useRef(0);

  const goTo = useCallback((next: number) => {
    lastInteraction.current = Date.now();
    setIndex(((next % heroSlides.length) + heroSlides.length) % heroSlides.length);
  }, []);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    const onVisibility = () => setVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  useEffect(() => {
    if (paused || !visible || reduce) return;
    const id = window.setInterval(() => {
      // Nach manueller Auswahl kurz warten, bevor automatisch weitergeschaltet wird
      if (Date.now() - lastInteraction.current < heroSlideInterval) return;
      setIndex((current) => (current + 1) % heroSlides.length);
    }, heroSlideInterval);
    return () => window.clearInterval(id);
  }, [paused, visible, reduce]);

  const value = useMemo(
    () => ({ index, goTo, next, prev, setPaused, reduce }),
    [index, goTo, next, prev, reduce],
  );
  return <HeroSlideContext.Provider value={value}>{children}</HeroSlideContext.Provider>;
}

export function useHeroSlide() {
  const ctx = useContext(HeroSlideContext);
  if (!ctx) throw new Error('useHeroSlide muss innerhalb von HeroSlideProvider verwendet werden');
  return ctx;
}
