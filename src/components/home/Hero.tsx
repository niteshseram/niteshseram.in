'use client';

import clsx from 'clsx';
import { PiDownloadSimpleLight } from 'react-icons/pi';

import { Anchor } from '@/components/ui/anchor';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';

export default function Hero() {
  return (
    <Container tag="section" className="flex flex-col justify-center">
      <div className="flex items-center gap-4 lg:gap-8">
        <img
          src="/niteshseram.webp"
          alt="Nitesh Seram"
          loading="eager"
          className={clsx(
            'size-20 lg:size-30',
            'shrink-0 rounded-md object-contain',
            'grayscale transition-all duration-300 ease-in-out hover:grayscale-0',
          )}
        />
        <div className="flex flex-col justify-center">
          <Heading className="text-3xl font-semibold lg:text-4xl">
            Nitesh Seram
          </Heading>
          <p className="text-muted-foreground text-base lg:text-lg">
            Engineering @{' '}
            <Anchor href="https://www.greatfrontend.com?fpr=seram&fp_sid=seram">
              GreatFrontEnd
            </Anchor>
          </p>
        </div>
      </div>
      <Text className="mt-6 text-balance">
        I&apos;m a Software Engineer obsessed with building{' '}
        <strong className="font-semibold">scalable frontend systems</strong>. I
        like my coffee strong, my UIs{' '}
        <strong className="font-semibold">high-performance</strong>, and my DOM
        trees shallow. Currently, I work on frontend architecture for complex,
        production-grade products used at scale.
      </Text>
      <div className={clsx('mt-8', 'flex items-center gap-4')}>
        <Button
          icon={PiDownloadSimpleLight}
          variant="primary"
          label="Resume"
          href="https://drive.google.com/file/d/1uQxjmAY-mVyv-4F_oyrQitvzfCxVUka3/view"
        />
        <Button label="Let's talk" variant="secondary" href="#contact" />
      </div>
    </Container>
  );
}
