import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PiArrowLeft } from 'react-icons/pi';

import { Button } from '@/components/ui/button';
import { getMDXComponents } from '@/components/writing/mdx-components';
import { PostFooter } from '@/components/writing/post-footer';
import { PostHeader } from '@/components/writing/post-header';
import { Prose } from '@/components/writing/prose';
import { blogPostingJsonLd, jsonLdScript } from '@/lib/jsonld';
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
  return {
    title: `${title} — Nitesh Seram`,
    description: summary,
    keywords: tags,
    openGraph: {
      type: 'article',
      title,
      description: summary,
      publishedTime: new Date(publishedAt).toISOString(),
      tags,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: summary,
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
    <article className={cn('max-w-2xl mx-auto', 'px-4.5 pt-14 sm:pt-20 pb-16')}>
      <script {...jsonLdScript(blogPostingJsonLd(post))} />
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
  );
}
