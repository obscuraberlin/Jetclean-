/**
 * Wissensbasis des KI-Assistenten: Systemprompt für Claude (Server) und ein
 * schlagwortbasierter Fallback, der ohne API-Schlüssel und in der statischen
 * Vorschau funktioniert. Beide nutzen ausschließlich Inhalte dieser Website.
 */
import { benefits } from '@/content/benefits';
import { company } from '@/content/company';
import { faqs } from '@/content/faqs';
import { processSteps } from '@/components/sections/ProcessSteps';
import { services } from '@/content/services';
import { siteConfig } from '@/content/site';

export const assistantName = 'JETCLEAN Assistent';

export type AssistantLink = { label: string; href: string };

export type AssistantAnswer = {
  text: string;
  links?: AssistantLink[];
};

export const suggestedQuestions = [
  'Welche Leistungen bietet ihr an?',
  'Was kostet eine Büroreinigung?',
  'Wie läuft eine Zusammenarbeit ab?',
  'Reinigt ihr auch abends oder am Wochenende?',
];

/** Kompakte Textfassung der Website-Inhalte für den Systemprompt. */
export function buildKnowledgeText() {
  const lines: string[] = [];
  lines.push(`Unternehmen: ${company.name} (${company.shortName}), Gebäudereinigung in Berlin.`);
  lines.push(
    `Familienunternehmen seit ${company.foundedYear}, ${company.employees} Mitarbeitende, ${company.locations} Standorte in Deutschland, Zentrale: ${company.address.street}, ${company.address.postalCode} ${company.address.city}.`,
  );
  lines.push(`Telefon: ${company.contact.phoneDisplay}. E-Mail: ${company.contact.email}.`);
  if (company.openingHours) lines.push(`Telefonisch erreichbar: ${company.openingHours.display}.`);
  if (company.emergencyService)
    lines.push(`${company.emergencyService.label}: ${company.emergencyService.note}.`);
  lines.push(`Einsatzgebiet: ganz Berlin (alle Bezirke) und nach Absprache das Umland.`);
  lines.push(`Rückmeldung auf Anfragen: ${siteConfig.quote.responseTimePromise ?? 'kurzfristig'}.`);
  lines.push('');
  lines.push('Leistungen:');
  for (const service of services) {
    lines.push(`- ${service.title} (/leistungen/${service.slug}): ${service.intro}`);
    for (const faq of service.faqs) lines.push(`  Frage: ${faq.question} Antwort: ${faq.answer}`);
  }
  lines.push('');
  lines.push('Vorteile:');
  for (const benefit of benefits) lines.push(`- ${benefit.title}: ${benefit.text}`);
  lines.push('');
  lines.push('Ablauf einer Zusammenarbeit:');
  processSteps.forEach((step, index) => lines.push(`${index + 1}. ${step.title}: ${step.text}`));
  lines.push('');
  lines.push('Häufige Fragen:');
  for (const faq of faqs) lines.push(`- ${faq.question} ${faq.answer}`);
  return lines.join('\n');
}

export function buildSystemPrompt() {
  return `Du bist der ${assistantName}, ein freundlicher Kundenservice-Assistent auf der Website von ${company.name} (Gebäudereinigung in Berlin).

Aufgabe: Beantworte Fragen von Interessenten und Kunden kurz, klar und auf Deutsch (Sie-Form). Nutze ausschließlich die folgenden Website-Informationen. Wenn eine Information dort nicht enthalten ist (z. B. konkrete Preise, Termine, Verfügbarkeit), sage das ehrlich und verweise auf das kostenlose Angebot, den Rückruf-Service oder die Telefonnummer ${company.contact.phoneDisplay}.

Regeln:
- Erfinde keine Preise, Zahlen, Zertifikate oder Zusagen.
- Antworte in maximal 120 Wörtern, bei Aufzählungen mit kurzen Stichpunkten.
- Wenn eine Leistungsseite passt, nenne den Pfad in eckigen Klammern, z. B. [/leistungen/bueroreinigung]. Für Angebote nenne [angebot], für Rückruf [rueckruf].
- Bleib beim Thema Gebäudereinigung und ${company.shortName}. Bei anderen Themen freundlich ablehnen.
- Keine Rechts-, Medizin- oder Finanzberatung.

Website-Informationen:
${buildKnowledgeText()}`;
}

