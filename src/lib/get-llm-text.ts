import { SITE_URL } from '@/config/site';
import type { Post } from '@/lib/writing';

const GITHUB_BLOB_BASE =
  'https://github.com/niteshseram/niteshseram.in/blob/main/src/content/writing';

export function getGithubSourceUrl(post: Post): string {
  return `${GITHUB_BLOB_BASE}/${post.data.info.path}`;
}

export function getCanonicalUrl(post: Post): string {
  return `${SITE_URL}${post.url}`;
}

export async function getLLMText(post: Post): Promise<string> {
  const raw = await post.data.getText('raw');
  const body = stripFrontmatter(raw);
  const { title, summary, publishedAt, tags } = post.data;

  const header = [
    `# ${title}`,
    '',
    `> ${summary}`,
    '',
    `Published: ${new Date(publishedAt).toISOString()}`,
    tags.length > 0 ? `Tags: ${tags.join(', ')}` : null,
    `URL: ${getCanonicalUrl(post)}`,
    `Source: ${getGithubSourceUrl(post)}`,
    '',
    '---',
    '',
  ].filter((line): line is string => line !== null);

  return [...header, body.trim(), ''].join('\n');
}

function stripFrontmatter(source: string): string {
  if (!source.startsWith('---')) return source;
  const end = source.indexOf('\n---', 3);
  if (end === -1) return source;
  const after = source.indexOf('\n', end + 4);
  return after === -1 ? '' : source.slice(after + 1);
}
