import type { Metadata } from 'next';
import { ArrowRight, Home } from 'lucide-react';
import { Button, buttonIconClass } from '@/components/ui/Button';
import { services } from '@/content/services';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Seite nicht gefunden',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="section-y">
      <div className="container-site max-w-2xl text-center">
        <p className="text-xs font-semibold tracking-[0.16em] text-brand-600 uppercase">
          Fehler 404
        </p>
        <h1 className="mt-4 text-4xl sm:text-5xl">Diese Seite gibt es nicht (mehr).</h1>
        <p className="mt-4 text-lg text-muted">
          Vielleicht wurde die Seite verschoben oder die Adresse enthält einen Tippfehler. Hier geht
          es weiter:
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/">
            <Home className="size-4" aria-hidden="true" />
            Zur Startseite
          </Button>
          <Button href="/kontakt" variant="secondary">
            Kontakt aufnehmen
            <ArrowRight className={buttonIconClass} aria-hidden="true" />
          </Button>
        </div>
        <ul className="mt-10 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
          {services.map((service) => (
            <li key={service.slug}>
              <Link
                href={`/leistungen/${service.slug}`}
                className="text-navy-700 underline-offset-4 hover:text-brand-600 hover:underline"
              >
                {service.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
