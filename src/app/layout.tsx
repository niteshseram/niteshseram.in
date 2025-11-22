import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import clsx from 'clsx';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Provider from '@/components/Provider';
import StickySocial from '@/components/StickySocial';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

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
      <body
        className={clsx('bg-light dark:bg-dark antialiased', inter.variable)}
      >
        <Provider>
          <Navbar />
          <div className="mx-auto w-[92vw] max-w-2xl pt-10 sm:w-[90vw]">
            <StickySocial />
            {children}
            <Footer />
            <Analytics />
          </div>
        </Provider>
      </body>
    </html>
  );
}
