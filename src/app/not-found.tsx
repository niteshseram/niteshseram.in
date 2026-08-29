import { ArrowLeft, FilePenLine } from 'lucide-react';

import { WanderHomeGame } from '@/components/not-found/wander-home-game';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const metadata = {
  title: 'Page not found',
};

export default function NotFound() {
  return (
    <main
      className={cn('w-full max-w-2xl', 'mx-auto px-4.5 pt-14 pb-12 sm:pt-20')}
    >
      <p
        className={cn(
          'font-mono text-xs uppercase tracking-[0.22em]',
          'text-brand',
        )}
      >
        Error &middot; 404
      </p>
      <h1
        className={cn(
          'mt-5',
          'type-page-title font-semibold',
          'text-foreground',
        )}
      >
        <span className="block">This page</span>
        <span className="block italic text-brand">wandered off.</span>
      </h1>
      <p className={cn('mt-6', 'leading-relaxed', 'text-muted-foreground')}>
        The URL you followed either doesn&rsquo;t exist or has moved somewhere
        else. If you have a moment, help this lost page collect its fragments
        and find its way home.
      </p>
      <WanderHomeGame />
      <div className={cn('flex flex-wrap items-center gap-2.5', 'mt-6')}>
        <Button
          addonPosition="start"
          href="/"
          icon={<ArrowLeft />}
          label="Back to home"
          size="md"
          variant="brand"
        />
        <Button
          addonPosition="start"
          href="/writing"
          icon={<FilePenLine />}
          label="Read the writing"
          size="md"
          variant="outline"
        />
      </div>
    </main>
  );
}
