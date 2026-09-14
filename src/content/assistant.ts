import { company } from './company';
import { faqs } from './faqs';
import { services } from './services';
import { siteConfig } from './site';

export type AssistantAction = 'quote' | 'callback' | 'phone';

export type AssistantIntent = {
  id: string;
  /** Wird als Schnellantwort angezeigt */
  label: string;
  /** Schlüsselwörter für die Freitext-Erkennung (klein geschrieben) */
  keywords: string[];
  answer: string;
  actions?: AssistantAction[];
};

const serviceList = services.map((s) => s.title).join(', ');
const promise = siteConfig.quote.responseTimePromise ?? 'schnellstmöglich';

/**
 * Wissensbasis des JETCLEAN Assistenten. Antworten stammen ausschließlich aus den
 * Inhalten der Website (FAQ, Leistungen, Unternehmensdaten) – keine externen Dienste.
 */
export const assistantIntents: AssistantIntent[] = [
  {
    id: 'services',
    label: 'Welche Leistungen bietet ihr?',
    keywords: ['leistung', 'angebot', 'was macht', 'reinigen', 'reinigung', 'service'],
    answer: `Wir übernehmen ${serviceList} – für Büros, Praxen, Gewerbe, Hausverwaltungen und Institutionen in ganz Berlin. Auf Anfrage auch Bauendreinigung, Winterdienst oder Hausmeisterservice.`,
    actions: ['quote'],
  },
  {
    id: 'price',
    label: 'Was kostet die Reinigung?',
    keywords: ['kost', 'preis', 'euro', 'teuer', 'günstig', 'stundensatz', 'budget'],
    answer:
      faqs.find((f) => f.question.toLowerCase().includes('kostet'))?.answer ??
      'Der Preis hängt von Fläche, Häufigkeit und Anforderungen ab. Nach einer kostenlosen Besichtigung erhalten Sie ein transparentes Angebot mit Leistungsverzeichnis.',
    actions: ['quote', 'callback'],
  },
  {
    id: 'start',
    label: 'Wie schnell könnt ihr starten?',
    keywords: ['schnell', 'start', 'wann', 'termin', 'sofort', 'kurzfristig', 'dauer'],
    answer: `Nach Ihrer Anfrage melden wir uns ${promise}, besichtigen Ihr Objekt und starten in der Regel kurz nach Ihrer Freigabe – bei Bedarf auch kurzfristig.`,
    actions: ['quote', 'phone'],
  },
  {
    id: 'times',
    label: 'Reinigt ihr auch abends?',
    keywords: ['abend', 'nacht', 'wochenende', 'zeiten', 'außerhalb', 'spätschicht', 'uhrzeit'],
    answer:
      'Ja. Einsatzzeiten richten sich nach Ihrem Betrieb – frühmorgens, abends, in der Spätschicht oder am Wochenende, damit Ihr Tagesgeschäft ungestört bleibt.',
    actions: ['quote'],
  },
  {
    id: 'area',
    label: 'Seid ihr in meinem Bezirk?',
    keywords: ['bezirk', 'wo', 'gebiet', 'umland', 'potsdam', 'brandenburg', 'stadtteil', 'berlin'],
    answer: `Wir sind in allen zwölf Berliner Bezirken im Einsatz – und auf Anfrage in ${company.serviceArea.label}.`,
    actions: ['quote'],
  },
  {
    id: 'sustainability',
    label: 'Wie nachhaltig arbeitet ihr?',
    keywords: ['nachhaltig', 'umwelt', 'öko', 'chemie', 'reinigungsmittel', 'bio'],
    answer:
      faqs.find((f) => f.question.toLowerCase().includes('reinigungsmittel'))?.answer ??
      'Wir setzen bevorzugt umweltschonende Reinigungsmittel mit anerkannten Umweltzeichen ein und dosieren exakt.',
  },
  {
    id: 'contact',
    label: 'Ich möchte jemanden sprechen.',
    keywords: ['sprechen', 'anruf', 'telefon', 'rückruf', 'kontakt', 'mensch', 'mitarbeiter'],
    answer: `Gern. Rufen Sie uns an unter ${company.contact.phoneDisplay}${
      company.openingHours ? ` (${company.openingHours.display})` : ''
    } – oder hinterlassen Sie Ihre Nummer, wir rufen zurück.`,
    actions: ['callback', 'phone'],
  },
];

export const assistantGreeting = `Hallo, ich bin der JETCLEAN Assistent. Ich beantworte Fragen zu Leistungen, Ablauf und Preisen – oder bringe Sie direkt zum Angebot.`;

export const assistantFallback = `Das kann ich so nicht sicher beantworten. Am schnellsten hilft ein kurzes Gespräch – oder Sie beschreiben uns Ihr Objekt in 60 Sekunden.`;

/** Findet die passendste Absicht zu einer Freitext-Eingabe. */
export function matchIntent(input: string): AssistantIntent | null {
  const text = input.toLowerCase();
  let best: { intent: AssistantIntent; score: number } | null = null;
  for (const intent of assistantIntents) {
    const score = intent.keywords.reduce((sum, key) => sum + (text.includes(key) ? 1 : 0), 0);
    if (score > 0 && (!best || score > best.score)) best = { intent, score };
  }
  return best?.intent ?? null;
}
