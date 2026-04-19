import { remarkImage } from 'fumadocs-core/mdx-plugins';
import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
} from 'fumadocs-mdx/config';
import readingTimeOf from 'reading-time';
import { z } from 'zod';

export const writing = defineDocs({
  dir: 'src/content/writing',
  docs: {
    schema: ({ source }) => {
      const stats = readingTimeOf(source);
      return frontmatterSchema.extend({
        summary: z.string(),
        publishedAt: z.coerce.date(),
        tags: z.array(z.string()).default([]),
        draft: z.boolean().default(false),
        readingTime: z
          .object({
            minutes: z.number(),
            words: z.number(),
          })
          .default({
            minutes: Math.max(1, Math.ceil(stats.minutes)),
            words: stats.words,
          }),
      });
    },
  },
});

export default defineConfig({
  mdxOptions: {
    rehypeCodeOptions: {
      themes: {
        light: 'one-light',
        dark: 'one-dark-pro',
      },
      defaultLanguage: 'plaintext',
    },
    remarkPlugins: [
      [
        remarkImage,
        {
          useImport: false,
        },
      ],
    ],
  },
});
