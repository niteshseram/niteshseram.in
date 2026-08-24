import { Anchor } from '@/components/ui/anchor';
import { ContentSection } from '@/components/ui/content-section';
import {
  ExternalLinkArrow,
  externalLinkTitleClassName,
} from '@/components/ui/external-link-row';
import { TALKS } from '@/data/talks';
import { cn } from '@/lib/utils';

export function SpeakingSection() {
  return (
    <ContentSection ariaLabel="Speaking" title="Speaking">
      <ul className="flex flex-col gap-y-7">
        {TALKS.map((talk) => (
          <li key={talk.youtubeId} className="group/external-link">
            <article className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 relative">
              <div>
                <p className="text-xs leading-5 text-muted-foreground">
                  {talk.event} · {talk.year}
                </p>
                <h3
                  className={cn(
                    'mt-1.5',
                    'text-base font-medium leading-6 tracking-[-0.01em]',
                    'text-foreground',
                    externalLinkTitleClassName,
                  )}
                >
                  {talk.title}
                </h3>
                <Anchor
                  href={talk.href}
                  aria-label={`Watch ${talk.title} on YouTube`}
                  className="absolute inset-0 z-10"
                  variant="unstyled"
                  weight="inherit"
                />
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
              <ExternalLinkArrow />
            </article>
          </li>
        ))}
      </ul>
    </ContentSection>
  );
}
