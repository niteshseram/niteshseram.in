import path from 'node:path';

import type { NextConfig } from 'next';
import { withContentlayer } from 'next-contentlayer2';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  turbopack: {
    root: path.join(__dirname),
  },
  serverExternalPackages: ['@prisma/adapter-pg'],
};

export default withContentlayer(nextConfig);
