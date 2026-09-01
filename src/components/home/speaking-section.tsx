import { ArrowUpRight, Play } from 'lucide-react';

import { Anchor } from '@/components/ui/anchor';
import { ContentSection } from '@/components/ui/content-section';
import { TALKS } from '@/data/talks';
import { cn } from '@/lib/utils';

export function SpeakingSection() {
  return (
    <ContentSection ariaLabel="Speaking" title="Speaking">
      <ul className={cn('flex flex-col gap-y-5')}>
        {TALKS.map((talk) => (
          <li key={talk.youtubeId}>
            <article
              className={cn(
                'group/poster relative isolate overflow-hidden',
                'p-5 sm:p-7',
                'rounded-lg border',
                'bg-brand-muted border-brand/35',
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  'absolute -top-5 -right-2 -z-10',
                  'font-mono text-[6.5rem] font-semibold leading-none tracking-[-0.08em] sm:text-[8rem]',
                  'text-brand/10',
                  'select-none',
                )}
              >
                {talk.year.slice(-2)}
              </span>
              <div
                className={cn(
                  'flex items-center justify-between gap-4',
                  'font-mono text-[0.6875rem] font-medium tracking-[0.12em] uppercase',
                  'text-brand',
                )}
              >
                <span>{talk.event}</span>
                <span>{talk.year}</span>
              </div>
              <h3
                className={cn(
                  'max-w-[19em]',
                  'mt-10',
                  'text-[1.375rem] font-semibold leading-[1.2] tracking-[-0.025em] sm:text-2xl',
                  'text-foreground',
                  'transition-colors',
                  'group-hover/poster:text-brand group-focus-within/poster:text-brand',
                )}
              >
                {talk.title}
              </h3>
              <p
                className={cn(
                  'max-w-[58ch]',
                  'mt-4',
                  'text-sm leading-6',
                  'text-muted-foreground',
                )}
              >
                {talk.brief}
              </p>
              <div
                className={cn(
                  'flex items-center justify-between gap-4',
                  'mt-7 pt-4',
                  'border-t',
                  'text-sm font-medium',
                  'text-foreground border-brand/25',
                )}
              >
                <span className={cn('inline-flex items-center gap-2')}>
                  <span
                    className={cn(
                      'inline-flex size-7 items-center justify-center',
                      'rounded-full',
                      'bg-brand text-brand-foreground',
                    )}
                  >
                    <Play aria-hidden="true" className="size-3 fill-current" />
                  </span>
                  Watch the recording
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className={cn(
                    'size-4',
                    'transition-transform duration-200',
                    'group-hover/poster:translate-x-0.5 group-hover/poster:-translate-y-0.5',
                  )}
                />
              </div>
              <Anchor
                href={talk.href}
                aria-label={`Watch ${talk.title} on YouTube`}
                className={cn('absolute inset-0 z-10')}
                variant="unstyled"
                weight="inherit"
              />
            </article>
          </li>
        ))}
      </ul>
    </ContentSection>
  );
}
