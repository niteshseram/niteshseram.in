import type { SVGProps } from 'react';

import { BrandMark } from '@/components/ui/brand-mark';
import type { BrandIconData } from '@/components/ui/brand-mark';
import {
  claudeIconData,
  githubIconData,
  javaScriptIconData,
  markdownIconData,
  nextJsIconData,
  prismaIconData,
  reactIconData,
  reactQueryIconData,
  supabaseIconData,
  tailwindCssIconData,
  trpcIconData,
  turborepoIconData,
  typeScriptIconData,
  xIconData,
  zodIconData,
} from '@/data/simple-icon-subset';
import type { IconComponent } from '@/lib/icon-types';

function createBrandIcon(icon: BrandIconData): IconComponent {
  return function BrandIcon(props: SVGProps<SVGSVGElement>) {
    return <BrandMark icon={icon} {...props} />;
  };
}

export const ClaudeIcon = createBrandIcon(claudeIconData);
export const GitHubIcon = createBrandIcon(githubIconData);
export const JavaScriptIcon = createBrandIcon(javaScriptIconData);
export const MarkdownIcon = createBrandIcon(markdownIconData);
export const NextJsIcon = createBrandIcon(nextJsIconData);
export const PrismaIcon = createBrandIcon(prismaIconData);
export const ReactIcon = createBrandIcon(reactIconData);
export const ReactQueryIcon = createBrandIcon(reactQueryIconData);
export const SupabaseIcon = createBrandIcon(supabaseIconData);
export const TailwindCssIcon = createBrandIcon(tailwindCssIconData);
export const TrpcIcon = createBrandIcon(trpcIconData);
export const TurborepoIcon = createBrandIcon(turborepoIconData);
export const TypeScriptIcon = createBrandIcon(typeScriptIconData);
export const XIcon = createBrandIcon(xIconData);
export const ZodIcon = createBrandIcon(zodIconData);

export function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      fill="currentColor"
      focusable="false"
      height="1em"
      viewBox="0 0 256 256"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M216 24H40a16 16 0 0 0-16 16v176a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V40a16 16 0 0 0-16-16m0 192H40V40h176zM96 112v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0m88 28v36a8 8 0 0 1-16 0v-36a20 20 0 0 0-40 0v36a8 8 0 0 1-16 0v-64a8 8 0 0 1 15.79-1.78A36 36 0 0 1 184 140M100 84a12 12 0 1 1-12-12 12 12 0 0 1 12 12" />
    </svg>
  );
}

export function OpenAiIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      fill="currentColor"
      focusable="false"
      height="1em"
      viewBox="0 0 256 256"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M224.32 114.24a56 56 0 0 0-60.07-76.57 56 56 0 0 0-96.32 13.77 56 56 0 0 0-36.25 90.32A56 56 0 0 0 69 217a56.39 56.39 0 0 0 14.59 2 55.75 55.75 0 0 0 8.17-.61 56 56 0 0 0 96.31-13.78 56 56 0 0 0 36.25-90.32ZM182.85 54.43a40 40 0 0 1 28.56 48c-.95-.63-1.91-1.24-2.91-1.81L164 74.88a8 8 0 0 0-8 0l-44 25.41V81.81l40.5-23.38a39.76 39.76 0 0 1 30.35-4M144 137.24l-16 9.24-16-9.24v-18.48l16-9.24 16 9.24ZM80 72a40 40 0 0 1 67.53-29c-1 .51-2 1-3 1.62L100 70.27a8 8 0 0 0-4 6.92V128l-16-9.24ZM40.86 86.93a39.75 39.75 0 0 1 23.26-18.36c-.07 1.14-.12 2.28-.12 3.43v51.38a8 8 0 0 0 4 6.93l44 25.4L96 165l-40.5-23.43a40 40 0 0 1-14.64-54.64m32.29 114.64a40 40 0 0 1-28.56-48c.95.63 1.91 1.24 2.91 1.81L92 181.12a8 8 0 0 0 8 0l44-25.41v18.48l-40.5 23.38a39.76 39.76 0 0 1-30.35 4M176 184a40 40 0 0 1-67.52 29.05c1-.51 2-1.05 3-1.63L156 185.73a8 8 0 0 0 4-6.92V128l16 9.24Zm39.14-14.93a39.75 39.75 0 0 1-23.26 18.36c.07-1.14.12-2.28.12-3.43v-51.38a8 8 0 0 0-4-6.93l-44-25.4 16-9.24 40.5 23.38a40 40 0 0 1 14.64 54.64Z" />
    </svg>
  );
}
