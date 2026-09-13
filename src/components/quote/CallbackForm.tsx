'use client';

import { CheckCircle2, Loader2, Lock, PhoneCall } from 'lucide-react';
import Link from 'next/link';
import { useActionState, useEffect, useId, useState, useSyncExternalStore } from 'react';
import { company } from '@/content/company';
import { track } from '@/lib/analytics';
import { submitCallback, type SubmitLeadState } from '@/lib/leads/actions';
import {
  callbackSchema,
  callbackTimeOptions,
  toFieldErrors,
  type FieldErrors,
} from '@/lib/leads/schema';
import {
  getAttributionServerSnapshot,
  getAttributionSnapshot,
  subscribeAttribution,
  type Attribution,
} from '@/lib/tracking';
import { cn, telHref } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Checkbox, FieldWrapper, Input, Select } from '@/components/ui/Field';

const initialState: SubmitLeadState = { status: 'idle' };

type CallbackFormProps = {
  source?: string;
  className?: string;
};

/**
 * Kurzformular „Rückruf anfordern“: Name, Telefon, PLZ, Wunschzeit, Einwilligung.
 * Für Interessenten, die lieber sprechen als das Angebotsformular auszufüllen.
 */
export function CallbackForm({ source = 'callback', className }: CallbackFormProps) {
  const id = useId();
  const [state, formAction, pending] = useActionState(submitCallback, initialState);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [consent, setConsent] = useState(false);
  const [startedAt] = useState(() => Date.now());
  const attribution = useSyncExternalStore(
    subscribeAttribution,
    getAttributionSnapshot,
    getAttributionServerSnapshot,
  );

  const [handledState, setHandledState] = useState<SubmitLeadState>(state);
  if (handledState !== state) {
    setHandledState(state);
    if (state.status === 'error' && state.fieldErrors) setErrors(state.fieldErrors);
  }

  useEffect(() => {
    if (state.status === 'success') track('callback_submitted', { source });
  }, [state, source]);

  if (state.status === 'success') {
    return (
      <div
        className={cn('rounded-3xl border border-line bg-white p-6 shadow-card sm:p-8', className)}
        role="status"
        aria-live="polite"
        data-testid="callback-success"
      >
        <div className="flex items-start gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-success-50 text-success-600">
            <CheckCircle2 className="size-6" aria-hidden="true" />
          </span>
          <div>
            <h3 className="font-display text-xl font-bold text-navy-950">
              Vielen Dank – wir rufen Sie an.
            </h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
              Ihr Rückrufwunsch ist bei uns eingegangen. Wir melden uns zur gewünschten Zeit
              telefonisch bei Ihnen.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      noValidate
      onSubmit={(event) => {
        // Clientseitig mit demselben Schema prüfen, damit Fehler sofort sichtbar sind.
        const formData = new FormData(event.currentTarget);
        const raw: Record<string, unknown> = Object.fromEntries(formData.entries());
        raw.consent_privacy = raw.consent_privacy === 'on';
        const result = callbackSchema.safeParse(raw);
        if (!result.success) {
          event.preventDefault();
          setErrors(toFieldErrors(result.error));
        }
      }}
      className={cn('rounded-3xl border border-line bg-white p-6 shadow-card sm:p-8', className)}
      data-testid="callback-form"
    >
      <div className="flex items-start gap-4">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
          <PhoneCall className="size-5" strokeWidth={1.75} aria-hidden="true" />
        </span>
        <div>
          <h3 className="font-display text-xl font-bold text-navy-950">
            Lieber zurückrufen lassen?
          </h3>
          <p className="mt-1 text-sm text-muted">
            Hinterlassen Sie Name und Nummer – wir rufen Sie zur Wunschzeit an. Dauert 30 Sekunden.
          </p>
        </div>
      </div>

      <input type="hidden" name="source" value={source} />
      <input type="hidden" name="started_at" value={startedAt} />
      {(Object.keys(attribution) as (keyof Attribution)[]).map((key) => (
        <input key={key} type="hidden" name={key} value={attribution[key]} />
      ))}
      <div
        className="absolute top-auto -left-[9999px] h-px w-px overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor={`${id}-website`}>Website</label>
        <input id={`${id}-website`} type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <FieldWrapper label="Ihr Name" htmlFor={`${id}-name`} error={errors.contact_name}>
          <Input
            id={`${id}-name`}
            name="contact_name"
            autoComplete="name"
            placeholder="Vor- und Nachname"
            maxLength={120}
            invalid={Boolean(errors.contact_name)}
            onChange={() => setErrors((prev) => ({ ...prev, contact_name: undefined }))}
          />
        </FieldWrapper>
        <FieldWrapper label="Telefon" htmlFor={`${id}-phone`} error={errors.phone}>
          <Input
            id={`${id}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="030 …"
            maxLength={40}
            invalid={Boolean(errors.phone)}
            onChange={() => setErrors((prev) => ({ ...prev, phone: undefined }))}
          />
        </FieldWrapper>
        <FieldWrapper label="Firma" htmlFor={`${id}-company`} optional>
          <Input
            id={`${id}-company`}
            name="company"
            autoComplete="organization"
            placeholder="Firmenname"
            maxLength={120}
          />
        </FieldWrapper>
        <FieldWrapper label="PLZ des Objekts" htmlFor={`${id}-plz`} error={errors.postal_code}>
          <Input
            id={`${id}-plz`}
            name="postal_code"
            inputMode="numeric"
            autoComplete="postal-code"
            placeholder="z. B. 10115"
            maxLength={5}
            invalid={Boolean(errors.postal_code)}
            onChange={() => setErrors((prev) => ({ ...prev, postal_code: undefined }))}
          />
        </FieldWrapper>
        <FieldWrapper
          label="Wann passt es Ihnen?"
          htmlFor={`${id}-time`}
          error={errors.callback_time}
          className="sm:col-span-2"
        >
          <Select
            id={`${id}-time`}
            name="callback_time"
            defaultValue="asap"
            invalid={Boolean(errors.callback_time)}
          >
            {callbackTimeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </FieldWrapper>
        <Checkbox
          id={`${id}-consent`}
          name="consent_privacy"
          checked={consent}
          onChange={(event) => {
            setConsent(event.target.checked);
            setErrors((prev) => ({ ...prev, consent_privacy: undefined }));
          }}
          error={errors.consent_privacy}
          className="sm:col-span-2"
          label={
            <>
              Ich stimme der Verarbeitung meiner Daten zur Bearbeitung meines Rückrufwunsches gemäß{' '}
              <Link
                href="/datenschutz"
                className="font-medium text-brand-600 underline underline-offset-2"
                target="_blank"
              >
                Datenschutzerklärung
              </Link>{' '}
              zu.
            </>
          }
        />
      </div>

      {state.status === 'error' && !state.fieldErrors ? (
        <p
          role="alert"
          className="mt-4 rounded-xl border border-danger-500/20 bg-danger-50 px-4 py-3 text-sm text-danger-600"
        >
          {state.message}
        </p>
      ) : null}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="inline-flex items-center gap-1.5 text-xs text-muted">
          <Lock className="size-3.5" aria-hidden="true" />
          Keine Weitergabe Ihrer Daten.
        </p>
        <Button type="submit" disabled={pending} aria-busy={pending} data-testid="callback-submit">
          {pending ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
          {pending ? 'Wird gesendet …' : 'Rückruf anfordern'}
        </Button>
      </div>
      <p className="mt-4 text-xs text-muted">
        Oder direkt anrufen:{' '}
        <a href={telHref(company.contact.phoneE164)} className="font-semibold text-navy-900">
          {company.contact.phoneDisplay}
        </a>
      </p>
    </form>
  );
}
