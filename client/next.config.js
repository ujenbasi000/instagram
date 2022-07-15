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
      "yt3.ggpht.com",
      "cdn.unenvironment.org",
      "img.freepik.com",
      "media.npr.org",
      "undp.org",
      "elroy.twit.tv",
    ],
  },
  // add env
  env: {
    JWT_SECRET: "54SD!@#$#!@4ASDGFQE3823ZXD7F",
  },
};

module.exports = nextConfig;
