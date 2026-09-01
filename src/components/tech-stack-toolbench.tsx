import { TECH_STACK_GROUPS } from '@/data/tech-stack';
import { cn } from '@/lib/utils';

type Props = Readonly<{
  className?: string;
  label?: string;
}>;

export function TechStackToolbench({
  className,
  label = 'toolbench.config',
}: Props) {
  return (
    <div
      className={cn(
        'overflow-hidden',
        'rounded-xl border shadow-sm',
        'bg-surface border-border shadow-shadow/5',
        className,
      )}
    >
      <div
        className={cn(
          'flex items-center justify-between gap-4',
          'px-4 py-3',
          'border-b',
          'font-mono text-[0.6875rem] leading-4',
          'text-muted-foreground border-border bg-muted/45',
        )}
      >
        <span className={cn('inline-flex items-center gap-1.5')}>
          <span
            aria-hidden="true"
            className={cn('size-1.5', 'rounded-full', 'bg-brand')}
          />
          {label}
        </span>
      </div>
      <div className={cn('grid gap-3 sm:grid-cols-2', 'p-3')}>
        {TECH_STACK_GROUPS.map((group, groupIndex) => {
          const toolCountLabel = `${group.items.length} ${group.items.length === 1 ? 'tool' : 'tools'}`;

          return (
            <section
              key={group.label}
              aria-labelledby={`${label}-group-${groupIndex}`}
              className={cn(
                'min-w-0',
                'p-4 sm:p-5',
                'rounded-lg',
                'bg-muted/35',
              )}
            >
              <div className={cn('flex items-center justify-between gap-3')}>
                <h3
                  id={`${label}-group-${groupIndex}`}
                  className={cn(
                    'font-mono text-xs font-semibold tracking-[0.08em] uppercase',
                    'text-foreground',
                  )}
                >
                  {group.label}
                </h3>
                <span
                  className={cn(
                    'font-mono text-[0.625rem] tabular-nums',
                    'text-muted-foreground',
                  )}
                >
                  {toolCountLabel}
                </span>
              </div>
              <ul className={cn('grid grid-cols-2 gap-2', 'mt-4')}>
                {group.items.map(({ icon: Icon, label: itemLabel }) => (
                  <li
                    key={itemLabel}
                    className={cn(
                      'flex min-w-0 items-center gap-2',
                      'px-2.5 py-2',
                      'rounded-md',
                      'text-xs font-medium leading-4',
                      'bg-background/65 text-muted-foreground',
                    )}
                  >
                    <Icon
                      aria-hidden="true"
                      className={cn('size-3.5 shrink-0', 'text-brand')}
                    />
                    <span className={cn('truncate')}>{itemLabel}</span>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
