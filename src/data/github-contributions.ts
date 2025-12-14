import type { Activity } from '@/components/contribution-graph';

import { SOCIALS } from './social';

export async function getGitHubContributions(): Promise<Array<Activity>> {
  const currentYear = new Date().getFullYear();
  const response = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${SOCIALS.github.username}?y=${currentYear}`,
    {
      next: { revalidate: 86400 }, // Cache for 1 day (86400 seconds)
    },
  );
  const data = await response.json();
  return data.contributions;
}
