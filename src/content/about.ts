import type { LucideIcon } from 'lucide-react';
import { ShieldCheck, Clock, Leaf, MessageCircle } from 'lucide-react';
import { company } from './company';

export const aboutContent = {
  eyebrow: 'Über uns',
  headline: 'Ein Berliner Familienbetrieb, der Verlässlichkeit ernst nimmt.',
  intro: `Seit über ${company.yearsOfExperience} Jahren reinigen wir Büros, Praxen, Gewerbeobjekte und Wohnhäuser in Berlin. Was uns antreibt, ist einfach: Räume, in denen Menschen gern arbeiten – und Kunden, die sich um nichts kümmern müssen.`,
  story: [
    'JETCLEAN ist in Berlin gewachsen – von ersten Büroobjekten zu einem Team, das heute Unternehmen, Hausverwaltungen und Institutionen in der ganzen Stadt betreut.',
    'Wir glauben, dass gute Reinigung vor allem eine Frage von Organisation und Haltung ist: feste Teams, klare Absprachen, ehrliche Kommunikation. Deshalb hat bei uns jeder Kunde einen festen Ansprechpartner, und jedes Objekt ein Team, das es kennt.',
    'Unser Anspruch: Sie sollen unsere Arbeit gar nicht bemerken – außer daran, dass alles sauber ist.',
  ],
  values: [
    {
      title: 'Verlässlichkeit',
      text: 'Was wir zusagen, halten wir. Vertretungen organisieren wir, bevor Sie es merken.',
      icon: ShieldCheck,
    },
    {
      title: 'Flexibilität',
      text: 'Reinigungszeiten, Intervalle und Umfang richten sich nach Ihrem Betrieb.',
      icon: Clock,
    },
    {
      title: 'Verantwortung',
      text: 'Umweltschonende Mittel, faire Arbeitsbedingungen, kurze Wege in Berlin.',
      icon: Leaf,
    },
    {
      title: 'Nähe',
      text: 'Ein Anruf genügt. Ihr Ansprechpartner kennt Ihr Objekt und Ihre Anforderungen.',
      icon: MessageCircle,
    },
  ] satisfies { title: string; text: string; icon: LucideIcon }[],
  image: { src: '/images/hero/team.webp', alt: 'Das JETCLEAN Team vor einem Berliner Bürogebäude' },
};

export const sustainabilityContent = {
  eyebrow: 'Nachhaltigkeit',
  headline: 'Sauber für Ihr Gebäude. Verantwortungsvoll für Berlin.',
  intro:
    'Nachhaltigkeit bedeutet für uns keine Werbeaussage, sondern konkrete Entscheidungen im Alltag: welche Mittel wir einsetzen, wie wir sie dosieren und wie wir unsere Wege organisieren.',
  pillars: [
    {
      title: 'Umweltschonende Reinigungsmittel',
      text: 'Wir setzen bevorzugt Produkte mit anerkannten Umweltzeichen ein und verzichten überall dort auf Chemie, wo mechanische Verfahren oder Reinwasser ausreichen.',
    },
    {
      title: 'Exakte Dosierung',
      text: 'Dosiersysteme und geschulte Mitarbeitende verhindern Überdosierung – das schont Oberflächen, Abwasser und Budget.',
    },
    {
      title: 'Ressourcen sparen',
      text: 'Mikrofasersysteme, wiederverwendbare Materialien und Reinwassertechnik für Glasflächen reduzieren Wasser- und Materialverbrauch.',
    },
    {
      title: 'Kurze Wege',
      text: 'Unsere Teams sind objektnah eingeteilt – das spart Fahrtwege und Emissionen innerhalb der Stadt.',
    },
    {
      title: 'Faire Arbeit',
      text: 'Feste Anstellungen, tarifgerechte Bezahlung und regelmäßige Schulungen. Nachhaltigkeit beginnt bei den Menschen, die die Arbeit machen.',
    },
    {
      title: 'Beratung für Ihr Objekt',
      text: 'Auf Wunsch entwickeln wir mit Ihnen ein Reinigungskonzept, das Nachhaltigkeitsziele Ihres Unternehmens unterstützt.',
    },
  ],
  image: {
    src: '/images/hero/sustainability.webp',
    alt: 'Nachhaltige Reinigung mit umweltschonenden Mitteln',
  },
};

export const careersContent = {
  eyebrow: 'Karriere',
  headline: 'Arbeiten bei JETCLEAN.',
  intro:
    'Wir suchen Menschen, die sorgfältig arbeiten und Verantwortung übernehmen. Dafür bieten wir feste Anstellungen, faire Bezahlung und ein Team, das zusammenhält.',
  perks: [
    'Unbefristete Anstellung und pünktliche, tarifgerechte Bezahlung',
    'Feste Objekte und Einsatzzeiten in Berlin – planbar und wohnortnah',
    'Gründliche Einarbeitung und regelmäßige Schulungen',
    'Hochwertige Arbeitskleidung und Ausstattung',
    'Entwicklungsmöglichkeiten bis zur Objektleitung',
    'Respektvoller Umgang und ein fester Ansprechpartner im Büro',
  ],
  /**
   * Offene Stellen. Leere Liste = nur Initiativbewerbung. Keine Stellen erfinden.
   */
  openPositions: [] as { title: string; type: string; location: string; description: string }[],
  applicationHint:
    'Schicken Sie uns eine kurze Nachricht mit Ihrem Namen, Ihrer Telefonnummer und Ihrer bisherigen Erfahrung – ein formeller Lebenslauf ist nicht nötig. Wir melden uns bei Ihnen.',
};
