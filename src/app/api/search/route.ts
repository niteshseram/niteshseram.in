import type { StructuredData } from 'fumadocs-core/mdx-plugins';
import { createSearchAPI } from 'fumadocs-core/search/server';

import { writingSource } from '@/lib/source';

const isProduction = process.env.VERCEL_ENV === 'production';

type IndexablePageData = {
  structuredData: StructuredData | (() => Promise<StructuredData>);
};

async function resolveStructuredData(
  data: IndexablePageData,
): Promise<StructuredData> {
  return typeof data.structuredData === 'function'
    ? await data.structuredData()
    : data.structuredData;
}

export const { staticGET: GET } = createSearchAPI('advanced', {
  language: 'english',
  async indexes() {
    const pages = writingSource
      .getPages()
      .filter((page) => !(isProduction && page.data.draft));

    return Promise.all(
      pages.map(async (page) => ({
        id: page.url,
        url: page.url,
        title: page.data.title,
        description: page.data.summary,
        structuredData: await resolveStructuredData(
          page.data as unknown as IndexablePageData,
        ),
      })),
    );
  },
});
