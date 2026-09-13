import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Tailwind-Klassen zusammenführen (Konflikte werden korrekt aufgelöst). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Telefonnummer als tel:-Link */
export function telHref(e164: string) {
  return `tel:${e164}`;
}

export function formatDate(value: string | Date, options?: Intl.DateTimeFormatOptions) {
  const date = typeof value === 'string' ? new Date(value) : value;
  return new Intl.DateTimeFormat('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    ...options,
  }).format(date);
}

export function formatDateTime(value: string | Date) {
  return formatDate(value, { hour: '2-digit', minute: '2-digit' });
}

/** Initialen aus einem Namen, z. B. „Sabine L.“ -> „SL“ */
export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) =>
      part
        .replace(/[^\p{L}]/gu, '')
        .charAt(0)
        .toUpperCase(),
    )
    .join('');
}
