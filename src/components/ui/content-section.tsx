import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type ContentSectionProps = Readonly<{
  ariaLabel: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  id?: string;
  title: ReactNode;
}>;

export function ContentSection({
  ariaLabel,
  children,
  className,
  contentClassName,
  id,
  title,
}: ContentSectionProps) {
  const headingId = id ? `${id}-heading` : undefined;

  return (
    <section
      id={id}
      aria-label={headingId ? undefined : ariaLabel}
      aria-labelledby={headingId}
      className={cn(
        'max-w-2xl scroll-mt-18',
        'mx-auto px-4.5 pb-16 sm:pb-20',
        className,
      )}
    >
      <div className="flex flex-col gap-y-6 sm:gap-y-7">
        <h2
          id={headingId}
          className={cn(
            'text-lg font-semibold leading-6 tracking-[-0.015em]',
            'text-foreground',
          )}
        >
          {title}
        </h2>
        <div className={contentClassName}>{children}</div>
      </div>
    </section>
  );
}
