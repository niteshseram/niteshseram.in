import { AUTHOR } from '@/config/site';
import { cn } from '@/lib/utils';

export function AboutIntro() {
  return (
    <section className={cn('max-w-2xl mx-auto', 'px-4.5 pt-14 sm:pt-20 pb-8')}>
      <p
        className={cn(
          'font-mono text-[11px] uppercase tracking-[0.14em]',
          'text-muted-foreground/80',
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
        <p>
          I didn&apos;t grow up planning to write CSS for a living. The plan —
          as far as plans go in a small town in{' '}
          {`${AUTHOR.name} - ${AUTHOR.jobTitle}`} — was medicine. Engineering
          snuck up on me in 2015, and by the time I realized I&apos;d chosen it
          for real, it already felt like the right wrong turn.
        </p>
        <p>
          What pulled me toward the{' '}
          <span className="font-medium text-foreground">frontend</span>{' '}
          specifically was the feedback loop. Backends have their own elegance,
          but the frontend gave me something immediate — a shape, a color, a
          transition that either feels right or doesn&apos;t. I spent the first
          few years learning how to make things work. The last few have been
          about making them feel good.
        </p>
        <p>
          I work best when I can trace a thread all the way through — from a
          rough idea, to the interaction that expresses it, to the edge cases
          nobody asks about until they hit one. I&apos;ve come to trust boring
          code that never surprises anyone, and careful restraint over another
          dependency. Most of the craft, I think, is in what you choose to leave
          out.
        </p>
      </div>
    </section>
  );
}
