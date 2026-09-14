'use client';

import { ArrowRight, Quote, Star } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { PlaceholderBadge } from '@/components/ui/Badge';
import { Button, buttonIconClass } from '@/components/ui/Button';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { siteConfig } from '@/content/site';
import { testimonials, type Testimonial } from '@/content/testimonials';
import { cn, initials } from '@/lib/utils';

/** Desktop: drei Karten nebeneinander. Mobile: Snap-Slider mit Punkten. */
export function Testimonials() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const hasPlaceholders = testimonials.some((t) => t.isPlaceholder);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const first = track.firstElementChild as HTMLElement | null;
      if (!first) return;
      const gap = parseFloat(getComputedStyle(track).columnGap || '0');
      setActive(Math.round(track.scrollLeft / (first.offsetWidth + gap)));
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (index: number) => {
    const track = trackRef.current;
    const first = track?.firstElementChild as HTMLElement | null;
    if (!track || !first) return;
    const gap = parseFloat(getComputedStyle(track).columnGap || '0');
    track.scrollTo({ left: index * (first.offsetWidth + gap), behavior: 'smooth' });
  };

  return (
    <section
      className="relative overflow-hidden bg-surface section-y"
      aria-labelledby="testimonials-title"
    >
      <div
        aria-hidden="true"
        className="blob top-[-6rem] right-[15%] size-[24rem] bg-brand-500/15"
      />
      <div className="relative container-site">
        <SectionHeading
          id="testimonials-title"
          eyebrow="Das sagen unsere Kunden"
          title="Vertrauen, das bleibt."
          text={
            siteConfig.reviews ? (
              <a
                href={siteConfig.reviews.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-navy-800 shadow-soft ring-1 ring-line hover:text-brand-600"
              >
                <span className="flex items-center gap-0.5 text-brand-500" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-3.5 fill-current" />
                  ))}
                </span>
                {siteConfig.reviews.rating.toFixed(1).replace('.', ',')} von 5 bei{' '}
                {siteConfig.reviews.count} Bewertungen auf {siteConfig.reviews.platform}{' '}
                {siteConfig.reviews.platformsNote}
                <span className="sr-only">
                  {' '}
                  (Stand {siteConfig.reviews.checkedAt}, öffnet in neuem Tab)
                </span>
              </a>
            ) : undefined
          }
          action={
            <div className="flex items-center gap-4">
              {hasPlaceholders && siteConfig.showPlaceholderBadges ? <PlaceholderBadge /> : null}
              <Button href="/referenzen" variant="link" className="hidden md:inline-flex">
                Referenzen ansehen
                <ArrowRight className={buttonIconClass} aria-hidden="true" />
              </Button>
            </div>
          }
        />
      </div>

      <RevealGroup as="div" className="mt-8 sm:mt-12">
        <ul
          ref={trackRef}
          className="container-site scrollbar-none flex snap-x snap-mandatory [scroll-padding-inline:1.25rem] gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible"
          aria-label="Kundenstimmen"
          data-testid="testimonials"
        >
          {testimonials.map((testimonial) => (
            <RevealItem
              key={testimonial.id}
              as="li"
              className="w-[85%] shrink-0 snap-start sm:w-[70%] md:w-auto"
            >
              <TestimonialCard testimonial={testimonial} />
            </RevealItem>
          ))}
        </ul>
      </RevealGroup>

      {/* Punkte – nur Mobile */}
      <div
        className="mt-5 flex justify-center gap-2 md:hidden"
        role="tablist"
        aria-label="Kundenstimme auswählen"
      >
        {testimonials.map((testimonial, index) => (
          <button
            key={testimonial.id}
            type="button"
            role="tab"
            aria-selected={active === index}
            aria-label={`Kundenstimme ${index + 1} von ${testimonials.length}`}
            onClick={() => scrollTo(index)}
            className="flex h-6 items-center justify-center px-1"
          >
            <span
              aria-hidden="true"
              className={cn(
                'block h-2 rounded-full transition-all duration-300 ease-(--ease-premium)',
                active === index ? 'w-6 bg-brand-600' : 'w-2 bg-navy-200 hover:bg-navy-300',
              )}
            />
          </button>
        ))}
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-3xl border border-line bg-white p-6 shadow-soft">
      <Quote className="size-6 text-brand-200" aria-hidden="true" />
      <blockquote className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-navy-800">
        „{testimonial.quote}“
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        {testimonial.avatar ? (
          <Image
            src={testimonial.avatar}
            alt=""
            width={44}
            height={44}
            className="size-11 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span
            className="flex size-11 shrink-0 items-center justify-center rounded-full bg-navy-950 font-display text-sm font-bold text-white"
            aria-hidden="true"
          >
            {initials(testimonial.name)}
          </span>
        )}
        <span className="min-w-0">
          <span className="block text-sm font-bold text-navy-950">{testimonial.name}</span>
          <span className="block text-xs leading-snug text-muted">
            {testimonial.role}, {testimonial.company}
          </span>
          <span
            className="mt-1 flex gap-0.5"
            role="img"
            aria-label={`${testimonial.rating} von 5 Sternen`}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  'size-3.5',
                  i < testimonial.rating ? 'fill-brand-500 text-brand-500' : 'text-navy-200',
                )}
                aria-hidden="true"
              />
            ))}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
