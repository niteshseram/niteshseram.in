import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type SectionHeadingProps = Readonly<{
  children: ReactNode;
  className?: string;
}>;

export function SectionHeading({ children, className }: SectionHeadingProps) {
  return (
    <h2
      className={cn(
        'mb-5',
        'font-serif text-2xl font-medium',
        'text-foreground/90',
        className,
      )}
    >
      {children}
    </h2>
  );
}
