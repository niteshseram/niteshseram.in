import { ArrowUpRight } from 'lucide-react';

import { Anchor } from '@/components/ui/anchor';
import { AUTHOR, SITE_TAGLINE } from '@/config/site';
import { cn } from '@/lib/utils';

export function Hero() {
  return (
    <section
      aria-labelledby="home-title"
      className={cn(
        'max-w-2xl',
        'mx-auto px-4.5 pt-16 pb-16 sm:pt-20 sm:pb-20',
      )}
    >
      <p
        className={cn(
          'flex items-center gap-2.5',
          'font-mono text-[0.6875rem] font-medium tracking-[0.12em] uppercase',
          'text-brand',
        )}
      >
        <span aria-hidden="true" className={cn('h-px w-7', 'bg-brand')} />
        Interfaces / Systems / Craft
      </p>
      <h1
        id="home-title"
        className={cn(
          'relative isolate max-w-[14em]',
          'mt-6',
          'text-[2.25rem] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-[2.75rem]',
          'text-foreground',
        )}
      >
        <span
          aria-hidden="true"
          className={cn('absolute inset-0 -z-10', 'pointer-events-none')}
        >
          <span
            className={cn(
              'absolute top-1/2 left-1/2 h-[1.8em] w-[92%] -translate-x-1/2 -translate-y-1/2',
              'rounded-[50%] opacity-[0.22] blur-[2rem] mix-blend-multiply dark:opacity-[0.3] dark:mix-blend-screen',
              'bg-[var(--hero-glow)]',
            )}
          />
          <span
            className={cn(
              'absolute top-[60%] left-1/2 h-[0.65em] w-[68%] -translate-x-1/2 -translate-y-1/2',
              'rounded-[50%] opacity-[0.34] blur-[1.1rem] mix-blend-multiply dark:opacity-[0.44] dark:mix-blend-screen',
              'bg-[var(--hero-glow)]',
            )}
          />
        </span>
        {SITE_TAGLINE}
      </h1>
      <p
        className={cn(
          'max-w-[44ch]',
          'mt-7',
          'text-lg font-medium leading-[1.5] tracking-[-0.015em]',
          'text-foreground',
        )}
      >
        I’m {AUTHOR.name}, a {AUTHOR.jobTitle.toLowerCase()} based in{' '}
        {AUTHOR.location}.
      </p>
      <p
        className={cn(
          'max-w-[54ch]',
          'mt-4',
          'text-base leading-7 tracking-[-0.005em]',
          'text-muted-foreground',
        )}
      >
        I build frontend products with an eye for performance, maintainable
        systems, and the interaction details that make software feel clear and
        dependable.
      </p>
      <div
        className={cn(
          'grid gap-4 sm:grid-cols-2 sm:gap-6',
          'mt-8 pt-4',
          'border-t',
          'border-border',
        )}
      >
        <div>
          <p
            className={cn(
              'font-mono text-[0.625rem] font-medium tracking-[0.12em] uppercase',
              'text-muted-foreground',
            )}
          >
            Currently
          </p>
          <Anchor
            href={AUTHOR.employer.url}
            className={cn(
              'inline-flex items-center gap-1',
              'mt-1.5',
              'text-sm',
            )}
            variant="primary"
            weight="medium"
          >
            {AUTHOR.employer.name}
            <ArrowUpRight aria-hidden="true" className="size-3.5" />
          </Anchor>
        </div>
        <div>
          <p
            className={cn(
              'font-mono text-[0.625rem] font-medium tracking-[0.12em] uppercase',
              'text-muted-foreground',
            )}
          >
            Focus
          </p>
          <p className={cn('mt-1.5', 'text-sm', 'text-foreground')}>
            Product frontend · Performance · UI systems
          </p>
        </div>
      </div>
    </section>
  );
}
