import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    // Product was renamed from "No.1 Matte Clay" to "MONCRÉ No.1".
    return [{ source: "/product/matte-clay", destination: "/product/no-1", permanent: true }];
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
