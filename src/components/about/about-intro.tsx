import { PiTerminalWindow } from 'react-icons/pi';

import { ABOUT_PROSE } from '@/data/about';
import { cn } from '@/lib/utils';

export function AboutIntro() {
  return (
    <section className={cn('max-w-2xl mx-auto', 'px-4.5 pt-14 sm:pt-20 pb-8')}>
      <p
        className={cn(
          'inline-flex items-center gap-x-1.5',
          'font-mono text-xs',
          'text-muted-foreground',
        )}
      >
        <PiTerminalWindow aria-hidden="true" className="size-3.5 text-brand" />
        whoami
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
        {ABOUT_PROSE.map((paragraph) => (
          <ProseParagraph key={paragraph} text={paragraph} />
        ))}
      </div>
    </section>
  );
}

const EMPHASIS_SPLIT = /(\*\*[^*]+\*\*)/g;

function ProseParagraph({ text }: Readonly<{ text: string }>) {
  const parts = text.split(EMPHASIS_SPLIT);
  return (
    <p>
      {parts.map((part, index) => {
        const key = `${index}-${part}`;
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <span key={key} className="font-medium text-foreground">
              {part.slice(2, -2)}
            </span>
          );
        }
        return <span key={key}>{part}</span>;
      })}
    </p>
  );
}
