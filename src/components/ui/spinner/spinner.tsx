'use client';

import clsx from 'clsx';

import type { SpinnerSize, SpinnerVariant } from './spinner-styles';
import { spinnerVariants } from './spinner-styles';

export type SpinnerProps = Readonly<{
  className?: string;
  size?: SpinnerSize;
  variant?: SpinnerVariant;
  label?: string;
  'aria-label'?: string;
}>;

export function Spinner({
  className,
  size = 'md',
  variant = 'primary',
  label,
  'aria-label': ariaLabel,
}: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label={ariaLabel ?? label ?? 'Loading'}
      className={clsx('inline-flex items-center gap-2', className)}
    >
      <svg
        className={spinnerVariants({ variant, size })}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      {label && <span className="text-muted-foreground text-sm">{label}</span>}
    </div>
  );
}
