'use client';

import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useId, useState, type FormEvent } from 'react';
import { quoteAreaOptions, quoteFrequencyOptions, quoteServiceOptions } from '@/content/services';
import { siteConfig } from '@/content/site';
import { track } from '@/lib/analytics';
import {
  stepAreaSchema,
  stepFrequencySchema,
  stepLocationSchema,
  stepServiceSchema,
  toFieldErrors,
  type FieldErrors,
} from '@/lib/leads/schema';
import { cn } from '@/lib/utils';
import { Button, buttonIconClass } from '@/components/ui/Button';
import { FieldWrapper, Input, Select } from '@/components/ui/Field';
import { quoteTrustItems } from './QuoteForm';
import { useQuote } from './QuoteProvider';

type CardValues = { service: string; area_size: string; frequency: string; postal_code: string };

const empty: CardValues = { service: '', area_size: '', frequency: '', postal_code: '' };

const cardSchema = stepServiceSchema
  .merge(stepAreaSchema)
  .merge(stepFrequencySchema)
  .merge(stepLocationSchema.pick({ postal_code: true }));

type HeroQuoteCardProps = {
  source?: string;
  className?: string;
};

/**
 * Kompakte Anfrage-Karte im Hero: vier Angaben, dann geht es direkt in den
 * Angebots-Dialog (Kontaktdaten). Die Werte werden übernommen.
 */
export function HeroQuoteCard({ source = 'hero', className }: HeroQuoteCardProps) {
  const id = useId();
  const { open } = useQuote();
  const [values, setValues] = useState<CardValues>(empty);
  const [errors, setErrors] = useState<FieldErrors>({});

  const setValue = (key: keyof CardValues, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = cardSchema.safeParse(values);
    if (!result.success) {
      setErrors(toFieldErrors(result.error));
      return;
    }
    track('quote_step_completed', { step: 4, source });
    open(source, { prefill: result.data, step: 4 });
  };

  const describedBy = (key: keyof CardValues) => (errors[key] ? `${id}-${key}-error` : undefined);

  return (
    <div
      className={cn(
        'relative rounded-3xl border border-white/60 bg-white/95 p-5 shadow-lift backdrop-blur sm:p-6',
        className,
      )}
      data-testid="hero-quote-card"
    >
      <p className="font-display text-[1.1875rem] leading-snug font-bold text-navy-950 sm:text-[1.375rem]">
        Kostenloses <br className="sm:hidden" />
        Reinigungsangebot erhalten
      </p>
      <p className="mt-1 text-sm text-muted">{siteConfig.quote.durationHint}.</p>

      <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-4">
        <FieldWrapper
          label="Was soll gereinigt werden?"
          htmlFor={`${id}-service`}
          error={errors.service}
        >
          <Select
            id={`${id}-service`}
            name="service"
            value={values.service}
            onChange={(e) => setValue('service', e.target.value)}
            invalid={Boolean(errors.service)}
            aria-describedby={describedBy('service')}
          >
            <option value="">Bitte auswählen</option>
            {quoteServiceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </FieldWrapper>

        <FieldWrapper
          label="Wie groß ist die Fläche?"
          htmlFor={`${id}-area_size`}
          error={errors.area_size}
        >
          <Select
            id={`${id}-area_size`}
            name="area_size"
            value={values.area_size}
            onChange={(e) => setValue('area_size', e.target.value)}
            invalid={Boolean(errors.area_size)}
            aria-describedby={describedBy('area_size')}
          >
            <option value="">Bitte auswählen</option>
            {quoteAreaOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </FieldWrapper>

        <FieldWrapper label="Wie häufig?" htmlFor={`${id}-frequency`} error={errors.frequency}>
          <Select
            id={`${id}-frequency`}
            name="frequency"
            value={values.frequency}
            onChange={(e) => setValue('frequency', e.target.value)}
            invalid={Boolean(errors.frequency)}
            aria-describedby={describedBy('frequency')}
          >
            <option value="">Bitte auswählen</option>
            {quoteFrequencyOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </FieldWrapper>

        <FieldWrapper
          label="Ihre PLZ in Berlin"
          htmlFor={`${id}-postal_code`}
          error={errors.postal_code}
        >
          <Input
            id={`${id}-postal_code`}
            name="postal_code"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={5}
            placeholder="z. B. 10115"
            value={values.postal_code}
            onChange={(e) => setValue('postal_code', e.target.value.replace(/\D/g, '').slice(0, 5))}
            invalid={Boolean(errors.postal_code)}
            aria-describedby={describedBy('postal_code')}
          />
        </FieldWrapper>

        <Button type="submit" size="lg" className="w-full" data-testid="hero-quote-submit">
          Weiter zum Angebot
          <ArrowRight className={buttonIconClass} aria-hidden="true" />
        </Button>
      </form>

      <ul className="mt-4 space-y-1.5 text-sm text-navy-800">
        {quoteTrustItems.map((item) => (
          <li key={item} className="flex items-center gap-2">
            <CheckCircle2
              className="size-[1.125rem] shrink-0 text-success-500"
              aria-hidden="true"
              strokeWidth={2.25}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
