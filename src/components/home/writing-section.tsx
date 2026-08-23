import { Anchor } from '@/components/ui/anchor';
import { ContentSection } from '@/components/ui/content-section';
import { PostRow } from '@/components/writing/post-row';
import { cn } from '@/lib/utils';
import { getLatestPosts } from '@/lib/writing';

export function WritingSection() {
  const posts = getLatestPosts(3);
  if (posts.length === 0) return null;

  return (
    <ContentSection id="writing" ariaLabel="Writing" title="Recent writing">
      <ul className="flex flex-col gap-y-7">
        {posts.map((post) => (
          <PostRow
            key={post.url}
            post={post}
            minutes={post.data.readingTime.minutes}
          />
        ))}
      </ul>
      <div className={cn('flex justify-start', 'mt-6')}>
        <Anchor
          href="/writing"
          variant="default"
          weight="medium"
          className="text-sm"
        >
          All posts →
        </Anchor>
      </div>
    </ContentSection>
  );
}
