import { PiArrowUpRight } from 'react-icons/pi';

import { Anchor } from '@/components/ui/anchor';
import { Button } from '@/components/ui/button';
import { ContentSection } from '@/components/ui/content-section';
import { TALKS } from '@/data/talks';
import { cn } from '@/lib/utils';

export function SpeakingSection() {
  return (
    <ContentSection ariaLabel="Speaking" title="Speaking">
      <ul className="flex flex-col gap-y-7">
        {TALKS.map((talk) => (
          <li key={talk.youtubeId}>
            <article className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
              <div>
                <p className="text-xs leading-5 text-muted-foreground">
                  {talk.event} · {talk.year}
                </p>
                <h3 className="mt-1.5">
                  <Anchor
                    href={talk.href}
                    variant="primary"
                    weight="medium"
                    className="text-base leading-6 tracking-[-0.01em]"
                  >
                    {talk.title}
                  </Anchor>
                </h3>
                <p
                  className={cn(
                    'max-w-[56ch] line-clamp-3',
                    'mt-2',
                    'text-[0.9375rem] leading-6',
                    'text-muted-foreground',
                  )}
                >
                  {talk.brief}
                </p>
              </div>
              <Button
                href={talk.href}
                aria-label={`Watch ${talk.title} on YouTube`}
                className={cn('shrink-0', '-mt-1 -mr-1')}
                icon={<PiArrowUpRight />}
                isLabelHidden={true}
                label={`Watch ${talk.title} on YouTube`}
                size="xs"
                variant="ghost"
              />
            </article>
          </li>
        ))}
      </ul>
    </ContentSection>
  );
}
