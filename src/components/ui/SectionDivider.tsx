import { cn } from '@/lib/utils';

type SectionDividerProps = {
  /** Farbe der Fläche, in die übergegangen wird (CSS-Farbe oder Token) */
  fill?: string;
  flip?: boolean;
  className?: string;
};

/** Weiche Wellenkante zwischen zwei Sektionen. */
export function SectionDivider({
  fill = 'currentColor',
  flip = false,
  className,
}: SectionDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none relative h-12 w-full overflow-hidden sm:h-16 lg:h-20',
        className,
      )}
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className={cn('absolute inset-0 size-full', flip && 'rotate-180')}
      >
        <path d="M0 40C240 80 480 80 720 40S1200 0 1440 40V80H0Z" fill={fill} />
      </svg>
    </div>
  );
}
