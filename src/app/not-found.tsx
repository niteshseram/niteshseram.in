import { Anchor } from '@/components/ui/anchor';
import { cn } from '@/lib/utils';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <div className={cn('site-container', 'py-20 sm:py-28')}>
      <p className={cn('text-sm', 'text-muted-foreground')}>404</p>
      <h1 className={cn('mt-3', 'type-page-title font-medium')}>
        Page not found
      </h1>
      <p className={cn('mt-4', 'text-base leading-7', 'text-muted-foreground')}>
        This address may have changed, or the page no longer exists.
      </p>
      <nav
        aria-label="Find your way"
        className={cn('flex flex-wrap gap-6', 'mt-6')}
      >
        <Anchor
          href="/"
          variant="prose"
          weight="normal"
          className={cn('inline-flex min-h-11 items-center')}
        >
          Back to home
        </Anchor>
        <Anchor
          href="/writing"
          variant="prose"
          weight="normal"
          className={cn('inline-flex min-h-11 items-center')}
        >
          Browse writing
        </Anchor>
      </nav>
    </div>
  );
}
