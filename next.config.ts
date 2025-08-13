import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  transpilePackages: [],
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'backend.nanuvaierrosonakothon.com', 'nanubhai-server-render.onrender.com'],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "backend.nanuvaierrosonakothon.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "nanubhai-server-render.onrender.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };
    return config;
  },
};

export default nextConfig;
