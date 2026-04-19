import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PiArrowLeft } from 'react-icons/pi';

import { Button } from '@/components/ui/button';
import { getMDXComponents } from '@/components/writing/mdx-components';
import { PostFooter } from '@/components/writing/post-footer';
import { PostHeader } from '@/components/writing/post-header';
import { Prose } from '@/components/writing/prose';
import { blogPostingJsonLd, jsonLdScript } from '@/lib/jsonld';
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
    title: `${title} | Blog`,
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
      <script {...jsonLdScript(blogPostingJsonLd(post))} />
      <article
        className={cn('max-w-2xl mx-auto', 'px-4.5 pt-14 sm:pt-20 pb-16')}
      >
        <Button
          href="/writing"
          variant="ghost"
          size="xs"
          icon={<PiArrowLeft />}
          addonPosition="start"
          label="All writing"
          className="mb-8 -ml-3"
        />
        <PostHeader
          title={post.data.title}
          summary={post.data.summary}
          publishedAt={post.data.publishedAt}
          minutes={post.data.readingTime.minutes}
          tags={post.data.tags}
        />
        <Prose>
          <MDXContent components={getMDXComponents()} />
        </Prose>
        <PostFooter prev={prev} next={next} />
      </article>
    </>
  );
}
