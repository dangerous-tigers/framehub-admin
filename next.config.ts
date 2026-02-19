import { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      new URL("https://staging-it-incubator.s3.eu-central-1.amazonaws.com/**"),
    ],
  },
};

export default nextConfig;
