import type { Metadata } from 'next';
import Script from 'next/script';

import { EditorialPostList } from '@/components/writing/editorial-post-list';
import { WRITING } from '@/config/site';
import { blogJsonLd, jsonLdHtml } from '@/lib/jsonld';
import { pageMetadata } from '@/lib/metadata';
import { cn } from '@/lib/utils';
import { getAllPosts, type Post } from '@/lib/writing';

export const metadata: Metadata = pageMetadata({
  pathname: WRITING.path,
  title: WRITING.title,
  description: WRITING.description,
  imageUrl: '/og.webp',
});

type PostGroup = Readonly<{
  posts: Post[];
  startIndex: number;
  year: number;
}>;

export default function WritingPage() {
  const posts = getAllPosts();
  const postGroups = groupPostsByYear(posts);

  return (
    <section
      aria-label="Writing"
      className={cn(
        'max-w-2xl',
        'mx-auto px-4.5 pt-16 pb-16 sm:pt-20 sm:pb-20',
      )}
    >
      <Script
        id="jsonld-blog"
        type="application/ld+json"
        strategy="beforeInteractive"
      >
        {jsonLdHtml(blogJsonLd())}
      </Script>
      <header className={cn('mb-10 sm:mb-12')}>
        <p
          className={cn(
            'flex items-center gap-2.5',
            'font-mono text-[0.6875rem] font-medium tracking-[0.12em] uppercase',
            'text-brand',
          )}
        >
          <span aria-hidden="true" className={cn('h-px w-7', 'bg-brand')} />
          Writing / All notes
        </p>
        <h1
          className={cn(
            'mt-6',
            'text-[2.25rem] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-[2.75rem]',
            'text-foreground',
          )}
        >
          Field notes from building for the web.
        </h1>
        <p
          className={cn(
            'max-w-[54ch]',
            'mt-6',
            'text-base leading-7 tracking-[-0.005em]',
            'text-muted-foreground',
          )}
        >
          {WRITING.description}
        </p>
        <div
          className={cn(
            'flex flex-wrap items-center justify-between gap-3',
            'mt-8 pt-4',
            'border-t',
            'font-mono text-[0.6875rem] leading-4 tabular-nums',
            'text-muted-foreground border-border',
          )}
        >
          <span>{posts.length} published notes</span>
          <span>
            {postGroups.length} {postGroups.length === 1 ? 'year' : 'years'} of
            writing
          </span>
        </div>
      </header>

      {posts.length === 0 ? (
        <p
          className={cn(
            'py-10 text-center',
            'text-sm italic',
            'text-muted-foreground',
          )}
        >
          Nothing published yet; drafts in progress.
        </p>
      ) : (
        <div className={cn('flex flex-col gap-y-10')}>
          {postGroups.map((group) => (
            <section key={group.year} aria-labelledby={`writing-${group.year}`}>
              <div
                className={cn(
                  'flex items-center justify-between gap-4',
                  'pb-3',
                  'border-b',
                  'border-border',
                )}
              >
                <h2
                  id={`writing-${group.year}`}
                  className={cn(
                    'font-mono text-sm font-semibold tabular-nums',
                    'text-foreground',
                  )}
                >
                  {group.year}
                </h2>
                <span
                  className={cn(
                    'font-mono text-[0.625rem] tabular-nums',
                    'text-muted-foreground',
                  )}
                >
                  {group.posts.length}{' '}
                  {group.posts.length === 1 ? 'note' : 'notes'}
                </span>
              </div>
              <EditorialPostList
                headingLevel={3}
                posts={group.posts}
                startIndex={group.startIndex}
              />
            </section>
          ))}
        </div>
      )}
    </section>
  );
}

function groupPostsByYear(posts: Post[]): PostGroup[] {
  const groups: Array<{ posts: Post[]; startIndex: number; year: number }> = [];

  for (const [postIndex, post] of posts.entries()) {
    const year = new Date(post.data.publishedAt).getFullYear();
    const latestGroup = groups.at(-1);

    if (latestGroup?.year === year) {
      latestGroup.posts.push(post);
      continue;
    }

    groups.push({ posts: [post], startIndex: postIndex, year });
  }

  return groups;
}
