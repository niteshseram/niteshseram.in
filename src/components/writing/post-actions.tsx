'use client';

import type { PopoverRootChangeEventDetails } from '@base-ui/react/popover';
import dynamic from 'next/dynamic';
import { useRef, useState } from 'react';
import { PiCaretDown, PiCheck, PiCopy } from 'react-icons/pi';

import { cn } from '@/lib/utils';
import { useIdlePrefetch } from '@/utils/use-idle-prefetch';

type Props = Readonly<{
  markdownUrl: string;
  githubUrl: string;
  pageUrl: string;
}>;

const markdownCache = new Map<string, Promise<string>>();

function fetchMarkdown(url: string): Promise<string> {
  let cached = markdownCache.get(url);
  if (!cached) {
    cached = fetch(url).then((res) => {
      if (!res.ok) {
        markdownCache.delete(url);
        throw new Error(`Failed to fetch markdown: ${res.status}`);
      }
      return res.text();
    });
    markdownCache.set(url, cached);
  }
  return cached;
}

const PostActionsMenu = dynamic(
  () => import('./post-actions-menu').then((m) => m.PostActionsMenu),
  { ssr: false },
);

function prefetchMenu() {
  void import('./post-actions-menu');
}

export function PostActions({ markdownUrl, githubUrl, pageUrl }: Props) {
  const [copied, setCopied] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useIdlePrefetch(prefetchMenu);

  async function onCopy() {
    try {
      const text = await fetchMarkdown(markdownUrl);
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // silently ignore — clipboard failures are non-critical
    }
  }

  async function toggleMenu() {
    if (!menuMounted) {
      await import('./post-actions-menu');
      setMenuMounted(true);
      setMenuOpen(true);
      return;
    }
    setMenuOpen(!menuOpen);
  }

  function handleOpenChange(
    next: boolean,
    eventDetails: PopoverRootChangeEventDetails,
  ) {
    if (
      !next &&
      eventDetails.reason === 'outside-press' &&
      triggerRef.current?.contains(eventDetails.event.target as Node)
    ) {
      eventDetails.cancel();
      return;
    }
    setMenuOpen(next);
  }

  console.log({ menuOpen });

  return (
    <div
      className={cn(
        'inline-flex items-center',
        'rounded-md',
        'border border-border',
      )}
    >
      <button
        type="button"
        onClick={onCopy}
        aria-label="Copy page as Markdown"
        className={cn(
          'inline-flex items-center gap-x-1.5',
          'h-8 px-2.5',
          'rounded-l-md',
          'text-xs font-medium',
          'text-muted-foreground',
          'cursor-pointer',
          'transition-colors',
          'hover:text-foreground hover:bg-muted',
        )}
      >
        <span
          aria-hidden="true"
          className="inline-flex size-3.5 items-center justify-center"
        >
          {copied ? <PiCheck /> : <PiCopy />}
        </span>
        <span>{copied ? 'Copied' : 'Copy Markdown'}</span>
      </button>
      <button
        ref={triggerRef}
        type="button"
        aria-label="Open page in another app"
        onClick={toggleMenu}
        onMouseEnter={prefetchMenu}
        onFocus={prefetchMenu}
        className={cn(
          'inline-flex items-center gap-x-1',
          'h-8 px-2',
          'border-l border-border',
          'rounded-r-md',
          'text-xs font-medium',
          menuOpen ? 'text-foreground bg-muted' : 'text-muted-foreground',
          'cursor-pointer',
          'transition-colors',
          'hover:text-foreground hover:bg-muted',
        )}
      >
        <span>Open</span>
        <span
          aria-hidden="true"
          className="inline-flex size-3 items-center justify-center"
        >
          <PiCaretDown />
        </span>
      </button>
      {menuMounted && (
        <PostActionsMenu
          anchor={triggerRef}
          open={menuOpen}
          onOpenChange={handleOpenChange}
          githubUrl={githubUrl}
          markdownUrl={markdownUrl}
          pageUrl={pageUrl}
        />
      )}
    </div>
  );
}
