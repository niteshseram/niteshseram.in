import { ArrowUpRight } from 'lucide';

import { ProjectDoodle } from '@/components/illustrations/project-doodle';
import { Anchor } from '@/components/ui/anchor';
import { ContentSection } from '@/components/ui/content-section';
import { SiteIcon } from '@/components/ui/site-icon';
import { PROJECTS_LABEL } from '@/config/site';
import { PROJECTS } from '@/data/projects';
import { cn } from '@/lib/utils';

const homepageProjects = PROJECTS.filter((project) => project.featured);

export function ProjectsSection() {
  return (
    <ContentSection
      id="projects"
      ariaLabel={PROJECTS_LABEL}
      title={PROJECTS_LABEL}
    >
      <ul className="focus-list">
        {homepageProjects.map((project) => {
          return (
            <li
              key={project.name}
              className={cn('border-b last:border-b-0', 'border-divider')}
            >
              <Anchor
                href={project.liveUrl ?? project.githubUrl ?? '/about'}
                variant="unstyled"
                weight="normal"
                className={cn(
                  'group grid grid-cols-[2.5rem_minmax(0,1fr)_1rem] items-start gap-x-4',
                  '-mx-2 px-2 py-4',
                  'rounded-sm',
                )}
              >
                <ProjectDoodle name={project.name} />
                <div>
                  <h3 className={cn('text-base font-normal leading-6')}>
                    {project.name}
                  </h3>
                  <p
                    className={cn(
                      'mt-1',
                      'text-sm leading-6',
                      'text-muted-foreground',
                    )}
                  >
                    {project.summary}
                  </p>
                </div>
                <SiteIcon
                  icon={ArrowUpRight}
                  aria-hidden="true"
                  className={cn('size-4', 'mt-1', 'text-muted-foreground')}
                  strokeWidth={1.5}
                />
              </Anchor>
            </li>
          );
        })}
      </ul>
    </ContentSection>
  );
}
