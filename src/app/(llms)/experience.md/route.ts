import { cacheLife } from 'next/cache';

import { buildExperienceSection } from '@/lib/llms-content';

async function render(): Promise<string> {
  'use cache';
  cacheLife('max');
  return buildExperienceSection(1);
}

export async function GET() {
  return new Response(await render(), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}
