import { Anchor } from '@/components/ui/anchor';
import { ContentSection } from '@/components/ui/content-section';
import { EditorialPostList } from '@/components/writing/editorial-post-list';
import { cn } from '@/lib/utils';
import { getLatestPosts } from '@/lib/writing';

export function WritingSection() {
  const posts = getLatestPosts(4);
  if (posts.length === 0) return null;
  return (
    <ContentSection
      id="writing"
      ariaLabel="Writing"
      title="Writing"
      action={
        <Anchor
          href="/writing"
          weight="normal"
          className={cn('inline-flex min-h-8 items-center', 'text-sm')}
        >
          View all{' '}
          <span aria-hidden="true" className="ml-1">
            →
          </span>
        </Anchor>
      }
    >
      <EditorialPostList posts={posts} />
    </ContentSection>
  );
}
