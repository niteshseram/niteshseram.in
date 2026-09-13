'use client';

import { Search } from 'lucide';

import { IconButton } from '@/components/ui/icon-button';
import { SiteIcon } from '@/components/ui/site-icon';

export function CommandMenuTrigger({
  onClick,
  onPrefetch,
}: Readonly<{ onClick: () => void; onPrefetch?: () => void }>) {
  return (
    <IconButton
      label="Search site"
      aria-keyshortcuts="Meta+K Control+K"
      onClick={onClick}
      onMouseEnter={onPrefetch}
      onFocus={onPrefetch}
      onTouchStart={onPrefetch}
      className="-mr-3"
      icon={<SiteIcon icon={Search} />}
      tooltip="Search · ⌘K / Ctrl+K"
    />
  );
}
