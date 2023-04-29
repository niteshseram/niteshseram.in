interface NavItem {
  label: string,
  page: string
}

export const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Home',
    page: '/',
  },
  {
    label: 'About',
    page: '/about',
  },
  {
    label: 'Blog',
    page: '/blog',
  },

]