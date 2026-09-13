export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export const mainNavigation: NavItem[] = [
  { label: 'Leistungen', href: '/leistungen' },
  { label: 'Branchen', href: '/branchen' },
  { label: 'Referenzen', href: '/referenzen' },
  { label: 'Über uns', href: '/ueber-uns' },
  { label: 'Nachhaltigkeit', href: '/nachhaltigkeit' },
  { label: 'Karriere', href: '/karriere' },
  { label: 'Kontakt', href: '/kontakt' },
];

export const footerNavigation = {
  company: [
    { label: 'Über uns', href: '/ueber-uns' },
    { label: 'Branchen', href: '/branchen' },
    { label: 'Referenzen', href: '/referenzen' },
    { label: 'Nachhaltigkeit', href: '/nachhaltigkeit' },
    { label: 'Karriere', href: '/karriere' },
    { label: 'Kontakt', href: '/kontakt' },
  ],
  legal: [
    { label: 'Impressum', href: '/impressum' },
    { label: 'Datenschutz', href: '/datenschutz' },
  ],
} satisfies Record<string, NavItem[]>;
