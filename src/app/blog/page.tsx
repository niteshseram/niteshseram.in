import { allBlogs } from 'contentlayer2/generated';
import type { Metadata } from 'next';

import AnimatedText from '@/components/AnimatedText';
import FadeDown from '@/components/animations/FadeDown';
import BlogList from '@/components/blog/BlogList';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Sharing learnings and thoughts on software development and beyond through my blog',
};

export default async function BlogPage() {
  return (
    <section className="my-10 min-h-screen">
      <FadeDown duration={0.4}>
        <h1 className="heading custom-underline mb-6">
          <AnimatedText text="My Blog" />
        </h1>
        <p className="mb-8 text-base md:text-lg">
          Sharing learnings and thoughts on software development and beyond
          through my blog
        </p>
      </FadeDown>
      <BlogList
        blogs={allBlogs.sort((a, b) => {
          if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
            return -1;
          }
          return 1;
        })}
      />
    </section>
  );
}
