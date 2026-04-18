import { cn } from '@/lib/utils';

import { GithubContribution } from './github-contribution';

export function GithubContributionSection() {
  return (
    <section
      className={cn('max-w-2xl', 'mx-auto px-4.5 py-12')}
      aria-label="GitHub contributions"
    >
      <h2
        className={cn(
          'mb-5',
          'font-serif text-2xl font-medium',
          'text-muted-foreground',
        )}
      >
        GitHub Contributions
      </h2>
      <GithubContribution username="niteshseram" />
    </section>
  );
}
