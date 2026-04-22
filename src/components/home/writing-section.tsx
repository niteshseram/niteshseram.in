import { PiArrowUpRight } from 'react-icons/pi';

import { Button } from '@/components/ui/button';
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
      <SectionHeading>Lately I’ve been writing</SectionHeading>
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
        <Button
          href="/writing"
          variant="ghost"
          size="sm"
          icon={<PiArrowUpRight />}
          label="All posts"
          className="-mr-3"
        />
      </div>
    </section>
  );
}
