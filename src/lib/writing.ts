import { writingSource } from '@/lib/source';

export type Post = ReturnType<typeof writingSource.getPages>[number];

const isProduction = process.env.NODE_ENV === 'production';

export function getAllPosts(): Post[] {
  return writingSource
    .getPages()
    .filter((page) => !(isProduction && page.data.draft))
    .toSorted(
      (a, b) =>
        new Date(b.data.publishedAt).getTime() -
        new Date(a.data.publishedAt).getTime(),
    );
}

export function getPostBySlug(slug: string): Post | undefined {
  const page = writingSource.getPage([slug]);
  if (!page) return undefined;
  if (isProduction && page.data.draft) return undefined;
  return page;
}

export function getLatestPosts(count: number): Post[] {
  return getAllPosts().slice(0, count);
}

export function getAdjacent(slug: string): {
  prev: Post | null;
  next: Post | null;
} {
  const all = getAllPosts();
  const i = all.findIndex((p) => p.slugs[0] === slug);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: i > 0 ? all[i - 1] : null,
    next: i < all.length - 1 ? all[i + 1] : null,
  };
}
