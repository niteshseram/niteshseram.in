import { ArrowUpRight } from 'lucide';

import { Anchor } from '@/components/ui/anchor';
import { ContentSection } from '@/components/ui/content-section';
import { SiteIcon } from '@/components/ui/site-icon';
import { TALKS } from '@/data/talks';
import { cn } from '@/lib/utils';

export function SpeakingSection() {
  return (
    <ContentSection id="speaking" ariaLabel="Speaking" title="Speaking">
      <ul className={cn('focus-list', 'space-y-5')}>
        {TALKS.map((talk) => (
          <li key={talk.youtubeId}>
            <Anchor
              href={talk.href}
              variant="unstyled"
              weight="normal"
              className={cn('group block', '-mx-2 px-2 py-2', 'rounded-sm')}
            >
              <h3 className={cn('text-base font-normal leading-6')}>
                {talk.title}{' '}
                <SiteIcon
                  icon={ArrowUpRight}
                  aria-hidden="true"
                  className="inline size-3.5"
                  strokeWidth={1.5}
                />
              </h3>
              <p
                className={cn(
                  'mt-1',
                  'text-sm leading-6',
                  'text-muted-foreground',
                )}
              >
                {talk.event} · {talk.year}
              </p>
            </Anchor>
          </li>
        ))}
      </ul>
    </ContentSection>
  );
}
