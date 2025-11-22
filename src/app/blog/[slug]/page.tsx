import { allBlogs } from 'contentlayer/generated';
import { format, parseISO } from 'date-fns';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import FadeDown from '@/components/animations/FadeDown';
import FadeUp from '@/components/animations/FadeUp';
import Reaction from '@/components/blog/Reaction';
import { Mdx } from '@/components/mdx';

import ViewCounter from '../view-counter';

interface Params {
  slug: string;
}

export async function generateStaticParams() {
  return allBlogs.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata(props: {
  params: Promise<Params>;
}): Promise<Metadata | undefined> {
  const params = await props.params;

  const post = allBlogs.find((post) => post.slug === params.slug);
  if (!post) {
    return;
  }

  const {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
    slug,
  } = post;
  const ogImage = image
    ? `https://niteshseram.in${image}`
    : `https://niteshseram.in/api/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `https://niteshseram.in/blog/${slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

interface BlogProps {
  params: Promise<Params>;
}

export default async function Blog(props: BlogProps) {
  const params = await props.params;

  const post = allBlogs.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <section className="mb-10 mt-10">
      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify(post.structuredData)}
      </script>
      <FadeDown duration={0.2}>
        <h1 className="heading mb-2 font-bold">{post.title}</h1>
        <div className="mb-8 mt-4 flex flex-col gap-4 text-sm">
          <div className="text-slate-700 dark:text-slate-400">
            {format(parseISO(post.publishedAt), 'MMMM dd, yyyy')} /{' '}
            {post.readingTime.text} / <ViewCounter slug={post.slug} trackView />
          </div>
          <Reaction slug={post.slug} />
        </div>
      </FadeDown>
      <FadeUp duration={0.2}>
        <Mdx code={post.body.code} />
        <div className="flex justify-center pt-4 md:pt-8">
          <Reaction slug={post.slug} />
        </div>
      </FadeUp>
    </section>
  );
}
