import { PiBarbell, PiFilmSlate } from 'react-icons/pi';

import { cn } from '@/lib/utils';

const ITEMS = [
  {
    icon: PiBarbell,
    title: 'At the gym',
    description:
      'A lot of my week runs through the gym. It\u2019s where I clear my head.',
  },
  {
    icon: PiFilmSlate,
    title: 'On the couch',
    description:
      'A legitimate hobby. Netflix, slow evenings, and nothing to prove.',
  },
];

export function OffTheClock() {
  return (
    <section
      aria-label="Off the clock"
      className={cn('max-w-2xl mx-auto', 'px-4.5 py-12')}
    >
      <h2
        className={cn(
          'mb-5',
          'font-serif text-2xl font-medium',
          'text-foreground/90',
        )}
      >
        Off the clock
      </h2>
      <p
        className={cn(
          'mb-6 max-w-[60ch]',
          'leading-relaxed',
          'text-muted-foreground',
        )}
      >
        Life outside work isn&apos;t all code. A few things I fall back into
        when the laptop closes.
      </p>
      <ul className={cn('grid gap-3', 'sm:grid-cols-2')}>
        {ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.title}>
              <div
                className={cn(
                  'flex h-full gap-x-3',
                  'p-4',
                  'rounded-lg border border-border',
                  'bg-surface/30',
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    'inline-flex shrink-0 items-center justify-center size-8',
                    'rounded-md border border-border',
                    'bg-background text-brand',
                  )}
                >
                  <Icon className="size-4" />
                </span>
                <div className="flex flex-col">
                  <span
                    className={cn('text-sm font-medium', 'text-foreground')}
                  >
                    {item.title}
                  </span>
                  <p
                    className={cn(
                      'mt-1',
                      'text-base leading-relaxed',
                      'text-muted-foreground',
                    )}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
