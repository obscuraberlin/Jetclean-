'use client';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Loader2, Lock, Phone } from 'lucide-react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import {
  useActionState,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
  type ReactNode,
} from 'react';
import { company } from '@/content/company';
import { quoteAreaOptions, quoteFrequencyOptions, quoteServiceOptions } from '@/content/services';
import { siteConfig } from '@/content/site';
import { track } from '@/lib/analytics';
import { submitLead, type SubmitLeadState } from '@/lib/leads/actions';
import { stepSchemas, toFieldErrors, type FieldErrors, type LeadInput } from '@/lib/leads/schema';
import {
  subscribeAttribution,
  getAttributionSnapshot,
  getAttributionServerSnapshot,
  type Attribution,
} from '@/lib/tracking';
import { cn, telHref } from '@/lib/utils';
import { Button, buttonIconClass } from '@/components/ui/Button';
import { Checkbox, FieldWrapper, Input, Textarea } from '@/components/ui/Field';

type QuoteValues = {
  service: string;
  area_size: string;
  frequency: string;
  postal_code: string;
  district: string;
  company: string;
  contact_name: string;
  email: string;
  phone: string;
  message: string;
  consent_privacy: boolean;
};

const initialValues: QuoteValues = {
  service: '',
  area_size: '',
  frequency: '',
  postal_code: '',
  district: '',
  company: '',
  contact_name: '',
  email: '',
  phone: '',
  message: '',
  consent_privacy: false,
};

const steps = [
  { key: 'service', title: 'Was soll gereinigt werden?', short: 'Leistung' },
  { key: 'area', title: 'Wie groß ist die Fläche?', short: 'Fläche' },
  { key: 'frequency', title: 'Wie häufig soll gereinigt werden?', short: 'Häufigkeit' },
  { key: 'location', title: 'Wo befindet sich das Objekt?', short: 'Standort' },
  { key: 'contact', title: 'Wie erreichen wir Sie?', short: 'Kontakt' },
] as const;

const stepFields: (keyof QuoteValues)[][] = [
  ['service'],
  ['area_size'],
  ['frequency'],
  ['postal_code', 'district'],
  ['company', 'contact_name', 'email', 'phone', 'message', 'consent_privacy'],
];

const initialState: SubmitLeadState = { status: 'idle' };

type QuoteFormProps = {
  /** Kennung der Einbindung (hero, modal, kontakt …) */
  source: string;
  variant?: 'card' | 'modal' | 'page';
  onSuccess?: () => void;
  className?: string;
  /** Beim Success-State einen „Schließen“-Button anzeigen (Modal) */
  onClose?: () => void;
};

