import type { Metadata } from 'next';
import { ArrowRight, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { CtaSection } from '@/components/sections/CtaSection';
import { PageHero } from '@/components/sections/PageHero';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { formatPostDate, postsSorted } from '@/content/posts';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Ratgeber – Tipps rund um Gebäudereinigung in Berlin',
  description:
    'Praxisnahe Tipps zu Büroreinigung, Glasreinigung und Reinigungsverträgen – kurz und verständlich aus dem Reinigungsalltag von JETCLEAN Berlin.',
  path: '/ratgeber',
});

export default function BlogIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Ratgeber"
        title="Wissenswertes rund um saubere Gebäude."
        text="Praxisnahe Tipps aus dem Reinigungsalltag – kurz, verständlich und ohne Fachchinesisch."
        breadcrumbs={[{ name: 'Ratgeber', path: '/ratgeber' }]}
        compact
      />
      <section className="section-y" aria-label="Alle Beiträge">
        <div className="container-site">
          <RevealGroup as="ul" className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {postsSorted.map((post) => (
              <RevealItem key={post.slug} as="li">
                <Link
                  href={`/ratgeber/${post.slug}`}
                  className="group flex h-full card-hover flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-soft"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.image.src}
                      alt={post.image.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 ease-(--ease-premium) motion-safe:group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted">
                      <span className="font-semibold text-brand-600">{post.category}</span>
                      <span aria-hidden="true">·</span>
                      <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="size-3" aria-hidden="true" />
                        {post.readingMinutes} Min.
                      </span>
                    </p>
                    <h2 className="mt-2 text-lg leading-snug font-bold">{post.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{post.excerpt}</p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-brand-600">
                      Weiterlesen
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
      <CtaSection source="blog" />
    </>
  );
}
