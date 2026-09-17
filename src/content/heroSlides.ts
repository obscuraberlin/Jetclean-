/**
 * Slides für den Hero-Slider (Startseite). Bild, Eyebrow, dreizeilige Headline
 * (mittlere Zeile orange) und Subline wechseln gemeinsam.
 */
export type HeroSlide = {
  id: string;
  image: { src: string; position: string };
  eyebrow: string;
  /** Drei kurze Zeilen – die mittlere wird farblich hervorgehoben */
  lines: [string, string, string];
  text: string;
  /** Kurzbezeichnung für Punkte/Chips */
  label: string;
};

export const heroSlides: HeroSlide[] = [
  {
    id: 'facility',
    image: { src: '/images/hero/office.webp', position: '65% center' },
    eyebrow: 'JETCLEAN Facility Services',
    lines: ['Sauberkeit.', 'Werterhalt.', 'Wohlbefinden.'],
    text: 'Professionelle Reinigungs- und Facility-Services für Unternehmen, Immobilien und öffentliche Einrichtungen in Berlin.',
    label: 'Facility Services',
  },
  {
    id: 'glas',
    image: { src: '/images/services/glasreinigung.webp', position: '40% center' },
    eyebrow: 'Glas- & Fassadenreinigung',
    lines: ['Klare Sicht.', 'Streifenfrei.', 'Termingerecht.'],
    text: 'Glasflächen, Fassaden und Schaufenster – streifenfrei gereinigt, auch in großer Höhe und außerhalb Ihrer Geschäftszeiten.',
    label: 'Glasreinigung',
  },
  {
    id: 'unterhalt',
    image: { src: '/images/services/unterhaltsreinigung.webp', position: '60% center' },
    eyebrow: 'Unterhaltsreinigung',
    lines: ['Feste Teams.', 'Verlässlich.', 'Jede Woche.'],
    text: 'Büro, Praxis, Gewerbe und Treppenhaus – zuverlässig gereinigt nach festem Plan, mit dokumentierter Qualität.',
    label: 'Unterhaltsreinigung',
  },
];

/** Wechselintervall in Millisekunden */
export const heroSlideInterval = 6000;
