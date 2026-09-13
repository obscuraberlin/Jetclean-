import type { LucideIcon } from 'lucide-react';
import { Award, Leaf, Users, HeartHandshake } from 'lucide-react';
import { company } from './company';

export type Benefit = {
  title: string;
  text: string;
  icon: LucideIcon;
};

/** Sektion „Mehr als nur Gebäudereinigung.“ – maximal vier Punkte. */
export const benefits: Benefit[] = [
  {
    title: `${company.yearsOfExperience}+ Jahre Erfahrung`,
    text: 'Seit über zwei Jahrzehnten reinigen wir Berliner Büros, Praxen und Gewerbeobjekte – verlässlich und mit Ruhe.',
    icon: Award,
  },
  {
    title: 'Nachhaltige Reinigung',
    text: 'Umweltschonende Reinigungsmittel, dosierte Verfahren und kurze Wege innerhalb Berlins.',
    icon: Leaf,
  },
  {
    title: 'Geschultes Fachpersonal',
    text: 'Feste, eingearbeitete Teams mit Objektkenntnis – diskret, sorgfältig und regelmäßig geschult.',
    icon: Users,
  },
  {
    title: 'Persönlicher Service',
    text: 'Ein fester Ansprechpartner für alle Anliegen. Schnell erreichbar, unkompliziert in der Umsetzung.',
    icon: HeartHandshake,
  },
];

/** Trustpoints im Hero – maximal vier. */
export const heroTrustpoints = [
  `Über ${company.yearsOfExperience} Jahre Erfahrung`,
  'Fester Ansprechpartner',
  'Geschulte Reinigungsteams',
  'Qualitätskontrollen',
];
