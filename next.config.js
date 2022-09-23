/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['render.worldofwarcraft.com'],
  },
}

module.exports = nextConfig
