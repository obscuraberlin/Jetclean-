/**
 * Zentrale Animations-Presets. Alle Entrance-Animationen laufen genau einmal,
 * dauern 300–650 ms und respektieren `prefers-reduced-motion` über die Reveal-Komponente.
 */
import type { Transition, Variants } from 'motion/react';

/** Hochwertiges Ease (Out-Expo-artig) */
export const easePremium = [0.22, 1, 0.36, 1] as const;

export const transitions = {
  fast: { duration: 0.3, ease: easePremium } satisfies Transition,
  base: { duration: 0.5, ease: easePremium } satisfies Transition,
  slow: { duration: 0.65, ease: easePremium } satisfies Transition,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: transitions.base },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitions.base },
};

/** Für Bilder: leicht kleiner starten und „aufklappen“ */
export const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 0.96, clipPath: 'inset(6% 4% 6% 4% round 24px)' },
  visible: {
    opacity: 1,
    scale: 1,
    clipPath: 'inset(0% 0% 0% 0% round 24px)',
    transition: transitions.slow,
  },
};

export const staggerContainer = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
});

/** Standard-Viewport-Optionen: einmalig, sobald ~20 % sichtbar sind. */
export const viewportOnce = { once: true, amount: 0.2, margin: '0px 0px -10% 0px' } as const;

/**
 * Für gestaffelte Gruppen (Grids/Listen, oft höher als der Viewport): auslösen,
 * sobald der obere Rand der Gruppe im unteren Viewport-Bereich erscheint.
 */
export const viewportGroup = { once: true, amount: 'some', margin: '0px 0px -12% 0px' } as const;
