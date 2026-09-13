import type { Metadata } from 'next';

import { AboutIntro } from '@/components/about/about-intro';
import { ExperienceSection } from '@/components/home/experience-section';
import { SpeakingSection } from '@/components/home/speaking-section';
import { Anchor } from '@/components/ui/anchor';
import { ContentSection } from '@/components/ui/content-section';
import { ABOUT_FACTS, PRINCIPLES } from '@/data/about';
import { SOCIAL_LINKS } from '@/data/social-links';
import { pageMetadata } from '@/lib/metadata';
import { cn } from '@/lib/utils';

export const metadata: Metadata = pageMetadata({
  pathname: '/about',
  title: 'About',
  description:
    'How I moved from medicine to frontend engineering, my work experience, and the principles I work by.',
  imageUrl: '/og.webp',
});

export default function AboutPage() {
  const outsideWork = ABOUT_FACTS.find((fact) => fact.key === 'off_the_clock');
  return (
    <>
      <AboutIntro />
      <ExperienceSection />
      <ContentSection id="approach" ariaLabel="How I work" title="How I work">
        <ul className={cn('space-y-5')}>
          {PRINCIPLES.map((principle) => (
            <li key={principle.title}>
              <h3 className={cn('text-base font-normal leading-6')}>
                {principle.title}
              </h3>
              <p
                className={cn(
                  'mt-1.5',
                  'text-sm leading-6',
                  'text-muted-foreground',
                )}
              >
                {principle.description}
              </p>
            </li>
          ))}
        </ul>
      </ContentSection>
      <SpeakingSection />
      {outsideWork && (
        <ContentSection ariaLabel="Outside work" title="Outside work">
          <p className={cn('text-base leading-7')}>{outsideWork.value}.</p>
        </ContentSection>
      )}
      <ContentSection id="elsewhere" ariaLabel="Elsewhere" title="Elsewhere">
        <nav
          aria-label="Social links"
          className={cn('flex flex-wrap gap-x-6 gap-y-2')}
        >
          {Object.values(SOCIAL_LINKS).map((social) => (
            <Anchor
              key={social.label}
              href={social.href}
              variant="prose"
              weight="normal"
              className={cn('inline-flex min-h-11 items-center', 'text-sm')}
            >
              {social.label}
            </Anchor>
          ))}
        </nav>
      </ContentSection>
    </>
  );
}
