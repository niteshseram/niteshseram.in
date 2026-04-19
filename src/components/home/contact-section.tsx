import { PiArrowUpRight, PiEnvelope } from 'react-icons/pi';

import { Anchor } from '@/components/ui/anchor';
import { SOCIAL_LINKS } from '@/data/social-links';
import { cn } from '@/lib/utils';

export function ContactSection() {
  return (
    <section
      id="contact"
      aria-label="Contact"
      className={cn('max-w-2xl scroll-mt-13', 'mx-auto px-4.5 py-16')}
    >
      <div
        className={cn(
          'relative overflow-hidden',
          'px-6 py-10 sm:px-10 sm:py-12',
          'rounded-2xl border border-border',
          'bg-surface/40',
        )}
      >
        <div
          aria-hidden="true"
          className={cn(
            'absolute inset-0',
            'bg-[radial-gradient(circle_at_center,var(--border)_1px,transparent_1px)] bg-[size:18px_18px]',
            'opacity-40',
          )}
        />
        <div
          aria-hidden="true"
          className={cn(
            'absolute -top-24 -right-24 size-64',
            'rounded-full bg-brand/10 blur-3xl',
          )}
        />
        <div
          aria-hidden="true"
          className={cn(
            'absolute -bottom-32 -left-24 size-64',
            'rounded-full bg-brand/10 blur-3xl',
          )}
        />

        <div className="relative">
          <p
            className={cn(
              'font-serif text-[clamp(1.5rem,6vw,2rem)] leading-[1.2]',
              'text-foreground',
            )}
          >
            <span className="block">Got something in mind?</span>
            <span className="block italic text-brand">Let&apos;s talk.</span>
          </p>

          <p className={cn('mt-5', 'leading-relaxed', 'text-muted-foreground')}>
            Open to new conversations — project ideas, collaborations, or
            anything interesting on the web. I read every message and try to
            reply within a day or two.
          </p>

          <Anchor
            href={SOCIAL_LINKS.email.href}
            aria-label="Send an email"
            variant="unstyled"
            weight="inherit"
            className={cn(
              'group mt-8 inline-flex items-center gap-x-3',
              'rounded-md',
              'text-base sm:text-lg font-medium',
              'text-foreground',
              'transition-colors',
              'hover:text-brand',
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                'inline-flex items-center justify-center size-9',
                'rounded-lg border border-border',
                'bg-background text-brand',
                'transition-colors',
                'group-hover:border-brand/40 group-hover:bg-brand/10',
              )}
            >
              <PiEnvelope className="size-4" />
            </span>
            <span className="underline underline-offset-[5px] decoration-[1.5px] decoration-border group-hover:decoration-brand">
              {SOCIAL_LINKS.email.username}
            </span>
            <PiArrowUpRight
              aria-hidden="true"
              className={cn(
                'size-4 shrink-0',
                'text-muted-foreground',
                'transition-transform',
                'group-hover:text-brand group-hover:-translate-y-0.5 group-hover:translate-x-0.5',
              )}
            />
          </Anchor>
        </div>
      </div>
    </section>
  );
}
