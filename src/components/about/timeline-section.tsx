import { ContentSection } from '@/components/ui/content-section';
import { TIMELINE } from '@/data/timeline';
import { cn } from '@/lib/utils';

export function TimelineSection() {
  return (
    <ContentSection ariaLabel="Timeline" title="How I got here">
      <ol className={cn('flex flex-col gap-y-10')}>
        {TIMELINE.map((group, groupIndex) => (
          <li key={group.year}>
            <div
              className={cn(
                'grid grid-cols-[2rem_minmax(0,1fr)_auto] items-center gap-x-3',
                'pb-3',
                'border-b',
                'border-border/55',
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  'font-mono text-[0.6875rem] font-medium tabular-nums',
                  'text-brand',
                )}
              >
                {String(groupIndex + 1).padStart(2, '0')}
              </span>
              <h3
                className={cn(
                  'font-mono text-sm font-semibold tabular-nums',
                  'text-foreground',
                )}
              >
                {group.year}
              </h3>
              <span
                className={cn(
                  'font-mono text-[0.625rem] tabular-nums',
                  'text-muted-foreground',
                )}
              >
                {group.entries.length}{' '}
                {group.entries.length === 1 ? 'entry' : 'entries'}
              </span>
            </div>
            <ul className={cn('flex flex-col gap-y-7', 'mt-5 pl-11')}>
              {group.entries.map((entry) => (
                <li key={entry.title}>
                  <p
                    className={cn(
                      'font-mono text-[0.625rem] font-medium tracking-[0.1em] uppercase',
                      'text-brand',
                    )}
                  >
                    {entry.tag}
                  </p>
                  <h4
                    className={cn(
                      'mt-2',
                      'text-base font-semibold leading-6 tracking-[-0.01em]',
                      'text-foreground',
                    )}
                  >
                    {entry.title}
                  </h4>
                  <p
                    className={cn(
                      'max-w-[54ch]',
                      'mt-1.5',
                      'text-sm leading-6',
                      'text-muted-foreground',
                    )}
                  >
                    {entry.description}
                  </p>
                  {entry.highlights ? (
                    <ul
                      className={cn(
                        'flex max-w-[54ch] flex-col gap-y-2',
                        'mt-3',
                      )}
                    >
                      {entry.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className={cn(
                            'relative before:absolute before:top-[0.65em] before:left-0 before:size-1',
                            'pl-4',
                            'before:rounded-full',
                            'text-sm leading-6',
                            'text-muted-foreground before:bg-brand/60',
                          )}
                        >
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </ContentSection>
  );
}
