'use client';

import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import type { ComponentProps, ReactNode } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import type { IconType } from 'react-icons';
import {
  PiArrowSquareOut,
  PiFileText,
  PiMagnifyingGlass,
} from 'react-icons/pi';

import {
  CommandDialog,
  CommandEmpty,
  CommandFooter,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandItemIcon,
  CommandList,
  CommandShortcut,
} from '@/components/ui/command';
import { navItems } from '@/config/nav';
import { THEMES } from '@/config/theme';
import { SOCIAL_LINKS } from '@/data/social-links';
import { cn } from '@/lib/utils';
import type { PostIndexEntry } from '@/lib/writing';
import { useGlobalShortcut } from '@/utils/use-global-shortcut';

type CommandItemDef = Readonly<{
  id: string;
  label: string;
  icon: IconType;
  keywords?: string[];
  external?: boolean;
  run: () => void;
}>;

type CommandGroupDef = Readonly<{
  heading: string;
  items: CommandItemDef[];
}>;

type Props = Readonly<{
  posts: PostIndexEntry[];
}>;

const MOD_KEY = '⌘';

const substringFilter: ComponentProps<typeof CommandDialog>['filter'] = (
  value,
  search,
  keywords,
) => {
  const haystack = [value, ...(keywords ?? [])].join(' ').toLowerCase();
  const terms = search.toLowerCase().trim().split(/\s+/);
  return terms.every((t) => haystack.includes(t)) ? 1 : 0;
};

export function CommandMenu({ posts }: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const navigate = useCallback(
    (href: string) => {
      if (
        (href.startsWith('/#') || href.startsWith('#')) &&
        typeof window !== 'undefined' &&
        window.location.pathname === '/'
      ) {
        document
          .getElementById(href.split('#')[1])
          ?.scrollIntoView({ behavior: 'smooth' });
        return;
      }
      router.push(href);
    },
    [router],
  );

  const openExternal = useCallback((href: string) => {
    window.open(href, '_blank', 'noopener,noreferrer');
  }, []);

  const groups = useMemo(
    () => buildGroups({ posts, navigate, openExternal, setTheme }),
    [posts, navigate, openExternal, setTheme],
  );

  const runItem = useCallback((item: CommandItemDef) => {
    setOpen(false);
    item.run();
  }, []);

  useGlobalShortcut(
    useCallback((e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
    }, []),
  );

  return (
    <>
      <CommandMenuTrigger onClick={() => setOpen(true)} variant="inline" />
      {mounted &&
        createPortal(
          <CommandMenuTrigger
            onClick={() => setOpen(true)}
            variant="floating"
          />,
          document.body,
        )}
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Command menu"
        description="Navigate the site, switch theme, or open social links."
        label="Command menu"
        loop={true}
        filter={substringFilter}
      >
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results</CommandEmpty>
          {groups.map((group) => (
            <CommandGroup key={group.heading} heading={group.heading}>
              {group.items.map((item) => (
                <CommandEntryRow
                  key={item.id}
                  item={item}
                  onSelect={() => runItem(item)}
                />
              ))}
            </CommandGroup>
          ))}
        </CommandList>
        <CommandFooter>
          <div className="flex items-center gap-x-3">
            <CommandShortcut label="navigate" keys={['↑', '↓']} />
            <CommandShortcut label="select" keys={['↵']} />
          </div>
          <CommandShortcut label="close" keys={['esc']} />
        </CommandFooter>
      </CommandDialog>
    </>
  );
}

function CommandEntryRow({
  item,
  onSelect,
}: Readonly<{ item: CommandItemDef; onSelect: () => void }>) {
  const Icon = item.icon;
  return (
    <CommandItem
      value={item.id}
      keywords={[item.label, ...(item.keywords ?? [])]}
      onSelect={onSelect}
    >
      <CommandItemIcon>
        <Icon aria-hidden="true" />
      </CommandItemIcon>
      <span className="flex-1 truncate">{item.label}</span>
      {item.external && (
        <PiArrowSquareOut
          aria-hidden="true"
          className="size-3.5 shrink-0 opacity-60"
        />
      )}
    </CommandItem>
  );
}

type TriggerVariant = 'inline' | 'floating';

function CommandMenuTrigger({
  onClick,
  variant,
}: Readonly<{ onClick: () => void; variant: TriggerVariant }>) {
  const floating = variant === 'floating';
  return (
    <button
      type="button"
      aria-label={`Open command menu${floating ? '' : ` (${MOD_KEY}K)`}`}
      onClick={onClick}
      className={cn(
        floating
          ? 'group fixed bottom-5 left-1/2 z-50 inline-flex h-10 min-w-40 -translate-x-1/2 items-center justify-center gap-x-2 sm:hidden'
          : 'group hidden h-8.5 items-center gap-x-2 sm:inline-flex',
        floating ? 'px-4' : 'pl-2.5 pr-1.5',
        floating
          ? 'rounded-xl border border-border backdrop-blur'
          : 'rounded-full border border-border',
        floating
          ? 'bg-popover text-foreground/70'
          : 'bg-transparent text-muted-foreground',
        'cursor-pointer',
        'transition-colors',
        'hover:bg-muted hover:text-foreground',
      )}
    >
      <PiMagnifyingGlass aria-hidden="true" className="size-4 shrink-0" />
      {floating ? (
        <span className="text-sm">Menu</span>
      ) : (
        <span aria-hidden="true" className="inline-flex items-center gap-x-0.5">
          <TriggerKey>{MOD_KEY}</TriggerKey>
          <TriggerKey>K</TriggerKey>
        </span>
      )}
    </button>
  );
}

function TriggerKey({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <kbd
      className={cn(
        'inline-flex h-5 min-w-5 items-center justify-center',
        'px-1 rounded border border-border',
        'bg-muted/70 group-hover:bg-background/60',
        'font-mono text-sm/none text-foreground/70',
        'transition-colors',
      )}
    >
      {children}
    </kbd>
  );
}

type BuildGroupsArgs = Readonly<{
  posts: PostIndexEntry[];
  navigate: (href: string) => void;
  openExternal: (href: string) => void;
  setTheme: (value: string) => void;
}>;

function buildGroups({
  posts,
  navigate,
  openExternal,
  setTheme,
}: BuildGroupsArgs): CommandGroupDef[] {
  return [
    {
      heading: 'Navigation',
      items: navItems.map((item) => ({
        id: `nav-${item.href}`,
        label: item.label,
        icon: item.icon,
        keywords: item.keywords,
        run: () => navigate(item.href),
      })),
    },
    {
      heading: 'Theme',
      items: Object.entries(THEMES).map(([value, meta]) => ({
        id: `theme-${value}`,
        ...meta,
        run: () => setTheme(value),
      })),
    },
    {
      heading: 'Writing',
      items: posts.map((post) => ({
        id: `post-${post.slug}`,
        label: post.title,
        icon: PiFileText,
        keywords: [
          'blog',
          'post',
          'writing',
          post.slug.replace(/-/g, ' '),
          post.summary,
        ],
        run: () => navigate(post.url),
      })),
    },
    {
      heading: 'Social',
      items: Object.entries(SOCIAL_LINKS).map(([key, social]) => {
        const isMailto = social.href.startsWith('mailto:');
        return {
          id: `social-${key}`,
          label: social.label,
          icon: social.icon,
          keywords: [social.username],
          external: !isMailto,
          run: () =>
            isMailto
              ? (window.location.href = social.href)
              : openExternal(social.href),
        };
      }),
    },
  ];
}
