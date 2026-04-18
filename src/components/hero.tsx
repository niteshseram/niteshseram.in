'use client';

import { Terminal } from '@/components/terminal';
import { Anchor } from '@/components/ui/anchor';
import { Button } from '@/components/ui/button';
import { SOCIAL_LINKS } from '@/data/social-links';
import { cn } from '@/lib/utils';

export function Hero() {
  return (
    <section className={cn('max-w-2xl', 'mx-auto px-4.5 py-14 sm:py-20')}>
      <h1
        className={cn(
          'flex items-center gap-x-2',
          'text-sm',
          'text-muted-foreground',
        )}
      >
        <span
          aria-hidden="true"
          className={cn('size-2', 'rounded-full', 'bg-brand', 'animate-pulse')}
        />
        <span className="font-medium text-foreground">Nitesh Seram</span>
        <span aria-hidden="true">·</span>
        <span>Software Engineer</span>
      </h1>
      <h2
        className={cn(
          'mt-5',
          'font-serif text-[clamp(1.8rem,8vw,2.4rem)] leading-[1.15]',
          'text-foreground',
        )}
      >
        <span className="block">Engineering for the web.</span>
        <span className="block italic text-brand">Polished to the pixel.</span>
      </h2>
      <p className={cn('mt-6', 'leading-relaxed', 'text-muted-foreground')}>
        Software Engineer based in Assam, India, with 5+ years of building for
        the web. Currently, I build{' '}
        <Anchor href="https://www.greatfrontend.com" variant="brand">
          GreatFrontEnd
        </Anchor>{' '}
        — a platform for engineers prepping for frontend interviews. My days are
        React, TypeScript, and CSS problems that look trivial until they
        aren&apos;t. I care about performance and the small details nobody
        notices.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-2.5">
        {[SOCIAL_LINKS.github, SOCIAL_LINKS.x, SOCIAL_LINKS.linkedin].map(
          (social) => (
            <Button
              key={social.label}
              addonPosition="start"
              href={social.href}
              icon={social.icon}
              label={social.label}
              size="md"
              variant="outline"
            />
          ),
        )}
        <Button
          key={SOCIAL_LINKS.email.label}
          addonPosition="start"
          href={SOCIAL_LINKS.email.href}
          icon={SOCIAL_LINKS.email.icon}
          label={SOCIAL_LINKS.email.label}
          size="md"
          className="max-sm:hidden"
          variant="outline"
        />
      </div>
      <Terminal className="mt-12" />
    </section>
  );
}
