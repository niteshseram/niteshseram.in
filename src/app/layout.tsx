import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata, Viewport } from 'next';

import { ThemeProvider } from '@/components/theme-provider';
import { TooltipProvider } from '@/components/ui/tooltip';
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
const isProduction = process.env.VERCEL_ENV === 'production';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${AUTHOR.name} - ${AUTHOR.jobTitle}`,
    template: `%s | ${AUTHOR.name}`,
  },
  description: SITE_DESCRIPTION,
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#141311' },
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
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <script {...jsonLdScript(jsonLdGraph(personJsonLd, websiteJsonLd))} />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={true}
          disableTransitionOnChange={true}
        >
          <TooltipProvider delay={400} closeDelay={0}>
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </body>
      {gaId && isProduction ? <GoogleAnalytics gaId={gaId} /> : null}
    </html>
  );
}
