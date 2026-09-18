import type { Metadata } from 'next';
import { ArrowRight, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CtaSection } from '@/components/sections/CtaSection';
import { PageHero } from '@/components/sections/PageHero';
import { Prose } from '@/components/ui/Prose';
import { Reveal } from '@/components/ui/Reveal';
import { formatPostDate, getPost, posts, postsSorted } from '@/content/posts';
import { buildMetadata } from '@/lib/seo';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return buildMetadata({
    title: `${post.title} – Ratgeber`,
    description: post.excerpt,
    path: `/ratgeber/${post.slug}`,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const more = postsSorted.filter((item) => item.slug !== post.slug).slice(0, 2);

  return (
    <>
      <PageHero
        eyebrow={post.category}
        title={post.title}
        text={
          <span className="inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-muted">
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3.5" aria-hidden="true" />
              {post.readingMinutes} Min. Lesezeit
            </span>
          </span>
        }
        breadcrumbs={[
          { name: 'Ratgeber', path: '/ratgeber' },
          { name: post.title, path: `/ratgeber/${post.slug}` },
        ]}
        compact
      />
      <article className="section-y-sm">
        <div className="container-site">
          <Reveal variant="image" className="mx-auto max-w-3xl" as="figure">
            <div className="relative aspect-[16/9] overflow-hidden rounded-3xl shadow-card">
              <Image
                src={post.image.src}
                alt={post.image.alt}
                fill
                priority
                sizes="(min-width: 1024px) 48rem, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Prose className="mx-auto mt-8 text-base">
            {post.sections.map((section, index) => (
              <div key={index}>
                {section.heading ? <h2>{section.heading}</h2> : null}
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.list ? (
                  <ul>
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </Prose>
          {more.length > 0 ? (
            <aside className="mx-auto mt-12 max-w-3xl" aria-label="Weitere Beiträge">
              <h2 className="text-lg font-bold">Weitere Beiträge</h2>
              <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                {more.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/ratgeber/${item.slug}`}
                      className="group flex h-full card-hover flex-col rounded-2xl border border-line bg-white p-4 shadow-soft"
                    >
                      <span className="text-xs font-semibold text-brand-600">{item.category}</span>
                      <span className="mt-1 font-bold">{item.title}</span>
                      <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-semibold text-brand-600">
                        Weiterlesen
                        <ArrowRight className="size-4" aria-hidden="true" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          ) : null}
        </div>
      </article>
      <CtaSection source={`blog-${post.slug}`} />
    </>
  );
}
