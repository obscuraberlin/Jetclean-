'use server';

import { headers } from 'next/headers';
import { siteConfig } from '@/content/site';
import { getEmailAdapter } from '@/lib/notify/email';
import { checkRateLimit, hashIdentifier } from './rate-limit';
import {
  callbackSchema,
  labelForCallbackTime,
  leadSchema,
  toFieldErrors,
  type FieldErrors,
} from './schema';
import { getLeadStore } from './store';
import type { NewLead } from './types';

export type SubmitLeadState =
  | { status: 'idle' }
  | { status: 'success'; leadId: string }
  | { status: 'error'; message: string; fieldErrors?: FieldErrors };

const GENERIC_ERROR =
  'Ihre Anfrage konnte leider nicht übermittelt werden. Bitte versuchen Sie es erneut oder rufen Sie uns an.';

const nullable = (value: string | undefined) => (value && value.length > 0 ? value : null);

/**
 * Server Action: nimmt das Angebotsformular entgegen, validiert serverseitig,
 * prüft Spam-Schutz und Rate-Limit, speichert den Lead und versendet optional eine
 * Benachrichtigung. Es werden keine personenbezogenen Daten geloggt.
 */
export async function submitLead(
  _previous: SubmitLeadState,
  formData: FormData,
): Promise<SubmitLeadState> {
  const raw: Record<string, unknown> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === 'string') raw[key] = value;
  }
  raw.consent_privacy = raw.consent_privacy === 'on' || raw.consent_privacy === 'true';

  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      status: 'error',
      message: 'Bitte prüfen Sie Ihre Eingaben.',
      fieldErrors: toFieldErrors(parsed.error),
    };
  }
  const data = parsed.data;

  // Honeypot ausgefüllt -> stiller Erfolg (Bot bekommt kein Feedback).
  if (data.website && data.website.length > 0) {
    return { status: 'success', leadId: 'ignored' };
  }
  // Zu schnell abgeschickt -> vermutlich automatisiert.
  if (data.started_at && Date.now() - data.started_at < siteConfig.quote.minFillTimeMs) {
    return { status: 'success', leadId: 'ignored' };
  }

  const headerList = await headers();
  const forwardedFor = headerList.get('x-forwarded-for')?.split(',')[0]?.trim();
  const ip = forwardedFor || headerList.get('x-real-ip') || 'unknown';
  const limit = checkRateLimit(await hashIdentifier(ip));
  if (!limit.allowed) {
    return {
      status: 'error',
      message:
        'Es wurden zu viele Anfragen in kurzer Zeit gesendet. Bitte versuchen Sie es in einigen Minuten erneut oder rufen Sie uns an.',
    };
  }

  const userAgent = headerList.get('user-agent')?.slice(0, 255) ?? null;

  const lead: NewLead = {
    service: data.service,
    area_size: data.area_size,
    frequency: data.frequency,
    postal_code: data.postal_code,
    district: nullable(data.district),
    company: data.company,
    contact_name: data.contact_name,
    email: data.email,
    phone: data.phone,
    message: nullable(data.message),
    source: nullable(data.source) ?? 'website',
    utm_source: nullable(data.utm_source),
    utm_medium: nullable(data.utm_medium),
    utm_campaign: nullable(data.utm_campaign),
    utm_content: nullable(data.utm_content),
    utm_term: nullable(data.utm_term),
    landing_page: nullable(data.landing_page),
    referrer: nullable(data.referrer),
    user_agent: userAgent,
    consent_privacy: true,
  };

  const store = getLeadStore();
  const saved = await store.save(lead);
  if (!saved.ok) {
    return { status: 'error', message: GENERIC_ERROR };
  }

  // Benachrichtigung ist optional – Fehler dürfen den Erfolg nicht beeinträchtigen.
  // Bewusst awaited, damit Serverless-Funktionen den Versand nicht abbrechen.
  const email = getEmailAdapter();
  await email.sendLeadNotification({ ...lead, id: saved.id }).catch(() => false);
  await email.sendLeadConfirmation({ ...lead, id: saved.id }).catch(() => false);

  return { status: 'success', leadId: saved.id };
}

/** FormData in ein flaches Objekt überführen (Checkbox-Werte normalisieren). */
function formDataToObject(formData: FormData) {
  const raw: Record<string, unknown> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === 'string') raw[key] = value;
  }
  raw.consent_privacy = raw.consent_privacy === 'on' || raw.consent_privacy === 'true';
  return raw;
}

/**
 * Server Action: Kurzformular „Rückruf anfordern“. Gleiche Schutzmechanismen wie `submitLead`.
 * Der Rückrufwunsch wird als Lead mit `source = 'callback'` gespeichert, damit er im Admin-Bereich
 * und in der Benachrichtigung neben den Angebotsanfragen erscheint.
 */
export async function submitCallback(
  _previous: SubmitLeadState,
  formData: FormData,
): Promise<SubmitLeadState> {
  const parsed = callbackSchema.safeParse(formDataToObject(formData));
  if (!parsed.success) {
    return {
      status: 'error',
      message: 'Bitte prüfen Sie Ihre Eingaben.',
      fieldErrors: toFieldErrors(parsed.error),
    };
  }
  const data = parsed.data;
  if (data.website && data.website.length > 0) return { status: 'success', leadId: 'ignored' };
  if (data.started_at && Date.now() - data.started_at < siteConfig.quote.minFillTimeMs) {
    return { status: 'success', leadId: 'ignored' };
  }

  const headerList = await headers();
  const forwardedFor = headerList.get('x-forwarded-for')?.split(',')[0]?.trim();
  const ip = forwardedFor || headerList.get('x-real-ip') || 'unknown';
  const limit = checkRateLimit(await hashIdentifier(ip));
  if (!limit.allowed) {
    return {
      status: 'error',
      message:
        'Es wurden zu viele Anfragen in kurzer Zeit gesendet. Bitte versuchen Sie es in einigen Minuten erneut oder rufen Sie uns an.',
    };
  }

  const lead: NewLead = {
    service: 'sonstiges',
    area_size: 'unknown',
    frequency: 'unclear',
    postal_code: data.postal_code,
    district: null,
    company: nullable(data.company) ?? data.contact_name,
    contact_name: data.contact_name,
    email: '',
    phone: data.phone,
    message: `Rückruf gewünscht: ${labelForCallbackTime(data.callback_time)}`,
    source: 'callback',
    utm_source: nullable(data.utm_source),
    utm_medium: nullable(data.utm_medium),
    utm_campaign: nullable(data.utm_campaign),
    utm_content: nullable(data.utm_content),
    utm_term: nullable(data.utm_term),
    landing_page: nullable(data.landing_page),
    referrer: nullable(data.referrer),
    user_agent: headerList.get('user-agent')?.slice(0, 255) ?? null,
    consent_privacy: true,
  };

  const saved = await getLeadStore().save(lead);
  if (!saved.ok) return { status: 'error', message: GENERIC_ERROR };

  await getEmailAdapter()
    .sendLeadNotification({ ...lead, id: saved.id })
    .catch(() => false);

  return { status: 'success', leadId: saved.id };
}
