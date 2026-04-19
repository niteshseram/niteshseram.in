import type { Metadata } from 'next';

import { ThemeProvider } from '@/components/theme-provider';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/config/site';
import { fontVariables } from '@/lib/fonts';

import './globals.css';
import {
  jsonLdGraph,
  jsonLdScript,
  personJsonLd,
  websiteJsonLd,
} from '@/lib/jsonld';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: '/og.webp',
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Software Engineer`,
        type: 'image/webp',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ['/og.webp'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(fontVariables, 'h-full', 'antialiased')}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <script {...jsonLdScript(jsonLdGraph(personJsonLd, websiteJsonLd))} />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={true}
          disableTransitionOnChange={true}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
