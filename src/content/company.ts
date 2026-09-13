/**
 * Zentrale Unternehmensdaten (NAP: Name, Adresse, Telefon).
 *
 * ACHTUNG – PLATZHALTER:
 * Alle mit `PLACEHOLDER` markierten Werte stammen aus der Design-Vorlage und sind
 * NICHT verifiziert. Vor dem Livegang müssen sie durch die echten Unternehmensdaten
 * ersetzt werden. Diese Datei ist die einzige Quelle für NAP-Daten – sie wird im
 * Header, Footer, auf der Kontaktseite, im Impressum und in den Schema.org-Daten
 * verwendet, damit die Angaben überall konsistent sind (Local SEO).
 */

export const company = {
  name: 'JETCLEAN Gebäudeservice GmbH',
  shortName: 'JETCLEAN',
  legalForm: 'GmbH',
  claim: 'Sauber. Berlin. Stärker.',
  tagline: 'Saubere Räume. Produktive Teams. Stärkere Unternehmen.',

  /** Jahre am Markt – wird in Hero, Vorteilen und Über-uns verwendet. */
  yearsOfExperience: 23,

  contact: {
    /** PLACEHOLDER – echte Telefonnummer eintragen (Anzeigeformat). */
    phoneDisplay: '030 123 456 78',
    /** PLACEHOLDER – gleiche Nummer im internationalen Format für tel:-Links und Schema.org. */
    phoneE164: '+493012345678',
    /** PLACEHOLDER – echte E-Mail-Adresse eintragen. */
    email: 'info@jetclean-berlin.de',
  },

  address: {
    /** PLACEHOLDER – echte Straße und Hausnummer eintragen. */
    street: 'Kurfürstendamm 123',
    /** PLACEHOLDER */
    postalCode: '10711',
    city: 'Berlin',
    region: 'Berlin',
    country: 'DE',
    countryName: 'Deutschland',
  },

  /**
   * Geschäftszeiten für telefonische Erreichbarkeit.
   * PLACEHOLDER – nur eintragen, wenn die Zeiten wirklich stimmen. `null` blendet sie überall aus.
   */
  openingHours: {
    display: 'Mo – Fr, 7:00 – 18:00 Uhr',
    /** Schema.org OpeningHoursSpecification */
    schema: [
      {
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '18:00',
      },
    ],
  } as {
    display: string;
    schema: { dayOfWeek: string[]; opens: string; closes: string }[];
  } | null,

  /** Bediente Region – wird in Copy und Schema.org (areaServed) verwendet. */
  serviceArea: {
    label: 'Berlin und Umland',
    schemaAreas: ['Berlin', 'Potsdam', 'Brandenburg'],
  },

  /**
   * Social-Media-Profile. Nur eintragen, wenn die Profile tatsächlich existieren –
   * leere Liste blendet die Icons im Footer aus.
   */
  social: [] as { platform: 'linkedin' | 'instagram' | 'youtube' | 'xing'; url: string }[],

  /**
   * Impressumsangaben – PLACEHOLDER. Müssen vor Livegang vollständig und
   * rechtlich geprüft eingetragen werden (§ 5 DDG).
   */
  legal: {
    managingDirector: 'Vorname Nachname (PLACEHOLDER)',
    registerCourt: 'Amtsgericht Charlottenburg (PLACEHOLDER)',
    registerNumber: 'HRB 000000 B (PLACEHOLDER)',
    vatId: 'DE000000000 (PLACEHOLDER)',
    /** true setzen, sobald Impressum & Datenschutz juristisch geprüft wurden. Blendet den Hinweis aus. */
    reviewed: false,
  },
} as const;

export type Company = typeof company;

/** Vollständige Adresse in einer Zeile, z. B. für Footer und Kontaktseite. */
export const fullAddress = `${company.address.street}, ${company.address.postalCode} ${company.address.city}`;
