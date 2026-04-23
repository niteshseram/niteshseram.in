import { PiGitCommit } from 'react-icons/pi';

import { ScrollProgressRail } from '@/components/scroll-progress-rail';
import { TIMELINE } from '@/data/timeline';
import { cn } from '@/lib/utils';

export function TimelineSection() {
  return (
    <section
      aria-label="Timeline"
      className={cn('max-w-2xl mx-auto', 'px-4.5 py-12')}
    >
      <p
        className={cn(
          'inline-flex items-center gap-x-1.5',
          'font-mono text-xs',
          'text-muted-foreground',
        )}
      >
        <PiGitCommit aria-hidden="true" className="size-3.5 text-brand" />
        git log --timeline
      </p>
      <h2
        className={cn(
          'mt-3 mb-8',
          'font-serif text-[clamp(1.6rem,6vw,2rem)] leading-[1.15]',
          'text-foreground',
        )}
      >
        How I got <span className="italic text-brand">here</span>
      </h2>
      <ScrollProgressRail>
        {TIMELINE.map((group, groupIndex) => (
          <li key={group.year}>
            <div className="relative pl-8 sm:pl-10">
              {groupIndex === 0 && (
                <>
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute -top-1 -left-1 size-6',
                      'rounded-full bg-brand/20 blur-[2px]',
                    )}
                  />
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute top-0.5 left-0.5 size-3',
                      'rounded-full bg-brand/70',
                      'animate-ping',
                    )}
                  />
                </>
              )}
              <span
                aria-hidden="true"
                className={cn(
                  'absolute top-0 left-0 inline-flex items-center justify-center size-4',
                  'rounded-full bg-background text-brand',
                )}
              >
                <PiGitCommit className="size-4" />
              </span>
              <div
                className={cn(
                  'font-mono text-sm uppercase tracking-[0.14em] tabular-nums',
                  'text-brand',
                )}
              >
                {group.year}
              </div>
            </div>
            <ul className="mt-6 flex flex-col gap-y-8">
              {group.entries.map((entry) => (
                <li key={entry.title} className="relative pl-8 sm:pl-10">
                  <div
                    className={cn(
                      'font-mono text-xs uppercase tracking-[0.14em]',
                      'text-brand',
                    )}
                  >
                    {entry.tag}
                  </div>
                  <h3
                    className={cn(
                      'mt-2',
                      'font-serif text-xl leading-snug',
                      'text-foreground',
                    )}
                  >
                    {entry.title}
                  </h3>
                  <p
                    className={cn(
                      'mt-2 max-w-[60ch]',
                      'leading-relaxed',
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
                            'leading-relaxed',
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
      </ScrollProgressRail>
    </section>
  );
}
