'use client';

import { useRef } from 'react';

import { ScrollProgressRail } from '@/components/scroll-progress-rail';
import { TIMELINE } from '@/data/timeline';
import { cn } from '@/lib/utils';

export function TimelineSection() {
  const railRef = useRef<HTMLOListElement>(null);

  return (
    <section
      aria-label="Timeline"
      className={cn('max-w-2xl mx-auto', 'px-4.5 py-12')}
    >
      <h2
        className={cn(
          'mb-2',
          'font-serif text-2xl font-medium',
          'text-foreground',
        )}
      >
        How I got here
      </h2>
      <p
        className={cn(
          'mb-8 max-w-[60ch]',
          'leading-relaxed',
          'text-muted-foreground',
        )}
      >
        Year by year, the moments that got me to where I am now.
      </p>
      <ol ref={railRef} className="relative flex flex-col gap-y-10">
        <ScrollProgressRail
          targetRef={railRef}
          className="absolute top-2 bottom-2 left-[5px] w-px"
        />
        {TIMELINE.map((group, index) => (
          <li key={group.year} className="relative pl-6 sm:pl-8">
            {index === 0 && (
              <>
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute top-0 -left-1 size-[19px]',
                    'rounded-full bg-brand/20 blur-[2px]',
                  )}
                />
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute top-[3px] left-0 size-[11px]',
                    'rounded-full bg-brand/70',
                    'animate-ping',
                  )}
                />
              </>
            )}
            <span
              aria-hidden="true"
              className={cn(
                'absolute top-[3px] left-0 size-[11px]',
                'rounded-full border border-border',
                'bg-background',
              )}
            >
              <span
                className={cn(
                  'absolute inset-[2px]',
                  'rounded-full',
                  'bg-brand',
                )}
              />
            </span>
            <div
              className={cn(
                'font-mono text-xs uppercase tracking-[0.14em] tabular-nums',
                'text-brand',
              )}
            >
              {group.year}
            </div>
            <ul className="mt-4 flex flex-col gap-y-5">
              {group.entries.map((entry) => (
                <li key={entry.title} className={cn('relative pl-3 sm:pl-5')}>
                  <div
                    className={cn(
                      'flex items-center gap-x-2',
                      'font-mono text-[10px] uppercase tracking-[0.1em]',
                      'text-muted-foreground',
                    )}
                  >
                    {entry.tag}
                  </div>
                  <h3
                    className={cn(
                      'mt-1',
                      'text-base font-medium',
                      'text-foreground',
                    )}
                  >
                    {entry.title}
                  </h3>
                  <p
                    className={cn(
                      'mt-1.5 max-w-[60ch]',
                      'text-base leading-relaxed',
                      'text-muted-foreground',
                    )}
                  >
                    {entry.description}
                  </p>
                  {entry.highlights && (
                    <ul
                      className={cn('mt-3 flex flex-col gap-y-2 max-w-[60ch]')}
                    >
                      {entry.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className={cn(
                            'relative pl-4',
                            'before:absolute before:top-[9px] before:left-1 before:size-1',
                            'before:rounded-full before:bg-muted-foreground/50',
                            'text-base leading-relaxed',
                            'text-muted-foreground',
                          )}
                        >
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
