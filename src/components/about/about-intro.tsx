import { ABOUT_PROSE } from '@/data/about';
import { cn } from '@/lib/utils';

export function AboutIntro() {
  return (
    <section className={cn('max-w-2xl mx-auto', 'px-4.5 pt-14 sm:pt-20 pb-8')}>
      <p
        className={cn(
          'font-mono text-[11px] uppercase tracking-[0.14em]',
          'text-muted-foreground',
        )}
      >
        About
      </p>
      <h1
        className={cn(
          'mt-3',
          'font-serif text-[clamp(1.8rem,8vw,2.4rem)] leading-[1.15]',
          'text-foreground',
        )}
      >
        <span className="block">A few notes</span>
        <span className="block italic text-brand">about me.</span>
      </h1>

      <div
        className={cn(
          'mt-8 flex flex-col gap-y-5',
          'leading-relaxed',
          'text-muted-foreground',
        )}
      >
        {ABOUT_PROSE.map((paragraph, i) => (
          <p key={i}>{renderEmphasis(paragraph)}</p>
        ))}
      </div>
    </section>
  );
}

function renderEmphasis(text: string): React.ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <span key={i} className="font-medium text-foreground">
          {part.slice(2, -2)}
        </span>
      );
    }
    return part;
  });
}
