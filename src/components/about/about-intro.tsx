import { ABOUT_PROSE } from '@/data/about';
import { cn } from '@/lib/utils';

export function AboutIntro() {
  return (
    <header className={cn('site-container', 'pt-10 pb-10 sm:pt-12 sm:pb-12')}>
      <h1 className={cn('type-page-title font-medium')}>About</h1>
      <div className={cn('space-y-4', 'mt-6', 'text-base leading-7')}>
        {ABOUT_PROSE.map((paragraph) => (
          <p key={paragraph}>{paragraph.replaceAll('**', '')}</p>
        ))}
      </div>
    </header>
  );
}
