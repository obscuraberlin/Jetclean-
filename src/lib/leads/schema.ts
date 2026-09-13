import { z } from 'zod';
import { quoteAreaOptions, quoteFrequencyOptions, quoteServiceOptions } from '@/content/services';

const enumValues = <T extends readonly { value: string }[]>(options: T) =>
  options.map((option) => option.value) as [T[number]['value'], ...T[number]['value'][]];

export const serviceValues = enumValues(quoteServiceOptions);
export const areaValues = enumValues(quoteAreaOptions);
export const frequencyValues = enumValues(quoteFrequencyOptions);

const trimmed = (max: number, message?: string) =>
  z
    .string()
    .trim()
    .max(max, message ?? `Bitte maximal ${max} Zeichen eingeben.`);

/** Schritt 1 – Was soll gereinigt werden? */
export const stepServiceSchema = z.object({
  service: z.enum(serviceValues, { message: 'Bitte wählen Sie eine Option aus.' }),
});

/** Schritt 2 – Fläche */
export const stepAreaSchema = z.object({
  area_size: z.enum(areaValues, { message: 'Bitte wählen Sie eine Option aus.' }),
});

/** Schritt 3 – Häufigkeit */
export const stepFrequencySchema = z.object({
  frequency: z.enum(frequencyValues, { message: 'Bitte wählen Sie eine Option aus.' }),
});

/** Schritt 4 – Standort */
export const stepLocationSchema = z.object({
  postal_code: z
    .string()
    .trim()
    .regex(/^\d{5}$/, 'Bitte eine gültige fünfstellige Postleitzahl eingeben.'),
  district: trimmed(80).optional().or(z.literal('')),
});

/** Schritt 5 – Kontaktdaten */
export const stepContactSchema = z.object({
  company: trimmed(120).min(2, 'Bitte geben Sie Ihren Firmennamen an.'),
  contact_name: trimmed(120).min(2, 'Bitte geben Sie Ihren Namen an.'),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .max(160)
    .email('Bitte eine gültige E-Mail-Adresse eingeben.'),
  phone: z
    .string()
    .trim()
    .min(6, 'Bitte geben Sie eine Telefonnummer an.')
    .max(40)
    .regex(/^[+\d\s()/-]+$/, 'Bitte nur Ziffern, Leerzeichen, +, /, ( ) oder - verwenden.'),
  message: trimmed(2000).optional().or(z.literal('')),
  consent_privacy: z.literal(true, {
    message: 'Bitte stimmen Sie der Verarbeitung Ihrer Daten zu.',
  }),
});

/** Tracking-Felder (alle optional, werden clientseitig befüllt) */
export const attributionSchema = z.object({
  utm_source: trimmed(120).optional().or(z.literal('')),
  utm_medium: trimmed(120).optional().or(z.literal('')),
  utm_campaign: trimmed(120).optional().or(z.literal('')),
  utm_content: trimmed(120).optional().or(z.literal('')),
  utm_term: trimmed(120).optional().or(z.literal('')),
  landing_page: trimmed(500).optional().or(z.literal('')),
  referrer: trimmed(500).optional().or(z.literal('')),
});

/** Anti-Spam-Felder */
export const antiSpamSchema = z.object({
  /** Honeypot – muss leer bleiben */
  website: z.string().max(0).optional().or(z.literal('')),
  /** Zeitstempel, wann das Formular geöffnet wurde (ms) */
  started_at: z.coerce.number().int().nonnegative().optional(),
});

export const leadSchema = stepServiceSchema
  .merge(stepAreaSchema)
  .merge(stepFrequencySchema)
  .merge(stepLocationSchema)
  .merge(stepContactSchema)
  .merge(attributionSchema)
  .merge(antiSpamSchema)
  .extend({
    /** Woher kam die Anfrage innerhalb der Website (hero, modal, kontakt, ...) */
    source: trimmed(60).optional().or(z.literal('')),
  });

export type LeadInput = z.infer<typeof leadSchema>;

export const stepSchemas = [
  stepServiceSchema,
  stepAreaSchema,
  stepFrequencySchema,
  stepLocationSchema,
  stepContactSchema,
] as const;

export type FieldErrors = Partial<Record<keyof LeadInput, string>>;

/** Zod-Issues in ein flaches Fehlerobjekt (erste Meldung je Feld) umwandeln. */
export function toFieldErrors(error: z.ZodError): FieldErrors {
  const errors: FieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === 'string' && !(key in errors)) {
      errors[key as keyof LeadInput] = issue.message;
    }
  }
  return errors;
}

export const leadStatusValues = ['new', 'contacted', 'qualified', 'won', 'lost'] as const;
export type LeadStatus = (typeof leadStatusValues)[number];

export const leadStatusLabels: Record<LeadStatus, string> = {
  new: 'Neu',
  contacted: 'Kontaktiert',
  qualified: 'Qualifiziert',
  won: 'Gewonnen',
  lost: 'Verloren',
};

/** Menschlich lesbare Labels für gespeicherte Werte (Admin, E-Mail) */
export const labelFor = {
  service: (value: string) => quoteServiceOptions.find((o) => o.value === value)?.label ?? value,
  area: (value: string) => quoteAreaOptions.find((o) => o.value === value)?.label ?? value,
  frequency: (value: string) =>
    quoteFrequencyOptions.find((o) => o.value === value)?.label ?? value,
};
