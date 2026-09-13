/**
 * DEMO-Variante der Server Action für die statische Vorschau (GitHub Pages).
 * Wird im Pages-Workflow anstelle von `actions.ts` eingesetzt: kein Server, keine Datenbank –
 * die Anfrage wird nur clientseitig validiert und als Erfolg angezeigt.
 */
import { callbackSchema, leadSchema, toFieldErrors, type FieldErrors } from './schema';

export type SubmitLeadState =
  | { status: 'idle' }
  | { status: 'success'; leadId: string }
  | { status: 'error'; message: string; fieldErrors?: FieldErrors };

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
  await new Promise((resolve) => setTimeout(resolve, 900));
  return { status: 'success', leadId: 'demo' };
}

export async function submitCallback(
  _previous: SubmitLeadState,
  formData: FormData,
): Promise<SubmitLeadState> {
  const raw: Record<string, unknown> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === 'string') raw[key] = value;
  }
  raw.consent_privacy = raw.consent_privacy === 'on' || raw.consent_privacy === 'true';
  const parsed = callbackSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      status: 'error',
      message: 'Bitte prüfen Sie Ihre Eingaben.',
      fieldErrors: toFieldErrors(parsed.error),
    };
  }
  await new Promise((resolve) => setTimeout(resolve, 900));
  return { status: 'success', leadId: 'demo' };
}
