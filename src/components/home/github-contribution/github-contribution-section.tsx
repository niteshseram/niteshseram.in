import { PiGitCommit } from 'react-icons/pi';

import { cn } from '@/lib/utils';

import { SectionHeading } from '../section-heading';
import { GithubContribution } from './github-contribution';

export function GithubContributionSection() {
  return (
    <section
      className={cn('max-w-2xl', 'mx-auto px-4.5 py-12')}
      aria-label="GitHub contributions"
    >
      <SectionHeading eyebrow="git log --graph" icon={PiGitCommit}>
        A year on <span className="italic text-brand">GitHub</span>
      </SectionHeading>
      <GithubContribution />
    </section>
  );
}
