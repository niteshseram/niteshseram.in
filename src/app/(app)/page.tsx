import Blog from '@/components/home/Blog';
import { Contact } from '@/components/home/contact';
import { GitHubContributionGraph } from '@/components/home/github-contribution-graph';
import Hero from '@/components/home/Hero';
import { HeadingLevelIncrease } from '@/components/ui/heading';

export default function Home() {
  return (
    <main className="mt-10 flex flex-col">
      <Hero />
      <GitHubContributionGraph />
      <HeadingLevelIncrease>
        <Blog />
        <Contact />
      </HeadingLevelIncrease>
    </main>
  );
}