/* ------------------------------------------------------------------------ */
/* Lokaler Fallback ohne KI                                                  */
/* ------------------------------------------------------------------------ */

const quoteLink: AssistantLink = { label: 'Kostenloses Angebot', href: 'angebot' };
const callbackLink: AssistantLink = { label: 'Rückruf anfordern', href: 'rueckruf' };

function normalize(text: string) {
  return text
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9\s]/g, ' ');
}

const STOPWORDS = new Set([
  'und',
  'oder',
  'der',
  'die',
  'das',
  'ein',
  'eine',
  'ich',
  'wir',
  'ihr',
  'sie',
  'ist',
  'sind',
  'was',
  'wie',
  'wann',
  'welche',
  'welchen',
  'auch',
  'fuer',
  'mit',
  'von',
  'bei',
  'bietet',
  'bieten',
  'an',
  'es',
  'gibt',
  'kann',
  'koennen',
  'man',
  'habt',
  'haben',
  'euch',
  'ihnen',
  'zu',
  'im',
  'in',
  'am',
  'den',
  'dem',
  'des',
  'nicht',
  'noch',
  'mir',
  'mich',
  'uns',
  'bitte',
]);

function tokens(text: string) {
  return normalize(text)
    .split(/\s+/)
    .filter((word) => (word.length > 2 || word === 'wo') && !STOPWORDS.has(word));
}

function score(question: string[], candidate: string) {
  const hay = normalize(candidate);
  let hits = 0;
  for (const word of question) {
    if (hay.includes(word)) hits += 1;
    else if (word.length > 5 && hay.includes(word.slice(0, 5))) hits += 0.5;
  }
  return hits;
}

type Topic = { keywords: string[]; answer: AssistantAnswer };

