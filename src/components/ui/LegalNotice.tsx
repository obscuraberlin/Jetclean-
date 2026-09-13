import { AlertTriangle } from 'lucide-react';
import { company } from '@/content/company';

/**
 * Sichtbarer Hinweis auf ungeprüfte Rechtstexte. Verschwindet automatisch,
 * sobald `company.legal.reviewed = true` gesetzt wird.
 */
export function LegalNotice() {
  if (company.legal.reviewed) return null;
  return (
    <div
      role="note"
      className="mb-8 flex gap-3 rounded-2xl border border-brand-200 bg-brand-50 p-4 text-sm text-brand-800"
    >
      <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      <p>
        <strong>Entwurf:</strong> Dieser Rechtstext ist eine strukturelle Vorlage und muss vor
        Veröffentlichung durch die Geschäftsführung bzw. eine juristische Beratung geprüft und
        vervollständigt werden. Der Hinweis wird ausgeblendet, sobald{' '}
        <code className="rounded bg-white/70 px-1">company.legal.reviewed</code> auf{' '}
        <code className="rounded bg-white/70 px-1">true</code> gesetzt ist.
      </p>
    </div>
  );
}
