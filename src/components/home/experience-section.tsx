import { PiArrowUpRight } from 'react-icons/pi';

import { Anchor } from '@/components/ui/anchor';
import { EXPERIENCES } from '@/data/experience';
import { cn } from '@/lib/utils';

export function ExperienceSection() {
  return (
    <section
      id="experience"
      aria-label="Experience"
      className={cn('max-w-2xl mx-auto scroll-mt-13', 'px-4.5 py-12')}
    >
      <h2
        className={cn(
          'mb-5',
          'font-serif text-2xl font-medium',
          'text-muted-foreground',
        )}
      >
        Where I&apos;ve been
      </h2>
      <ol className="relative">
        <div
          aria-hidden="true"
          className={cn(
            'absolute top-1.5 bottom-1.5 left-[5px] w-px',
            'bg-border',
          )}
        />
        {EXPERIENCES.map((experience, index) => (
          <li
            key={experience.company}
            className={cn(
              'relative pl-7',
              index !== EXPERIENCES.length - 1 && 'pb-8',
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                'absolute top-1.5 left-0 size-[11px]',
                'rounded-full border border-border',
                'bg-background',
              )}
            >
              <span
                className={cn(
                  'absolute inset-[2px]',
                  'rounded-full',
                  experience.roles[0].current ? 'bg-brand' : 'bg-muted',
                )}
              />
            </span>

            <div className={cn('flex items-baseline gap-x-2')}>
              {experience.href ? (
                <Anchor
                  href={experience.href}
                  variant="unstyled"
                  weight="inherit"
                  className={cn(
                    'group inline-flex items-center gap-x-1',
                    'font-serif text-lg',
                    'text-foreground',
                    'transition-colors',
                    'hover:text-brand',
                  )}
                >
                  {experience.company}
                  <PiArrowUpRight
                    aria-hidden="true"
                    className={cn(
                      'size-3.5',
                      'text-muted-foreground',
                      'transition-all',
                      'group-hover:text-brand group-hover:-translate-y-0.5 group-hover:translate-x-0.5',
                    )}
                  />
                </Anchor>
              ) : (
                <span className={cn('font-serif text-lg', 'text-foreground')}>
                  {experience.company}
                </span>
              )}
            </div>

            <ul className="mt-3 flex flex-col gap-y-4">
              {experience.roles.map((role) => (
                <li key={role.title + role.start}>
                  <div
                    className={cn(
                      'flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5',
                    )}
                  >
                    <span
                      className={cn(
                        'text-sm font-medium',
                        role.current
                          ? 'text-foreground'
                          : 'text-muted-foreground',
                      )}
                    >
                      {role.title}
                    </span>
                    <span
                      className={cn(
                        'inline-flex items-center gap-x-1.5',
                        'font-mono text-[11px] uppercase tracking-[0.08em] tabular-nums',
                        role.current
                          ? 'text-brand'
                          : 'text-muted-foreground/70',
                      )}
                    >
                      {role.current && (
                        <span
                          aria-hidden="true"
                          className={cn(
                            'relative inline-flex size-1.5',
                            'rounded-full',
                            'bg-brand',
                          )}
                        >
                          <span
                            className={cn(
                              'absolute inset-0',
                              'rounded-full',
                              'bg-brand opacity-75',
                              'animate-ping',
                            )}
                          />
                        </span>
                      )}
                      {role.start} — {role.end}
                    </span>
                  </div>
                  <p
                    className={cn(
                      'mt-1.5',
                      'text-sm leading-relaxed',
                      'text-muted-foreground',
                    )}
                  >
                    {role.brief}
                  </p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
