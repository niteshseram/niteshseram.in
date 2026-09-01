import type { Metadata } from 'next';

import { AboutIntro } from '@/components/about/about-intro';
import { AboutJsonSection } from '@/components/about/about-json-section';
import { DailyToolsSection } from '@/components/about/daily-tools-section';
import { PrinciplesSection } from '@/components/about/principles-section';
import { TimelineSection } from '@/components/about/timeline-section';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata({
  pathname: '/about',
  title: 'About',
  description:
    'How I moved from medicine to frontend engineering, the principles I work by, the tools I use, and my career timeline.',
  imageUrl: '/og.webp',
});

export default function AboutPage() {
  return (
    <>
      <AboutIntro />
      <PrinciplesSection />
      <AboutJsonSection />
      <DailyToolsSection />
      <TimelineSection />
    </>
  );
}
