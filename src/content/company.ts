/**
 * Zentrale Unternehmensdaten (NAP: Name, Adresse, Telefon).
 *
 * HINWEIS ZU DEN DATEN:
 * Adresse, Telefon und Registerdaten wurden aus öffentlichen Quellen übernommen
 * (Handelsregister-Auskunft, Branchenverzeichnisse, Stand 09/2026) und mit `PUBLIC_SOURCE`
 * markiert. Sie sind plausibel, aber vom Unternehmen zu bestätigen. Mit `PLACEHOLDER`
 * markierte Werte sind weiterhin nicht verifiziert und vor dem Livegang zu ersetzen. Diese Datei ist die einzige Quelle für NAP-Daten – sie wird im
 * Header, Footer, auf der Kontaktseite, im Impressum und in den Schema.org-Daten
 * verwendet, damit die Angaben überall konsistent sind (Local SEO).
 */

export const company = {
  name: 'JETCLEAN Gebäudeservice GmbH',
  shortName: 'JETCLEAN',
  legalForm: 'GmbH',
  claim: 'Sauber. Berlin. Stärker.',
  tagline: 'Saubere Räume. Produktive Teams. Stärkere Unternehmen.',
  /** Motto der bisherigen Website */
  motto: 'Hauptsache sauber – wir sorgen für Sauberkeit in Berlin.',
  /** Hashtag aus den Social-Media-Kanälen */
  hashtag: '#WeCleanBerlin',

  /** Jahre am Markt – wird in Hero, Vorteilen und Über-uns verwendet. */
  yearsOfExperience: 23,

  contact: {
    /** PUBLIC_SOURCE – Festnetznummer laut Branchenverzeichnissen (Anzeigeformat). */
    phoneDisplay: '030 805 764 26',
    /** PUBLIC_SOURCE – gleiche Nummer im internationalen Format für tel:-Links und Schema.org. */
    phoneE164: '+493080576426',
    /** PLACEHOLDER – echte E-Mail-Adresse eintragen. */
    email: 'info@jetclean-berlin.de',
    /**
     * WhatsApp-Nummer im internationalen Format ohne '+' (für wa.me).
     * PUBLIC_SOURCE – Mobilnummer laut Branchenverzeichnis, bitte bestätigen. `null` blendet WhatsApp aus.
     */
    whatsapp: '4917664077706' as string | null,
  },

  address: {
    /** PUBLIC_SOURCE – Firmensitz laut Handelsregister-Auskunft (Berlin-Neukölln). */
    street: 'Jonasstraße 69',
    /** PUBLIC_SOURCE */
    postalCode: '12053',
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
  social: [
    { platform: 'facebook', url: 'https://www.facebook.com/jetclean.gebaeudereinigung' },
    { platform: 'tiktok', url: 'https://www.tiktok.com/@jetcleanberlin' },
  ] as {
    platform: 'linkedin' | 'instagram' | 'youtube' | 'xing' | 'facebook' | 'tiktok';
    url: string;
  }[],

  /**
   * Impressumsangaben – PLACEHOLDER. Müssen vor Livegang vollständig und
   * rechtlich geprüft eingetragen werden (§ 5 DDG).
   */
  legal: {
    /** PUBLIC_SOURCE – laut Handelsregister-Auskunft, bitte bestätigen. */
    managingDirector: 'Hüseyin Dahan',
    registerCourt: 'Amtsgericht Charlottenburg (Berlin)',
    registerNumber: 'HRB 223047 B',
    vatId: 'DE000000000 (PLACEHOLDER)',
    /** true setzen, sobald Impressum & Datenschutz juristisch geprüft wurden. Blendet den Hinweis aus. */
    reviewed: false,
  },
} as const;

export type Company = typeof company;

/** Vollständige Adresse in einer Zeile, z. B. für Footer und Kontaktseite. */
export const fullAddress = `${company.address.street}, ${company.address.postalCode} ${company.address.city}`;
