import { ContactSection } from '@/components/home/contact-section';
import { GithubContributionSection } from '@/components/home/github-contribution/github-contribution-section';
import { Hero } from '@/components/home/hero';
import { TechStackSection } from '@/components/home/tech-stack-section';

export default function Page() {
  return (
    <>
      <Hero />
      <TechStackSection />
      <GithubContributionSection />
      <ContactSection />
    </>
  );
}
