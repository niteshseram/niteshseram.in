import { PiArrowUpRight, PiGithubLogo } from 'react-icons/pi';

import { Button } from '@/components/ui/button';
import { PROJECTS } from '@/data/projects';
import { cn } from '@/lib/utils';

import { SectionHeading } from './section-heading';

export function ProjectsSection() {
  return (
    <section
      id="projects"
      aria-label="Projects"
      className={cn('max-w-2xl mx-auto scroll-mt-13', 'px-4.5 py-12')}
    >
      <SectionHeading>Things I&apos;ve built</SectionHeading>
      <ul className={cn('grid gap-4', 'sm:grid-cols-2')}>
        {PROJECTS.map((project) => (
          <li key={project.name}>
            <article
              className={cn(
                'group relative flex h-full flex-col',
                'p-5',
                'overflow-hidden rounded-lg border border-border',
                'bg-surface/30',
                'transition-colors',
                'hover:border-brand/40',
              )}
            >
              <div
                aria-hidden="true"
                className={cn(
                  'pointer-events-none absolute -top-20 -right-20 size-40',
                  'rounded-full bg-brand/10 blur-3xl opacity-0',
                  'transition-opacity',
                  'group-hover:opacity-100',
                )}
              />
              <div
                className={cn(
                  'relative flex items-start justify-between gap-3',
                )}
              >
                <div className="min-w-0">
                  <span
                    className={cn(
                      'font-mono text-[10px] uppercase tracking-[0.12em]',
                      'text-muted-foreground/80',
                    )}
                  >
                    {project.tagline}
                  </span>
                  <h3
                    className={cn(
                      'mt-1',
                      'font-serif text-xl leading-tight',
                      'text-foreground',
                    )}
                  >
                    {project.name}
                  </h3>
                </div>
                <div
                  className={cn(
                    'flex shrink-0 items-center gap-x-0.5',
                    '-mr-1',
                  )}
                >
                  <Button
                    href={project.githubUrl}
                    aria-label={`${project.name} source on GitHub`}
                    icon={<PiGithubLogo />}
                    isLabelHidden={true}
                    label="View source on GitHub"
                    size="xs"
                    tooltip="View source"
                    variant="ghost"
                  />
                  {project.liveUrl && (
                    <Button
                      href={project.liveUrl}
                      aria-label={`Visit ${project.name}`}
                      icon={<PiArrowUpRight />}
                      isLabelHidden={true}
                      label={`Visit ${project.name}`}
                      size="xs"
                      tooltip="Visit site"
                      variant="ghost"
                    />
                  )}
                </div>
              </div>
              <p
                className={cn(
                  'relative mt-3',
                  'text-sm leading-relaxed',
                  'text-muted-foreground',
                )}
              >
                {project.description}
              </p>
              <ul
                className={cn(
                  'relative mt-auto flex flex-wrap items-center gap-1.5 pt-4',
                )}
              >
                {project.tech.map((item) => (
                  <li
                    key={item}
                    className={cn(
                      'px-2 py-0.5',
                      'rounded-full border border-border',
                      'font-mono text-[10px]',
                      'text-muted-foreground',
                    )}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
