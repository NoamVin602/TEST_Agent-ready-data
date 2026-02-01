/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Ensure static files are served correctly
  trailingSlash: false,
  // Disable static optimization for now to debug
  output: undefined,
}

module.exports = nextConfig
