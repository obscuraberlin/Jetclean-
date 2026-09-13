import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type IconBoxProps = {
  icon: LucideIcon;
  tone?: 'brand' | 'navy' | 'success' | 'soft';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const tones = {
  brand: 'bg-brand-50 text-brand-600',
  navy: 'bg-navy-950 text-white',
  success: 'bg-success-50 text-success-600',
  soft: 'bg-white text-brand-600 shadow-soft ring-1 ring-line',
};

const sizes = {
  sm: 'size-9 rounded-lg [&>svg]:size-4',
  md: 'size-11 rounded-xl [&>svg]:size-5',
  lg: 'size-14 rounded-2xl [&>svg]:size-6',
};

export function IconBox({ icon: Icon, tone = 'brand', size = 'md', className }: IconBoxProps) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center',
        tones[tone],
        sizes[size],
        className,
      )}
      aria-hidden="true"
    >
      <Icon strokeWidth={1.75} />
    </span>
  );
}
