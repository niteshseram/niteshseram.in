import { PiArrowLeft, PiNotePencil } from 'react-icons/pi';

import { Terminal, TypingAnimation } from '@/components/terminal';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const metadata = {
  title: 'Page not found',
};

export default function NotFound() {
  return (
    <main className={cn('max-w-2xl', 'mx-auto px-4.5 pt-14 sm:pt-20 pb-12')}>
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
          'font-serif text-[clamp(1.8rem,8vw,2.4rem)] leading-[1.15]',
          'text-foreground',
        )}
      >
        <span className="block">This page</span>
        <span className="block italic text-brand">wandered off.</span>
      </h1>
      <p className={cn('mt-6', 'leading-relaxed', 'text-muted-foreground')}>
        The URL you followed either doesn&rsquo;t exist or has moved somewhere
        else. No harm done &mdash; here are a couple of places to head instead.
      </p>
      <div className={cn('flex flex-wrap items-center gap-2.5', 'mt-8')}>
        <Button
          addonPosition="start"
          href="/"
          icon={<PiArrowLeft />}
          label="Back to home"
          size="md"
          variant="brand"
        />
        <Button
          addonPosition="start"
          href="/writing"
          icon={<PiNotePencil />}
          label="Read the writing"
          size="md"
          variant="outline"
        />
      </div>
      <Terminal className="mt-12 min-h-[203px]" title="404.log">
        <TypingAnimation duration={35}>
          {'$ curl -I niteshseram.in/$_'}
        </TypingAnimation>
        <TypingAnimation duration={35} className="text-muted-foreground">
          {'HTTP/2 404'}
        </TypingAnimation>
        <TypingAnimation duration={35} className="text-muted-foreground">
          {'x-status: page-not-found'}
        </TypingAnimation>
        <TypingAnimation duration={35} className="text-muted-foreground">
          {'x-suggestion: "try /"'}
        </TypingAnimation>
        <TypingAnimation duration={35} keepCursor>
          {'$ cd ~'}
        </TypingAnimation>
      </Terminal>
    </main>
  );
}
