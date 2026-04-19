import { writingSource } from '@/lib/source';

export type Post = ReturnType<typeof writingSource.getPages>[number];

const isProduction = process.env.VERCEL_ENV === 'production';

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
  if (!page) {
    return undefined;
  }
  if (isProduction && page.data.draft) {
    return undefined;
  }
  return page;
}

export function getLatestPosts(count: number): Post[] {
  return getAllPosts().slice(0, count);
}

export type PostIndexEntry = {
  slug: string;
  url: string;
  title: string;
  summary: string;
};

export function getPostIndex(): PostIndexEntry[] {
  return getAllPosts().map((p) => ({
    slug: p.slugs[0],
    url: p.url,
    title: p.data.title,
    summary: p.data.summary ?? '',
  }));
}

export function getAdjacent(slug: string): {
  prev: Post | null;
  next: Post | null;
} {
  const all = getAllPosts();
  const currentPost = all.findIndex((post) => post.slugs[0] === slug);

  if (currentPost === -1) {
    return { prev: null, next: null };
  }

  return {
    prev: currentPost > 0 ? all[currentPost - 1] : null,
    next: currentPost < all.length - 1 ? all[currentPost + 1] : null,
  };
}
