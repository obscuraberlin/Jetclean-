'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useId, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { cn } from '@/lib/utils';

type BeforeAfterSliderProps = {
  before: { src: string; alt: string };
  after: { src: string; alt: string };
  className?: string;
  initial?: number;
};

const clamp = (value: number) => Math.min(100, Math.max(0, value));

/**
 * Echter Vorher/Nachher-Vergleich: Maus, Touch, Drag und Tastatur (role="slider").
 * Das „Vorher“-Bild wird per clip-path beschnitten – performant, ohne Layout-Thrashing.
 */
export function BeforeAfterSlider({
  before,
  after,
  className,
  initial = 50,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(initial);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const id = useId();

  const updateFromClientX = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    setPosition(clamp(((clientX - rect.left) / rect.width) * 100));
  }, []);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 && event.pointerType === 'mouse') return;
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
    updateFromClientX(event.clientX);
  };
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    updateFromClientX(event.clientX);
  };
  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const steps: Record<string, number> = {
      ArrowLeft: -2,
      ArrowDown: -2,
      ArrowRight: 2,
      ArrowUp: 2,
      PageDown: -10,
      PageUp: 10,
    };
    if (event.key === 'Home') {
      event.preventDefault();
      setPosition(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      setPosition(100);
    } else if (event.key in steps) {
      event.preventDefault();
      setPosition((p) => clamp(p + (steps[event.key] ?? 0)));
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-navy-100 select-none md:aspect-[16/10]',
        dragging ? 'cursor-grabbing' : 'cursor-ew-resize',
        className,
      )}
      style={{ touchAction: 'pan-y' }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      data-testid="before-after"
    >
      {/* Nachher (voll sichtbar) */}
      <Image
        src={after.src}
        alt={after.alt}
        fill
        sizes="(min-width: 1024px) 60vw, 100vw"
        className="object-cover"
        draggable={false}
      />
      {/* Vorher (beschnitten) */}
      <div
        className="absolute inset-0 will-change-[clip-path]"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        aria-hidden="true"
      >
        <Image
          src={before.src}
          alt=""
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover"
          draggable={false}
        />
      </div>

      {/* Labels */}
      <span className="pointer-events-none absolute top-4 left-4 rounded-full bg-navy-950/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
        Vorher
      </span>
      <span className="pointer-events-none absolute top-4 right-4 rounded-full bg-brand-500 px-3 py-1 text-xs font-semibold text-white">
        Nachher
      </span>

      {/* Trennlinie + Griff */}
      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgb(11_19_41/0.1)]"
        style={{ left: `${position}%` }}
        aria-hidden="true"
      />
      <button
        type="button"
        role="slider"
        id={id}
        aria-label="Vorher/Nachher-Vergleich – Position des Reglers"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        aria-valuetext={`${Math.round(position)} % Vorher sichtbar`}
        onKeyDown={onKeyDown}
        className={cn(
          'absolute top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-navy-900 shadow-lift ring-1 ring-navy-950/10 transition-transform duration-200 ease-(--ease-premium) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500',
          dragging ? 'scale-95' : 'motion-safe:hover:scale-105',
        )}
        style={{ left: `${position}%` }}
        data-testid="before-after-handle"
      >
        <ChevronLeft className="-mr-1 size-4" aria-hidden="true" />
        <ChevronRight className="-ml-1 size-4" aria-hidden="true" />
      </button>
    </div>
  );
}
