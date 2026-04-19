import { Terminal, TypingAnimation } from '@/components/terminal';
import { Anchor } from '@/components/ui/anchor';
import { Button } from '@/components/ui/button';
import { AUTHOR, SITE_TAGLINE } from '@/config/site';
import { SOCIAL_LINKS } from '@/data/social-links';
import { cn } from '@/lib/utils';

export function Hero() {
  const EmailIcon = SOCIAL_LINKS.email.icon;

  return (
    <section className={cn('max-w-2xl', 'mx-auto px-4.5 pt-14 sm:pt-20 pb-12')}>
      <h1
        className={cn(
          'mt-5',
          'font-serif text-[clamp(1.8rem,8vw,2.4rem)] leading-[1.15]',
          'text-foreground',
        )}
      >
        <span className="block">{SITE_TAGLINE.primary}</span>
        <span className="block italic text-brand">{SITE_TAGLINE.accent}</span>
      </h1>
      <p className={cn('mt-6', 'leading-relaxed', 'text-muted-foreground')}>
        Hi, I&apos;m{' '}
        <span className="font-medium text-foreground">{AUTHOR.name}</span> — a{' '}
        {AUTHOR.jobTitle} based in {AUTHOR.location}, with{' '}
        {AUTHOR.yearsExperience} years of building for the web. Currently,
        working at{' '}
        <Anchor href={AUTHOR.employer.url} variant="brand">
          {AUTHOR.employer.name}
        </Anchor>{' '}
        — {AUTHOR.employer.description}. My days are React, TypeScript, and CSS
        problems that look trivial until they aren&apos;t. I care about
        performance and the small details nobody notices.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-2.5">
        {[SOCIAL_LINKS.github, SOCIAL_LINKS.x, SOCIAL_LINKS.linkedin].map(
          (social) => {
            const Icon = social.icon;
            return (
              <Button
                key={social.label}
                addonPosition="start"
                href={social.href}
                icon={<Icon />}
                label={social.label}
                size="md"
                variant="outline"
              />
            );
          },
        )}
        <Button
          key={SOCIAL_LINKS.email.label}
          addonPosition="start"
          href={SOCIAL_LINKS.email.href}
          icon={<EmailIcon />}
          label={SOCIAL_LINKS.email.label}
          size="md"
          className="max-sm:hidden"
          variant="outline"
        />
      </div>
      <Terminal className="mt-12 min-h-[203px]">
        <TypingAnimation duration={40}>{'const nitesh = {'}</TypingAnimation>
        <TypingAnimation duration={40} className="text-muted-foreground">
          {`  role: "${AUTHOR.jobTitle}",`}
        </TypingAnimation>
        <TypingAnimation duration={40} className="text-muted-foreground">
          {'  focus: "Frontend & UI",'}
        </TypingAnimation>
        <TypingAnimation duration={40} className="text-muted-foreground">
          {'  stack: ["React", "Next.js", "TypeScript"],'}
        </TypingAnimation>
        <TypingAnimation duration={40} keepCursor>
          {'}'}
        </TypingAnimation>
      </Terminal>
    </section>
  );
}
