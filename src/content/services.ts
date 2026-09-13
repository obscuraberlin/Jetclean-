import type { LucideIcon } from 'lucide-react';
import { Building2, RefreshCw, Sparkles, Footprints, Layers, Wrench } from 'lucide-react';

export type ServiceSlug =
  | 'bueroreinigung'
  | 'unterhaltsreinigung'
  | 'glasreinigung'
  | 'treppenhausreinigung'
  | 'grundreinigung'
  | 'sonderreinigung';

export type Service = {
  slug: ServiceSlug;
  /** Kurzer Titel (Card, Navigation) */
  title: string;
  /** SEO-Titel der Unterseite */
  seoTitle: string;
  /** Meta Description der Unterseite (max. ~155 Zeichen) */
  seoDescription: string;
  /** Einzeiler für Cards */
  teaser: string;
  /** Erweiterte Einleitung auf der Detailseite */
  intro: string;
  icon: LucideIcon;
  image: {
    src: string;
    alt: string;
  };
  /** Leistungsumfang */
  scope: string[];
  /** Typische Kunden / Einsatzbereiche */
  audience: string[];
  /** Was JETCLEAN bei dieser Leistung besonders macht */
  highlights: { title: string; text: string }[];
  /** Häufige Fragen speziell zu dieser Leistung */
  faqs: { question: string; answer: string }[];
};

