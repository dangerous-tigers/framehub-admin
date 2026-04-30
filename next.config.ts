import path from 'node:path';

import { type NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    remotePatterns: [new URL('https://staging-it-incubator.s3.eu-central-1.amazonaws.com/**')],
  },
};

export default nextConfig;
