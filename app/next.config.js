/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
    HOSTNAME: "localhost",
    PORT: 3000,

    CLOUDINARY_API_KEY: "256417812456237",
    CLOUDINARY_API_SECRET: "U9WovbWDP3koenUMQb2_B46g_Zk",
    CLOUDINARY_CLOUD_NAME: "vendospace-com",
    CLOUDINARY_UNAUTH_UPLOAD_URL: `https://api.cloudinary.com/v1_1/vendospace-com/auto/upload`,
    CLOUDINARY_UNAUTH_UPLOAD_PRESET: "aici91ve",
  },
  reactStrictMode: true,
}

module.exports = nextConfig;
