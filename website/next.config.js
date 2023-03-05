/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    externalDir: true,
    esmExternals: true,
  },
  env: {
    PLATFORM: 'next',
    BUCKET_HOST: process.env.BUCKET_HOST,
  }
}

module.exports = nextConfig
