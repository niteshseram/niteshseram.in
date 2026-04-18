import { ContactSection } from '@/components/home/contact-section';
import { GithubContributionSection } from '@/components/home/github-contribution/github-contribution-section';
import { Hero } from '@/components/home/hero';

export default function Page() {
  return (
    <>
      <Hero />
      <GithubContributionSection />
      <ContactSection />
    </>
  );
}
