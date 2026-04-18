import { Logo } from '@/components/logo';
import { Anchor } from '@/components/ui/anchor';
import { navItems } from '@/config/nav';
import { SOCIAL_LINKS } from '@/data/social-links';
import { cn } from '@/lib/utils';

const socials = [
  SOCIAL_LINKS.github,
  SOCIAL_LINKS.linkedin,
  SOCIAL_LINKS.x,
  SOCIAL_LINKS.email,
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn(
        'relative mt-24',
        'border-t border-border',
        'bg-surface/40',
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          'absolute left-1/2 top-0 h-px w-40 sm:w-120 -translate-x-1/2 -translate-y-px',
          'bg-gradient-to-r from-transparent via-brand/60 to-transparent',
        )}
      />
      <div className={cn('max-w-2xl', 'mx-auto px-4.5 pt-12 pb-8')}>
        <div
          className={cn(
            'grid grid-cols-2 gap-10',
            'sm:grid-cols-[1fr_auto_auto] sm:justify-between sm:gap-x-16',
          )}
        >
          <div className="flex flex-col col-span-2 sm:col-span-1">
            <Anchor
              href="/"
              aria-label="Home"
              variant="unstyled"
              weight="inherit"
              className="inline-flex items-center gap-x-2 w-fit"
            >
              <Logo size={24} />
              <span className="text-lg font-medium text-foreground">
                Nitesh Seram
              </span>
            </Anchor>
            <p
              className={cn(
                'mt-3 max-w-[24ch]',
                'text-sm leading-relaxed',
                'text-muted-foreground',
              )}
            >
              Engineering for the web.{' '}
              <span className="italic text-brand block">
                Polished to the pixel.
              </span>
            </p>
          </div>
          <nav aria-label="Footer navigation" className="flex flex-col">
            <h3
              className={cn(
                'mb-3',
                'text-xs font-medium uppercase tracking-wider',
                'text-muted-foreground',
              )}
            >
              Navigate
            </h3>
            <ul className="flex flex-col gap-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Anchor
                    href={item.href}
                    variant="unstyled"
                    weight="normal"
                    className={cn(
                      'text-sm',
                      'text-muted-foreground',
                      'hover:text-foreground',
                    )}
                  >
                    {item.label}
                  </Anchor>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex flex-col">
            <h3
              className={cn(
                'mb-3',
                'text-xs font-medium uppercase tracking-wider',
                'text-muted-foreground',
              )}
            >
              Connect
            </h3>
            <ul className="flex flex-col gap-y-2">
              {socials.map((social) => (
                <li key={social.label}>
                  <Anchor
                    href={social.href}
                    variant="unstyled"
                    weight="normal"
                    className={cn(
                      'inline-flex items-center gap-x-2',
                      'text-sm',
                      'text-muted-foreground',
                      'group',
                      'hover:text-foreground',
                    )}
                  >
                    <social.icon
                      aria-hidden="true"
                      className={cn(
                        'size-3.5 shrink-0',
                        'transition-colors',
                        'group-hover:text-brand',
                      )}
                    />
                    {social.label}
                  </Anchor>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div
          className={cn(
            'mt-10 flex flex-col-reverse items-start gap-3',
            'pt-6',
            'text-xs',
            'text-muted-foreground',
            'sm:flex-row sm:items-center sm:justify-between',
          )}
        >
          <p>
            <span aria-hidden="true">©</span> {year} Nitesh Seram. All rights
            reserved.
          </p>
          <p className="inline-flex items-center gap-x-1.5 max-sm:hidden">
            <span
              aria-hidden="true"
              className={cn('size-1.5', 'rounded-full', 'bg-brand')}
            />
            Crafted with care in Assam, India.
          </p>
        </div>
      </div>
    </footer>
  );
}
