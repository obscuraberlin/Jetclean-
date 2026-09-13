/**
 * Erfassung von Kampagnen-Parametern (UTM) und Herkunft für Leads.
 * First-Touch: Die Werte des ersten Seitenaufrufs der Sitzung werden in sessionStorage
 * gehalten, damit sie auch bei späterem Absenden des Formulars verfügbar sind.
 * Kein Fingerprinting, keine Cookies.
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

const STORAGE_KEY = 'jc_attribution_v1';
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
  try {
    const stored = window.sessionStorage.getItem(STORAGE_KEY);
    if (stored) return { ...empty, ...(JSON.parse(stored) as Partial<Attribution>) };
  } catch {
    // sessionStorage kann in privaten Fenstern blockiert sein – dann einfach frisch erfassen.
  }

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

  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // ignorieren
  }
  return attribution;
}

let snapshot: Attribution | null = null;

/** Für useSyncExternalStore: stabile Referenz, einmalig pro Sitzung erfasst. */
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
