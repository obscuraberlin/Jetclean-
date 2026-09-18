/**
 * Ratgeber-Beiträge für Startseite und /ratgeber. Fachliche Hinweise ohne Zahlenversprechen –
 * Inhalte vor dem Livegang vom Unternehmen prüfen lassen.
 */
export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO-Datum (YYYY-MM-DD) */
  date: string;
  readingMinutes: number;
  category: string;
  image: { src: string; alt: string };
  /** Abschnitte: Zwischenüberschrift + Absätze; Listen als Array von Strings */
  sections: { heading?: string; paragraphs?: string[]; list?: string[] }[];
};

export const posts: Post[] = [
  {
    slug: 'wie-oft-bueroreinigung',
    title: 'Wie oft sollte ein Büro gereinigt werden?',
    excerpt:
      'Täglich, zweimal pro Woche oder wöchentlich? Woran Sie den richtigen Rhythmus für Ihr Büro erkennen – und was dabei oft vergessen wird.',
    date: '2026-09-10',
    readingMinutes: 4,
    category: 'Büroreinigung',
    image: { src: '/images/services/bueroreinigung.webp', alt: 'Modernes Büro mit sauberen Arbeitsplätzen' },
    sections: [
      {
        paragraphs: [
          'Die passende Reinigungsfrequenz hängt weniger von der Bürogröße ab als von der Nutzung: Wie viele Menschen arbeiten täglich vor Ort, gibt es Kundenverkehr, wird gemeinsam gegessen? Diese Fragen entscheiden, welche Bereiche wie oft gereinigt werden sollten.',
        ],
      },
      {
        heading: 'Bereiche mit hoher Nutzung',
        paragraphs: [
          'Sanitärräume, Teeküchen und Empfangsbereiche werden am stärksten beansprucht. Hier empfiehlt sich in den meisten Büros eine tägliche Reinigung an Arbeitstagen – unabhängig davon, wie oft der Rest des Büros gereinigt wird.',
        ],
      },
      {
        heading: 'Arbeitsplätze und Besprechungsräume',
        paragraphs: [
          'Schreibtische, Böden und Besprechungsräume kommen in vielen Unternehmen mit zwei bis drei Reinigungen pro Woche aus. Bei Desk-Sharing oder vielen Meetings mit Gästen lohnt sich ein engerer Rhythmus.',
        ],
      },
      {
        heading: 'Was häufig vergessen wird',
        list: [
          'Glasflächen und Trennwände: sichtbare Fingerabdrücke wirken schnell ungepflegt.',
          'Türklinken, Lichtschalter und Handläufe: Kontaktflächen gehören in jede Unterhaltsreinigung.',
          'Grundreinigung: ein- bis zweimal im Jahr Böden, Polster und schwer erreichbare Stellen gründlich reinigen.',
        ],
      },
      {
        heading: 'Unser Tipp',
        paragraphs: [
          'Lassen Sie den Rhythmus bei einer Besichtigung festlegen, nicht am Telefon. Ein guter Reinigungsplan unterscheidet nach Bereichen – so zahlen Sie nur für das, was wirklich nötig ist.',
        ],
      },
    ],
  },
  {
    slug: 'checkliste-reinigungsvertrag',
    title: 'Checkliste: Worauf Sie bei einem Reinigungsvertrag achten sollten',
    excerpt:
      'Leistungsverzeichnis, Vertretung, Kündigungsfristen – die wichtigsten Punkte, damit die Zusammenarbeit mit Ihrem Reinigungsdienstleister klar geregelt ist.',
    date: '2026-08-27',
    readingMinutes: 5,
    category: 'Zusammenarbeit',
    image: { src: '/images/cases/office.webp', alt: 'Besprechungsraum in einem Berliner Bürogebäude' },
    sections: [
      {
        paragraphs: [
          'Ein Reinigungsvertrag ist mehr als ein Preis pro Monat. Er legt fest, was wann in welcher Qualität gereinigt wird – und was passiert, wenn etwas nicht stimmt. Diese Punkte sollten geklärt sein, bevor Sie unterschreiben.',
        ],
      },
      {
        heading: 'Das Leistungsverzeichnis',
        list: [
          'Welche Räume und Flächen sind enthalten – und welche ausdrücklich nicht?',
          'Wie oft wird jede Leistung erbracht (täglich, wöchentlich, monatlich)?',
          'Sind Verbrauchsmaterialien wie Seife, Papierhandtücher und Müllbeutel enthalten?',
        ],
      },
      {
        heading: 'Personal und Vertretung',
        list: [
          'Arbeitet ein festes Team in Ihrem Objekt?',
          'Wie wird Vertretung bei Urlaub und Krankheit organisiert?',
          'Gibt es einen festen Ansprechpartner für Rückfragen und Reklamationen?',
        ],
      },
      {
        heading: 'Qualität und Kontrolle',
        list: [
          'Wie wird die Reinigungsqualität dokumentiert (Checklisten, Objektbegehungen)?',
          'Wie schnell wird auf Beanstandungen reagiert?',
        ],
      },
      {
        heading: 'Vertragliches',
        list: [
          'Laufzeit, Kündigungsfrist und Regelungen für Preisanpassungen',
          'Versicherungsschutz des Dienstleisters (Betriebshaftpflicht)',
          'Regelungen zu Schlüsseln, Alarmanlagen und Zutritt außerhalb der Geschäftszeiten',
        ],
      },
      {
        heading: 'Unser Tipp',
        paragraphs: [
          'Ein transparentes Angebot beantwortet diese Fragen von selbst. Fehlt ein Punkt, fragen Sie nach – seriöse Anbieter ergänzen ihn gern schriftlich.',
        ],
      },
    ],
  },
  {
    slug: 'glasreinigung-intervalle',
    title: 'Glasreinigung: Welche Intervalle sind sinnvoll?',
    excerpt:
      'Schaufenster, Bürofassade oder Treppenhausfenster – warum das passende Intervall vom Standort abhängt und wie Sie streifenfreie Ergebnisse erkennen.',
    date: '2026-08-12',
    readingMinutes: 3,
    category: 'Glasreinigung',
    image: { src: '/images/services/glasreinigung.webp', alt: 'Reinigungskraft reinigt eine große Glasfläche' },
    sections: [
      {
        paragraphs: [
          'Saubere Glasflächen prägen den ersten Eindruck eines Gebäudes – innen wie außen. Wie oft sie gereinigt werden sollten, hängt vor allem von Lage, Verkehr und Wetter ab.',
        ],
      },
      {
        heading: 'Anhaltspunkte für das Intervall',
        list: [
          'Schaufenster und Eingangsbereiche an belebten Straßen: häufig, meist alle zwei bis vier Wochen.',
          'Bürofassaden und Innenverglasung: je nach Lage und Anspruch alle ein bis drei Monate.',
          'Treppenhaus- und Wohnhausfenster: oft ausreichend zwei- bis viermal im Jahr.',
        ],
      },
      {
        heading: 'Woran Sie gute Arbeit erkennen',
        paragraphs: [
          'Streifenfreie Flächen ohne Ränder, saubere Rahmen und Fensterbänke sowie trockene Böden nach der Arbeit. Bei Reinigung mit entmineralisiertem Reinwasser trocknen Scheiben rückstandsfrei – ideal für große Außenflächen.',
        ],
      },
      {
        heading: 'Sicherheit in der Höhe',
        paragraphs: [
          'Ab einer gewissen Höhe braucht es Teleskopsysteme, Hubarbeitsbühnen oder gesicherte Zugänge. Fragen Sie, wie Ihr Dienstleister die Arbeiten absichert – das gehört in jedes Angebot.',
        ],
      },
    ],
  },
];

export const postsSorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function formatPostDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('de-DE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
