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
}

module.exports = nextConfig;
