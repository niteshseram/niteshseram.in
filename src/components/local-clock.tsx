'use client';

import { useEffect, useState } from 'react';

import { AUTHOR } from '@/config/site';
import { getLocalTime } from '@/lib/local-time';
import { cn } from '@/lib/utils';

import { FooterCompanion } from './illustrations/footer-companion';

export function LocalClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    function updateTime() {
      clearTimeout(timeout);
      const currentTime = new Date();
      setNow(currentTime);
      timeout = setTimeout(
        updateTime,
        60_000 - (currentTime.getTime() % 60_000),
      );
    }

    function handleVisibilityChange() {
      if (document.visibilityState === 'visible') updateTime();
      else clearTimeout(timeout);
    }

    updateTime();
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      clearTimeout(timeout);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const localTime = now ? getLocalTime(now, AUTHOR.timeZone) : null;
  const isSleeping = localTime !== null && localTime.hour < 6;

  return (
    <>
      <FooterCompanion isSleeping={isSleeping} />
      <div className="shrink-0">
        <p className={cn('text-xs leading-5', 'text-muted-foreground')}>
          My local time
        </p>
        <p
          className={cn(
            'min-w-36',
            'mt-0.5',
            'text-sm leading-6 tabular-nums',
            'text-foreground-secondary',
          )}
        >
          {now ? (
            <time dateTime={now.toISOString()}>{localTime?.label}</time>
          ) : (
            <span>—:—</span>
          )}
          <span
            aria-label="India Standard Time"
            className={cn('ml-1.5', 'text-xs', 'text-muted-foreground')}
          >
            IST
          </span>
        </p>
        {isSleeping && (
          <span className="sr-only">
            The puppy is sleeping. It is nighttime in India.
          </span>
        )}
      </div>
    </>
  );
}
