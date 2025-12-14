'use client';

import clsx from 'clsx';
import { motion } from 'motion/react';
import { useState } from 'react';
import { PiArrowUpRight } from 'react-icons/pi';

import { ParticleButton } from '@/components/animations/particle-button';
import { Anchor } from '@/components/ui/anchor';
import { Container } from '@/components/ui/container';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { SOCIALS } from '@/data/social';

export function Contact() {
  return (
    <section className={clsx('relative', 'py-20')} id="contact">
      <div
        className={clsx(
          'absolute inset-0 overflow-hidden',
          'flex items-center justify-center',
          'pointer-events-none select-none',
        )}
        aria-hidden="true"
      >
        <span className="text-foreground/5 text-[19vw] leading-none font-bold whitespace-nowrap">
          Get in Touch
        </span>
      </div>

      <Container
        className={clsx('relative', 'flex flex-col justify-between gap-20')}
      >
        <div className="flex flex-col justify-between gap-10">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <Anchor
                variant="unstyled"
                href="mailto:niteshseram@gmail.com?subject=Let's%20talk"
                className="group flex items-center gap-4"
              >
                <Heading
                  className={clsx(
                    'text-6xl font-bold sm:text-8xl',
                    'text-foreground hover:text-muted-foreground',
                    'tracking-tighter transition-colors',
                  )}
                >
                  Let&apos;s talk
                </Heading>
                <motion.div
                  whileHover={{ x: 10, y: -10 }}
                  className={clsx(
                    'bg-foreground text-background group-hover:bg-secondary group-hover:text-foreground rounded-full p-3 transition-colors sm:p-5',
                  )}
                >
                  <PiArrowUpRight className="size-7" aria-hidden="true" />
                </motion.div>
              </Anchor>
              <EmailButton />
            </div>
            <Text color="secondary" size="body0" className="max-w-lg">
              Always open to interesting opportunities and good conversation. My
              inbox is open — drop me a line.
            </Text>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex gap-4">
              {[SOCIALS.github, SOCIALS.linkedin, SOCIALS.twitter].map(
                (item) => (
                  <Anchor
                    key={item.name}
                    href={item.href}
                    className={clsx(
                      'group',
                      'flex items-center justify-center',
                      'p-3',
                      'border-border hover:border-foreground rounded-full border',
                      'hover:bg-foreground/80',
                      'hover:text-background',
                      'backdrop-blur-sm transition-colors',
                    )}
                    aria-label={item.name}
                  >
                    <item.icon
                      className="group-hover:animate-wiggle size-5"
                      aria-hidden="true"
                    />
                  </Anchor>
                ),
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function EmailButton() {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('niteshseram@gmail.com');
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <div className="-ml-2.5">
      <ParticleButton
        variant="unstyled"
        label={hasCopied ? 'Copied to clipboard!' : 'niteshseram@gmail.com'}
        onClick={handleCopy}
        className={clsx(
          '!text-lg !font-semibold italic sm:!text-2xl',
          'text-muted-foreground hover:text-foreground transition-colors',
          hasCopied && 'text-foreground',
        )}
      />
    </div>
  );
}
