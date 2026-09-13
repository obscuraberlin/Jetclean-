import {
  forwardRef,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from 'react';
import { cn } from '@/lib/utils';

const inputBase =
  'block w-full rounded-xl border bg-white px-4 text-[0.9375rem] text-navy-900 placeholder:text-navy-300 transition-[border-color,box-shadow] duration-200 focus:outline-none focus:ring-4 disabled:bg-surface';
const inputTone = (invalid?: boolean) =>
  invalid
    ? 'border-danger-500 focus:border-danger-500 focus:ring-danger-50'
    : 'border-line-strong hover:border-navy-300 focus:border-brand-500 focus:ring-brand-100';

type FieldWrapperProps = {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  children: ReactNode;
  className?: string;
};

export function FieldWrapper({
  label,
  htmlFor,
  error,
  hint,
  optional,
  children,
  className,
}: FieldWrapperProps) {
  return (
    <div className={cn('space-y-1.5', className)}>
      <label
        htmlFor={htmlFor}
        className="flex items-baseline justify-between text-sm font-semibold text-navy-800"
      >
        <span>{label}</span>
        {optional ? <span className="text-xs font-normal text-muted">optional</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} className="text-sm text-danger-600" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p id={`${htmlFor}-hint`} className="text-xs text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean };

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, invalid, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(inputBase, 'h-12', inputTone(invalid), className)}
      {...props}
    />
  );
});

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean };

/** Natives Select mit eigenem Pfeil – gleiche Optik wie Input. */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className, invalid, children, ...props },
  ref,
) {
  return (
    <select
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(
        inputBase,
        'h-12 cursor-pointer appearance-none bg-no-repeat pr-11',
        "bg-[url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none' stroke='%230b1329' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'%3e%3cpath d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")] bg-[length:1.25rem_1.25rem] bg-[position:right_0.9rem_center]",
        'invalid:text-navy-300 [&:has(option:checked[value=\'\'])]:text-navy-300',
        inputTone(invalid),
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
});

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean };

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, invalid, ...props },
  ref,
) {
  return (
    <textarea
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(inputBase, 'min-h-28 py-3 leading-relaxed', inputTone(invalid), className)}
      {...props}
    />
  );
});

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label: ReactNode;
  error?: string;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { className, label, error, id, ...props },
  ref,
) {
  return (
    <div className={cn('space-y-1.5', className)}>
      <label
        htmlFor={id}
        className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-navy-700"
      >
        <input
          ref={ref}
          id={id}
          type="checkbox"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(
            'mt-0.5 size-5 shrink-0 cursor-pointer appearance-none rounded-md border bg-white transition-colors checked:border-brand-500 checked:bg-brand-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500',
            "checked:bg-[url(\"data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e\")] checked:bg-[length:100%_100%] checked:bg-center checked:bg-no-repeat",
            error ? 'border-danger-500' : 'border-line-strong',
          )}
          {...props}
        />
        <span>{label}</span>
      </label>
      {error ? (
        <p id={`${id}-error`} className="text-sm text-danger-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
});
