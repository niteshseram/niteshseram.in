import { PiTerminalWindow } from 'react-icons/pi';

import { TECH_STACK_GROUPS } from '@/data/tech-stack';
import { cn } from '@/lib/utils';

export function DailyToolsSection() {
  return (
    <section
      aria-label="Daily tools"
      className={cn('max-w-2xl mx-auto', 'px-4.5 py-12')}
    >
      <p
        className={cn(
          'inline-flex items-center gap-x-1.5',
          'font-mono text-xs',
          'text-muted-foreground',
        )}
      >
        <PiTerminalWindow aria-hidden="true" className="size-3.5 text-brand" />
        ~/stack
      </p>
      <h2
        className={cn(
          'mt-3 mb-8',
          'font-serif text-[clamp(1.6rem,6vw,2rem)] leading-[1.15]',
          'text-foreground',
        )}
      >
        Daily <span className="italic text-brand">tools</span>
      </h2>
      <dl className="flex flex-col gap-y-5">
        {TECH_STACK_GROUPS.map((group) => (
          <div
            key={group.label}
            className={cn(
              'flex flex-col gap-y-2.5',
              'sm:flex-row sm:items-center sm:gap-x-5',
            )}
          >
            <dt
              className={cn(
                'shrink-0 sm:w-24',
                'font-mono text-[11px] uppercase tracking-[0.14em]',
                'text-muted-foreground',
              )}
            >
              {group.label}
            </dt>
            <dd className={cn('flex flex-wrap items-center gap-2', 'm-0')}>
              {group.items.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className={cn(
                    'inline-flex items-center gap-x-1.5',
                    'px-3 py-1.5',
                    'rounded-full border border-border',
                    'bg-surface/40',
                    'font-mono text-xs',
                    'text-foreground',
                  )}
                >
                  <Icon aria-hidden="true" className="size-3.5 shrink-0" />
                  {label}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
