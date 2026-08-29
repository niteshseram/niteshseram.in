import { ArrowRight } from 'lucide-react';

import { Anchor } from '@/components/ui/anchor';
import { ContentSection } from '@/components/ui/content-section';
import { EditorialPostList } from '@/components/writing/editorial-post-list';
import { cn } from '@/lib/utils';
import { getLatestPosts } from '@/lib/writing';

export function WritingSection() {
  const posts = getLatestPosts(3);
  if (posts.length === 0) return null;
  const latestYear = new Date(posts[0].data.publishedAt).getFullYear();

  return (
    <ContentSection id="writing" ariaLabel="Writing" title="Recent writing">
      <div className={cn('border-y', 'border-border')}>
        <p
          className={cn(
            'flex items-center justify-between gap-4',
            'py-2.5',
            'text-[0.6875rem] font-medium tracking-[0.12em] uppercase',
            'text-muted-foreground',
          )}
        >
          <span>Field notes on frontend engineering</span>
          <span className="tabular-nums">{latestYear}</span>
        </p>
        <EditorialPostList posts={posts} />
      </div>
      <Anchor
        href="/writing"
        className={cn(
          'inline-flex items-center gap-1.5',
          'mt-5',
          'text-sm',
          'group/all-posts',
        )}
        variant="default"
        weight="medium"
      >
        Browse the archive
        <ArrowRight
          aria-hidden="true"
          className={cn(
            'size-3.5',
            'transition-transform',
            'group-hover/all-posts:translate-x-0.5',
          )}
        />
      </Anchor>
    </ContentSection>
  );
}
