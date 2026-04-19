import { createMDX } from 'fumadocs-mdx/next';
import type { NextConfig } from 'next';

const withMDX = createMDX();

const nextConfig: NextConfig = {
  cacheComponents: true,
  async redirects() {
    return [
      { source: '/blog', destination: '/writing', permanent: true },
      { source: '/blog/:slug', destination: '/writing/:slug', permanent: true },
    ];
  },
};

export default withMDX(nextConfig);
