/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // We plan to do it on CI so its safe to disable this
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
