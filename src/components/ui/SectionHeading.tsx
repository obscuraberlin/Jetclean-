import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  text?: ReactNode;
  align?: 'left' | 'center';
  /** Heading-Level, Standard h2 */
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  /** Rechts neben dem Titel (Desktop), z. B. ein Link */
  action?: ReactNode;
  id?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = 'left',
  as: Tag = 'h2',
  className,
  action,
  id,
}: SectionHeadingProps) {
  const centered = align === 'center';
  return (
    <div
      className={cn(
        'flex flex-col gap-4 md:flex-row md:items-end md:justify-between',
        centered && 'md:flex-col md:items-center md:text-center',
        className,
      )}
    >
      <div className={cn('max-w-2xl', centered && 'mx-auto')}>
        {eyebrow ? (
          <p className="mb-3 text-xs font-semibold tracking-[0.14em] text-brand-600 uppercase">
            {eyebrow}
          </p>
        ) : null}
        <Tag
          id={id}
          className={cn(
            Tag === 'h1'
              ? 'text-4xl leading-[1.08] sm:text-5xl lg:text-6xl'
              : 'text-[1.75rem] leading-[1.15] sm:text-4xl lg:text-[2.75rem]',
          )}
        >
          {title}
        </Tag>
        {text ? (
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{text}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