function topics(): Topic[] {
  return [
    {
      keywords: ['preis', 'kosten', 'kostet', 'teuer', 'guenstig', 'euro', 'angebot', 'pauschale'],
      answer: {
        text: `Die Kosten hängen von Fläche, Reinigungsintervall und Leistungsumfang ab – deshalb nennen wir keine Pauschalpreise. Nach einer kostenlosen Besichtigung erhalten Sie ein transparentes Angebot mit fester Monatspauschale, Rückmeldung ${siteConfig.quote.responseTimePromise ?? 'kurzfristig'}.`,
        links: [quoteLink, callbackLink],
      },
    },
    {
      keywords: [
        'ablauf',
        'zusammenarbeit',
        'schritte',
        'start',
        'beginnen',
        'besichtigung',
        'funktioniert',
      ],
      answer: {
        text: `So läuft es ab:\n${processSteps.map((step, index) => `${index + 1}. ${step.title} – ${step.text}`).join('\n')}`,
        links: [quoteLink],
      },
    },
    {
      keywords: ['leistung', 'angebot', 'services', 'macht', 'reinigt', 'reinigung', 'alles'],
      answer: {
        text: `Wir bieten in Berlin: ${services.map((service) => service.title).join(', ')}. Sagen Sie mir gern, welche Leistung Sie interessiert – dann erkläre ich Details.`,
        links: [{ label: 'Alle Leistungen', href: '/leistungen' }, quoteLink],
      },
    },
    {
      keywords: [
        'abend',
        'abends',
        'wochenende',
        'nachts',
        'geschaeftszeit',
        'uhrzeit',
        'zeiten',
        'wann',
      ],
      answer: {
        text: 'Ja – Reinigungszeiten richten sich nach Ihrem Betrieb. Auf Wunsch reinigen wir vor oder nach den Geschäftszeiten, abends, in der Spätschicht oder am Wochenende, damit Ihr Tagesgeschäft ungestört bleibt.',
        links: [quoteLink],
      },
    },
    {
      keywords: [
        'telefon',
        'nummer',
        'anrufen',
        'erreichen',
        'kontakt',
        'email',
        'mail',
        'adresse',
        'whatsapp',
      ],
      answer: {
        text: `Sie erreichen uns telefonisch unter ${company.contact.phoneDisplay}${company.openingHours ? ` (${company.openingHours.display})` : ''} oder per E-Mail an ${company.contact.email}. Unsere Zentrale: ${company.address.street}, ${company.address.postalCode} ${company.address.city}.`,
        links: [callbackLink, { label: 'Kontaktseite', href: '/kontakt' }],
      },
    },
    {
      keywords: [
        'bezirk',
        'gebiet',
        'umland',
        'brandenburg',
        'potsdam',
        'berlin',
        'wo',
        'standort',
        'standorte',
      ],
      answer: {
        text: `Wir reinigen in ganz Berlin – in allen Bezirken – und nach Absprache im Umland. Das Unternehmen hat ${company.locations} Standorte in Deutschland, die Zentrale liegt in ${company.address.city}-Neukölln.`,
        links: [quoteLink],
      },
    },
    {
      keywords: [
        'mitarbeiter',
        'team',
        'personal',
        'familie',
        'unternehmen',
        'seit',
        'erfahrung',
        'gegruendet',
        'wer',
      ],
      answer: {
        text: `${company.shortName} ist ein Familienunternehmen aus Berlin, seit ${company.foundedYear} am Markt, mit rund ${company.employees} Mitarbeitenden und ${company.locations} Standorten in Deutschland. In Ihrem Objekt arbeitet ein festes, eingearbeitetes Team mit einem persönlichen Ansprechpartner.`,
        links: [{ label: 'Über uns', href: '/ueber-uns' }],
      },
    },
    {
      keywords: ['nachhaltig', 'umwelt', 'oeko', 'reinigungsmittel', 'chemie', 'bio'],
      answer: {
        text: 'Wir setzen bevorzugt umweltschonende Reinigungsmittel mit anerkannten Umweltzeichen ein, dosieren exakt und verzichten auf Chemie, wo mechanische Verfahren oder Reinwasser ausreichen.',
        links: [{ label: 'Nachhaltigkeit', href: '/nachhaltigkeit' }],
      },
    },
    {
      keywords: [
        'job',
        'jobs',
        'karriere',
        'bewerbung',
        'bewerben',
        'stelle',
        'arbeiten',
        'minijob',
      ],
      answer: {
        text: 'Wir suchen regelmäßig Verstärkung für unsere Teams in Berlin. Alle offenen Stellen und den Weg zur Bewerbung finden Sie auf unserer Karriereseite.',
        links: [{ label: 'Karriere', href: '/karriere' }],
      },
    },
  ];
}

