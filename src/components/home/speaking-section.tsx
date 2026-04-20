import { PiArrowUpRight, PiPlayFill } from 'react-icons/pi';

import { Anchor } from '@/components/ui/anchor';
import { TALKS } from '@/data/talks';
import { cn } from '@/lib/utils';

import { SectionHeading } from './section-heading';

export function SpeakingSection() {
  return (
    <section
      aria-label="Speaking"
      className={cn('max-w-2xl mx-auto', 'px-4.5 py-12')}
    >
      <SectionHeading>On stage</SectionHeading>
      <ul className="flex flex-col gap-y-8">
        {TALKS.map((talk) => (
          <li key={talk.youtubeId}>
            <Anchor
              href={talk.href}
              aria-label={`Watch ${talk.title} on YouTube`}
              variant="unstyled"
              weight="inherit"
              className={cn(
                'group flex gap-4 sm:gap-5',
                'p-3 sm:p-4',
                'rounded-lg border border-border',
                'bg-surface/30',
                'transition-colors',
                'hover:border-brand/40',
              )}
            >
              <div
                className={cn(
                  'relative shrink-0 aspect-video w-32 sm:w-52 overflow-hidden',
                  'rounded-md',
                  'bg-muted',
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  src={`https://img.youtube.com/vi/${talk.youtubeId}/maxresdefault.jpg`}
                  className={cn(
                    'size-full object-cover',
                    'transition-transform duration-500',
                    'group-hover:scale-[1.05]',
                  )}
                />
                <div
                  aria-hidden="true"
                  className={cn(
                    'absolute inset-0',
                    'flex items-center justify-center',
                    'bg-background/20',
                  )}
                >
                  <span
                    className={cn(
                      'inline-flex items-center justify-center size-8 sm:size-10',
                      'rounded-full',
                      'bg-brand/95 text-brand-foreground shadow-md shadow-black/30',
                      'transition-transform',
                      'group-hover:scale-110',
                    )}
                  >
                    <PiPlayFill className="size-3.5 sm:size-4 translate-x-[1px]" />
                  </span>
                </div>
              </div>

              <div className={cn('flex flex-1 flex-col min-w-0', 'py-0.5')}>
                <div
                  className={cn(
                    'flex items-center gap-x-2',
                    'font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.1em]',
                    'text-muted-foreground',
                  )}
                >
                  <span>{talk.event}</span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">{talk.year}</span>
                </div>
                <h3
                  className={cn(
                    'mt-1.5',
                    'text-base leading-snug tracking-tight font-medium',
                    'text-foreground',
                    'transition-colors',
                    'group-hover:text-brand',
                  )}
                >
                  {talk.title}
                </h3>
                <p
                  className={cn(
                    'mt-2',
                    'text-base leading-relaxed line-clamp-3',
                    'text-muted-foreground',
                  )}
                >
                  {talk.brief}
                </p>
                <span
                  className={cn(
                    'mt-auto inline-flex items-center gap-x-1 pt-2.5',
                    'text-xs sm:text-sm font-medium',
                    'text-foreground',
                    'transition-colors',
                    'group-hover:text-brand',
                  )}
                >
                  Watch the talk
                  <PiArrowUpRight
                    aria-hidden="true"
                    className={cn(
                      'size-3.5 sm:size-4',
                      'transition-transform',
                      'group-hover:-translate-y-0.5 group-hover:translate-x-0.5',
                    )}
                  />
                </span>
              </div>
            </Anchor>
          </li>
        ))}
      </ul>
    </section>
  );
}
