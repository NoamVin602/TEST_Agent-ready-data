/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Standalone output for Heroku/Node deployments - bundles all dependencies
  output: 'standalone',
}

module.exports = nextConfig
