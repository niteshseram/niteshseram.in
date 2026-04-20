import { cacheLife } from 'next/cache';

import { getLLMText } from '@/lib/get-llm-text';
import { getAllPosts, getPostBySlug } from '@/lib/writing';

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: [post.slugs[0]] }));
}

type Params = { slug?: string[] };

async function renderMarkdown(slug: string): Promise<string | null> {
  'use cache';
  cacheLife('max');
  const post = getPostBySlug(slug);
  if (!post) return null;
  return getLLMText(post);
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<Params> },
) {
  const { slug: segments } = await params;
  const slug = segments?.[0];
  if (!slug) return new Response('Not found', { status: 404 });

  const text = await renderMarkdown(slug);
  if (text === null) return new Response('Not found', { status: 404 });

  return new Response(text, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
}
