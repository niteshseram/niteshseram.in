import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';

import { ThemeProvider } from '@/components/theme-provider';
import { AUTHOR, SITE_DESCRIPTION, SITE_URL } from '@/config/site';
import { fontVariables } from '@/lib/fonts';

import './globals.css';
import {
  jsonLdGraph,
  jsonLdScript,
  personJsonLd,
  websiteJsonLd,
} from '@/lib/jsonld';
import { cn } from '@/lib/utils';

const gaId = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${AUTHOR.name} - ${AUTHOR.jobTitle}`,
    template: `%s | ${AUTHOR.name}`,
  },
  description: SITE_DESCRIPTION,
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
      {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
    </html>
  );
}
