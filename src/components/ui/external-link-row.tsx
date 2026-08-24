import type { ClassValue } from 'clsx';
import { PiArrowUpRight } from 'react-icons/pi';

import { cn } from '@/lib/utils';

export const externalLinkTitleClassName = cn(
  'transition-colors',
  'group-hover/external-link:text-brand group-focus-within/external-link:text-brand',
);

export const externalLinkArrowClassName = cn(
  'transition-transform duration-200 ease-out',
  'group-hover/external-link:translate-x-0.5 group-hover/external-link:-translate-y-0.5 group-focus-within/external-link:translate-x-0.5 group-focus-within/external-link:-translate-y-0.5',
);

type Props = Readonly<{
  className?: ClassValue;
}>;

export function ExternalLinkArrow({ className }: Props) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-flex shrink-0 items-center justify-center size-8',
        '-mt-1 -mr-1',
        'text-muted-foreground',
        'pointer-events-none',
        externalLinkArrowClassName,
        className,
      )}
    >
      <PiArrowUpRight className="size-4" />
    </span>
  );
}
