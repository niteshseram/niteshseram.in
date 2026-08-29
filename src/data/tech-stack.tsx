import type { SVGProps } from 'react';

import {
  JavaScriptIcon,
  NextJsIcon,
  PrismaIcon,
  ReactIcon,
  ReactQueryIcon,
  SupabaseIcon,
  TailwindCssIcon,
  TrpcIcon,
  TurborepoIcon,
  TypeScriptIcon,
  ZodIcon,
} from '@/components/icons/brand-icons';
import type { IconComponent } from '@/lib/icon-types';

function BaseUIIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M13.082 6.562a.52.52 0 0 0-.546.529V24a8.727 8.727 0 0 0 .546-17.438M11.446 9.6V24c-4.82 0-8.728-4.298-8.728-9.6V0c4.82 0 8.728 4.298 8.728 9.6Z" />
    </svg>
  );
}

export type TechStack = {
  label: string;
  icon: IconComponent;
};

export type TechStackGroup = {
  label: string;
  items: TechStack[];
};

export const TECH_STACK_GROUPS: TechStackGroup[] = [
  {
    label: 'Frontend',
    items: [
      { label: 'React', icon: ReactIcon },
      { label: 'Next.js', icon: NextJsIcon },
      { label: 'Tailwind', icon: TailwindCssIcon },
      { label: 'Base UI', icon: BaseUIIcon },
      { label: 'React Query', icon: ReactQueryIcon },
    ],
  },
  {
    label: 'Languages',
    items: [
      { label: 'TypeScript', icon: TypeScriptIcon },
      { label: 'JavaScript', icon: JavaScriptIcon },
    ],
  },
  {
    label: 'Backend',
    items: [
      { label: 'tRPC', icon: TrpcIcon },
      { label: 'Prisma', icon: PrismaIcon },
      { label: 'Supabase', icon: SupabaseIcon },
    ],
  },
  {
    label: 'Tooling',
    items: [
      { label: 'Zod', icon: ZodIcon },
      { label: 'Turborepo', icon: TurborepoIcon },
    ],
  },
];

export const TECH_STACKS: TechStack[] = TECH_STACK_GROUPS.flatMap(
  (group) => group.items,
);
