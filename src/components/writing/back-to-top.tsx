'use client';

import { ArrowUp } from 'lucide';
import { useEffect, useState } from 'react';

import { IconButton } from '@/components/ui/icon-button';
import { SiteIcon } from '@/components/ui/site-icon';
import { cn } from '@/lib/utils';

function scrollToTop() {
  document.getElementById('main-content')?.focus({ preventScroll: true });
  window.scrollTo({
    top: 0,
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'instant'
      : 'smooth',
  });
}

export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [footerOverlap, setFooterOverlap] = useState(0);

  useEffect(() => {
    const footer = document.querySelector('footer.site-container');
    let frame = 0;

    function updatePosition() {
      frame = 0;
      setVisible(window.scrollY > window.innerHeight);
      setFooterOverlap(
        footer
          ? Math.max(0, window.innerHeight - footer.getBoundingClientRect().top)
          : 0,
      );
    }

    function scheduleUpdate() {
      if (!frame) frame = requestAnimationFrame(updatePosition);
    }

    updatePosition();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={cn(
        'fixed right-[max(1rem,env(safe-area-inset-right))] bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 sm:right-6 sm:bottom-6',
      )}
      style={{ transform: `translateY(-${footerOverlap}px)` }}
    >
      <IconButton
        label="Back to top"
        icon={<SiteIcon icon={ArrowUp} />}
        onClick={scrollToTop}
        className={cn(
          'rounded-full border shadow-sm',
          'border-divider bg-background',
        )}
      />
    </div>
  );
}
