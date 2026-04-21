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
        href="#main-content"
        className={cn(
          'sr-only',
          'focus-visible:not-sr-only focus-visible:fixed focus-visible:top-3 focus-visible:left-3 focus-visible:z-50 focus-visible:px-3 focus-visible:py-2 focus-visible:rounded-md focus-visible:border focus-visible:shadow-md focus-visible:text-sm focus-visible:font-medium focus-visible:bg-background focus-visible:text-foreground focus-visible:border-border',
        )}
      >
        Skip to content
      </a>
      <Navbar posts={posts} />
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        {children}
      </main>
      <Footer />
    </>
  );
}
