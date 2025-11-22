import Link, { type LinkProps } from 'next/link';
import { useMDXComponent } from 'next-contentlayer2/hooks';
import { createElement } from 'react';

import RoundedImage from './RoundedImage';

const CustomLink = ({
  href,
  ...props
}: Readonly<{
  href?: string;
}> &
  Omit<LinkProps, 'href'> &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>) => {
  if (href?.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href?.startsWith('#')) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

const components = {
  Image: RoundedImage,
  a: CustomLink,
};

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return (
    <article className="prose prose-neutral prose-quoteless dark:prose-invert mb-2">
      {createElement(Component, { components: { ...components } })}
    </article>
  );
}
