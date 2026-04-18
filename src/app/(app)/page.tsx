import { ContactSection } from '@/components/home/contact-section';
import { ExperienceSection } from '@/components/home/experience-section';
import { GithubContributionSection } from '@/components/home/github-contribution/github-contribution-section';
import { Hero } from '@/components/home/hero';
import { ProjectsSection } from '@/components/home/projects-section';
import { SpeakingSection } from '@/components/home/speaking-section';
import { TechStackSection } from '@/components/home/tech-stack-section';

export default function Page() {
  return (
    <>
      <Hero />
      <TechStackSection />
      <ProjectsSection />
      <ExperienceSection />
      <SpeakingSection />
      <GithubContributionSection />
      <ContactSection />
    </>
  );
}
