import { notFound } from 'next/navigation';

import { AUTHOR } from '@/config/site';
import { createOgImage } from '@/lib/og-image';
import { getAllPosts, getPostBySlug } from '@/lib/writing';

export const alt = `Writing / ${AUTHOR.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slugs[0] }));
}

type Props = { params: Promise<{ slug: string }> };

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return createOgImage({ title: post.data.title });
}
