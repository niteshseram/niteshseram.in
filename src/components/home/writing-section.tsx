import { PiArrowUpRight } from 'react-icons/pi';

import { Anchor } from '@/components/ui/anchor';
import { PostRow } from '@/components/writing/post-row';
import { cn } from '@/lib/utils';
import { getLatestPosts } from '@/lib/writing';

import { SectionHeading } from './section-heading';

export function WritingSection() {
  const posts = getLatestPosts(3);
  if (posts.length === 0) return null;

  return (
    <section
      id="writing"
      aria-label="Writing"
      className={cn('max-w-2xl mx-auto scroll-mt-13', 'px-4.5 py-12')}
    >
      <SectionHeading>Lately I&apos;ve been writing</SectionHeading>
      <ul className="flex flex-col divide-y divide-border">
        {posts.map((post) => (
          <PostRow
            key={post.url}
            post={post}
            minutes={post.data.readingTime.minutes}
          />
        ))}
      </ul>
      <div className="mt-6 flex justify-end">
        <Anchor
          href="/writing"
          variant="unstyled"
          weight="inherit"
          className={cn(
            'group inline-flex items-center gap-x-1.5',
            'font-mono text-xs',
            'text-muted-foreground',
            'transition-colors',
            'hover:text-brand',
          )}
        >
          All posts
          <PiArrowUpRight
            aria-hidden="true"
            className={cn(
              'size-3',
              'transition-transform',
              'group-hover:-translate-y-0.5 group-hover:translate-x-0.5',
            )}
          />
        </Anchor>
      </div>
    </section>
  );
}
