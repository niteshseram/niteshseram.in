import type { IconType } from 'react-icons';
import { PiArrowSquareOut, PiFileText } from 'react-icons/pi';

import { CommandItem, CommandItemIcon } from '@/components/ui/command';
import { navItems } from '@/config/nav';
import { THEMES } from '@/config/theme';
import { SOCIAL_LINKS } from '@/data/social-links';
import type { PostIndexEntry } from '@/lib/writing';

export type CommandItemDef = Readonly<{
  id: string;
  label: string;
  icon: IconType;
  keywords?: string[];
  external?: boolean;
  run: () => void;
}>;

export type CommandGroupDef = Readonly<{
  heading: string;
  items: CommandItemDef[];
}>;

type BuildGroupsArgs = Readonly<{
  posts: PostIndexEntry[];
  navigate: (href: string) => void;
  openExternal: (href: string) => void;
  setTheme: (value: string) => void;
}>;

export function buildGroups({
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

export function CommandEntryRow({
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