export const services: Service[] = [
  {
    slug: 'bueroreinigung',
    title: 'Büroreinigung',
    seoTitle: 'Büroreinigung Berlin – zuverlässig & planbar',
    seoDescription:
      'Büroreinigung in Berlin für Unternehmen jeder Größe: feste Teams, individuelle Reinigungspläne, Qualitätskontrollen. Jetzt kostenloses Angebot für Ihre Büroflächen anfragen.',
    teaser: 'Saubere Arbeitsplätze für produktive Teams.',
    intro:
      'Ein gepflegtes Büro ist Visitenkarte und Arbeitsumfeld zugleich. Wir reinigen Ihre Büroflächen nach einem individuellen Plan – zuverlässig, diskret und außerhalb Ihrer Kernzeiten, wenn Sie das wünschen.',
    icon: Building2,
    image: {
      src: '/images/services/bueroreinigung.webp',
      alt: 'Modernes, helles Berliner Großraumbüro nach der Reinigung',
    },
    scope: [
      'Arbeitsplätze, Schreibtische und Ablageflächen',
      'Besprechungsräume und Empfangsbereiche',
      'Teeküchen und Sanitärräume',
      'Böden: Saugen, Wischen, Fleckentfernung',
      'Müllentsorgung und Nachfüllen von Verbrauchsmaterial',
      'Optional: Glasflächen, Fensterbänke, Innentüren',
    ],
    audience: [
      'Bürogebäude',
      'Coworking Spaces',
      'Agenturen',
      'Kanzleien',
      'Start-ups und Konzerne',
    ],
    highlights: [
      {
        title: 'Individueller Reinigungsplan',
        text: 'Wir erfassen Ihre Flächen und Anforderungen vor Ort und erstellen ein Leistungsverzeichnis, das genau passt.',
      },
      {
        title: 'Feste Teams, fester Ansprechpartner',
        text: 'Ihr Objekt wird von einem eingespielten Team betreut. Bei Fragen erreichen Sie immer dieselbe Person.',
      },
      {
        title: 'Reinigung außerhalb der Geschäftszeiten',
        text: 'Frühmorgens, abends oder am Wochenende – wir richten uns nach Ihrem Betrieb, nicht umgekehrt.',
      },
    ],
    faqs: [
      {
        question: 'Wie oft sollte ein Büro gereinigt werden?',
        answer:
          'Das hängt von Mitarbeiterzahl, Publikumsverkehr und Ausstattung ab. Üblich sind zwei bis fünf Reinigungen pro Woche; Sanitärräume und Küchen häufiger als Einzelbüros. Wir beraten Sie gern individuell.',
      },
      {
        question: 'Reinigen Sie auch außerhalb unserer Arbeitszeiten?',
        answer:
          'Ja. Die meisten unserer Bürokunden werden vor Arbeitsbeginn oder nach Feierabend gereinigt, damit Ihr Team nicht gestört wird.',
      },
    ],
  },
  {
    slug: 'unterhaltsreinigung',
    title: 'Unterhaltsreinigung',
    seoTitle: 'Unterhaltsreinigung Berlin – regelmäßig gepflegte Objekte',
    seoDescription:
      'Regelmäßige Unterhaltsreinigung in Berlin für Gewerbe, Praxen und Verwaltungen. Planbare Qualität, dokumentierte Kontrollen, ein fester Ansprechpartner. Angebot anfragen.',
    teaser: 'Regelmäßige Reinigung für dauerhaft gepflegte Räume.',
    intro:
      'Die Unterhaltsreinigung ist das Fundament eines gepflegten Objekts. In festen Intervallen halten wir Ihre Flächen dauerhaft auf dem vereinbarten Niveau – dokumentiert und mit regelmäßigen Qualitätskontrollen.',
    icon: RefreshCw,
    image: {
      src: '/images/services/unterhaltsreinigung.webp',
      alt: 'Reinigungskraft von JETCLEAN bei der täglichen Unterhaltsreinigung in einem Gewerbeobjekt',
    },
    scope: [
      'Tägliche bis wöchentliche Reinigungsintervalle',
      'Böden, Oberflächen, Sanitär- und Küchenbereiche',
      'Verkehrsflächen, Flure und Eingangsbereiche',
      'Abfallentsorgung und Verbrauchsmaterial',
      'Sichtkontrollen und Reinigungsdokumentation',
      'Optional: Zwischenreinigungen und Sonderleistungen',
    ],
    audience: ['Gewerbeobjekte', 'Verwaltungen', 'Praxen', 'Bildungseinrichtungen', 'Einzelhandel'],
    highlights: [
      {
        title: 'Planbare Qualität',
        text: 'Leistungsverzeichnis, Intervalle und Standards werden schriftlich festgelegt und regelmäßig geprüft.',
      },
      {
        title: 'Vertretung inklusive',
        text: 'Urlaub oder Krankheit im Team fangen wir auf – ohne dass Sie sich kümmern müssen.',
      },
      {
        title: 'Transparente Abrechnung',
        text: 'Feste Monatspauschalen ohne versteckte Kosten. Änderungen am Umfang jederzeit möglich.',
      },
    ],
    faqs: [
      {
        question: 'Was ist der Unterschied zwischen Unterhalts- und Grundreinigung?',
        answer:
          'Die Unterhaltsreinigung erhält den Sauberkeitszustand in regelmäßigen Intervallen. Die Grundreinigung ist eine intensive, seltenere Tiefenreinigung, die hartnäckige Verschmutzungen und Beläge entfernt.',
      },
    ],
  },
  {
    slug: 'glasreinigung',
    title: 'Glasreinigung',
    seoTitle: 'Glasreinigung Berlin – Fenster, Fassaden & Glasflächen',
    seoDescription:
      'Professionelle Glas- und Fensterreinigung in Berlin: streifenfreie Ergebnisse für Büros, Ladenlokale und Glasfassaden. Innen und außen. Jetzt Angebot anfragen.',
    teaser: 'Klare Sicht. Starker Eindruck.',
    intro:
      'Saubere Glasflächen prägen den ersten Eindruck Ihres Gebäudes. Wir reinigen Fenster, Glastüren, Trennwände und Fassadenelemente – innen wie außen, streifenfrei und mit dem passenden Equipment für jede Höhe.',
    icon: Sparkles,
    image: {
      src: '/images/services/glasreinigung.webp',
      alt: 'Glasreinigung einer großen Fensterfront mit Blick auf die Berliner Skyline',
    },
    scope: [
      'Fenster und Fensterrahmen innen und außen',
      'Glastüren, Glastrennwände und Vitrinen',
      'Schaufenster und Ladenfronten',
      'Glasfassaden und Wintergärten',
      'Reinigung mit Teleskop- und Reinwassersystemen',
      'Optional: Rahmen-, Jalousien- und Fensterbankreinigung',
    ],
    audience: ['Büros', 'Einzelhandel', 'Showrooms', 'Hausverwaltungen', 'Gastronomie'],
    highlights: [
      {
        title: 'Streifenfrei durch Reinwasser',
        text: 'Für Außenflächen setzen wir entmineralisiertes Wasser ein – ohne Rückstände, ohne Chemie.',
      },
      {
        title: 'Sicher in der Höhe',
        text: 'Teleskopsysteme bis zu mehreren Etagen, bei Bedarf Hubarbeitsbühne – immer mit geschultem Personal.',
      },
      {
        title: 'Feste Intervalle',
        text: 'Monatlich, quartalsweise oder nach Bedarf – wir erinnern Sie rechtzeitig an den nächsten Termin.',
      },
    ],
    faqs: [
      {
        question: 'Wie oft sollten Glasflächen gereinigt werden?',
        answer:
          'Für repräsentative Fronten empfehlen wir eine monatliche bis quartalsweise Außenreinigung. Innenflächen werden meist im Rahmen der Unterhaltsreinigung mit erledigt.',
      },
    ],
  },
  {
    slug: 'treppenhausreinigung',
    title: 'Treppenhausreinigung',
    seoTitle: 'Treppenhausreinigung Berlin für Hausverwaltungen & Eigentümer',
    seoDescription:
      'Treppenhausreinigung in Berlin für Hausverwaltungen, WEGs und Eigentümer: regelmäßig, zuverlässig und mit festem Ansprechpartner. Kostenloses Angebot anfragen.',
    teaser: 'Gepflegte Eingänge. Zufriedene Mieter.',
    intro:
      'Ein sauberes Treppenhaus ist für Mieter und Besucher das Erste, was sie von Ihrer Immobilie sehen. Wir betreuen Wohn- und Geschäftshäuser in festen Rhythmen – zuverlässig, dokumentiert und mit einem Ansprechpartner für Ihre Verwaltung.',
    icon: Footprints,
    image: {
      src: '/images/services/treppenhausreinigung.webp',
      alt: 'Gepflegtes, helles Treppenhaus eines Berliner Altbaus nach der Reinigung',
    },
    scope: [
      'Treppen, Podeste und Handläufe',
      'Eingangsbereiche, Fußmatten und Hauseingangstüren',
      'Briefkastenanlagen, Klingeltableaus und Lichtschalter',
      'Fenster und Glasflächen im Treppenhaus',
      'Keller- und Müllstandflächen nach Vereinbarung',
      'Optional: Winterdienst und Außenanlagen über Partner',
    ],
    audience: [
      'Hausverwaltungen',
      'Wohnungseigentümergemeinschaften',
      'Immobilienunternehmen',
      'Genossenschaften',
    ],
    highlights: [
      {
        title: 'Ein Partner für viele Objekte',
        text: 'Wir betreuen ganze Bestände – mit einheitlichen Standards und einer zentralen Abrechnung.',
      },
      {
        title: 'Nachvollziehbare Leistung',
        text: 'Reinigungsnachweise im Objekt und auf Wunsch digitale Berichte für Ihre Verwaltung.',
      },
      {
        title: 'Schnelle Reaktion',
        text: 'Verschmutzung nach Umzug oder Handwerkereinsatz? Wir kümmern uns kurzfristig.',
      },
    ],
    faqs: [
      {
        question: 'Bieten Sie auch Rahmenverträge für mehrere Häuser an?',
        answer:
          'Ja. Für Hausverwaltungen und Eigentümer mit mehreren Objekten erstellen wir ein zentrales Angebot mit einheitlichen Konditionen und einem festen Ansprechpartner.',
      },
    ],
  },
  {
    slug: 'grundreinigung',
    title: 'Grundreinigung',
    seoTitle: 'Grundreinigung Berlin – intensive Tiefenreinigung für Gewerbe',
    seoDescription:
      'Grundreinigung in Berlin: intensive Tiefenreinigung von Böden, Oberflächen und Sanitärbereichen – nach Umbau, vor Einzug oder als Frischekur. Jetzt Angebot anfragen.',
    teaser: 'Einmal gründlich. Wieder wie neu.',
    intro:
      'Manche Verschmutzungen erreicht keine Unterhaltsreinigung. Unsere Grundreinigung entfernt hartnäckige Beläge, alte Pflegefilme und Ablagerungen – ideal vor Einzug, nach Umbauten oder als jährliche Frischekur für Ihr Objekt.',
    icon: Layers,
    image: {
      src: '/images/services/grundreinigung.webp',
      alt: 'Maschinelle Grundreinigung eines Hartbodens in einem Berliner Gewerbeobjekt',
    },
    scope: [
      'Maschinelle Bodenreinigung inklusive Einpflege',
      'Entfernen alter Pflegefilme und Beläge',
      'Intensivreinigung von Sanitär- und Küchenbereichen',
      'Reinigung von Heizkörpern, Türen, Leisten und Lichtschaltern',
      'Fenster- und Rahmenreinigung',
      'Bauendreinigung nach Umbau oder Renovierung',
    ],
    audience: [
      'Gewerbeobjekte',
      'Büros vor Einzug oder Auszug',
      'Praxen',
      'Hausverwaltungen',
      'Bauträger',
    ],
    highlights: [
      {
        title: 'Materialgerechte Verfahren',
        text: 'Ob Naturstein, Linoleum, Parkett oder Teppich – wir wählen Maschinen und Mittel passend zum Belag.',
      },
      {
        title: 'Termingerecht abgeschlossen',
        text: 'Feste Zeitfenster, klare Absprachen – auch am Wochenende, wenn Ihr Betrieb weiterlaufen muss.',
      },
      {
        title: 'Kombinierbar mit Unterhaltsreinigung',
        text: 'Viele Kunden starten mit einer Grundreinigung und sichern das Ergebnis mit regelmäßiger Pflege.',
      },
    ],
    faqs: [
      {
        question: 'Wie lange dauert eine Grundreinigung?',
        answer:
          'Je nach Fläche und Verschmutzung zwischen wenigen Stunden und mehreren Tagen. Nach einer Besichtigung nennen wir Ihnen einen verbindlichen Zeitrahmen.',
      },
    ],
  },
  {
    slug: 'sonderreinigung',
    title: 'Sonderreinigung',
    seoTitle: 'Sonderreinigung Berlin – individuelle Lösungen für besondere Anforderungen',
    seoDescription:
      'Sonderreinigung in Berlin: Bauendreinigung, Reinigung nach Veranstaltungen, Desinfektion, Fassaden und Sonderflächen. Individuell geplant, professionell umgesetzt.',
    teaser: 'Individuelle Lösungen für besondere Anforderungen.',
    intro:
      'Nicht jede Aufgabe passt in einen Standard-Reinigungsplan. Für besondere Anforderungen – von der Bauendreinigung bis zur Reinigung nach Veranstaltungen – planen wir eine individuelle Lösung mit dem passenden Team und Equipment.',
    icon: Wrench,
    image: {
      src: '/images/services/sonderreinigung.webp',
      alt: 'Individuelle Sonderreinigung in einem repräsentativen Berliner Gebäude',
    },
    scope: [
      'Bauend- und Bauzwischenreinigung',
      'Reinigung nach Veranstaltungen und Messen',
      'Desinfektionsreinigung sensibler Bereiche',
      'Fassaden-, Graffiti- und Außenflächenreinigung',
      'Tiefgaragen- und Industrieflächen',
      'Entrümpelung und Reinigung bei Nutzerwechsel',
    ],
    audience: [
      'Bauträger und Generalunternehmer',
      'Eventlocations',
      'Praxen und Labore',
      'Industrie',
      'Hausverwaltungen',
    ],
    highlights: [
      {
        title: 'Persönliche Planung',
        text: 'Jede Sonderreinigung beginnt mit einer Besichtigung und einem Konzept, das zu Ihrem Objekt passt.',
      },
      {
        title: 'Passendes Equipment',
        text: 'Von der Scheuersaugmaschine bis zum Hochdruckreiniger – wir bringen mit, was die Aufgabe braucht.',
      },
      {
        title: 'Kurzfristig einsatzbereit',
        text: 'Auch bei engen Zeitplänen finden wir ein Team, das Ihre Aufgabe termingerecht übernimmt.',
      },
    ],
    faqs: [
      {
        question: 'Können Sie kurzfristig einen Sondereinsatz übernehmen?',
        answer:
          'In vielen Fällen ja. Rufen Sie uns an oder schildern Sie Ihre Anforderung über das Formular – wir melden uns schnellstmöglich mit einem Vorschlag.',
      },
    ],
  },
];

