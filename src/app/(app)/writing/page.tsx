import type { Metadata } from 'next';

import { Anchor } from '@/components/ui/anchor';
import { EditorialPostList } from '@/components/writing/editorial-post-list';
import { FEED, WRITING } from '@/config/site';
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
      aria-labelledby="writing-title"
      className={cn('site-container', 'pt-10 pb-12 sm:pt-12 sm:pb-16')}
    >
      <script
        id="jsonld-blog"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdHtml(blogJsonLd()) }}
      />
      <header className={cn('mb-8')}>
        <h1 id="writing-title" className={cn('type-page-title font-medium')}>
          Writing
        </h1>
        <p
          className={cn('mt-2', 'text-base leading-7', 'text-muted-foreground')}
        >
          {WRITING.description}
        </p>
      </header>
      {posts.length ? (
        <EditorialPostList posts={posts} headingLevel={2} showSummary />
      ) : (
        <p>No published articles yet.</p>
      )}
      <p className={cn('mt-7', 'text-sm')}>
        <Anchor
          href={FEED.path}
          variant="prose"
          weight="normal"
          className={cn('inline-flex min-h-11 items-center')}
        >
          Subscribe via RSS
        </Anchor>
      </p>
    </section>
  );
}
