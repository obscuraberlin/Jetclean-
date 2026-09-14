import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { IconBox } from '@/components/ui/IconBox';
import type { Service } from '@/content/services';
import { cn } from '@/lib/utils';

type ServiceCardProps = {
  service: Service;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function ServiceCard({ service, className, sizes, priority }: ServiceCardProps) {
  return (
    <Link
      href={`/leistungen/${service.slug}`}
      className={cn(
        'group flex h-full card-hover flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-soft',
        className,
      )}
      draggable={false}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={service.image.src}
          alt={service.image.alt}
          fill
          sizes={
            sizes ??
            '(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 85vw'
          }
          className="object-cover transition-transform duration-500 ease-(--ease-premium) motion-safe:group-hover:scale-[1.03]"
          draggable={false}
          priority={priority}
        />
        <IconBox icon={service.icon} tone="soft" size="sm" className="absolute top-4 left-4" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold">{service.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">{service.teaser}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
          Mehr erfahren
          <ArrowRight
            className="size-4 transition-transform duration-300 ease-(--ease-premium) motion-safe:group-hover:translate-x-1"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  );
}
