import { CalendarDays, MapPin, PhoneCall } from 'lucide-react';
import { QuoteButton } from '@/components/quote/QuoteButton';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { company } from '@/content/company';
import { telHref } from '@/lib/utils';

/** Drei schnelle Antworten direkt unter dem Hero – Wo, Termin, Notdienst – nebeneinander. */
export function QuickFacts() {
  const items = [
    {
      icon: MapPin,
      title: 'Wo?',
      short: 'Ganz Berlin & Umland',
      text: `Wir reinigen in ganz Berlin – in allen zwölf Bezirken${company.serviceArea.label.includes('Umland') ? ' und im Umland' : ''}.`,
      action: null,
    },
    {
      icon: CalendarDays,
      title: 'Termin',
      short: 'Kostenlose Besichtigung',
      text: 'Kostenlose Besichtigung – wir melden uns innerhalb eines Werktags.',
      action: 'quote' as const,
    },
    ...(company.emergencyService
      ? [
          {
            icon: PhoneCall,
            title: '24/7',
            short: 'Reinigungs-Notdienst',
            text: `Reinigungs-Notdienst – ${company.emergencyService.note.toLowerCase()}.`,
            action: 'phone' as const,
          },
        ]
      : []),
  ];
  return (
    <section className="border-b border-line bg-white" aria-label="Auf einen Blick">
      <RevealGroup as="ul" className="container-site grid grid-cols-3 divide-x divide-line">
        {items.map((item) => (
          <RevealItem
            key={item.title}
            as="li"
            className="flex flex-col items-center gap-2 px-2 py-5 text-center sm:gap-3 sm:px-6 sm:py-8 lg:flex-row lg:items-start lg:gap-4 lg:text-left"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-500 sm:size-12 sm:rounded-2xl">
              <item.icon className="size-5 sm:size-6" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block font-display text-base font-bold text-navy-950 sm:text-lg">
                {item.title}
              </span>
              <span className="mt-0.5 block text-xs leading-snug text-muted sm:hidden">
                {item.short}
              </span>
              <span className="mt-0.5 hidden text-sm leading-relaxed text-muted sm:block">
                {item.text}
              </span>
              {item.action === 'quote' ? (
                <QuoteButton
                  source="quickfacts"
                  variant="link"
                  size="sm"
                  className="mt-1 text-xs sm:text-sm"
                  withIcon={false}
                >
                  Termin anfragen
                </QuoteButton>
              ) : null}
              {item.action === 'phone' ? (
                <a
                  href={telHref(company.contact.phoneE164)}
                  className="mt-1 inline-flex text-xs font-semibold text-brand-600 hover:text-brand-700 sm:text-sm"
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
