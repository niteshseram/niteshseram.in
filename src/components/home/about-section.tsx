import { Anchor } from '@/components/ui/anchor';
import { ContentSection } from '@/components/ui/content-section';
import { ABOUT_PROSE } from '@/data/about';
import { cn } from '@/lib/utils';

export function AboutSection() {
  return (
    <ContentSection ariaLabel="About" title="About">
      <p
        className={cn(
          'max-w-[55ch]',
          'text-base leading-7',
          'text-muted-foreground',
        )}
      >
        {ABOUT_PROSE[2]}
      </p>
      <Anchor
        href="/about"
        variant="default"
        weight="medium"
        className={cn('inline-block', 'mt-5', 'text-sm')}
      >
        More about me →
      </Anchor>
    </ContentSection>
  );
}
