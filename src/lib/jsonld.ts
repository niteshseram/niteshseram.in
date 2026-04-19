import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/config/site';
import { SOCIAL_LINKS } from '@/data/social-links';
import type { Post } from '@/lib/writing';

const personId = `${SITE_URL}/#person`;
const websiteId = `${SITE_URL}/#website`;

export const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': personId,
  name: SITE_NAME,
  url: SITE_URL,
  jobTitle: 'Software Engineer',
  worksFor: {
    '@type': 'Organization',
    name: 'GreatFrontEnd',
    url: 'https://www.greatfrontend.com',
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
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  publisher: { '@id': personId },
  inLanguage: 'en',
} as const;

export function blogJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${SITE_URL}/writing#blog`,
    url: `${SITE_URL}/writing`,
    name: `Writing — ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
    author: { '@id': personId },
    publisher: { '@id': personId },
    inLanguage: 'en',
  } as const;
}

export function blogPostingJsonLd(post: Post) {
  const url = `${SITE_URL}${post.url}`;
  const published = new Date(post.data.publishedAt).toISOString();

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#blogposting`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    headline: post.data.title,
    description: post.data.summary,
    datePublished: published,
    dateModified: published,
    keywords: post.data.tags?.join(', '),
    wordCount: post.data.readingTime.words,
    timeRequired: `PT${post.data.readingTime.minutes}M`,
    inLanguage: 'en',
    author: { '@id': personId },
    publisher: { '@id': personId },
    isPartOf: { '@id': `${SITE_URL}/writing#blog` },
  } as const;
}

export function jsonLdScript<T>(data: T) {
  return {
    type: 'application/ld+json' as const,
    dangerouslySetInnerHTML: { __html: JSON.stringify(data) },
  };
}
