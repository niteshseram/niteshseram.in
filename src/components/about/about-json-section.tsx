import { PiCodeSimple } from 'react-icons/pi';

import { ABOUT_FACTS } from '@/data/about';
import { cn } from '@/lib/utils';

export function AboutJsonSection() {
  const maxKeyLength = ABOUT_FACTS.reduce(
    (max, fact) => Math.max(max, fact.key.length),
    0,
  );

  return (
    <section
      aria-label="For the curious"
      className={cn('max-w-2xl mx-auto', 'px-4.5 py-12')}
    >
      <p
        className={cn(
          'inline-flex items-center gap-x-1.5',
          'font-mono text-xs',
          'text-muted-foreground',
        )}
      >
        <PiCodeSimple aria-hidden="true" className="size-3.5 text-brand" />
        cat about.json
      </p>
      <h2
        className={cn(
          'mt-3 mb-6',
          'font-serif text-[clamp(1.6rem,6vw,2rem)] leading-[1.15]',
          'text-foreground',
        )}
      >
        For the <span className="italic text-brand">curious</span>
      </h2>
      <figure
        className={cn(
          'overflow-hidden',
          'rounded-xl border border-border',
          'bg-code',
        )}
      >
        <div
          className={cn(
            'flex items-center gap-x-2 h-9.5',
            'px-4',
            'border-b border-border',
            'bg-code-bar',
            'text-foreground/80',
          )}
        >
          <PiCodeSimple aria-hidden="true" className="size-3.5" />
          <figcaption className="font-mono text-xs">about.json</figcaption>
        </div>
        <pre
          className={cn(
            'overflow-x-auto',
            'px-4 py-4',
            'font-mono text-[0.8125rem] leading-relaxed',
            'text-code-foreground',
          )}
        >
          <span className="text-muted-foreground">{'{'}</span>
          {'\n'}
          {ABOUT_FACTS.map((fact, index) => {
            const isLast = index === ABOUT_FACTS.length - 1;
            const padding = ' '.repeat(maxKeyLength - fact.key.length);
            return (
              <span key={fact.key}>
                {'  '}
                <span className="text-brand">&quot;{fact.key}&quot;</span>
                {padding}
                <span className="text-muted-foreground">: </span>
                <span className="text-foreground/90">
                  &quot;{fact.value}&quot;
                </span>
                {!isLast && <span className="text-muted-foreground">,</span>}
                {'\n'}
              </span>
            );
          })}
          <span className="text-muted-foreground">{'}'}</span>
        </pre>
      </figure>
    </section>
  );
}
