'use client';

import { RotateCcw } from 'lucide-react';
import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { company } from '@/content/company';
import { telHref } from '@/lib/utils';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Nur den Digest loggen – keine Nutzerdaten.
    console.error('[app] Unerwarteter Fehler', error.digest ?? '');
  }, [error]);

  return (
    <section className="section-y">
      <div className="container-site max-w-2xl text-center">
        <p className="text-xs font-semibold tracking-[0.16em] text-brand-600 uppercase">Fehler</p>
        <h1 className="mt-4 text-4xl sm:text-5xl">Da ist etwas schiefgelaufen.</h1>
        <p className="mt-4 text-lg text-muted">
          Bitte versuchen Sie es erneut. Sollte das Problem bestehen bleiben, erreichen Sie uns
          telefonisch unter{' '}
          <a
            href={telHref(company.contact.phoneE164)}
            className="font-semibold text-navy-900 hover:text-brand-600"
          >
            {company.contact.phoneDisplay}
          </a>
          .
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button onClick={reset}>
            <RotateCcw className="size-4" aria-hidden="true" />
            Erneut versuchen
          </Button>
          <Button href="/" variant="secondary">
            Zur Startseite
          </Button>
        </div>
      </div>
    </section>
  );
}
