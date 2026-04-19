import { cn } from '@/lib/utils';

import { SectionHeading } from '../section-heading';
import { GithubContribution } from './github-contribution';

export function GithubContributionSection() {
  return (
    <section
      className={cn('max-w-2xl', 'mx-auto px-4.5 py-12')}
      aria-label="GitHub contributions"
    >
      <SectionHeading>GitHub Contributions</SectionHeading>
      <GithubContribution />
    </section>
  );
}
