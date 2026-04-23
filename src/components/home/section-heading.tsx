import type { ReactNode } from 'react';
import type { IconType } from 'react-icons';

import { cn } from '@/lib/utils';

type SectionHeadingProps = Readonly<{
  children: ReactNode;
  className?: string;
  eyebrow: string;
  icon?: IconType;
}>;

export function SectionHeading({
  children,
  className,
  eyebrow,
  icon: Icon,
}: SectionHeadingProps) {
  return (
    <header className={cn('mb-8', className)}>
      <p
        className={cn(
          'inline-flex items-center gap-x-1.5',
          'font-mono text-xs',
          'text-muted-foreground',
        )}
      >
        {Icon ? (
          <Icon aria-hidden="true" className="size-3.5 text-brand" />
        ) : null}
        {eyebrow}
      </p>
      <h2
        className={cn(
          'mt-3',
          'font-serif text-[clamp(1.6rem,6vw,2rem)] leading-[1.15]',
          'text-foreground',
        )}
      >
        {children}
      </h2>
    </header>
  );
}
