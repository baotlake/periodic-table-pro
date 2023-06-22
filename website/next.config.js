const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
})
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

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
  },
}
module.exports = withBundleAnalyzer(withPWA(nextConfig))
