import type { ComponentType, SVGProps } from 'react';
import {
  SiJavascript,
  SiNextdotjs,
  SiPrisma,
  SiReact,
  SiReactquery,
  SiSupabase,
  SiTailwindcss,
  SiTrpc,
  SiTurborepo,
  SiTypescript,
  SiZod,
} from 'react-icons/si';

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
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export type TechStackGroup = {
  label: string;
  items: TechStack[];
};

export const TECH_STACK_GROUPS: TechStackGroup[] = [
  {
    label: 'Frontend',
    items: [
      { label: 'React', icon: SiReact },
      { label: 'Next.js', icon: SiNextdotjs },
      { label: 'Tailwind', icon: SiTailwindcss },
      { label: 'Base UI', icon: BaseUIIcon },
      { label: 'React Query', icon: SiReactquery },
    ],
  },
  {
    label: 'Languages',
    items: [
      { label: 'TypeScript', icon: SiTypescript },
      { label: 'JavaScript', icon: SiJavascript },
    ],
  },
  {
    label: 'Backend',
    items: [
      { label: 'tRPC', icon: SiTrpc },
      { label: 'Prisma', icon: SiPrisma },
      { label: 'Supabase', icon: SiSupabase },
    ],
  },
  {
    label: 'Tooling',
    items: [
      { label: 'Zod', icon: SiZod },
      { label: 'Turborepo', icon: SiTurborepo },
    ],
  },
];

export const TECH_STACKS: TechStack[] = TECH_STACK_GROUPS.flatMap(
  (group) => group.items,
);
