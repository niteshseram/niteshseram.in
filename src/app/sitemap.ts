import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/config/site';
import { getAllPosts } from '@/lib/writing';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/writing`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  const posts: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${SITE_URL}${post.url}`,
    lastModified: new Date(post.data.publishedAt),
    changeFrequency: 'yearly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...posts];
}
