import type { Metadata } from 'next';

import { SITE_DESCRIPTION, SITE_NAME } from '@/config/site';

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
    (title ? `${title} | ${SITE_NAME}` : SITE_NAME);
  const ogDescription = socialDescription ?? description;

  return {
    title: absoluteTitle
      ? { absolute: absoluteTitle }
      : (title ?? { absolute: SITE_NAME }),
    description,
    alternates: { canonical: pathname },
    openGraph: {
      type: 'website',
      url: pathname,
      siteName: SITE_NAME,
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