export function QuoteForm({
  source,
  variant = 'card',
  onSuccess,
  onClose,
  className,
}: QuoteFormProps) {
  const formId = useId();
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [values, setValues] = useState<QuoteValues>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const attribution = useSyncExternalStore(
    subscribeAttribution,
    getAttributionSnapshot,
    getAttributionServerSnapshot,
  );
  const [startedAt] = useState(() => Date.now());
  const [state, formAction, pending] = useActionState(submitLead, initialState);
  const submitLock = useRef(false);
  const advanceTimer = useRef<number | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const isFirstRender = useRef(true);

  // Fokus nach Schrittwechsel auf die Schritt-Überschrift setzen (Screenreader & Tastatur).
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    headingRef.current?.focus({ preventScroll: true });
  }, [step]);

  // Serverseitige Feldfehler übernehmen und zum betroffenen Schritt springen
  // (State-Abgleich während des Renderns, kein Effekt nötig).
  const [handledState, setHandledState] = useState<SubmitLeadState>(state);
  if (handledState !== state) {
    setHandledState(state);
    if (state.status === 'error' && state.fieldErrors) {
      setErrors(state.fieldErrors);
      const firstErrorField = Object.keys(state.fieldErrors)[0] as keyof QuoteValues | undefined;
      const targetStep = stepFields.findIndex(
        (fields) => firstErrorField && fields.includes(firstErrorField),
      );
      if (targetStep >= 0) setStep(targetStep);
    }
  }

  // Tracking & Callbacks nach Serverantwort
  useEffect(() => {
    if (state.status === 'success') {
      track('quote_submitted', { source });
      onSuccess?.();
    } else if (state.status === 'error') {
      submitLock.current = false;
      track('quote_failed', { source });
    }
  }, [state, onSuccess, source]);

  const setValue = useCallback(<K extends keyof QuoteValues>(key: K, value: QuoteValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  const validateStep = useCallback(
    (index: number) => {
      const schema = stepSchemas[index];
      if (!schema) return true;
      const result = schema.safeParse(values);
      if (result.success) return true;
      setErrors((prev) => ({ ...prev, ...toFieldErrors(result.error) }));
      return false;
    },
    [values],
  );

  const goNext = useCallback(() => {
    if (advanceTimer.current) {
      window.clearTimeout(advanceTimer.current);
      advanceTimer.current = null;
    }
    if (!validateStep(step)) return;
    track('quote_step_completed', { step: step + 1, source });
    setDirection(1);
    setStep((s) => Math.min(s + 1, steps.length - 1));
  }, [step, validateStep, source]);

  const goBack = useCallback(() => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const isLast = step === steps.length - 1;
    if (!isLast) {
      event.preventDefault();
      goNext();
      return;
    }
    if (!validateStep(step) || pending || submitLock.current) {
      event.preventDefault();
      return;
    }
    submitLock.current = true;
  };

  const progress = useMemo(() => ((step + 1) / steps.length) * 100, [step]);

  if (state.status === 'success') {
    return (
      <div className={cn(variantClasses[variant], className)} data-testid="quote-success">
        <SuccessState variant={variant} onClose={onClose} />
      </div>
    );
  }

  const current = steps[step]!;
  const isLast = step === steps.length - 1;
  // Im Modal existiert bereits eine h2 (Dialogtitel), sonst ist der Schritt-Titel die h2 der Karte.
  const StepHeading = variant === 'modal' ? 'h3' : 'h2';

  return (
    <div className={cn(variantClasses[variant], className)}>
      <form
        id={formId}
        action={formAction}
        onSubmit={handleSubmit}
        noValidate
        className="flex h-full flex-col"
        data-testid="quote-form"
        data-step={step + 1}
      >
        {/* Kopf: Titel + Fortschritt */}
        <div className="mb-5">
          {variant === 'card' ? (
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="font-display text-lg font-bold text-navy-950">
                  Kostenloses Reinigungsangebot erhalten
                </p>
                <p className="mt-0.5 text-sm text-muted">{siteConfig.quote.durationHint}</p>
              </div>
            </div>
          ) : null}
          <div className="flex items-center justify-between text-xs font-medium text-muted">
            <span aria-live="polite">
              Schritt {step + 1} von {steps.length}
            </span>
            <span className="hidden sm:inline">{current.short}</span>
          </div>
          <div
            className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface-strong"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
            aria-label="Fortschritt"
          >
            <motion.div
              className="h-full rounded-full bg-brand-500"
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: reduce ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>

        {/* Hidden: gesammelte Werte, Attribution, Anti-Spam */}
        <input type="hidden" name="source" value={source} />
        <input type="hidden" name="started_at" value={startedAt} />
        {(Object.keys(attribution) as (keyof Attribution)[]).map((key) => (
          <input key={key} type="hidden" name={key} value={attribution[key]} />
        ))}
        {(['service', 'area_size', 'frequency', 'postal_code', 'district'] as const).map((key) =>
          stepFields[step]?.includes(key) ? null : (
            <input key={key} type="hidden" name={key} value={values[key]} />
          ),
        )}
        {/* Honeypot – für Menschen unsichtbar */}
        <div
          className="absolute top-auto -left-[9999px] h-px w-px overflow-hidden"
          aria-hidden="true"
        >
          <label htmlFor={`${formId}-website`}>Website</label>
          <input
            id={`${formId}-website`}
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
          />
        </div>

        {/* Schritte */}
        <div className="relative flex-1">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={current.key}
              custom={direction}
              initial={reduce ? false : { opacity: 0, x: direction * 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? undefined : { opacity: 0, x: direction * -24 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <StepHeading
                ref={headingRef}
                tabIndex={-1}
                className="mb-4 font-display text-xl font-bold text-navy-950 outline-none sm:text-[1.375rem]"
              >
                {current.title}
              </StepHeading>

              {step === 0 ? (
                <ChoiceGroup
                  name="service"
                  legend={current.title}
                  options={quoteServiceOptions}
                  value={values.service}
                  error={errors.service}
                  onSelect={(value, advance) => {
                    setValue('service', value);
                    if (advance) scheduleAdvance('service', value);
                  }}
                  columns={variant === 'card' ? 2 : 3}
                />
              ) : null}
              {step === 1 ? (
                <ChoiceGroup
                  name="area_size"
                  legend={current.title}
                  options={quoteAreaOptions}
                  value={values.area_size}
                  error={errors.area_size}
                  onSelect={(value, advance) => {
                    setValue('area_size', value);
                    if (advance) scheduleAdvance('area_size', value);
                  }}
                  columns={2}
                />
              ) : null}
              {step === 2 ? (
                <ChoiceGroup
                  name="frequency"
                  legend={current.title}
                  options={quoteFrequencyOptions}
                  value={values.frequency}
                  error={errors.frequency}
                  onSelect={(value, advance) => {
                    setValue('frequency', value);
                    if (advance) scheduleAdvance('frequency', value);
                  }}
                  columns={2}
                />
              ) : null}
              {step === 3 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  <FieldWrapper
                    label="Postleitzahl"
                    htmlFor={`${formId}-plz`}
                    error={errors.postal_code}
                  >
                    <Input
                      id={`${formId}-plz`}
                      name="postal_code"
                      inputMode="numeric"
                      autoComplete="postal-code"
                      maxLength={5}
                      placeholder="z. B. 10115"
                      value={values.postal_code}
                      onChange={(e) =>
                        setValue('postal_code', e.target.value.replace(/\D/g, '').slice(0, 5))
                      }
                      invalid={Boolean(errors.postal_code)}
                      aria-describedby={errors.postal_code ? `${formId}-plz-error` : undefined}
                      autoFocus
                    />
                  </FieldWrapper>
                  <FieldWrapper
                    label="Stadtteil"
                    htmlFor={`${formId}-district`}
                    optional
                    error={errors.district}
                  >
                    <Input
                      id={`${formId}-district`}
                      name="district"
                      autoComplete="address-level3"
                      placeholder="z. B. Charlottenburg"
                      value={values.district}
                      onChange={(e) => setValue('district', e.target.value)}
                      maxLength={80}
                    />
                  </FieldWrapper>
                </div>
              ) : null}
              {step === 4 ? (
                <ContactFields
                  formId={formId}
                  values={values}
                  errors={errors}
                  setValue={setValue}
                />
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>

        {state.status === 'error' && !state.fieldErrors ? (
          <p
            role="alert"
            className="mt-4 rounded-xl border border-danger-500/20 bg-danger-50 px-4 py-3 text-sm text-danger-600"
          >
            {state.message}
          </p>
        ) : null}

        {/* Navigation */}
        <div className="mt-6 flex items-center justify-between gap-3">
          {step > 0 ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={goBack}
              className="-ml-2 text-muted hover:text-navy-900"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              Zurück
            </Button>
          ) : (
            <span />
          )}
          {isLast ? (
            <Button type="submit" disabled={pending} aria-busy={pending} data-testid="quote-submit">
              {pending ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
              {pending ? 'Wird gesendet …' : 'Anfrage absenden'}
              {!pending ? <ArrowRight className={buttonIconClass} aria-hidden="true" /> : null}
            </Button>
          ) : (
            <Button type="submit" data-testid="quote-next">
              Weiter
              <ArrowRight className={buttonIconClass} aria-hidden="true" />
            </Button>
          )}
        </div>

        {step === 0 ? (
          <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted">
            {['Unverbindlich', 'Keine Weitergabe Ihrer Daten', 'Persönliche Rückmeldung'].map(
              (item) => (
                <li key={item} className="inline-flex items-center gap-1.5">
                  <Check className="size-3.5 text-success-500" aria-hidden="true" />
                  {item}
                </li>
              ),
            )}
          </ul>
        ) : null}
      </form>
    </div>
  );

  /**
   * Nach einer Auswahl per Klick/Tap automatisch weiter – kurz verzögert, damit die Auswahl
   * sichtbar wird. Läuft nur, wenn der Nutzer den Schritt nicht bereits selbst gewechselt hat.
   */
  function scheduleAdvance(key: keyof QuoteValues, value: string) {
    if (advanceTimer.current) window.clearTimeout(advanceTimer.current);
    const scheduledStep = step;
    advanceTimer.current = window.setTimeout(() => {
      advanceTimer.current = null;
      const schema = stepSchemas[scheduledStep];
      if (schema && !schema.safeParse({ ...values, [key]: value }).success) return;
      track('quote_step_completed', { step: scheduledStep + 1, source });
      setDirection(1);
      setStep((current) =>
        current === scheduledStep ? Math.min(current + 1, steps.length - 1) : current,
      );
    }, 160);
  }
}

const variantClasses: Record<NonNullable<QuoteFormProps['variant']>, string> = {
  card: 'relative rounded-3xl border border-line bg-white p-5 shadow-lift sm:p-6',
  modal: 'relative',
  page: 'relative rounded-3xl border border-line bg-white p-5 shadow-card sm:p-8',
};

/* --------------------------------------------------------------------------- */

type ChoiceGroupProps = {
  name: string;
  legend: string;
  options: readonly { value: string; label: string }[];
  value: string;
  error?: string;
  onSelect: (value: string, advance: boolean) => void;
  columns?: 2 | 3;
};

function ChoiceGroup({
  name,
  legend,
  options,
  value,
  error,
  onSelect,
  columns = 2,
}: ChoiceGroupProps) {
  const id = useId();
  return (
    <fieldset
      aria-describedby={error ? `${id}-error` : undefined}
      aria-invalid={error ? true : undefined}
    >
      <legend className="sr-only">{legend}</legend>
      <div
        className={cn('grid gap-2.5', columns === 3 ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-2')}
      >
        {options.map((option) => {
          const checked = value === option.value;
          const optionId = `${id}-${option.value}`;
          return (
            <label
              key={option.value}
              htmlFor={optionId}
              className={cn(
                'relative flex min-h-12 cursor-pointer items-center justify-between gap-2 rounded-xl border px-3.5 py-3 text-sm font-medium transition-[border-color,background-color,box-shadow,transform] duration-200 ease-(--ease-premium) select-none motion-safe:active:scale-[0.98]',
                checked
                  ? 'border-brand-500 bg-brand-50 text-navy-950 shadow-[inset_0_0_0_1px_var(--color-brand-500)]'
                  : 'border-line-strong bg-white text-navy-800 hover:border-navy-300 hover:bg-surface',
                'has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand-500',
              )}
              onClick={(event) => {
                // Klick/Tap (detail > 0) führt automatisch weiter; Tastatur nicht.
                if (event.detail > 0) onSelect(option.value, true);
              }}
            >
              <input
                id={optionId}
                type="radio"
                name={name}
                value={option.value}
                checked={checked}
                onChange={() => onSelect(option.value, false)}
                className="sr-only"
              />
              <span>{option.label}</span>
              <span
                className={cn(
                  'flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors',
                  checked
                    ? 'border-brand-500 bg-brand-500 text-white'
                    : 'border-line-strong bg-white',
                )}
                aria-hidden="true"
              >
                {checked ? <Check className="size-3" strokeWidth={3} /> : null}
              </span>
            </label>
          );
        })}
      </div>
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-2 text-sm text-danger-600">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}

/* --------------------------------------------------------------------------- */

type ContactFieldsProps = {
  formId: string;
  values: QuoteValues;
  errors: FieldErrors;
  setValue: <K extends keyof QuoteValues>(key: K, value: QuoteValues[K]) => void;
};

function ContactFields({ formId, values, errors, setValue }: ContactFieldsProps) {
  const describedBy = (key: keyof LeadInput) =>
    errors[key] ? `${formId}-${key}-error` : undefined;
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <FieldWrapper
        label="Firma"
        htmlFor={`${formId}-company`}
        error={errors.company}
        className="sm:col-span-2"
      >
        <Input
          id={`${formId}-company`}
          name="company"
          autoComplete="organization"
          placeholder="Firmenname"
          value={values.company}
          onChange={(e) => setValue('company', e.target.value)}
          invalid={Boolean(errors.company)}
          aria-describedby={describedBy('company')}
          maxLength={120}
          autoFocus
        />
      </FieldWrapper>
      <FieldWrapper
        label="Vor- und Nachname"
        htmlFor={`${formId}-contact_name`}
        error={errors.contact_name}
        className="sm:col-span-2"
      >
        <Input
          id={`${formId}-contact_name`}
          name="contact_name"
          autoComplete="name"
          placeholder="Ihr Name"
          value={values.contact_name}
          onChange={(e) => setValue('contact_name', e.target.value)}
          invalid={Boolean(errors.contact_name)}
          aria-describedby={describedBy('contact_name')}
          maxLength={120}
        />
      </FieldWrapper>
      <FieldWrapper label="E-Mail" htmlFor={`${formId}-email`} error={errors.email}>
        <Input
          id={`${formId}-email`}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="name@firma.de"
          value={values.email}
          onChange={(e) => setValue('email', e.target.value)}
          invalid={Boolean(errors.email)}
          aria-describedby={describedBy('email')}
          maxLength={160}
        />
      </FieldWrapper>
      <FieldWrapper label="Telefon" htmlFor={`${formId}-phone`} error={errors.phone}>
        <Input
          id={`${formId}-phone`}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="030 …"
          value={values.phone}
          onChange={(e) => setValue('phone', e.target.value)}
          invalid={Boolean(errors.phone)}
          aria-describedby={describedBy('phone')}
          maxLength={40}
        />
      </FieldWrapper>
      <FieldWrapper
        label="Nachricht"
        htmlFor={`${formId}-message`}
        optional
        error={errors.message}
        className="sm:col-span-2"
      >
        <Textarea
          id={`${formId}-message`}
          name="message"
          placeholder="Besonderheiten, Wunschtermin, Fragen …"
          value={values.message}
          onChange={(e) => setValue('message', e.target.value)}
          maxLength={2000}
          rows={3}
          className="min-h-20"
        />
      </FieldWrapper>
      <Checkbox
        id={`${formId}-consent`}
        name="consent_privacy"
        checked={values.consent_privacy}
        onChange={(e) => setValue('consent_privacy', e.target.checked)}
        error={errors.consent_privacy}
        className="sm:col-span-2"
        label={
          <>
            Ich stimme der Verarbeitung meiner Daten zur Bearbeitung meiner Anfrage gemäß{' '}
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
      <p className="inline-flex items-center gap-1.5 text-xs text-muted sm:col-span-2">
        <Lock className="size-3.5" aria-hidden="true" />
        Ihre Daten werden verschlüsselt übertragen und nicht an Dritte weitergegeben.
      </p>
    </div>
  );
}

/* --------------------------------------------------------------------------- */

function SuccessState({
  variant,
  onClose,
}: {
  variant: NonNullable<QuoteFormProps['variant']>;
  onClose?: () => void;
}) {
  const promise = siteConfig.quote.responseTimePromise;
  return (
    <div
      className={cn('flex flex-col items-center py-4 text-center', variant === 'page' && 'py-8')}
      role="status"
      aria-live="polite"
    >
      <span className="flex size-16 items-center justify-center rounded-full bg-success-50 text-success-600">
        <CheckCircle2 className="size-8" aria-hidden="true" />
      </span>
      <h3 className="mt-5 font-display text-2xl font-bold text-navy-950">
        Vielen Dank für Ihre Anfrage.
      </h3>
      <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-muted">
        Wir haben Ihre Anfrage erhalten und melden uns {promise ? promise : 'schnellstmöglich'}{' '}
        persönlich bei Ihnen.
      </p>
      <p className="mt-4 text-sm text-muted">
        Sie möchten direkt sprechen?{' '}
        <a
          href={telHref(company.contact.phoneE164)}
          className="inline-flex items-center gap-1 font-semibold text-navy-900 hover:text-brand-600"
        >
          <Phone className="size-3.5" aria-hidden="true" />
          {company.contact.phoneDisplay}
        </a>
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {onClose ? (
          <Button variant="secondary" onClick={onClose}>
            Schließen
          </Button>
        ) : (
          <Button variant="secondary" href="/leistungen">
            Leistungen ansehen
          </Button>
        )}
      </div>
    </div>
  );
}

export function QuoteFormSkeleton({ children }: { children?: ReactNode }) {
  return (
    <div className="rounded-3xl border border-line bg-white p-6 shadow-lift" aria-hidden="true">
      <div className="h-6 w-2/3 skeleton" />
      <div className="mt-3 h-4 w-1/3 skeleton" />
      <div className="mt-6 grid grid-cols-2 gap-2.5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-12 skeleton" />
        ))}
      </div>
      {children}
    </div>
  );
}
