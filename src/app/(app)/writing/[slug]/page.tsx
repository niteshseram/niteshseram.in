import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';

import { Anchor } from '@/components/ui/anchor';
import { getMDXComponents } from '@/components/writing/mdx-components';
import { PostActions } from '@/components/writing/post-actions';
import { PostFooter } from '@/components/writing/post-footer';
import { PostHeader } from '@/components/writing/post-header';
import { Prose } from '@/components/writing/prose';
import { getCanonicalUrl, getGithubSourceUrl } from '@/lib/get-llm-text';
import { blogPostingJsonLd, jsonLdHtml } from '@/lib/jsonld';
import { pageMetadata } from '@/lib/metadata';
import { cn } from '@/lib/utils';
import { getAdjacent, getAllPosts, getPostBySlug } from '@/lib/writing';

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slugs[0] }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const { title, summary, publishedAt, tags } = post.data;

  const base = pageMetadata({
    pathname: `/writing/${slug}`,
    title,
    socialTitle: title,
    description: summary,
  });

  return {
    ...base,
    keywords: tags,
    openGraph: {
      ...base.openGraph,
      type: 'article',
      publishedTime: new Date(publishedAt).toISOString(),
      tags,
    },
  };
}

export default async function WritingDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const MDXContent = post.data.body;
  const { prev, next } = getAdjacent(slug);

  return (
    <>
      <Script
        id={`jsonld-post-${slug}`}
        type="application/ld+json"
        strategy="beforeInteractive"
      >
        {jsonLdHtml(blogPostingJsonLd(post))}
      </Script>
      <article
        className={cn(
          'max-w-2xl',
          'mx-auto px-4.5 pt-12 pb-20 sm:pt-16 sm:pb-24',
        )}
      >
        <div
          className={cn(
            'flex items-center justify-between gap-4',
            'mb-8 sm:mb-10',
          )}
        >
          <Anchor
            href="/writing"
            variant="default"
            weight="normal"
            className="text-sm"
          >
            ← All writing
          </Anchor>
          <PostActions
            markdownUrl={`/writing/${slug}.mdx`}
            githubUrl={getGithubSourceUrl(post)}
            pageUrl={getCanonicalUrl(post)}
          />
        </div>
        <PostHeader
          minutes={post.data.readingTime.minutes}
          publishedAt={post.data.publishedAt}
          summary={post.data.summary}
          tags={post.data.tags}
          title={post.data.title}
        />
        <Prose>
          <MDXContent components={getMDXComponents()} />
        </Prose>
        <PostFooter prev={prev} next={next} />
      </article>
    </>
  );
}
