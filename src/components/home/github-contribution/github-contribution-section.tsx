import { ContentSection } from '@/components/ui/content-section';

import { GithubContribution } from './github-contribution';

export function GithubContributionSection() {
  return (
    <ContentSection
      ariaLabel="GitHub contributions"
      title="GitHub contributions"
    >
      <GithubContribution />
    </ContentSection>
  );
}
