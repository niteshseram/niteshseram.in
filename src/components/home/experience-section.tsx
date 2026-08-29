import { ArrowUpRight } from 'lucide-react';

import { Anchor } from '@/components/ui/anchor';
import { ContentSection } from '@/components/ui/content-section';
import { EXPERIENCES } from '@/data/experience';
import { cn } from '@/lib/utils';

export function ExperienceSection() {
  return (
    <ContentSection
      id="experience"
      ariaLabel="Experience"
      title="Work experience"
    >
      <ol className={cn('flex flex-col gap-y-10')}>
        {EXPERIENCES.map((experience, experienceIndex) => (
          <li key={experience.company}>
            <div
              className={cn(
                'grid grid-cols-[2rem_minmax(0,1fr)_auto] items-center gap-x-3',
                'pb-3',
                'border-b',
                'border-border/55',
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  'font-mono text-[0.6875rem] font-medium tabular-nums',
                  'text-brand',
                )}
              >
                {String(experienceIndex + 1).padStart(2, '0')}
              </span>
              <h3
                className={cn(
                  'text-base font-semibold leading-6 tracking-[-0.012em]',
                  'text-foreground',
                )}
              >
                {experience.company}
              </h3>
              {experience.href ? (
                <Anchor
                  href={experience.href}
                  aria-label={`Visit ${experience.company}`}
                  className={cn(
                    'inline-flex items-center gap-1',
                    'text-xs',
                    'text-muted-foreground',
                    'hover:text-foreground',
                  )}
                  variant="unstyled"
                  weight="normal"
                >
                  Company
                  <ArrowUpRight aria-hidden="true" className="size-3.5" />
                </Anchor>
              ) : null}
            </div>

            <ol className={cn('flex flex-col gap-y-6', 'mt-5')}>
              {experience.roles.map((role) => (
                <li
                  key={role.title + role.start}
                  className={cn(
                    'grid grid-cols-1 gap-x-5 sm:grid-cols-[6.5rem_minmax(0,1fr)]',
                    'pl-11',
                  )}
                >
                  <span
                    className={cn(
                      'hidden sm:block',
                      'pt-0.5',
                      'text-[0.6875rem] font-medium leading-5 tabular-nums',
                      role.current ? 'text-brand' : 'text-muted-foreground',
                    )}
                  >
                    {role.start}
                    <br />
                    {role.end}
                  </span>
                  <article>
                    <h4
                      className={cn(
                        'text-[0.9375rem] font-medium leading-5',
                        'text-foreground',
                      )}
                    >
                      {role.title}
                    </h4>
                    <span
                      className={cn(
                        'sm:hidden',
                        'mt-1',
                        'text-[0.6875rem] font-medium leading-4 tabular-nums',
                        role.current ? 'text-brand' : 'text-muted-foreground',
                      )}
                    >
                      {role.start} — {role.end}
                    </span>
                    <p
                      className={cn(
                        'max-w-[47ch]',
                        'mt-1.5',
                        'text-sm leading-6',
                        'text-muted-foreground',
                      )}
                    >
                      {role.brief}
                    </p>
                  </article>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </ContentSection>
  );
}
