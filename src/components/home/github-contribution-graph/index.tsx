import { Suspense } from 'react';

import { Container } from '@/components/ui/container';
import { Heading } from '@/components/ui/heading';
import { getGitHubContributions } from '@/data/github-contributions';

import {
  GithubContributionGraph,
  GithubContributionGraphFallback,
} from './github-contribution-graph';

export function GitHubContributionGraph() {
  const contributions = getGitHubContributions();
  return (
    <Container className="pt-6">
      <Heading className="sr-only">GitHub Contributions</Heading>
      <Suspense fallback={<GithubContributionGraphFallback />}>
        <GithubContributionGraph contributions={contributions} />
      </Suspense>
    </Container>
  );
}
