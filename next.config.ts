import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp"],
    deviceSizes: [420, 640, 828, 1080, 1280, 1600, 1920],
  },
  experimental: {
    globalNotFound: true,
  },
  // Қазақ тілі — негізгі тіл: "/" қазақша нұсқаны, "/ru" орысша нұсқаны ашады.
  async redirects() {
    return [{ source: "/kk", destination: "/", permanent: true }];
  },
  async rewrites() {
    return { beforeFiles: [{ source: "/", destination: "/kk" }], afterFiles: [], fallback: [] };
  },
};

export default nextConfig;
