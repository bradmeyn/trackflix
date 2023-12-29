/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",

        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "https://image.tmdb.org/t/p/w200/",
      },
    ],
  },
};

module.exports = nextConfig;
