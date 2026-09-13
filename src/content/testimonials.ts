/**
 * Kundenstimmen.
 *
 * WICHTIG: Die unten stehenden Einträge sind PLATZHALTER aus der Design-Vorlage und
 * stammen NICHT von echten Kunden. Solange `isPlaceholder: true` gesetzt ist, wird im
 * Frontend ein „Beispiel“-Hinweis gerendert. Vor Livegang durch echte, freigegebene
 * Kundenstimmen ersetzen (inkl. schriftlicher Einwilligung zur Veröffentlichung).
 */
export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  /** 1–5 */
  rating: number;
  /** Optionales Foto (z. B. /images/testimonials/name.webp). Ohne Foto werden Initialen gezeigt. */
  avatar?: string;
  isPlaceholder: boolean;
};

export const testimonials: Testimonial[] = [
  {
    id: 'placeholder-1',
    quote:
      'Seit Jahren ein zuverlässiger Partner für unsere Gebäudereinigung in Berlin. Absolute Empfehlung.',
    name: 'Thomas K.',
    role: 'Geschäftsführer',
    company: 'IT-Unternehmen',
    rating: 5,
    avatar: '/images/testimonials/thomas.webp',
    isPlaceholder: true,
  },
  {
    id: 'placeholder-2',
    quote:
      'Professionell, flexibel und immer freundlich. Unsere Büroreinigung läuft dank JETCLEAN reibungslos.',
    name: 'Sabine L.',
    role: 'Facility Managerin',
    company: 'Immobilienverwaltung',
    rating: 5,
    avatar: '/images/testimonials/sabine.webp',
    isPlaceholder: true,
  },
  {
    id: 'placeholder-3',
    quote:
      'Die Qualität der Gebäudereinigung ist hervorragend. Unser Gebäude war noch nie so gepflegt.',
    name: 'Markus B.',
    role: 'Leitung Immobilienmanagement',
    company: 'Wohnungsunternehmen',
    rating: 5,
    avatar: '/images/testimonials/markus.webp',
    isPlaceholder: true,
  },
];
