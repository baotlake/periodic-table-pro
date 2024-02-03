const cache = require('./cache')

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching: cache,
})

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.NEXT_OUTPUT || 'export',
  reactStrictMode: true,
  experimental: {
    externalDir: true,
    esmExternals: true,
  },
  env: {
    PLATFORM: 'next',
    BUCKET_HOST: process.env.BUCKET_HOST,
    APP_ORIGIN: process.env.APP_ORIGIN || 'https://pt.ziziyi.com',
    DEEP_READING_ORIGIN:
      process.env.DEEP_READING_ORIGIN || 'https://qing.ziziyi.com',
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}
module.exports = withBundleAnalyzer(withPWA(nextConfig))
