/**
 * Erfassung von Kampagnen-Parametern (UTM) und Herkunft für Leads.
 *
 * Datenschutz: Es wird NICHTS im Browser gespeichert (kein Cookie, kein Local-/Session-Storage,
 * § 25 TDDDG). Die Werte werden ausschließlich aus der aktuellen URL und dem Referrer gelesen
 * und nur dann übertragen, wenn der Nutzer das Anfrageformular aktiv absendet.
 */

export type Attribution = {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  landing_page: string;
  referrer: string;
};

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;

const empty: Attribution = {
  utm_source: '',
  utm_medium: '',
  utm_campaign: '',
  utm_content: '',
  utm_term: '',
  landing_page: '',
  referrer: '',
};

function truncate(value: string, max = 255) {
  return value.length > max ? value.slice(0, max) : value;
}

export function captureAttribution(): Attribution {
  if (typeof window === 'undefined') return empty;
  const params = new URLSearchParams(window.location.search);
  const attribution: Attribution = { ...empty };
  for (const key of UTM_KEYS) {
    attribution[key] = truncate(params.get(key)?.trim() ?? '', 120);
  }
  attribution.landing_page = truncate(window.location.pathname + window.location.search, 500);
  const referrer = document.referrer;
  attribution.referrer = truncate(
    referrer && !referrer.startsWith(window.location.origin) ? referrer : '',
    500,
  );
  return attribution;
}

let snapshot: Attribution | null = null;

/** Für useSyncExternalStore: stabile Referenz pro Seitenaufruf (nur im Speicher). */
export function getAttributionSnapshot(): Attribution {
  if (!snapshot) snapshot = captureAttribution();
  return snapshot;
}

export function getAttributionServerSnapshot(): Attribution {
  return empty;
}

export function subscribeAttribution() {
  return () => {};
}
