import type { Metadata } from 'next';
import Script from 'next/script';

import { PostRow } from '@/components/writing/post-row';
import { WRITING } from '@/config/site';
import { blogJsonLd, jsonLdHtml } from '@/lib/jsonld';
import { pageMetadata } from '@/lib/metadata';
import { cn } from '@/lib/utils';
import { getAllPosts } from '@/lib/writing';

export const metadata: Metadata = pageMetadata({
  pathname: WRITING.path,
  title: WRITING.title,
  description: WRITING.description,
  imageUrl: '/og.webp',
});

export default function WritingPage() {
  const posts = getAllPosts();

  return (
    <section
      aria-label="Writing"
      className={cn(
        'max-w-2xl',
        'mx-auto px-4.5 pt-16 pb-20 sm:pt-20 sm:pb-24',
      )}
    >
      <Script
        id="jsonld-blog"
        type="application/ld+json"
        strategy="beforeInteractive"
      >
        {jsonLdHtml(blogJsonLd())}
      </Script>
      <header className="mb-10 sm:mb-12">
        <h1 className={cn('type-page-title font-semibold', 'text-foreground')}>
          Writing
        </h1>
        <p
          className={cn(
            'max-w-[54ch]',
            'mt-5',
            'text-base leading-7 tracking-[-0.005em]',
            'text-muted-foreground',
          )}
        >
          Notes on frontend craft, tooling, and the details that make software
          feel considered—written to clarify what I learn while building.
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
          Nothing published yet; drafts in progress.
        </p>
      ) : (
        <ul className="flex flex-col gap-y-7">
          {posts.map((post) => (
            <PostRow
              headingLevel={2}
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
