type NavItem = {
  label: string;
  href: string;
};

export const NavItems: Record<string, NavItem> = {
  home: {
    label: 'Home',
    href: '/',
  },
  about: {
    label: 'About',
    href: '/about',
  },
  blog: {
    label: 'Blog',
    href: '/blog',
  },
};

export const REACTION = {
  like: 'LIKE',
  love: 'LOVE',
};
