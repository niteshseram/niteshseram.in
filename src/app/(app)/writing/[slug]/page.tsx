import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Anchor } from '@/components/ui/anchor';
import { BackToTop } from '@/components/writing/back-to-top';
import { getMDXComponents } from '@/components/writing/mdx-components';
import { PostActions } from '@/components/writing/post-actions';
import { PostFooter } from '@/components/writing/post-footer';
import { PostHeader } from '@/components/writing/post-header';
import { Prose } from '@/components/writing/prose';
import { TableOfContents } from '@/components/writing/table-of-contents';
import { getCanonicalUrl, getGithubSourceUrl } from '@/lib/get-llm-text';
import {
  blogPostingJsonLd,
  breadcrumbJsonLd,
  jsonLdGraph,
  jsonLdHtml,
} from '@/lib/jsonld';
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
  const { title, summary, publishedAt, updatedAt, tags } = post.data;

  const base = pageMetadata({
    pathname: `/writing/${slug}`,
    absoluteTitle: title,
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
      modifiedTime: new Date(updatedAt ?? publishedAt).toISOString(),
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
      <script
        id={`jsonld-post-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdHtml(
            jsonLdGraph(blogPostingJsonLd(post), breadcrumbJsonLd(post)),
          ),
        }}
      />
      <article className={cn('site-container', 'pt-8 pb-12 sm:pt-10 sm:pb-16')}>
        <div className={cn('flex items-center justify-between gap-4', 'mb-6')}>
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
          updatedAt={post.data.updatedAt}
          summary={post.data.summary}
          tags={post.data.tags}
          title={post.data.title}
        />
        <TableOfContents items={post.data.toc} />
        <Prose>
          <MDXContent components={getMDXComponents()} />
        </Prose>
        <PostFooter prev={prev} next={next} />
      </article>
      <BackToTop />
    </>
  );
}
