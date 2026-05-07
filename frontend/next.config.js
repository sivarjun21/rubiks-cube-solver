/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Allow external images if needed later
  images: {
    domains: [],
  },

  // Fix for Three.js (important)
  webpack: (config) => {
    config.resolve.extensions.push(".ts", ".tsx");
    return config;
  },
};

module.exports = nextConfig;