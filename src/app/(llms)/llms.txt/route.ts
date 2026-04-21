import { cacheLife } from 'next/cache';

import { AUTHOR, SITE_DESCRIPTION, SITE_URL } from '@/config/site';
import { getAllPosts } from '@/lib/writing';

async function render(): Promise<string> {
  'use cache';
  cacheLife('max');

  const posts = getAllPosts();

  const lines: string[] = [
    `# ${AUTHOR.name}`,
    '',
    `> ${SITE_DESCRIPTION}`,
    '',
    `- [About](${SITE_URL}/about.md): Bio, personal info, interests, and year-by-year timeline.`,
    `- [Experience](${SITE_URL}/experience.md): Roles I've held and what I built in each.`,
    `- [Projects](${SITE_URL}/projects.md): Selected personal projects.`,
    `- [Speaking](${SITE_URL}/speaking.md): Talks I've given.`,
    '',
    '## Writing',
    '',
  ];

  for (const post of posts) {
    const slug = post.slugs[0];
    const summary = post.data.summary.replace(/[.!?\s]+$/, '');
    lines.push(
      `- [${post.data.title}](${SITE_URL}/writing/${slug}.mdx): ${summary}.`,
    );
  }

  lines.push('');

  return lines.join('\n');
}

export async function GET() {
  return new Response(await render(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
