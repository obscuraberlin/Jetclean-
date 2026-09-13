import type { LucideIcon } from 'lucide-react';
import { Award, Leaf, Users, HeartHandshake, ShieldCheck, ClipboardCheck } from 'lucide-react';
import { company } from './company';

export type Benefit = {
  title: string;
  text: string;
  icon: LucideIcon;
};

/** Sektion „Mehr als nur Gebäudereinigung.“ – maximal vier Punkte. */
export const benefits: Benefit[] = [
  {
    title: 'Zuverlässig',
    text: `Über ${company.yearsOfExperience} Jahre Erfahrung und viele zufriedene Unternehmen in Berlin.`,
    icon: Award,
  },
  {
    title: 'Nachhaltig',
    text: 'Umweltschonende Reinigungsmittel, dosierte Verfahren und kurze Wege innerhalb Berlins.',
    icon: Leaf,
  },
  {
    title: 'Geschultes Fachpersonal',
    text: 'Feste, eingearbeitete Teams mit Objektkenntnis – diskret, sorgfältig und regelmäßig geschult.',
    icon: Users,
  },
  {
    title: 'Persönlich',
    text: 'Ein fester Ansprechpartner für alle Anliegen. Schnell erreichbar, unkompliziert in der Umsetzung.',
    icon: HeartHandshake,
  },
];

/** Trustpoints im Hero – maximal vier. */
export const heroTrustpoints: { label: string; icon: LucideIcon }[] = [
  { label: `Über ${company.yearsOfExperience} Jahre Erfahrung`, icon: ShieldCheck },
  { label: 'Fester Ansprechpartner', icon: Users },
  { label: 'Geschulte Reinigungsteams', icon: Award },
  { label: 'Qualitätskontrollen', icon: ClipboardCheck },
];
