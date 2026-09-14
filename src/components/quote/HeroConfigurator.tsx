'use client';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useId, useState, type FormEvent } from 'react';
import { quoteAreaOptions, quoteFrequencyOptions } from '@/content/services';
import { siteConfig } from '@/content/site';
import { track } from '@/lib/analytics';
import { stepLocationSchema } from '@/lib/leads/schema';
import { cn } from '@/lib/utils';
import { Button, buttonIconClass } from '@/components/ui/Button';
import { Input } from '@/components/ui/Field';
import { useQuote } from './QuoteProvider';

/** Große, klare Auswahl – Reihenfolge und Wortlaut wie im Konzept. */
const serviceChips = [
  { value: 'buero', label: 'Büro' },
  { value: 'gewerbe', label: 'Gewerbe' },
  { value: 'praxis', label: 'Praxis' },
  { value: 'glasflaechen', label: 'Glas' },
  { value: 'treppenhaus', label: 'Treppenhaus' },
  { value: 'sonstiges', label: 'Andere' },
] as const;

const steps = [
  { key: 'service', title: 'Was möchten Sie reinigen lassen?' },
  { key: 'area', title: 'Wie groß ist die Fläche?' },
  { key: 'frequency', title: 'Wie häufig?' },
  { key: 'location', title: 'Wo befindet sich das Objekt?' },
] as const;

type Values = { service: string; area_size: string; frequency: string; postal_code: string };

/**
 * Kompakter Konfigurator im Hero: eine Frage pro Schritt, große Chips, weiche Übergänge.
 * Am Ende öffnet sich der Dialog direkt bei den Kontaktdaten (Werte werden übernommen).
 */
export function HeroConfigurator({
  source = 'hero',
  className,
}: {
  source?: string;
  className?: string;
}) {
  const id = useId();
  const reduce = useReducedMotion();
  const { open } = useQuote();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [values, setValues] = useState<Values>({
    service: '',
    area_size: '',
    frequency: '',
    postal_code: '',
  });
  const [error, setError] = useState<string | null>(null);

  const go = (next: number) => {
    setDirection(next > step ? 1 : -1);
    setStep(next);
  };

  const choose = (key: keyof Values, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    track('quote_step_completed', { step: step + 1, source });
    window.setTimeout(() => go(step + 1), reduce ? 0 : 180);
  };

  const finish = (event: FormEvent) => {
    event.preventDefault();
    const result = stepLocationSchema.safeParse({ postal_code: values.postal_code, district: '' });
    if (!result.success) {
      setError('Bitte eine gültige fünfstellige Postleitzahl eingeben.');
      return;
    }
    track('quote_step_completed', { step: 4, source });
    open(source, { prefill: values, step: 4 });
  };

  const current = steps[step]!;

  return (
    <div
      className={cn(
        'rounded-[1.75rem] bg-white/95 p-6 shadow-[0_24px_60px_-28px_rgb(20_18_14/0.35)] ring-1 ring-black/[0.04] backdrop-blur-md sm:p-7',
        className,
      )}
      data-testid="hero-form"
    >
      <div className="flex items-center justify-between">
        <p className="text-[0.6875rem] font-semibold tracking-[0.16em] text-brand-600 uppercase">
          Angebot in 60 Sekunden
        </p>
        <ol
          className="flex items-center gap-1.5"
          aria-label={`Schritt ${step + 1} von ${steps.length}`}
        >
          {steps.map((s, index) => (
            <li
              key={s.key}
              className={cn(
                'h-1.5 rounded-full transition-[width,background-color] duration-400 ease-(--ease-premium)',
                index === step
                  ? 'w-6 bg-brand-500'
                  : index < step
                    ? 'w-2.5 bg-brand-300'
                    : 'w-2.5 bg-line-strong',
              )}
              aria-current={index === step ? 'step' : undefined}
            />
          ))}
        </ol>
      </div>

      <div className="relative mt-4 overflow-hidden">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={current.key}
            initial={reduce ? false : { opacity: 0, x: direction * 28 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? undefined : { opacity: 0, x: direction * -28 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-display text-[1.375rem] leading-snug font-bold text-navy-950 sm:text-2xl">
              {current.title}
            </h2>

            {step === 0 ? (
              <ChipGrid
                name="service"
                options={serviceChips}
                value={values.service}
                onChoose={(v) => choose('service', v)}
              />
            ) : null}
            {step === 1 ? (
              <ChipGrid
                name="area_size"
                options={quoteAreaOptions}
                value={values.area_size}
                onChoose={(v) => choose('area_size', v)}
              />
            ) : null}
            {step === 2 ? (
              <ChipGrid
                name="frequency"
                options={quoteFrequencyOptions}
                value={values.frequency}
                onChoose={(v) => choose('frequency', v)}
              />
            ) : null}
            {step === 3 ? (
              <form onSubmit={finish} noValidate className="mt-5">
                <label htmlFor={`${id}-plz`} className="text-sm font-semibold text-navy-800">
                  Postleitzahl in Berlin
                </label>
                <div className="mt-2 flex gap-2">
                  <Input
                    id={`${id}-plz`}
                    name="postal_code"
                    inputMode="numeric"
                    autoComplete="postal-code"
                    maxLength={5}
                    placeholder="z. B. 10115"
                    value={values.postal_code}
                    onChange={(e) => {
                      setError(null);
                      setValues((prev) => ({
                        ...prev,
                        postal_code: e.target.value.replace(/\D/g, '').slice(0, 5),
                      }));
                    }}
                    invalid={Boolean(error)}
                    aria-describedby={error ? `${id}-plz-error` : undefined}
                    autoFocus
                    className="h-13"
                  />
                  <Button
                    type="submit"
                    size="lg"
                    data-testid="hero-quote-submit"
                    className="shrink-0"
                  >
                    Weiter
                    <ArrowRight className={buttonIconClass} aria-hidden="true" />
                  </Button>
                </div>
                {error ? (
                  <p id={`${id}-plz-error`} role="alert" className="mt-2 text-sm text-danger-600">
                    {error}
                  </p>
                ) : null}
              </form>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-5 flex items-center justify-between text-xs text-muted">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => go(step - 1)}
            className="inline-flex items-center gap-1 font-medium text-navy-700 hover:text-navy-950"
          >
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            Zurück
          </button>
        ) : (
          <span className="inline-flex items-center gap-1.5">
            <Check className="size-3.5 text-success-600" aria-hidden="true" />
            Unverbindlich ·{' '}
            {siteConfig.quote.responseTimePromise
              ? `Rückmeldung ${siteConfig.quote.responseTimePromise}`
              : 'persönliche Rückmeldung'}
          </span>
        )}
        <span>{siteConfig.quote.durationHint}</span>
      </div>
    </div>
  );
}

function ChipGrid({
  name,
  options,
  value,
  onChoose,
}: {
  name: string;
  options: readonly { value: string; label: string }[];
  value: string;
  onChoose: (value: string) => void;
}) {
  return (
    <div className="mt-5 flex flex-wrap gap-2.5" role="group" aria-label={name}>
      {options.map((option) => {
        const selected = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChoose(option.value)}
            aria-pressed={selected}
            className={cn(
              'min-h-12 rounded-full border px-5 text-[0.9375rem] font-semibold transition-[background-color,border-color,color,transform] duration-200 ease-(--ease-premium) motion-safe:active:scale-[0.97]',
              selected
                ? 'border-navy-950 bg-navy-950 text-white'
                : 'border-line-strong bg-white text-navy-900 hover:border-navy-950',
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
