import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { Service } from '@/content/services';
import { cn } from '@/lib/utils';

type ServiceCardProps = {
  service: Service;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Großformat im Karussell (75 % Bild) */
  large?: boolean;
};

export function ServiceCard({ service, className, sizes, priority, large }: ServiceCardProps) {
  return (
    <Link
      href={`/leistungen/${service.slug}`}
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white ring-1 ring-black/[0.05] transition-[transform,box-shadow] duration-500 ease-(--ease-premium) hover:shadow-card motion-safe:hover:-translate-y-0.5',
        large && 'rounded-[2rem]',
        className,
      )}
      draggable={false}
    >
      <div className={cn('relative overflow-hidden', large ? 'aspect-[4/3.6]' : 'aspect-[4/3]')}>
        <Image
          src={service.image.src}
          alt={service.image.alt}
          fill
          sizes={sizes ?? '(min-width: 1024px) 45vw, (min-width: 640px) 70vw, 88vw'}
          className="object-cover transition-transform duration-700 ease-(--ease-premium) motion-safe:group-hover:scale-[1.025]"
          draggable={false}
          priority={priority}
        />
      </div>
      <div className={cn('flex flex-1 items-end justify-between gap-4 p-5', large && 'p-6 sm:p-7')}>
        <div>
          <h3 className={cn('font-bold', large ? 'text-xl sm:text-2xl' : 'text-lg')}>
            {service.title}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-muted">{service.teaser}</p>
        </div>
        <span
          className="flex size-10 shrink-0 items-center justify-center rounded-full border border-line text-navy-950 transition-[background-color,color,border-color] duration-300 group-hover:border-navy-950 group-hover:bg-navy-950 group-hover:text-white"
          aria-hidden="true"
        >
          <ArrowRight className="size-4 transition-transform duration-300 ease-(--ease-premium) motion-safe:group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
