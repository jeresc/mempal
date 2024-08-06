/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: true,
    serverActions: {
      bodySizeLimit: "50mb",
    },
    optimizePackageImports: ["@radix-ui/react-icons", "react-icons/*"],
  },
  /*
    "react-icons/md",
    "react-icons/fa",
    "react-icons/tb",
    "react-icons/*",
  */
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
