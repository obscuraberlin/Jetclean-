/**
 * Kundenlogos und Referenz-Cases.
 *
 * WICHTIG: Sämtliche Einträge mit `isPlaceholder: true` sind Beispielinhalte aus der
 * Design-Vorlage. Marken dürfen nur dann als Referenz gezeigt werden, wenn eine
 * tatsächliche Geschäftsbeziehung UND eine Freigabe zur Logo-Nutzung vorliegen.
 * Solange Platzhalter aktiv sind, rendert das Frontend einen sichtbaren Hinweis.
 */

export type ClientLogo = {
  name: string;
  /** Pfad zum Logo (SVG/PNG) unter /public/images/logos. Ohne `src` wird ein neutraler Schriftzug gerendert. */
  src?: string;
  isPlaceholder: boolean;
};

export const clientLogos: ClientLogo[] = [
  { name: 'Musterkunde Automotive', isPlaceholder: true },
  { name: 'Klinikum Beispiel', isPlaceholder: true },
  { name: 'Beispiel Bahn', isPlaceholder: true },
  { name: 'Fashion E-Commerce', isPlaceholder: true },
  { name: 'Technologiekonzern', isPlaceholder: true },
  { name: 'Volksbank Muster', isPlaceholder: true },
  { name: 'Pharma Beispiel', isPlaceholder: true },
];

export const logoStripHeadline = 'Reinigungspartner für Unternehmen und Institutionen in Berlin.';

export type CaseStudy = {
  id: string;
  industry: string;
  title: string;
  challenge: string;
  solution: string;
  /** Ergebnis – KEINE erfundenen Kennzahlen. Qualitativ formulieren, bis echte Daten vorliegen. */
  result: string;
  image: { src: string; alt: string };
  services: string[];
  isPlaceholder: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    id: 'placeholder-office',
    industry: 'Bürogebäude',
    title: 'Mehrgeschossiges Bürogebäude in Berlin-Mitte',
    challenge:
      'Wechselnde Reinigungskräfte, unklare Zuständigkeiten und Beschwerden der Mieter über Sanitärbereiche und Teeküchen.',
    solution:
      'Festes Objektteam mit Objektleitung, überarbeitetes Leistungsverzeichnis mit klaren Intervallen und wöchentliche Sichtkontrollen mit Dokumentation.',
    result:
      'Verlässliche Reinigungsqualität, ein Ansprechpartner für die Hausverwaltung und deutlich weniger Rückfragen aus den Mieteinheiten.',
    image: { src: '/images/cases/office.webp', alt: 'Bürogebäude in Berlin-Mitte' },
    services: ['unterhaltsreinigung', 'glasreinigung'],
    isPlaceholder: true,
  },
  {
    id: 'placeholder-medical',
    industry: 'Praxis',
    title: 'Fachärztliche Gemeinschaftspraxis',
    challenge:
      'Hohe Hygieneanforderungen, enge Zeitfenster zwischen Sprechzeiten und sensibler Umgang mit Patientendaten.',
    solution:
      'Abgestimmter Hygieneplan, Reinigung ausschließlich außerhalb der Sprechzeiten durch ein festes, geschultes Zwei-Personen-Team.',
    result:
      'Ein Hygienestandard, auf den sich Praxisteam und Patienten verlassen können – ohne Störung des Praxisbetriebs.',
    image: { src: '/images/cases/medical.webp', alt: 'Moderne Arztpraxis in Berlin' },
    services: ['unterhaltsreinigung', 'grundreinigung'],
    isPlaceholder: true,
  },
  {
    id: 'placeholder-property',
    industry: 'Hausverwaltung',
    title: 'Wohnungsbestand mit mehreren Treppenhäusern',
    challenge:
      'Mehrere Dienstleister mit unterschiedlichen Standards, keine Nachweise im Objekt und aufwendige Abrechnung.',
    solution:
      'Zentraler Rahmenvertrag, einheitliche Reinigungsnachweise in jedem Treppenhaus und eine monatliche Sammelrechnung.',
    result:
      'Einheitliche Qualität im gesamten Bestand und spürbar weniger Verwaltungsaufwand für die Hausverwaltung.',
    image: { src: '/images/cases/property.webp', alt: 'Treppenhaus eines Berliner Wohnhauses' },
    services: ['treppenhausreinigung', 'glasreinigung'],
    isPlaceholder: true,
  },
];

export const beforeAfter = {
  headline: 'Der Unterschied ist sichtbar.',
  text: 'Professionelle Gebäudereinigung in Berlin sorgt für ein repräsentatives Arbeitsumfeld und einen spürbaren Mehrwert.',
  cta: 'Weitere Beispiele ansehen',
  before: { src: '/images/before-after/before.webp', alt: 'Konferenzraum vor der Reinigung' },
  after: {
    src: '/images/before-after/after.webp',
    alt: 'Konferenzraum nach der Reinigung durch JETCLEAN',
  },
};
