import { ViewTransition } from 'react';

import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { cn } from '@/lib/utils';
import { getPostIndex } from '@/lib/writing';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const posts = getPostIndex();

  return (
    <>
      <a
        className={cn(
          'sr-only',
          'focus-visible:not-sr-only focus-visible:fixed focus-visible:top-3 focus-visible:left-3 focus-visible:z-[70]',
          'focus-visible:px-3 focus-visible:py-2',
          'focus-visible:rounded-md focus-visible:border focus-visible:shadow-md',
          'focus-visible:text-sm focus-visible:font-medium',
          'focus-visible:bg-background focus-visible:text-foreground focus-visible:border-border',
        )}
        href="#main-content"
      >
        Skip to content
      </a>
      <Navbar posts={posts} />
      <ViewTransition
        default="none"
        name="page-content"
        update="page-transition"
      >
        <main
          className={cn('flex-1', 'outline-none')}
          id="main-content"
          tabIndex={-1}
        >
          {children}
        </main>
      </ViewTransition>
      <Footer />
    </>
  );
}
