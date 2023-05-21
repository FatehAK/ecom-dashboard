/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // We plan to do it on CI so its safe to disable this
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ignore type validation for now
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
