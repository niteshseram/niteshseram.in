'use client';

import {
  Popover,
  type PopoverRootChangeEventDetails,
} from '@base-ui/react/popover';
import { type RefObject, useMemo } from 'react';
import {
  PiArrowSquareOut,
  PiGithubLogo,
  PiMarkdownLogo,
  PiOpenAiLogo,
} from 'react-icons/pi';
import { SiClaude } from 'react-icons/si';

import { cn } from '@/lib/utils';

type Props = Readonly<{
  anchor: RefObject<HTMLElement | null>;
  open: boolean;
  onOpenChange: (
    open: boolean,
    eventDetails: PopoverRootChangeEventDetails,
  ) => void;
  markdownUrl: string;
  githubUrl: string;
  pageUrl: string;
}>;

export function PostActionsMenu({
  anchor,
  open,
  onOpenChange,
  markdownUrl,
  githubUrl,
  pageUrl,
}: Props) {
  const aiLinks = useMemo(() => {
    const query = `Read ${pageUrl}, I want to ask questions about it.`;
    return {
      chatgpt: `https://chatgpt.com/?${new URLSearchParams({ hints: 'search', q: query })}`,
      claude: `https://claude.ai/new?${new URLSearchParams({ q: query })}`,
      cursor: `https://cursor.com/link/prompt?${new URLSearchParams({ text: query })}`,
    };
  }, [pageUrl]);

  return (
    <Popover.Root open={open} onOpenChange={onOpenChange}>
      <Popover.Portal>
        <Popover.Positioner
          anchor={anchor}
          sideOffset={6}
          align="end"
          className="z-50"
        >
          <Popover.Popup
            className={cn(
              'flex min-w-52 flex-col origin-(--transform-origin)',
              'p-1',
              'rounded-lg border border-border shadow-lg',
              'bg-popover text-popover-foreground',
              'transition-[transform,scale,opacity]',
              'data-starting-style:scale-95 data-starting-style:opacity-0',
              'data-ending-style:scale-95 data-ending-style:opacity-0',
            )}
          >
            <MenuLink
              href={githubUrl}
              label="Open in GitHub"
              icon={<PiGithubLogo />}
            />
            <MenuLink
              href={markdownUrl}
              label="View as Markdown"
              icon={<PiMarkdownLogo />}
            />
            <MenuLink
              href={aiLinks.chatgpt}
              label="Open in ChatGPT"
              icon={<PiOpenAiLogo />}
            />
            <MenuLink
              href={aiLinks.claude}
              label="Open in Claude"
              icon={<SiClaude />}
            />
            <MenuLink
              href={aiLinks.cursor}
              label="Open in Cursor"
              icon={<CursorIcon />}
            />
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}

function MenuLink({
  href,
  label,
  icon,
}: Readonly<{ href: string; label: string; icon: React.ReactNode }>) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={cn(
        'flex items-center justify-between gap-x-3',
        'px-2.5 py-2',
        'rounded-md',
        'text-sm',
        'text-foreground',
        'transition-colors',
        'hover:bg-muted focus-visible:bg-muted focus-visible:outline-none',
      )}
    >
      <span className="inline-flex items-center gap-x-2.5">
        <span
          aria-hidden="true"
          className="inline-flex size-4 items-center justify-center text-muted-foreground"
        >
          {icon}
        </span>
        <span>{label}</span>
      </span>
      <span
        aria-hidden="true"
        className="inline-flex size-3.5 items-center justify-center text-muted-foreground"
      >
        <PiArrowSquareOut />
      </span>
    </a>
  );
}

function CursorIcon() {
  return (
    <svg
      width="16"
      height="16"
      fill="currentColor"
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Cursor</title>
      <path d="M11.503.131 1.891 5.678a.84.84 0 0 0-.42.726v11.188c0 .3.162.575.42.724l9.609 5.55a1 1 0 0 0 .998 0l9.61-5.55a.84.84 0 0 0 .42-.724V6.404a.84.84 0 0 0-.42-.726L12.497.131a1.01 1.01 0 0 0-.996 0M2.657 6.338h18.55c.263 0 .43.287.297.515L12.23 22.918c-.062.107-.229.064-.229-.06V12.335a.59.59 0 0 0-.295-.51l-9.11-5.257c-.109-.063-.064-.23.061-.23" />
    </svg>
  );
}
