import { Anchor } from '@/components/ui/anchor';
import { ContentSection } from '@/components/ui/content-section';
import { HOME_ABOUT_SUMMARY } from '@/data/about';
import { cn } from '@/lib/utils';

export function AboutSection() {
  return (
    <ContentSection ariaLabel="About" title="About">
      <div
        className={cn(
          'relative overflow-hidden',
          'p-5 sm:p-7',
          'rounded-xl shadow-sm',
          'bg-muted/35 shadow-shadow/5',
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            'absolute top-1 right-5',
            'opacity-[0.1]',
            'font-serif text-[5rem] leading-none',
            'text-brand',
            'pointer-events-none select-none',
          )}
        >
          “
        </span>
        <p
          className={cn(
            'relative inline-flex items-center gap-2',
            'font-mono text-[0.6875rem] font-medium tracking-[0.12em] uppercase',
            'text-brand',
          )}
        >
          <span
            aria-hidden="true"
            className={cn('size-1.5', 'rounded-full', 'bg-brand')}
          />
          Profile note
        </p>
        <blockquote
          className={cn(
            'relative max-w-[54ch]',
            'mt-5',
            'text-[1.0625rem] font-medium leading-7 tracking-[-0.012em] sm:text-lg sm:leading-8',
            'text-foreground',
          )}
        >
          {HOME_ABOUT_SUMMARY}
        </blockquote>
        <div className={cn('relative flex justify-end', 'mt-5')}>
          <Anchor href="/about" variant="default" weight="medium">
            Read the full profile →
          </Anchor>
        </div>
      </div>
    </ContentSection>
  );
}
