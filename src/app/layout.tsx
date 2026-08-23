import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Suspense } from 'react';

import { ThemeProvider } from '@/components/theme-provider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ATMOSPHERE_INIT_SCRIPT } from '@/config/atmosphere';
import { AUTHOR, SITE_DESCRIPTION, SITE_URL } from '@/config/site';
import { fontVariables } from '@/lib/fonts';

import './globals.css';
import {
  jsonLdGraph,
  jsonLdHtml,
  personJsonLd,
  websiteJsonLd,
} from '@/lib/jsonld';
import { cn } from '@/lib/utils';

const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
const umamiScriptUrl =
  process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL ??
  'https://cloud.umami.is/script.js';
const isProduction = process.env.VERCEL_ENV === 'production';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${AUTHOR.name} - ${AUTHOR.jobTitle}`,
    template: `%s | ${AUTHOR.name}`,
  },
  description: SITE_DESCRIPTION,
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
  ],
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
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: ATMOSPHERE_INIT_SCRIPT }}
          id="atmosphere-init"
        />
      </head>
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <Script
          id="jsonld-site-graph"
          type="application/ld+json"
          strategy="beforeInteractive"
        >
          {jsonLdHtml(jsonLdGraph(personJsonLd, websiteJsonLd))}
        </Script>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange={true}
        >
          <Suspense>
            <TooltipProvider delay={400} closeDelay={0}>
              {children}
            </TooltipProvider>
          </Suspense>
        </ThemeProvider>
      </body>
      {umamiWebsiteId && isProduction && (
        <Script
          data-website-id={umamiWebsiteId}
          src={umamiScriptUrl}
          strategy="afterInteractive"
        />
      )}
    </html>
  );
}
