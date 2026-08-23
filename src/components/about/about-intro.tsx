import { ABOUT_PROSE } from '@/data/about';
import { cn } from '@/lib/utils';

const EMPHASIS_SPLIT = /(\*\*[^*]+\*\*)/g;

export function AboutIntro() {
  return (
    <header
      className={cn(
        'max-w-2xl',
        'mx-auto px-4.5 pt-16 pb-20 sm:pt-20 sm:pb-24',
      )}
    >
      <h1 className={cn('type-page-title font-semibold', 'text-foreground')}>
        About
      </h1>
      <div
        className={cn(
          'flex max-w-[58ch] flex-col gap-y-4',
          'mt-6',
          'text-base leading-7 tracking-[-0.005em]',
          'text-muted-foreground',
        )}
      >
        {ABOUT_PROSE.map((paragraph) => (
          <ProseParagraph key={paragraph} text={paragraph} />
        ))}
      </div>
    </header>
  );
}

function ProseParagraph({ text }: Readonly<{ text: string }>) {
  const parts = text.split(EMPHASIS_SPLIT);

  return (
    <p>
      {parts.map((part, index) => {
        const key = `${index}-${part}`;
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={key} className="font-medium text-foreground">
              {part.slice(2, -2)}
            </strong>
          );
        }

        return <span key={key}>{part}</span>;
      })}
    </p>
  );
}
