import { ArrowRight, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button, buttonIconClass } from '@/components/ui/Button';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { formatPostDate, postsSorted } from '@/content/posts';

/** Drei aktuelle Ratgeber-Beiträge auf der Startseite. */
export function BlogTeaser() {
  const items = postsSorted.slice(0, 3);
  return (
    <section
      className="relative overflow-hidden section-y"
      aria-labelledby="blog-title"
      id="ratgeber"
    >
      <div aria-hidden="true" className="blob -top-20 left-[-8rem] size-[24rem] bg-navy-200/40" />
      <div className="relative container-site">
        <SectionHeading
          id="blog-title"
          eyebrow="Ratgeber"
          title="Wissenswertes rund um saubere Gebäude."
          text="Praxisnahe Tipps aus dem Reinigungsalltag – kurz, verständlich und ohne Fachchinesisch."
        />
        <RevealGroup as="ul" className="mt-8 grid gap-4 sm:mt-10 md:grid-cols-3 md:gap-5">
          {items.map((post) => (
            <RevealItem key={post.slug} as="li">
              <Link
                href={`/ratgeber/${post.slug}`}
                className="group flex h-full card-hover overflow-hidden rounded-3xl border border-line bg-white shadow-soft max-md:flex-row md:flex-col"
              >
                <div className="relative shrink-0 overflow-hidden max-md:w-[38%] md:aspect-[16/10]">
                  <Image
                    src={post.image.src}
                    alt={post.image.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 40vw"
                    className="object-cover transition-transform duration-500 ease-(--ease-premium) motion-safe:group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted">
                    <span className="font-semibold text-brand-600">{post.category}</span>
                    <span aria-hidden="true">·</span>
                    <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-3" aria-hidden="true" />
                      {post.readingMinutes} Min.
                    </span>
                  </p>
                  <h3 className="mt-2 text-[0.9375rem] leading-snug font-bold sm:text-lg">
                    {post.title}
                  </h3>
                  <p className="mt-1.5 hidden text-sm leading-relaxed text-muted sm:block">
                    {post.excerpt}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-semibold text-brand-600">
                    Weiterlesen
                    <ArrowRight
                      className="size-4 transition-transform duration-300 ease-(--ease-premium) motion-safe:group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
        <div className="mt-8 flex justify-center">
          <Button
            href="/ratgeber"
            variant="link"
            className="font-semibold text-navy-900 hover:text-brand-600"
          >
            Alle Beiträge
            <ArrowRight className={buttonIconClass} aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  );
}
