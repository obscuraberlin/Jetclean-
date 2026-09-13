import Link from 'next/link';
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link' | 'inverse';
export type ButtonSize = 'sm' | 'md' | 'lg';

const base =
  'group inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-[transform,box-shadow,background-color,color,border-color] duration-300 ease-(--ease-premium) select-none disabled:pointer-events-none disabled:opacity-60 motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0';

const variants: Record<ButtonVariant, string> = {
  primary:
    'btn-shine bg-brand-500 text-white shadow-brand hover:bg-brand-600 hover:shadow-lift focus-visible:outline-brand-700',
  secondary:
    'border border-line-strong bg-white text-navy-900 shadow-soft hover:border-navy-300 hover:shadow-card',
  ghost: 'text-navy-900 hover:bg-navy-50',
  link: 'rounded-none px-0 py-0 text-brand-600 underline-offset-4 hover:text-brand-700 hover:underline motion-safe:hover:translate-y-0',
  inverse: 'bg-white text-navy-950 shadow-soft hover:bg-navy-50 hover:shadow-card',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-6 text-[0.9375rem]',
  lg: 'h-13 px-7 text-base',
};

/** Icon-Slot: Icons bewegen sich beim Hover 2–4px nach rechts. */
export const buttonIconClass =
  'size-4 shrink-0 transition-transform duration-300 ease-(--ease-premium) motion-safe:group-hover:translate-x-0.5';

export function buttonClasses({
  variant = 'primary',
  size = 'md',
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}) {
  return cn(base, variants[variant], variant !== 'link' && sizes[size], className);
}

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & { href?: undefined };

type ButtonAsLink = CommonProps & {
  href: string;
  target?: string;
  rel?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  'aria-label'?: string;
  prefetch?: boolean;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(props, ref) {
    if (props.href !== undefined) {
      const { href, variant, size, className, children, ...rest } = props;
      const external = /^(https?:|mailto:|tel:)/.test(href);
      if (external) {
        return (
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            className={buttonClasses({ variant, size, className })}
            {...rest}
          >
            {children}
          </a>
        );
      }
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={buttonClasses({ variant, size, className })}
          {...rest}
        >
          {children}
        </Link>
      );
    }

    const { variant, size, className, children, type = 'button', ...rest } = props;
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        className={buttonClasses({ variant, size, className })}
        {...rest}
      >
        {children}
      </button>
    );
  },
);
