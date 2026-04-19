import type { Metadata } from 'next';

import { PostRow } from '@/components/writing/post-row';
import { WRITING } from '@/config/site';
import { blogJsonLd, jsonLdScript } from '@/lib/jsonld';
import { cn } from '@/lib/utils';
import { getAllPosts } from '@/lib/writing';

export const metadata: Metadata = {
  title: WRITING.title,
  description: WRITING.description,
};

export default function WritingPage() {
  const posts = getAllPosts();

  return (
    <section
      aria-label="Writing"
      className={cn('max-w-2xl mx-auto', 'px-4.5 pt-14 sm:pt-20 pb-16')}
    >
      <script {...jsonLdScript(blogJsonLd())} />
      <header className="mb-12">
        <p
          className={cn(
            'mb-3',
            'font-mono text-[11px] uppercase tracking-[0.14em]',
            'text-muted-foreground',
          )}
        >
          Writing
        </p>
        <h1
          className={cn(
            'font-serif text-[clamp(1.8rem,8vw,2.4rem)] leading-[1.15]',
            'text-foreground',
          )}
        >
          <span className="block">Field notes.</span>
          <span className="block italic text-brand">
            On craft, and whatever else.
          </span>
        </h1>
        <p className={cn('mt-6', 'leading-relaxed', 'text-muted-foreground')}>
          Short pieces on frontend craft, tooling, and the small details that
          make software feel considered. Written mostly for myself — shared in
          case it helps someone else.
        </p>
      </header>

      {posts.length === 0 ? (
        <p
          className={cn(
            'py-10 text-center',
            'text-sm italic',
            'text-muted-foreground',
          )}
        >
          Nothing published yet — drafts in progress.
        </p>
      ) : (
        <ul className="flex flex-col divide-y divide-border">
          {posts.map((post) => (
            <PostRow
              key={post.url}
              post={post}
              minutes={post.data.readingTime.minutes}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