export const getServiceBySlug = (slug: string): Service | undefined =>
  services.find((service) => service.slug === slug);

/** Auswahloptionen im Angebotsformular (Schritt 1) */
export const quoteServiceOptions = [
  { value: 'buero', label: 'Büro' },
  { value: 'praxis', label: 'Praxis' },
  { value: 'gewerbe', label: 'Gewerbe' },
  { value: 'treppenhaus', label: 'Treppenhaus' },
  { value: 'glasflaechen', label: 'Glasflächen' },
  { value: 'grundreinigung', label: 'Grundreinigung' },
  { value: 'sonstiges', label: 'Sonstiges' },
] as const;

export const quoteAreaOptions = [
  { value: 'lt_250', label: 'unter 250 m²' },
  { value: '250_500', label: '250 – 500 m²' },
  { value: '500_1000', label: '500 – 1.000 m²' },
  { value: '1000_2500', label: '1.000 – 2.500 m²' },
  { value: 'gt_2500', label: 'über 2.500 m²' },
  { value: 'unknown', label: 'Noch unbekannt' },
] as const;

export const quoteFrequencyOptions = [
  { value: 'daily', label: 'Täglich' },
  { value: 'several_weekly', label: 'Mehrmals pro Woche' },
  { value: 'weekly', label: 'Wöchentlich' },
  { value: 'monthly', label: 'Monatlich' },
  { value: 'once', label: 'Einmalig' },
  { value: 'unclear', label: 'Noch unklar' },
] as const;

/**
 * Weitere Leistungen der bisherigen Website (ohne eigene Unterseite).
 * Werden auf der Leistungsübersicht als Liste gezeigt und im Formular unter „Sonstiges“ angefragt.
 */
export const additionalServices = [
  'Bauendreinigung nach Bauarbeiten',
  'Praxisreinigung (medizinische & kosmetische Einrichtungen)',
  'Schul- & Kita-Reinigung',
  'Hotel- & Ferienwohnungsreinigung',
  'Gastronomie-Reinigung',
  'Hausmeisterservice',
  'Winterdienst',
  'Teppichreinigung',
  'Fassadenreinigung',
  'Industriereinigung',
] as const;
