import { AUTHOR } from '@/config/site';
import { ABOUT_PROSE } from '@/data/about';
import { cn } from '@/lib/utils';

const EMPHASIS_SPLIT = /(\*\*[^*]+\*\*)/g;

export function AboutIntro() {
  return (
    <header
      className={cn(
        'max-w-2xl',
        'mx-auto px-4.5 pt-16 pb-16 sm:pt-20 sm:pb-20',
      )}
    >
      <p
        className={cn(
          'flex items-center gap-2.5',
          'font-mono text-[0.6875rem] font-medium tracking-[0.12em] uppercase',
          'text-brand',
        )}
      >
        <span aria-hidden="true" className={cn('h-px w-7', 'bg-brand')} />
        Profile / {AUTHOR.name}
      </p>
      <h1
        className={cn(
          'mt-6',
          'text-[2.25rem] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-[2.75rem]',
          'text-foreground',
        )}
      >
        About
      </h1>
      <div className={cn('max-w-[58ch]', 'mt-7')}>
        <div
          className={cn(
            'text-lg font-medium leading-8 tracking-[-0.012em]',
            'text-foreground',
          )}
        >
          <ProseParagraph text={ABOUT_PROSE[0]} />
        </div>
        <div
          className={cn(
            'flex flex-col gap-y-4',
            'mt-6',
            'text-base leading-7 tracking-[-0.005em]',
            'text-muted-foreground',
          )}
        >
          {ABOUT_PROSE.slice(1).map((paragraph) => (
            <ProseParagraph key={paragraph} text={paragraph} />
          ))}
        </div>
      </div>
      <div
        className={cn(
          'grid gap-4 sm:grid-cols-2 sm:gap-6',
          'mt-8 pt-4',
          'border-t',
          'border-border',
        )}
      >
        <ProfileDetail label="Based in" value={AUTHOR.location} />
        <ProfileDetail
          label="Currently"
          value={`${AUTHOR.jobTitle} · ${AUTHOR.employer.name}`}
        />
      </div>
    </header>
  );
}

function ProfileDetail({
  label,
  value,
}: Readonly<{ label: string; value: string }>) {
  return (
    <div>
      <p
        className={cn(
          'font-mono text-[0.625rem] font-medium tracking-[0.12em] uppercase',
          'text-muted-foreground',
        )}
      >
        {label}
      </p>
      <p className={cn('mt-1.5', 'text-sm', 'text-foreground')}>{value}</p>
    </div>
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
