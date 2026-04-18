import Link from 'next/link';

import { cn } from '@/lib/utils';

export default function NotFound() {
  return (
    <div className="max-w-[640px] mx-auto px-6 py-12">
      <h1 className="font-serif text-2xl text-foreground">Page not found</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        The page you&rsquo;re looking for doesn&rsquo;t exist.
      </p>
      <Link
        href="/"
        className={cn(
          'inline-block',
          'mt-6',
          'text-sm',
          'text-muted-foreground',
          'transition-colors',
          'hover:text-foreground',
        )}
      >
        &larr; Back to home
      </Link>
    </div>
  );
}
