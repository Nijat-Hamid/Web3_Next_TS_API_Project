/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
      largePageDataBytes: 228 * 100000,
    },
}

module.exports = nextConfig
