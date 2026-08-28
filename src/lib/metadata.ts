import type { Metadata } from 'next';

import { AUTHOR, FEED, SITE_DESCRIPTION } from '@/config/site';

type PageMetadataInput = Readonly<{
  pathname: string;
  title?: string;
  absoluteTitle?: string;
  description?: string;
  imageUrl?: string;
  socialTitle?: string;
  socialDescription?: string;
}>;

export function pageMetadata({
  pathname,
  title,
  absoluteTitle,
  description = SITE_DESCRIPTION,
  imageUrl,
  socialTitle,
  socialDescription,
}: PageMetadataInput): Metadata {
  const ogTitle =
    socialTitle ??
    absoluteTitle ??
    (title
      ? `${title} | ${AUTHOR.name}`
      : `${AUTHOR.name} - ${AUTHOR.jobTitle}`);
  const ogDescription = socialDescription ?? description;

  return {
    title: absoluteTitle
      ? { absolute: absoluteTitle }
      : (title ?? { absolute: `${AUTHOR.name} - ${AUTHOR.jobTitle}` }),
    description,
    alternates: {
      canonical: pathname,
      types: {
        'application/rss+xml': [{ title: FEED.title, url: FEED.path }],
      },
    },
    openGraph: {
      type: 'website',
      url: pathname,
      siteName: `${AUTHOR.name} - ${AUTHOR.jobTitle}`,
      title: ogTitle,
      description: ogDescription,
      ...(imageUrl && {
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: ogTitle,
            type: 'image/webp',
          },
        ],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      ...(imageUrl && { images: [imageUrl] }),
    },
  };
}
