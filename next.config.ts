import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/', 
        destination: '/login', // Destination URL
        permanent: true, // permanent redirect (HTTP 301)
      },
    ];
  },
  // You can add other config options here as needed
};

export default nextConfig;
