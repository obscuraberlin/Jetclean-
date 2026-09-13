import type { Metadata } from 'next';
import { company, fullAddress } from '@/content/company';
import { siteConfig } from '@/content/site';

type PageMetaInput = {
  title: string;
  description: string;
  /** Pfad ab Root, z. B. "/leistungen/bueroreinigung" */
  path: string;
  /** Absoluten Title ohne Template verwenden (Startseite) */
  absoluteTitle?: boolean;
  noIndex?: boolean;
};

export const absoluteUrl = (path = '/') =>
  `${siteConfig.url}${path.startsWith('/') ? path : `/${path}`}`;

/** Einheitliche Metadata für alle Seiten (Title, Description, Canonical, OG, Twitter, Robots). */
export function buildMetadata({
  title,
  description,
  path,
  absoluteTitle,
  noIndex,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      locale: siteConfig.locale,
      url,
      siteName: company.name,
      title,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

/** Schema.org LocalBusiness + Organization (nur konfigurierte, echte Daten). */
export function localBusinessJsonLd() {
  const base = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'Organization'],
    '@id': `${siteConfig.url}/#organization`,
    name: company.name,
    alternateName: company.shortName,
    url: siteConfig.url,
    logo: absoluteUrl('/opengraph-image'),
    image: absoluteUrl('/opengraph-image'),
    description: siteConfig.seo.defaultDescription,
    telephone: company.contact.phoneE164,
    email: company.contact.email,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address.street,
      postalCode: company.address.postalCode,
      addressLocality: company.address.city,
      addressRegion: company.address.region,
      addressCountry: company.address.country,
    },
    areaServed: company.serviceArea.schemaAreas.map((name) => ({ '@type': 'City', name })),
    knowsAbout: [
      'Gebäudereinigung',
      'Büroreinigung',
      'Unterhaltsreinigung',
      'Glasreinigung',
      'Treppenhausreinigung',
      'Grundreinigung',
    ],
    ...(company.social.length > 0 ? { sameAs: company.social.map((s) => s.url) } : {}),
  };

  if (company.openingHours) {
    return {
      ...base,
      openingHoursSpecification: company.openingHours.schema.map((spec) => ({
        '@type': 'OpeningHoursSpecification',
        ...spec,
      })),
    };
  }
  return base;
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Startseite', path: '/' }, ...items].map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceJsonLd(input: { name: string; description: string; path: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    serviceType: input.name,
    areaServed: { '@type': 'City', name: company.address.city },
    provider: { '@id': `${siteConfig.url}/#organization` },
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export const nap = {
  name: company.name,
  address: fullAddress,
  phone: company.contact.phoneDisplay,
};
