'use client';

import { useReducedMotion } from '@/hooks/useReducedMotion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import { Button, buttonIconClass } from '@/components/ui/Button';
import { TextReveal } from '@/components/ui/TextReveal';
import { Parallax } from '@/components/ui/Parallax';
import { services } from '@/content/services';
import { cn } from '@/lib/utils';
import { ServiceCard } from './ServiceCard';

const AUTOPLAY_MS = 6000;

/**
 * Leistungs-Carousel auf Basis nativen Scroll-Snaps (kein Slider-Framework):
 * Pfeile, Mouse-Drag, Touch/Trackpad-Swipe, Tastatur (Pfeiltasten im Fokus),
 * optionales Autoplay (stoppt bei Hover, Interaktion, Fokus, reduced motion, außerhalb des Viewports).
 */
export function ServicesCarousel() {
  const trackRef = useRef<HTMLUListElement>(null);
  const reduce = useReducedMotion();
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });

  const cardStep = useCallback(() => {
    const track = trackRef.current;
    const first = track?.firstElementChild as HTMLElement | null;
    if (!track || !first) return 0;
    const gap = parseFloat(getComputedStyle(track).columnGap || '0');
    return first.offsetWidth + gap;
  }, []);

  const updateButtons = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanPrev(track.scrollLeft > 4);
    setCanNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 4);
  }, []);

  const scrollByCards = useCallback(
    (direction: 1 | -1) => {
      const track = trackRef.current;
      if (!track) return;
      track.scrollBy({ left: direction * cardStep(), behavior: reduce ? 'auto' : 'smooth' });
    },
    [cardStep, reduce],
  );

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    updateButtons();
    track.addEventListener('scroll', updateButtons, { passive: true });
    const resize = new ResizeObserver(updateButtons);
    resize.observe(track);
    const visibility = new IntersectionObserver(
      ([entry]) => setInView(Boolean(entry?.isIntersecting)),
      {
        threshold: 0.4,
      },
    );
    visibility.observe(track);
    return () => {
      track.removeEventListener('scroll', updateButtons);
      resize.disconnect();
      visibility.disconnect();
    };
  }, [updateButtons]);

  // Autoplay
  useEffect(() => {
    if (reduce || paused || !inView) return;
    const id = window.setInterval(() => {
      if (document.visibilityState !== 'visible') return;
      const track = trackRef.current;
      if (!track) return;
      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
      if (atEnd) track.scrollTo({ left: 0, behavior: 'smooth' });
      else scrollByCards(1);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [reduce, paused, inView, scrollByCards]);

  // Mouse-Drag (nur Maus – Touch nutzt natives Scrollen)
  const onPointerDown = (event: ReactPointerEvent<HTMLUListElement>) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    const track = trackRef.current;
    if (!track) return;
    drag.current = {
      active: true,
      startX: event.clientX,
      startScroll: track.scrollLeft,
      moved: false,
    };
    track.style.scrollSnapType = 'none';
    track.style.cursor = 'grabbing';
    setPaused(true);
  };
  const onPointerMove = (event: ReactPointerEvent<HTMLUListElement>) => {
    if (!drag.current.active) return;
    const track = trackRef.current;
    if (!track) return;
    const delta = event.clientX - drag.current.startX;
    if (Math.abs(delta) > 4) drag.current.moved = true;
    track.scrollLeft = drag.current.startScroll - delta;
  };
  const endDrag = () => {
    const track = trackRef.current;
    if (!drag.current.active || !track) return;
    drag.current.active = false;
    track.style.cursor = '';
    // Snap nach dem Loslassen wiederherstellen
    const step = cardStep();
    if (step > 0) {
      const target = Math.round(track.scrollLeft / step) * step;
      track.scrollTo({ left: target, behavior: reduce ? 'auto' : 'smooth' });
    }
    window.setTimeout(() => {
      track.style.scrollSnapType = '';
    }, 350);
  };
  const onClickCapture = (event: React.MouseEvent) => {
    if (drag.current.moved) {
      event.preventDefault();
      event.stopPropagation();
      drag.current.moved = false;
    }
  };
  const onKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      scrollByCards(1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      scrollByCards(-1);
    }
  };

  return (
    <section className="py-20 sm:py-28 lg:py-36" aria-labelledby="services-title" id="leistungen">
      <div className="container-site">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <TextReveal
            as="h2"
            inView
            className="text-[2.25rem] leading-[1.02] tracking-[-0.03em] sm:text-5xl lg:text-6xl"
            lines={[
              <span key="1">Gebäudereinigung,</span>,
              <span key="2">die zu Ihrem Unternehmen passt.</span>,
            ]}
          />
          <div className="flex items-center gap-3">
            <Button href="/leistungen" variant="link" className="hidden md:inline-flex">
              Alle Leistungen
              <ArrowRight className={buttonIconClass} aria-hidden="true" />
            </Button>
            <div className="hidden items-center gap-2 md:flex">
              <CarouselButton
                direction="prev"
                onClick={() => scrollByCards(-1)}
                disabled={!canPrev}
              />
              <CarouselButton
                direction="next"
                onClick={() => scrollByCards(1)}
                disabled={!canNext}
              />
            </div>
          </div>
        </div>
        <span id="services-title" className="sr-only">
          Unsere Leistungen
        </span>
      </div>

      <div
        className="mt-10 sm:mt-14"
        role="region"
        aria-roledescription="Karussell"
        aria-label="Leistungen im Überblick"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
      >
        <div className="overflow-x-clip">
          <Parallax axis="x" distance={-48}>
            <ul
              ref={trackRef}
              aria-label="Leistungen"
              tabIndex={0}
              onKeyDown={onKeyDown}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={endDrag}
              onPointerLeave={endDrag}
              onPointerCancel={endDrag}
              onClickCapture={onClickCapture}
              className={cn(
                'container-site scrollbar-none flex snap-x snap-mandatory [scroll-padding-inline:1.25rem] gap-5 overflow-x-auto scroll-smooth pb-6 sm:[scroll-padding-inline:1.5rem] sm:gap-6 lg:[scroll-padding-inline:2rem]',
                'cursor-grab touch-pan-x select-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500',
              )}
              data-testid="services-carousel"
            >
              {services.map((service, index) => (
                <li
                  key={service.slug}
                  className="w-[86%] shrink-0 snap-start sm:w-[64%] lg:w-[calc((100%-2.5rem)/2.3)]"
                >
                  <ServiceCard service={service} priority={index < 2} large />
                </li>
              ))}
            </ul>
          </Parallax>
        </div>
      </div>

      <div className="container-site mt-2 flex items-center justify-between md:hidden">
        <Button href="/leistungen" variant="link" size="sm">
          Alle Leistungen
          <ArrowRight className={buttonIconClass} aria-hidden="true" />
        </Button>
        <div className="flex items-center gap-2">
          <CarouselButton direction="prev" onClick={() => scrollByCards(-1)} disabled={!canPrev} />
          <CarouselButton direction="next" onClick={() => scrollByCards(1)} disabled={!canNext} />
        </div>
      </div>
    </section>
  );
}

function CarouselButton({
  direction,
  onClick,
  disabled,
}: {
  direction: 'prev' | 'next';
  onClick: () => void;
  disabled: boolean;
}) {
  const Icon = direction === 'prev' ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === 'prev' ? 'Vorherige Leistungen' : 'Weitere Leistungen'}
      className="flex size-11 items-center justify-center rounded-full border border-line-strong bg-white text-navy-900 shadow-soft transition-[transform,box-shadow,border-color,opacity] duration-300 ease-(--ease-premium) hover:border-navy-300 hover:shadow-card disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:shadow-soft motion-safe:enabled:hover:-translate-y-0.5"
      data-testid={`carousel-${direction}`}
    >
      <Icon className="size-5" aria-hidden="true" />
    </button>
  );
}
