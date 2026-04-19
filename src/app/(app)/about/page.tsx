import type { Metadata } from 'next';

import { AboutIntro } from '@/components/about/about-intro';
import { OffTheClock } from '@/components/about/off-the-clock';
import { TimelineSection } from '@/components/about/timeline-section';

export const metadata: Metadata = {
  title: 'About — Nitesh Seram',
  description:
    'A few notes about me — what I do, what I care about, and a year-by-year walk through how I got here.',
};

export default function AboutPage() {
  return (
    <>
      <AboutIntro />
      <OffTheClock />
      <TimelineSection />
    </>
  );
}
