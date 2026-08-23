'use client';

import dynamic from 'next/dynamic';
import { useCallback, useState } from 'react';

import type { PostIndexEntry } from '@/lib/writing';
import { useGlobalShortcut } from '@/utils/use-global-shortcut';
import { useIdlePrefetch } from '@/utils/use-idle-prefetch';

import { CommandMenuTrigger } from './trigger';

type Props = Readonly<{
  posts: PostIndexEntry[];
}>;

const CommandMenuDialog = dynamic(
  () =>
    import('./dialog').then((dialogModule) => dialogModule.CommandMenuDialog),
  { ssr: false },
);

function prefetchDialog() {
  void import('./dialog');
}

export function CommandMenu({ posts }: Props) {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useIdlePrefetch(prefetchDialog);

  const openMenu = useCallback(() => {
    setLoaded(true);
    setOpen(true);
  }, []);

  useGlobalShortcut(
    useCallback((event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setLoaded(true);
        setOpen((previousOpen) => !previousOpen);
      }
    }, []),
  );

  return (
    <>
      <CommandMenuTrigger onClick={openMenu} onPrefetch={prefetchDialog} />
      {loaded && (
        <CommandMenuDialog open={open} onOpenChange={setOpen} posts={posts} />
      )}
    </>
  );
}
