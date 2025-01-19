import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['cdn.sanity.io', 'lh3.googleusercontent.com'], // Add 'lh3.googleusercontent.com' to the list of allowed domains
  },
};

export default nextConfig;
