import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Pin the workspace root — a stray lockfile in the user's home dir
    // otherwise gets auto-detected as the root.
    root: __dirname,
  },
};

export default nextConfig;
