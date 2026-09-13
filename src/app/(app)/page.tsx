import type { Metadata } from 'next';

import { Hero } from '@/components/home/hero';
import { ProjectsSection } from '@/components/home/projects-section';
import { SpeakingSection } from '@/components/home/speaking-section';
import { TechStackSection } from '@/components/home/tech-stack-section';
import { WritingSection } from '@/components/home/writing-section';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata({
  pathname: '/',
  imageUrl: '/og.webp',
});

export default function Page() {
  return (
    <>
      <Hero />
      <ProjectsSection />
      <WritingSection />
      <TechStackSection />
      <SpeakingSection />
    </>
  );
}
