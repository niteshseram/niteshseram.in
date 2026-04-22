import { PiArrowUpRight } from 'react-icons/pi';

import { Anchor } from '@/components/ui/anchor';
import { EXPERIENCES } from '@/data/experience';
import { cn } from '@/lib/utils';

import { SectionHeading } from './section-heading';

export function ExperienceSection() {
  return (
    <section
      id="experience"
      aria-label="Experience"
      className={cn('max-w-2xl mx-auto scroll-mt-13', 'px-4.5 py-12')}
    >
      <SectionHeading>Where I’ve been</SectionHeading>
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
              'relative pl-6 sm:pl-8',
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
                      'flex flex-wrap max-sm:flex-col items-baseline justify-between gap-x-3 gap-y-0.5',
                    )}
                  >
                    <span
                      className={cn(
                        'text-base font-medium',
                        role.current ? 'text-foreground' : 'text-foreground/90',
                      )}
                    >
                      {role.title}
                    </span>
                    <span
                      className={cn(
                        'inline-flex items-center gap-x-1.5',
                        'font-mono text-[11px] uppercase tracking-[0.08em] tabular-nums',
                        role.current ? 'text-brand' : 'text-muted-foreground',
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
                      'mt-2',
                      'text-base leading-relaxed',
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
