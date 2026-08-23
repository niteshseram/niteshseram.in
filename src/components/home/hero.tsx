import { Anchor } from '@/components/ui/anchor';
import { AUTHOR, SITE_TAGLINE } from '@/config/site';
import { cn } from '@/lib/utils';

export function Hero() {
  return (
    <section
      aria-labelledby="home-title"
      className={cn(
        'max-w-2xl',
        'mx-auto px-4.5 pt-16 pb-20 sm:pt-20 sm:pb-24',
      )}
    >
      <h1
        id="home-title"
        className={cn(
          'max-w-[16em]',
          'type-page-title font-semibold',
          'text-foreground',
        )}
      >
        {SITE_TAGLINE}
      </h1>
      <p
        className={cn(
          'max-w-[44ch]',
          'mt-6',
          'text-lg font-medium leading-[1.5] tracking-[-0.015em]',
          'text-foreground',
        )}
      >
        I’m {AUTHOR.name} — a {AUTHOR.jobTitle.toLowerCase()} based in{' '}
        {AUTHOR.location}.
      </p>
      <p
        className={cn(
          'max-w-[54ch]',
          'mt-4',
          'text-base leading-7 tracking-[-0.005em]',
          'text-muted-foreground',
        )}
      >
        I work at{' '}
        <Anchor href={AUTHOR.employer.url} variant="prose" weight="normal">
          {AUTHOR.employer.name}
        </Anchor>
        , building frontend products. I care about performance, maintainable
        systems, and the small interaction details that make software feel clear
        and dependable.
      </p>
    </section>
  );
}
