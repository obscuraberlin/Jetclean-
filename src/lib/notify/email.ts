import 'server-only';
import { company, fullAddress } from '@/content/company';
import { siteConfig } from '@/content/site';
import { labelFor } from '@/lib/leads/schema';
import type { LeadRecord, NewLead } from '@/lib/leads/types';

/**
 * E-Mail-Adapter. Standard: Resend über deren HTTP-API (keine zusätzliche Dependency).
 * Ist `RESEND_API_KEY` oder eine der Adressen nicht gesetzt, wird der No-op-Adapter genutzt
 * und die Website funktioniert ohne E-Mail-Versand weiter.
 */
export interface EmailAdapter {
  readonly name: string;
  /** Interne Benachrichtigung über eine neue Anfrage */
  sendLeadNotification(lead: NewLead & Pick<LeadRecord, 'id'>): Promise<boolean>;
  /** Eingangsbestätigung an den Interessenten (nur wenn eine E-Mail-Adresse vorliegt) */
  sendLeadConfirmation(lead: NewLead & Pick<LeadRecord, 'id'>): Promise<boolean>;
}

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

function buildLeadEmail(lead: NewLead & Pick<LeadRecord, 'id'>) {
  const isCallback = lead.source === 'callback';
  const rows: [string, string][] = [
    ...(isCallback ? ([['Art', 'Rückrufwunsch (Kurzformular)']] as [string, string][]) : []),
    ['Leistung', labelFor.service(lead.service)],
    ['Fläche', labelFor.area(lead.area_size)],
    ['Häufigkeit', labelFor.frequency(lead.frequency)],
    ['PLZ / Stadtteil', [lead.postal_code, lead.district].filter(Boolean).join(' – ')],
    ['Firma', lead.company],
    ['Ansprechpartner', lead.contact_name],
    ['E-Mail', lead.email],
    ['Telefon', lead.phone],
    ['Nachricht', lead.message || '–'],
    [
      'Quelle',
      [lead.source, lead.utm_source, lead.utm_medium, lead.utm_campaign]
        .filter(Boolean)
        .join(' / ') || '–',
    ],
    ['Landing Page', lead.landing_page || '–'],
    ['Lead-ID', lead.id],
  ];

  const text = rows.map(([label, value]) => `${label}: ${value}`).join('\n');
  const html = `<!doctype html><html lang="de"><body style="font-family:Arial,sans-serif;color:#0f1a33;line-height:1.5">
<h2 style="margin:0 0 16px">Neue Anfrage über die Website</h2>
<table style="border-collapse:collapse">${rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#64748b;vertical-align:top">${escapeHtml(label)}</td><td style="padding:6px 0">${escapeHtml(value).replaceAll('\n', '<br>')}</td></tr>`,
    )
    .join('')}</table></body></html>`;

  return {
    subject: isCallback
      ? `Rückrufwunsch: ${lead.contact_name} (${lead.phone})`
      : `Neue Anfrage: ${lead.company} – ${labelFor.service(lead.service)}`,
    text,
    html,
  };
}

function buildConfirmationEmail(lead: NewLead & Pick<LeadRecord, 'id'>) {
  const isCallback = lead.source === 'callback';
  const promise = siteConfig.quote.responseTimePromise;
  const firstLine = isCallback
    ? 'vielen Dank für Ihren Rückrufwunsch. Wir rufen Sie zur gewünschten Zeit an.'
    : `vielen Dank für Ihre Anfrage. Wir melden uns ${promise ?? 'schnellstmöglich'} persönlich bei Ihnen.`;
  const summary: [string, string][] = isCallback
    ? [
        ['Telefon', lead.phone],
        ['Postleitzahl', lead.postal_code],
      ]
    : [
        ['Leistung', labelFor.service(lead.service)],
        ['Fläche', labelFor.area(lead.area_size)],
        ['Häufigkeit', labelFor.frequency(lead.frequency)],
        ['Postleitzahl', lead.postal_code],
      ];
  const closing = `Sie möchten direkt sprechen? ${company.contact.phoneDisplay}${
    company.openingHours ? ` (${company.openingHours.display})` : ''
  }`;
  const text = [
    `Guten Tag ${lead.contact_name},`,
    '',
    firstLine,
    '',
    'Ihre Angaben:',
    ...summary.map(([label, value]) => `${label}: ${value}`),
    '',
    closing,
    '',
    'Freundliche Grüße',
    company.name,
    fullAddress,
  ].join('\n');
  const html = `<!doctype html><html lang="de"><body style="font-family:Arial,sans-serif;color:#0f1a33;line-height:1.6">
<p>Guten Tag ${escapeHtml(lead.contact_name)},</p>
<p>${escapeHtml(firstLine)}</p>
<p style="margin:16px 0 4px;color:#64748b">Ihre Angaben:</p>
<table style="border-collapse:collapse">${summary
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#64748b">${escapeHtml(label)}</td><td style="padding:4px 0">${escapeHtml(value)}</td></tr>`,
    )
    .join('')}</table>
<p style="margin-top:16px">${escapeHtml(closing)}</p>
<p>Freundliche Grüße<br>${escapeHtml(company.name)}<br><span style="color:#64748b">${escapeHtml(fullAddress)}</span></p>
</body></html>`;
  return {
    subject: isCallback
      ? `Ihr Rückrufwunsch bei ${company.shortName}`
      : `Ihre Anfrage bei ${company.shortName} – wir melden uns`,
    text,
    html,
  };
}

class ResendEmailAdapter implements EmailAdapter {
  readonly name = 'resend';

  constructor(
    private readonly apiKey: string,
    private readonly to: string,
    private readonly from: string,
  ) {}

  private async send(payload: Record<string, unknown>) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(8000),
        body: JSON.stringify({ from: this.from, ...payload }),
      });
      if (!response.ok) {
        console.error('[notify] Resend responded with status', response.status);
        return false;
      }
      return true;
    } catch (error) {
      console.error(
        '[notify] Resend request failed:',
        error instanceof Error ? error.message : error,
      );
      return false;
    }
  }

  async sendLeadNotification(lead: NewLead & Pick<LeadRecord, 'id'>) {
    const { subject, text, html } = buildLeadEmail(lead);
    return this.send({
      to: [this.to],
      ...(lead.email ? { reply_to: lead.email } : {}),
      subject,
      text,
      html,
    });
  }

  async sendLeadConfirmation(lead: NewLead & Pick<LeadRecord, 'id'>) {
    if (!lead.email) return false;
    const { subject, text, html } = buildConfirmationEmail(lead);
    return this.send({ to: [lead.email], reply_to: this.to, subject, text, html });
  }
}

class NoopEmailAdapter implements EmailAdapter {
  readonly name = 'noop';
  async sendLeadNotification() {
    return false;
  }
  async sendLeadConfirmation() {
    return false;
  }
}

export function getEmailAdapter(): EmailAdapter {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFICATION_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL;
  if (apiKey && to && from) return new ResendEmailAdapter(apiKey, to, from);
  return new NoopEmailAdapter();
}
