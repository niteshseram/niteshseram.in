import { PiGitCommit } from 'react-icons/pi';

import { PRINCIPLES } from '@/data/about';
import { cn } from '@/lib/utils';

export function PrinciplesSection() {
  return (
    <section
      aria-label="Principles"
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
        git log --principles
      </p>
      <h2
        className={cn(
          'mt-3 mb-8',
          'font-serif text-[clamp(1.6rem,6vw,2rem)] leading-[1.15]',
          'text-foreground',
        )}
      >
        Three quiet <span className="italic text-brand">principles</span>
      </h2>
      <ol className="relative flex flex-col gap-y-8">
        <span
          aria-hidden="true"
          className={cn('absolute top-2 bottom-2 left-2 w-px', 'bg-border')}
        />
        {PRINCIPLES.map((principle) => (
          <li key={principle.hash} className="relative pl-8 sm:pl-10">
            <span
              aria-hidden="true"
              className={cn(
                'absolute top-0.5 left-0 inline-flex items-center justify-center size-4',
                'rounded-full bg-background text-brand',
              )}
            >
              <PiGitCommit className="size-4" />
            </span>
            <div
              className={cn(
                'flex flex-wrap items-baseline gap-x-2',
                'font-mono text-xs',
              )}
            >
              <span className="text-muted-foreground">{principle.hash}</span>
              <span className="text-brand">{principle.type}</span>
            </div>
            <h3
              className={cn(
                'mt-2',
                'font-serif text-xl leading-snug',
                'text-foreground',
              )}
            >
              {principle.title}
            </h3>
            <p
              className={cn(
                'mt-2 max-w-[60ch]',
                'leading-relaxed',
                'text-muted-foreground',
              )}
            >
              {principle.description}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
