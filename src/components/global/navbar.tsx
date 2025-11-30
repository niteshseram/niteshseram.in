'use client';

import clsx from 'clsx';
import { motion } from 'motion/react';
import { usePathname } from 'next/navigation';

import { Anchor } from '@/components/ui/anchor';
import { Container } from '@/components/ui/container';
import { Divider } from '@/components/ui/divider';
import { NavItems } from '@/constants';

import { GitHubStarButton } from './github-star-button';
import { Logo } from './logo';
import { ThemeToggle } from './theme-toggle';

export function Navbar() {
  const pathname = usePathname();

  return (
    <header
      className={clsx(
        'sticky top-0 isolate z-20',
        'w-full',
        'bg-background/10',
        'backdrop-blur-md transition-all',
      )}
    >
      <Container
        className={clsx('flex items-center justify-between gap-2.5', 'py-3')}
      >
        <Anchor
          variant="unstyled"
          href="/"
          className={clsx(
            'group size-8',
            'flex items-center justify-center',
            'rounded-md',
            'hover:bg-secondary/40 transition-colors',
          )}
          aria-label="Home"
        >
          <Logo size={20} className="group-hover:animate-wiggle" />
        </Anchor>
        <nav className="flex flex-1 items-center justify-end gap-1">
          {Object.values(NavItems).map((item, idx) => {
            const active = pathname === item.href;
            return (
              <Anchor
                variant="unstyled"
                key={idx}
                href={item.href}
                className={clsx(
                  'relative isolate',
                  'px-2.5 py-2',
                  'rounded-md',
                  'text-sm font-medium',
                  'transition-colors',
                  active
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground',
                )}
                aria-current={active ? 'page' : undefined}
              >
                {active && (
                  <motion.span
                    layoutId="navbar-active"
                    className={clsx(
                      'absolute inset-0 -z-[1]',
                      'rounded-md',
                      'bg-secondary/70',
                    )}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {item.label}
              </Anchor>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5">
          <GitHubStarButton />
          <Divider className="h-4" direction="vertical" />
          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
}
