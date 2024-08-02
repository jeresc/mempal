/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: true,
    serverActions: {
      bodySizeLimit: "50mb",
    },
    optimizePackageImports: [
      "react-icons/fa",
      "@radix-ui/react-icons",
      "react-icons/md",
      "react-icons/tb",
      "react-icons/*",
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;

    return config;
  },
};

module.exports = nextConfig;
