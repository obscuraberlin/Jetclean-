import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbJsonLd } from '@/lib/seo';

export type Crumb = { name: string; path: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ name: 'Startseite', path: '/' }, ...items];
  return (
    <nav aria-label="Brotkrumen" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1.5 text-muted">
        {all.map((item, index) => {
          const last = index === all.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {index > 0 ? (
                <ChevronRight className="size-3.5 text-navy-300" aria-hidden="true" />
              ) : null}
              {last ? (
                <span aria-current="page" className="font-medium text-navy-800">
                  {item.name}
                </span>
              ) : (
                <Link href={item.path} className="transition-colors hover:text-brand-600">
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
      <JsonLd data={breadcrumbJsonLd(items)} />
    </nav>
  );
}
