'use client';

import clsx from 'clsx';

import { Anchor } from '@/components/ui/anchor';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Text } from '@/components/ui/text';
import { SOCIALS } from '@/data/social';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <Container
        className={clsx(
          'flex flex-row justify-between gap-3',
          'py-6',
          'border-border/30 border-t',
        )}
      >
        <div className="flex flex-col gap-1.5">
          <Text color="default" size="body2">
            &copy; {currentYear} Nitesh Seram
          </Text>
          <Text color="secondary" size="body2">
            The source code is available on{' '}
            <Anchor href="https://github.com/niteshseram/niteshseram.in">
              GitHub
            </Anchor>
            .
          </Text>
        </div>
        <div className="flex gap-1.5 md:gap-2">
          {[SOCIALS.github, SOCIALS.linkedin, SOCIALS.twitter].map((item) => (
            <Button
              key={item.name}
              label={item.name}
              icon={item.icon}
              href={item.href}
              isLabelHidden={true}
              variant="tertiary"
              className="group"
              iconClassName="group-hover:animate-wiggle"
            />
          ))}
        </div>
      </Container>
    </footer>
  );
}
