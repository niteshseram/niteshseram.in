import { ContentSection } from '@/components/ui/content-section';
import { TIMELINE } from '@/data/timeline';
import { cn } from '@/lib/utils';

export function TimelineSection() {
  return (
    <ContentSection ariaLabel="Timeline" title="How I got here">
      <ol className="flex flex-col gap-y-9">
        {TIMELINE.map((group) => (
          <li
            key={group.year}
            className="grid grid-cols-[3.5rem_minmax(0,1fr)] gap-4"
          >
            <div
              className={cn(
                'font-mono text-sm font-medium tabular-nums',
                'text-muted-foreground',
              )}
            >
              {group.year}
            </div>
            <ul className="flex flex-col gap-y-6">
              {group.entries.map((entry) => (
                <li key={entry.title}>
                  <p
                    className={cn(
                      'text-[11px] font-medium uppercase tracking-[0.12em]',
                      'text-muted-foreground',
                    )}
                  >
                    {entry.tag}
                  </p>
                  <h3
                    className={cn(
                      'mt-1.5',
                      'text-base font-medium leading-6 tracking-[-0.01em]',
                      'text-foreground',
                    )}
                  >
                    {entry.title}
                  </h3>
                  <p
                    className={cn(
                      'max-w-[56ch]',
                      'mt-1.5',
                      'text-[0.9375rem] leading-6',
                      'text-muted-foreground',
                    )}
                  >
                    {entry.description}
                  </p>
                  {entry.highlights ? (
                    <ul
                      className={cn(
                        'flex max-w-[56ch] flex-col gap-y-2.5',
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
                            'text-sm leading-[1.65]',
                            'text-muted-foreground before:bg-muted-foreground/55',
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
