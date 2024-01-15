// ts-check
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "res.cloudinary.com",
      "lh3.googleusercontent.com",
      "media.licdn.com"
    ],
  },
  reactStrictMode: true,
  typescript: {
    // TODO: This allows next to build even with ts errors
    ignoreBuildErrors: true,
  }
}

module.exports = nextConfig;
