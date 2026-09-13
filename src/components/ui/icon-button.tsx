'use client';

import type { ClassValue } from 'clsx';
import type { ComponentProps, ReactNode } from 'react';

import { cn } from '@/lib/utils';

import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';

type Props = Omit<
  ComponentProps<'button'>,
  'aria-label' | 'children' | 'className'
> & {
  label: string;
  icon: ReactNode;
  tooltip?: ReactNode;
  size?: 'sm' | 'md';
  className?: ClassValue;
};

export function IconButton({
  label,
  icon,
  tooltip,
  size = 'md',
  className,
  disabled,
  type = 'button',
  ...props
}: Props) {
  return (
    <Tooltip disabled={disabled}>
      <TooltipTrigger
        render={
          <button
            {...props}
            type={type}
            disabled={disabled}
            aria-label={label}
            className={cn(
              'inline-flex shrink-0 items-center justify-center',
              size === 'sm' ? 'size-8' : 'size-11',
              'rounded-sm',
              'text-muted-foreground',
              'cursor-pointer',
              'transition-colors',
              'hover:bg-muted hover:text-foreground disabled:cursor-default disabled:opacity-50',
              className,
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                'flex size-4 items-center justify-center',
                '[&>svg]:size-full',
              )}
            >
              {icon}
            </span>
          </button>
        }
      />
      <TooltipContent>{tooltip ?? label}</TooltipContent>
    </Tooltip>
  );
}
