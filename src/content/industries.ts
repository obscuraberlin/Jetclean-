import type { LucideIcon } from 'lucide-react';
import {
  Briefcase,
  Stethoscope,
  Store,
  KeyRound,
  Building,
  Scale,
  Palette,
  Factory,
} from 'lucide-react';

export type Industry = {
  slug: string;
  title: string;
  teaser: string;
  description: string;
  icon: LucideIcon;
  /** Typische Anforderungen dieser Branche */
  needs: string[];
  /** Passende Leistungen (Slugs) */
  services: string[];
};

export const industries: Industry[] = [
  {
    slug: 'bueros',
    title: 'Büros & Unternehmen',
    teaser: 'Saubere Arbeitsplätze, die Ihr Team jeden Morgen gern betritt.',
    description:
      'Vom Start-up bis zum Konzernstandort: Wir halten Büroflächen jeder Größe dauerhaft gepflegt – diskret, außerhalb Ihrer Kernzeiten und mit einem Reinigungsplan, der zu Ihrer Arbeitsweise passt.',
    icon: Briefcase,
    needs: [
      'Reinigung außerhalb der Arbeitszeit',
      'Feste Teams mit Objektkenntnis',
      'Flexible Skalierung bei Wachstum',
    ],
    services: ['bueroreinigung', 'unterhaltsreinigung', 'glasreinigung'],
  },
  {
    slug: 'praxen',
    title: 'Praxen & Gesundheitswesen',
    teaser: 'Hygiene, auf die sich Patienten und Personal verlassen können.',
    description:
      'Arztpraxen, Therapiezentren und Labore stellen besondere Anforderungen an Hygiene und Diskretion. Unsere Teams sind für sensible Bereiche geschult und arbeiten nach abgestimmten Hygieneplänen.',
    icon: Stethoscope,
    needs: [
      'Hygienepläne und Desinfektion',
      'Geschultes, diskretes Personal',
      'Dokumentierte Reinigung',
    ],
    services: ['unterhaltsreinigung', 'grundreinigung', 'sonderreinigung'],
  },
  {
    slug: 'gewerbe',
    title: 'Gewerbe & Einzelhandel',
    teaser: 'Ein gepflegter Auftritt, der Kunden überzeugt.',
    description:
      'Ladenlokale, Showrooms und Gewerbeflächen leben vom ersten Eindruck. Wir sorgen für saubere Verkaufsflächen, streifenfreie Schaufenster und gepflegte Kundenbereiche – vor Ladenöffnung oder nach Ladenschluss.',
    icon: Store,
    needs: [
      'Reinigung vor Ladenöffnung',
      'Schaufenster und Glasfronten',
      'Hohe Frequenz an Verkehrsflächen',
    ],
    services: ['unterhaltsreinigung', 'glasreinigung', 'grundreinigung'],
  },
  {
    slug: 'hausverwaltungen',
    title: 'Hausverwaltungen & WEGs',
    teaser: 'Ein Partner für Ihren gesamten Bestand.',
    description:
      'Hausverwaltungen und Eigentümergemeinschaften brauchen einen Dienstleister, der viele Objekte zuverlässig und mit einheitlichen Standards betreut. Wir bieten zentrale Ansprechpartner, nachvollziehbare Leistung und eine übersichtliche Abrechnung.',
    icon: KeyRound,
    needs: [
      'Rahmenverträge für mehrere Objekte',
      'Reinigungsnachweise im Objekt',
      'Schnelle Reaktion bei Sonderfällen',
    ],
    services: ['treppenhausreinigung', 'glasreinigung', 'sonderreinigung'],
  },
  {
    slug: 'immobilien',
    title: 'Immobilien & Facility Management',
    teaser: 'Werterhalt durch professionelle Gebäudepflege.',
    description:
      'Für Immobilienunternehmen und Facility Manager sind wir der operative Partner vor Ort: Unterhaltsreinigung, Glasreinigung, Grundreinigung bei Nutzerwechsel – abgestimmt auf Ihre Prozesse und Reportinganforderungen.',
    icon: Building,
    needs: ['Integration in FM-Prozesse', 'Reporting und Dokumentation', 'Skalierbare Kapazitäten'],
    services: ['unterhaltsreinigung', 'grundreinigung', 'glasreinigung'],
  },
  {
    slug: 'kanzleien',
    title: 'Kanzleien & Beratungen',
    teaser: 'Diskretion und Präzision für repräsentative Räume.',
    description:
      'Anwaltskanzleien, Steuerberater und Beratungshäuser empfangen anspruchsvolle Mandanten. Wir reinigen zuverlässig und diskret – mit festem Personal, das Vertraulichkeit versteht und Ihre Räume bereits kennt.',
    icon: Scale,
    needs: [
      'Vertraulichkeit und feste Teams',
      'Hochwertige Oberflächen',
      'Reinigung nach Feierabend',
    ],
    services: ['bueroreinigung', 'glasreinigung', 'unterhaltsreinigung'],
  },
  {
    slug: 'agenturen',
    title: 'Agenturen & Kreativwirtschaft',
    teaser: 'Räume, in denen gute Ideen entstehen.',
    description:
      'Offene Flächen, viele Besucher, wechselnde Teams: Agenturbüros sind lebendig – und brauchen eine Reinigung, die flexibel mitgeht. Wir passen Intervalle und Umfang an Ihren Rhythmus an.',
    icon: Palette,
    needs: ['Flexible Intervalle', 'Küchen und Lounge-Bereiche', 'Unkomplizierte Kommunikation'],
    services: ['bueroreinigung', 'unterhaltsreinigung', 'sonderreinigung'],
  },
  {
    slug: 'grosskunden',
    title: 'Größere Geschäftskunden',
    teaser: 'Kapazität und Struktur für mehrere Standorte.',
    description:
      'Unternehmen mit mehreren Berliner Standorten oder großen Flächen brauchen einen Dienstleister mit Kapazität, Organisation und klaren Verantwortlichkeiten. Wir liefern feste Objektleitungen, Vertretungsregelungen und regelmäßige Qualitätsgespräche.',
    icon: Factory,
    needs: [
      'Objektleitung und Vertretung',
      'Regelmäßige Qualitätsgespräche',
      'Zentrale Abrechnung',
    ],
    services: ['unterhaltsreinigung', 'bueroreinigung', 'grundreinigung'],
  },
];
