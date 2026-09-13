import type { MetadataRoute } from 'next';
import { services } from '@/content/services';
import { absoluteUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const staticPages: {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  }[] = [
    { path: '/', priority: 1, changeFrequency: 'weekly' },
    { path: '/leistungen', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/branchen', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/referenzen', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/ueber-uns', priority: 0.6, changeFrequency: 'yearly' },
    { path: '/nachhaltigkeit', priority: 0.5, changeFrequency: 'yearly' },
    { path: '/karriere', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/kontakt', priority: 0.8, changeFrequency: 'yearly' },
    { path: '/impressum', priority: 0.1, changeFrequency: 'yearly' },
    { path: '/datenschutz', priority: 0.1, changeFrequency: 'yearly' },
  ];

  return [
    ...staticPages.map((page) => ({
      url: absoluteUrl(page.path),
      lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...services.map((service) => ({
      url: absoluteUrl(`/leistungen/${service.slug}`),
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    })),
  ];
}
