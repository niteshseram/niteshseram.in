import { AUTHOR, FEED, SITE_LANGUAGE, SITE_URL, WRITING } from '@/config/site';
import { getAllPosts } from '@/lib/writing';

const XML_ENTITIES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&apos;',
};

function escapeXml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => XML_ENTITIES[character]);
}

function getLatestPostDate(
  posts: ReturnType<typeof getAllPosts>,
): Date | undefined {
  return posts.reduce<Date | undefined>((latestDate, post) => {
    const postDate = new Date(post.data.updatedAt ?? post.data.publishedAt);

    if (!latestDate || postDate > latestDate) {
      return postDate;
    }

    return latestDate;
  }, undefined);
}

export function GET() {
  const posts = getAllPosts();
  const latestPostDate = getLatestPostDate(posts);
  const feedUrl = `${SITE_URL}${FEED.path}`;
  const writingUrl = `${SITE_URL}${WRITING.path}`;
  const items = posts
    .map((post) => {
      const postUrl = `${SITE_URL}${post.url}`;
      const categories = post.data.tags
        .map((tag) => `      <category>${escapeXml(tag)}</category>`)
        .join('\n');

      return [
        '    <item>',
        `      <title>${escapeXml(post.data.title)}</title>`,
        `      <link>${escapeXml(postUrl)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(postUrl)}</guid>`,
        `      <description>${escapeXml(post.data.summary)}</description>`,
        `      <pubDate>${new Date(post.data.publishedAt).toUTCString()}</pubDate>`,
        categories,
        '    </item>',
      ]
        .filter(Boolean)
        .join('\n');
    })
    .join('\n');

  const document = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '  <channel>',
    `    <title>${escapeXml(FEED.title)}</title>`,
    `    <link>${escapeXml(writingUrl)}</link>`,
    `    <description>${escapeXml(FEED.description)}</description>`,
    `    <language>${SITE_LANGUAGE}</language>`,
    `    <copyright>Copyright ${AUTHOR.name}</copyright>`,
    `    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />`,
    latestPostDate
      ? `    <lastBuildDate>${latestPostDate.toUTCString()}</lastBuildDate>`
      : '',
    items,
    '  </channel>',
    '</rss>',
    '',
  ]
    .filter(Boolean)
    .join('\n');

  return new Response(document, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}
