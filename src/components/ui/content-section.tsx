import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type ContentSectionProps = Readonly<{
  ariaLabel: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  id?: string;
  title: ReactNode;
  action?: ReactNode;
}>;

export function ContentSection({
  ariaLabel,
  children,
  className,
  contentClassName,
  id,
  title,
  action,
}: ContentSectionProps) {
  const headingId = id ? `${id}-heading` : undefined;
  return (
    <section
      id={id}
      aria-label={headingId ? undefined : ariaLabel}
      aria-labelledby={headingId}
      className={cn('site-container scroll-mt-8', 'pb-10 sm:pb-12', className)}
    >
      <div className={cn('flex items-center justify-between gap-4', 'mb-3')}>
        <h2
          id={headingId}
          className={cn(
            'text-sm font-normal leading-6',
            'text-muted-foreground',
          )}
        >
          {title}
        </h2>
        {action}
      </div>
      <div className={contentClassName}>{children}</div>
    </section>
  );
}
