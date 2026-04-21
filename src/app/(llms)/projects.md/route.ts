import { cacheLife } from 'next/cache';

import { buildProjectsSection } from '@/lib/llms-content';

async function render(): Promise<string> {
  'use cache';
  cacheLife('max');
  return buildProjectsSection(1);
}

export async function GET() {
  return new Response(await render(), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}