/** Antwortet ohne KI: passende Leistung, FAQ oder Thema – sonst freundliche Weiterleitung. */
export function localAnswer(question: string): AssistantAnswer {
  const words = tokens(question);
  const greetings = ['hallo', 'hi', 'hey', 'moin', 'guten', 'servus', 'tag'];
  if (
    words.length === 0 ||
    (words.length <= 2 && words.every((word) => greetings.includes(word)))
  ) {
    return {
      text: `Gern helfe ich weiter. Fragen Sie mich zum Beispiel nach unseren Leistungen, zum Ablauf oder zu den Kosten.`,
    };
  }

  // 0. Preisfragen immer mit der Kostenantwort beantworten – ggf. mit Link zur erkannten Leistung
  const priceWords = ['preis', 'kosten', 'kostet', 'teuer', 'guenstig', 'euro', 'pauschale'];
  const isPriceQuestion = words.some((word) => priceWords.some((key) => word.includes(key)));

  // 0b. „Wo seid ihr / wo sitzt ihr“ – Standort statt Leistung
  if (
    words.includes('wo') &&
    words.some((word) =>
      [
        'seid',
        'sitzt',
        'befindet',
        'standort',
        'adresse',
        'finde',
        'reinigt',
        'arbeitet',
        'taetig',
      ].includes(word),
    )
  ) {
    return topics().find((topic) => topic.keywords.includes('standort'))!.answer;
  }

  // 1. Konkrete Leistung erkannt?
  let bestService = { score: 0, service: services[0] };
  for (const service of services) {
    const value =
      score(words, `${service.title} ${service.slug} ${service.audience.join(' ')}`) * 2;
    if (value > bestService.score) bestService = { score: value, service };
  }
  if (isPriceQuestion) {
    const priceTopic = topics()[0]!.answer;
    const service = bestService.score >= 2 ? bestService.service : undefined;
    return service
      ? {
          text: priceTopic.text,
          links: [
            { label: `Mehr zu ${service.title}`, href: `/leistungen/${service.slug}` },
            ...(priceTopic.links ?? []),
          ],
        }
      : priceTopic;
  }
  if (bestService.score >= 2 && bestService.service) {
    const service = bestService.service;
    const faqHit = service.faqs
      .map((faq) => ({ faq, value: score(words, faq.question) }))
      .sort((a, b) => b.value - a.value)[0];
    const text =
      faqHit && faqHit.value >= 2
        ? faqHit.faq.answer
        : `${service.title}: ${service.intro} ${service.highlights
            .slice(0, 2)
            .map((item) => item.title)
            .join(' · ')}.`;
    return {
      text,
      links: [
        { label: `Mehr zu ${service.title}`, href: `/leistungen/${service.slug}` },
        quoteLink,
      ],
    };
  }

  // 2. Allgemeine FAQ
  const faqHit = faqs
    .map((faq) => ({ faq, value: score(words, faq.question) }))
    .sort((a, b) => b.value - a.value)[0];

  // 3. Themen
  const topicHit = topics()
    .map((topic) => ({
      topic,
      value: topic.keywords.reduce(
        (sum, key) => sum + (words.some((w) => w.includes(key) || key.includes(w)) ? 1 : 0),
        0,
      ),
    }))
    .sort((a, b) => b.value - a.value)[0];

  if (faqHit && faqHit.value >= 2 && faqHit.value >= (topicHit?.value ?? 0)) {
    return { text: faqHit.faq.answer, links: [quoteLink] };
  }
  if (topicHit && topicHit.value >= 1) return topicHit.topic.answer;

  return {
    text: `Dazu habe ich leider keine gesicherte Information. Am schnellsten hilft Ihnen unser Team persönlich: telefonisch unter ${company.contact.phoneDisplay} oder über den Rückruf-Service.`,
    links: [callbackLink, quoteLink],
  };
}

/** Wandelt Marker wie [/leistungen/x], [angebot], [rueckruf] aus KI-Antworten in Links um. */
export function extractLinks(text: string): AssistantAnswer {
  const links: AssistantLink[] = [];
  const clean = text
    .replace(/\[(\/[a-z0-9\-/]+)\]/gi, (_, path: string) => {
      const service = services.find((item) => `/leistungen/${item.slug}` === path);
      const label = service ? `Mehr zu ${service.title}` : pathLabel(path);
      if (!links.some((link) => link.href === path)) links.push({ label, href: path });
      return '';
    })
    .replace(/\[angebot\]/gi, () => {
      if (!links.some((link) => link.href === 'angebot')) links.push(quoteLink);
      return '';
    })
    .replace(/\[rueckruf\]/gi, () => {
      if (!links.some((link) => link.href === 'rueckruf')) links.push(callbackLink);
      return '';
    })
    .replace(/[ \t]+\n/g, '\n')
    .replace(/ {2,}/g, ' ')
    .trim();
  return { text: clean, links: links.length ? links : undefined };
}

function pathLabel(path: string) {
  const map: Record<string, string> = {
    '/leistungen': 'Alle Leistungen',
    '/kontakt': 'Kontakt',
    '/ueber-uns': 'Über uns',
    '/nachhaltigkeit': 'Nachhaltigkeit',
    '/karriere': 'Karriere',
    '/referenzen': 'Referenzen',
    '/branchen': 'Branchen',
    '/ratgeber': 'Ratgeber',
  };
  return map[path] ?? 'Mehr erfahren';
}
