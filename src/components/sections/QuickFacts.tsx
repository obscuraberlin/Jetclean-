import { CalendarDays, MapPin, PhoneCall } from 'lucide-react';
import { QuoteButton } from '@/components/quote/QuoteButton';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { company } from '@/content/company';
import { telHref } from '@/lib/utils';

/** Drei schnelle Antworten direkt unter dem Hero – Wo, Termin, Notdienst. */
export function QuickFacts() {
  const items = [
    {
      icon: MapPin,
      title: 'Wo?',
      text: `Wir reinigen in ganz Berlin – in allen zwölf Bezirken${company.serviceArea.label.includes('Umland') ? ' und im Umland' : ''}.`,
      action: null,
    },
    {
      icon: CalendarDays,
      title: 'Termin',
      text: 'Kostenlose Besichtigung – wir melden uns innerhalb eines Werktags.',
      action: 'quote' as const,
    },
    ...(company.emergencyService
      ? [
          {
            icon: PhoneCall,
            title: '24/7',
            text: `Reinigungs-Notdienst – ${company.emergencyService.note.toLowerCase()}.`,
            action: 'phone' as const,
          },
        ]
      : []),
  ];
  return (
    <section className="border-b border-line bg-white" aria-label="Auf einen Blick">
      <RevealGroup
        as="ul"
        className="container-site grid divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0"
      >
        {items.map((item) => (
          <RevealItem
            key={item.title}
            as="li"
            className="flex items-start gap-4 py-5 sm:flex-col sm:items-center sm:px-6 sm:py-8 sm:text-center lg:flex-row lg:items-start lg:text-left"
          >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-500">
              <item.icon className="size-6" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block font-display text-lg font-bold text-navy-950">
                {item.title}
              </span>
              <span className="mt-0.5 block text-sm leading-relaxed text-muted">{item.text}</span>
              {item.action === 'quote' ? (
                <QuoteButton source="quickfacts" variant="link" size="sm" className="mt-1">
                  Termin anfragen
                </QuoteButton>
              ) : null}
              {item.action === 'phone' ? (
                <a
                  href={telHref(company.contact.phoneE164)}
                  className="mt-1 inline-flex text-sm font-semibold text-brand-600 hover:text-brand-700"
                >
                  {company.contact.phoneDisplay}
                </a>
              ) : null}
            </span>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
