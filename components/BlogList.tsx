import { parseISO, format } from 'date-fns'
import Link from 'next/link';

import type { Blog } from 'contentlayer/generated';

interface Props {
  blogs: Blog[]
}

const BlogList: React.FC<Props> = ({blogs}) => {
  return (
    <ul>
        {!blogs.length && "No posts found."}
        {blogs.map((post: Blog) => {
          const { slug, publishedAt, title, summary } = post;
          return (
            <li key={slug} className="py-4">
              <article className="space-y-2 md:grid md:grid-cols-4 md:space-y-0 md:items-baseline">
                {publishedAt && (
                  <dl className='md:block hidden'>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      {format(parseISO(post.publishedAt), 'MMMM dd, yyyy')}
                      <div className="text-sm">{post.readingTime.text}</div>
                      <div className="text-sm">- views</div>
                    </dd>
                  </dl>
                )}
                <div className="space-y-3 md:col-span-3">
                  <div>
                    <h3 className="md:text-2xl text-md font-bold leading-8 tracking-tight hover:text-primary transition">
                      <Link href={`/blog/${slug}`} >
                        {title}
                      </Link>
                    </h3>
                    <p className="sr-only">Published on</p>
                    <p className='mt-2 text-sm'>
                      {format(parseISO(post.publishedAt), 'MMMM dd, yyyy')}
                      {` • `}
                      {post.readingTime.text}
                    </p>
                  </div>
                  <p>{summary}</p>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
  )
}

export default BlogList