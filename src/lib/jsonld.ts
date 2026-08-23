import {
  AUTHOR,
  SITE_DESCRIPTION,
  SITE_LANGUAGE,
  SITE_URL,
  WRITING,
} from '@/config/site';
import { SOCIAL_LINKS } from '@/data/social-links';
import type { Post } from '@/lib/writing';

const personId = `${SITE_URL}/#person`;
const websiteId = `${SITE_URL}/#website`;
const blogId = `${SITE_URL}${WRITING.path}#blog`;

export const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': personId,
  name: AUTHOR.name,
  url: `${SITE_URL}/about`,
  jobTitle: AUTHOR.jobTitle,
  worksFor: {
    '@type': 'Organization',
    name: AUTHOR.employer.name,
    url: AUTHOR.employer.url,
  },
  sameAs: [
    SOCIAL_LINKS.github.href,
    SOCIAL_LINKS.linkedin.href,
    SOCIAL_LINKS.x.href,
  ],
} as const;

export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': websiteId,
  url: SITE_URL,
  name: AUTHOR.name,
  description: SITE_DESCRIPTION,
  publisher: { '@id': personId },
  inLanguage: SITE_LANGUAGE,
} as const;

export function blogJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': blogId,
    url: `${SITE_URL}${WRITING.path}`,
    name: `${WRITING.title} — ${AUTHOR.name}`,
    description: WRITING.description,
    author: { '@id': personId },
    publisher: { '@id': personId },
    inLanguage: SITE_LANGUAGE,
  } as const;
}

export function blogPostingJsonLd(post: Post) {
  const url = `${SITE_URL}${post.url}`;
  const published = new Date(post.data.publishedAt).toISOString();
  const modified = new Date(
    post.data.updatedAt ?? post.data.publishedAt,
  ).toISOString();

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#blogposting`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    headline: post.data.title,
    description: post.data.summary,
    image: [`${SITE_URL}/og.webp`],
    datePublished: published,
    dateModified: modified,
    keywords: post.data.tags?.join(', '),
    wordCount: post.data.readingTime.words,
    timeRequired: `PT${post.data.readingTime.minutes}M`,
    inLanguage: SITE_LANGUAGE,
    author: {
      '@type': 'Person',
      '@id': personId,
      name: AUTHOR.name,
      url: `${SITE_URL}/about`,
    },
    publisher: { '@id': personId },
    isPartOf: { '@id': blogId },
  } as const;
}

export function breadcrumbJsonLd(post: Post) {
  const url = `${SITE_URL}${post.url}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: WRITING.title,
        item: `${SITE_URL}${WRITING.path}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: post.data.title,
        item: url,
      },
    ],
  } as const;
}

type Entity = Record<string, unknown>;

export function jsonLdGraph(...entities: Entity[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': entities.map(({ '@context': _ctx, ...rest }) => rest),
  };
}

export function jsonLdHtml<T>(data: T): string {
  return JSON.stringify(data);
}
