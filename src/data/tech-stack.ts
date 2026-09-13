type TechStackGroup = {
  label: string;
  items: { label: string }[];
};

export const TECH_STACK_GROUPS: TechStackGroup[] = [
  {
    label: 'Frontend',
    items: [
      { label: 'React' },
      { label: 'Next.js' },
      { label: 'Tailwind' },
      { label: 'Base UI' },
      { label: 'React Query' },
    ],
  },
  {
    label: 'Languages',
    items: [{ label: 'TypeScript' }, { label: 'JavaScript' }],
  },
  {
    label: 'Backend',
    items: [{ label: 'tRPC' }, { label: 'Prisma' }, { label: 'Supabase' }],
  },
  {
    label: 'Tooling',
    items: [{ label: 'Zod' }, { label: 'Turborepo' }],
  },
];
