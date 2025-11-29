import './globals.css';

import clsx from 'clsx';
import type { Metadata } from 'next';

import Provider from '@/components/Provider';

export const metadata: Metadata = {
  title: {
    default: 'Nitesh Seram',
    template: '%s | Nitesh Seram',
  },
  description: 'Software Engineer and Open Source enthusiast',
  openGraph: {
    title: 'Nitesh Seram',
    description: 'Software Engineer and Open Source enthusiast',
    url: 'https://niteshseram.in',
    siteName: 'Nitesh Seram',
    locale: 'en-US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: 'Nitesh Seram',
    card: 'summary_large_image',
  },
  icons: {
    shortcut: '/favicon.ico',
  },
  verification: {
    google: 'cTvq0i7fkRjh7wtvWKlnG42rayvxZBES7MzLl8CoC4k',
    yandex: '75318e4097177399',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </head>
      <body className={clsx('bg-background text-foreground antialiased')}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
