/**
 * Globale Website-Konfiguration (keine Secrets!).
 */
export const siteConfig = {
  /** Wird aus ENV gelesen, Fallback für lokale Entwicklung. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, ''),
  locale: 'de_DE',
  language: 'de',

  seo: {
    /** Title-Template für Unterseiten. */
    titleTemplate: '%s | JETCLEAN Gebäudeservice Berlin',
    defaultTitle: 'Gebäudereinigung Berlin für Unternehmen | JETCLEAN Gebäudeservice GmbH',
    defaultDescription:
      'Professionelle Gebäudereinigung in Berlin für Büros, Praxen, Gewerbe und Hausverwaltungen. Fester Ansprechpartner, geschulte Teams, Qualitätskontrollen. Jetzt kostenloses Angebot anfragen.',
    /**
     * FAQPage Structured Data ist seit 2023 nur noch für wenige Website-Typen
     * (Behörden, Gesundheit) für Rich Results relevant. Standardmäßig deaktiviert.
     */
    enableFaqSchema: false,
  },

  quote: {
    /**
     * Zugesagte Reaktionszeit im Formular / Success-State.
     * `null` = keine konkrete Zusage anzeigen. Nur einen Wert eintragen, der eingehalten wird.
     */
    responseTimePromise: 'innerhalb eines Werktags' as string | null,
    /** Ungefähre Dauer, die im Formular-Header angezeigt wird. */
    durationHint: 'Dauert ca. 60 Sekunden',
    /** Mindestzeit (ms) zwischen Öffnen und Absenden des Formulars – einfacher Bot-Schutz. */
    minFillTimeMs: 3000,
  },

  /**
   * Unternehmensfilm (YouTube). Wird DSGVO-konform erst nach Klick geladen
   * (youtube-nocookie.com, Vorschaubild liegt lokal). `null` blendet die Sektion aus.
   */
  video: {
    youtubeId: 'a72hnfxB54M',
    title: 'Jetclean Berlin – Gebäudereinigung',
    /** Länge nur angeben, wenn bekannt */
    duration: null as string | null,
  } as { youtubeId: string; title: string; duration: string | null } | null,

  /**
   * Öffentliche Bewertungen (aus einem Bewertungsportal). Regelmäßig aktualisieren –
   * `null` blendet den Hinweis aus. Wird bewusst NICHT als AggregateRating in Schema.org ausgegeben.
   */
  reviews: {
    rating: 5.0,
    count: 32,
    platform: 'golocal',
    url: 'https://www.golocal.de/berlin/gebaeudereinigung/jetclean-gebaeudeservice-3JKK8/',
    checkedAt: 'September 2026',
  } as {
    rating: number;
    count: number;
    platform: string;
    url: string;
    checkedAt: string;
  } | null,

  /**
   * Placeholder-Hinweise sichtbar rendern (z. B. „Beispielinhalt“ bei nicht verifizierten
   * Testimonials/Logos). Sollte bis zum Austausch der Inhalte auf `true` bleiben.
   */
  showPlaceholderBadges: false,
} as const;
