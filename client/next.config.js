/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "apprecs.org",
      "cdn-prod.medicalnewstoday.com",
      "pinkvilla.com",
      "www.kindpng.com",
    ],
  },
};

module.exports = nextConfig;
