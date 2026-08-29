import { ArrowUpRight } from 'lucide-react';

import { Anchor } from '@/components/ui/anchor';
import { ContentSection } from '@/components/ui/content-section';
import { SOCIAL_LINKS } from '@/data/social-links';
import { cn } from '@/lib/utils';

const contactLinks = [
  SOCIAL_LINKS.github,
  SOCIAL_LINKS.linkedin,
  SOCIAL_LINKS.x,
];

export function ContactSection() {
  return (
    <ContentSection id="contact" ariaLabel="Contact" title="Let’s talk">
      <div
        className={cn(
          'relative overflow-hidden',
          'p-5 sm:p-6',
          'rounded-xl border shadow-sm ring-1 ring-inset ring-foreground/5',
          'bg-surface/95 border-border shadow-shadow/10',
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            'absolute -top-16 -right-14 size-52',
            'rounded-full opacity-[0.2] blur-[3rem] dark:opacity-[0.28]',
            'bg-[var(--hero-glow)]',
            'pointer-events-none',
          )}
        />
        <div
          className={cn(
            'relative grid gap-7 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end sm:gap-8',
          )}
        >
          <div>
            <p
              className={cn(
                'inline-flex items-center gap-2',
                'font-mono text-[0.6875rem] font-medium tracking-[0.12em] uppercase',
                'text-brand',
              )}
            >
              <span
                aria-hidden="true"
                className={cn('size-2', 'rounded-full', 'bg-brand')}
              />
              Get in touch
            </p>
            <p
              className={cn(
                'max-w-[42ch]',
                'mt-4',
                'text-base leading-7',
                'text-muted-foreground',
              )}
            >
              Open to project ideas, collaborations, and interesting
              conversations about the web.
            </p>
          </div>
          <Anchor
            href={SOCIAL_LINKS.email.href}
            aria-label="Send an email"
            className={cn(
              'inline-flex w-fit items-center gap-2 sm:justify-self-end',
              'px-4 py-2.5',
              'rounded-full border shadow-sm',
              'text-sm font-medium tracking-[-0.01em]',
              'bg-background/80 text-foreground border-border shadow-shadow/5',
              'group/email',
              'transition-[background-color,border-color,box-shadow]',
              'hover:bg-background hover:border-brand/50 hover:shadow-shadow/10',
            )}
            variant="unstyled"
            weight="inherit"
          >
            {SOCIAL_LINKS.email.username}
            <ArrowUpRight
              aria-hidden="true"
              className={cn(
                'size-4',
                'transition-transform duration-200',
                'group-hover/email:translate-x-0.5 group-hover/email:-translate-y-0.5',
              )}
            />
          </Anchor>
        </div>
        <div
          className={cn(
            'relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between',
            'mt-7',
          )}
        >
          <p
            className={cn(
              'font-mono text-[0.6875rem] tracking-[0.02em]',
              'text-muted-foreground',
            )}
          >
            Usually replies within a day or two
          </p>
          <nav
            aria-label="Social links"
            className={cn(
              'flex flex-wrap items-center gap-x-5 gap-y-2',
              'font-mono text-xs',
            )}
          >
            {contactLinks.map((social) => (
              <Anchor
                key={social.label}
                href={social.href}
                variant="default"
                weight="normal"
              >
                {social.label}
              </Anchor>
            ))}
          </nav>
        </div>
      </div>
    </ContentSection>
  );
}
