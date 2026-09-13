/**
 * Minimale Analytics-Abstraktion. Standardmäßig ist KEIN Tracking aktiv.
 * Wird `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` gesetzt, lädt das Layout das cookiefreie
 * Plausible-Script und Events werden dorthin gesendet. Alles andere ist ein No-op.
 */

export type AnalyticsEvent =
  | 'quote_opened'
  | 'quote_step_completed'
  | 'quote_submitted'
  | 'quote_failed'
  | 'callback_submitted'
  | 'phone_click'
  | 'cta_click';

type EventProps = Record<string, string | number | boolean>;

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: EventProps }) => void;
  }
}

export const analyticsConfig = {
  plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? '',
  get enabled() {
    return this.plausibleDomain.length > 0;
  },
};

export function track(event: AnalyticsEvent, props?: EventProps) {
  if (typeof window === 'undefined') return;
  try {
    window.plausible?.(event, props ? { props } : undefined);
  } catch {
    // Tracking darf niemals die UX beeinträchtigen.
  }
}
