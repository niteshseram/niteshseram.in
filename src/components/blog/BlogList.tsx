import type { Blog } from 'contentlayer/generated';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';

import ViewCounter from '@/app/blog/view-counter';

import FadeUp from '../animations/FadeUp';

interface Props {
  blogs: Blog[];
}

const BlogList: React.FC<Props> = ({ blogs }) => {
  return (
    <ul>
      {!blogs.length && 'No posts found.'}
      {blogs.map((post: Blog, idx) => {
        const { slug, publishedAt, title, summary, readingTime } = post;
        return (
          <FadeUp duration={0.2} delay={0.1 * idx} key={slug}>
            <li key={slug} className="py-4">
              <article className="space-y-3">
                <div>
                  <h3 className="line-clamp-2 text-base font-medium tracking-tight">
                    <Link
                      href={`/blog/${slug}`}
                      className="transition hover:text-primary"
                    >
                      {title}
                    </Link>
                  </h3>
                  <p className="sr-only">Published on</p>
                  <p className="mt-2 text-sm">
                    {format(parseISO(publishedAt), 'MMMM dd, yyyy')}
                    {` • `}
                    {readingTime.text}
                    {` • `}
                    <ViewCounter slug={slug} trackView={false} />
                  </p>
                </div>
                <p>{summary}</p>
              </article>
            </li>
          </FadeUp>
        );
      })}
    </ul>
  );
};

export default BlogList;
