import { company } from './company';

export type Faq = {
  question: string;
  answer: string;
};

/**
 * Häufige Fragen. Die ersten `homepageFaqCount` Einträge erscheinen auf der Startseite,
 * alle Einträge auf der Kontaktseite.
 */
export const faqs: Faq[] = [
  {
    question: 'Welche Leistungen bietet JETCLEAN an?',
    answer:
      'Wir bieten Büroreinigung, Unterhaltsreinigung, Glasreinigung, Treppenhausreinigung, Grundreinigung und Sonderreinigungen für Unternehmen, Praxen, Hausverwaltungen und Immobilienunternehmen in Berlin.',
  },
  {
    question: 'Was kostet eine Gebäudereinigung in Berlin?',
    answer:
      'Die Kosten hängen von Fläche, Reinigungsintervall, Ausstattung und gewünschtem Leistungsumfang ab. Nach einer kurzen Besichtigung erhalten Sie von uns ein kostenloses, unverbindliches Angebot mit transparenter Monatspauschale.',
  },
  {
    question: 'In welchen Bezirken ist JETCLEAN tätig?',
    answer: `Wir sind in ganz ${company.address.city} tätig – von Charlottenburg über Mitte bis Köpenick – sowie nach Absprache im direkten Umland.`,
  },
  {
    question: 'Wie häufig sollte eine Unterhaltsreinigung erfolgen?',
    answer:
      'Für Büros sind zwei bis fünf Reinigungen pro Woche üblich, Sanitär- und Küchenbereiche meist täglich. Praxen und stark frequentierte Flächen benötigen in der Regel tägliche Reinigung. Wir beraten Sie individuell.',
  },
  {
    question: 'Können Reinigungszeiten außerhalb der Geschäftszeiten vereinbart werden?',
    answer:
      'Ja. Die meisten unserer Kunden lassen frühmorgens, abends oder am Wochenende reinigen, damit der Betrieb nicht gestört wird. Die Zeiten legen wir gemeinsam fest.',
  },
  {
    question: 'Welche Reinigungsmittel werden eingesetzt?',
    answer:
      'Wir setzen bevorzugt umweltschonende, materialgerechte Reinigungsmittel ein und dosieren diese nach Herstellervorgaben. Bei besonderen Anforderungen – etwa in Praxen – stimmen wir die Mittel mit Ihnen ab.',
  },
];

/** Anzahl FAQs auf der Startseite (mobil kompakt halten). */
export const homepageFaqCount = 5;
