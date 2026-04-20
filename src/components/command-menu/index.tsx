'use client';

import dynamic from 'next/dynamic';
import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import type { PostIndexEntry } from '@/lib/writing';
import { useGlobalShortcut } from '@/utils/use-global-shortcut';

import { CommandMenuTrigger } from './trigger';

type Props = Readonly<{
  posts: PostIndexEntry[];
}>;

const CommandMenuDialog = dynamic(
  () => import('./dialog').then((m) => m.CommandMenuDialog),
  { ssr: false },
);

function prefetchDialog() {
  void import('./dialog');
}

export function CommandMenu({ posts }: Props) {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(prefetchDialog, { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(prefetchDialog, 1500);
    return () => clearTimeout(id);
  }, []);

  const openMenu = useCallback(() => {
    setLoaded(true);
    setOpen(true);
  }, []);

  useGlobalShortcut(
    useCallback((e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setLoaded(true);
        setOpen((o) => !o);
      }
    }, []),
  );

  return (
    <>
      <CommandMenuTrigger
        onClick={openMenu}
        onPrefetch={prefetchDialog}
        variant="inline"
      />
      {mounted &&
        createPortal(
          <CommandMenuTrigger
            onClick={openMenu}
            onPrefetch={prefetchDialog}
            variant="floating"
          />,
          document.body,
        )}
      {loaded && (
        <CommandMenuDialog open={open} onOpenChange={setOpen} posts={posts} />
      )}
    </>
  );
}
