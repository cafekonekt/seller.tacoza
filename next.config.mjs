/** @type {import('next').NextConfig} */
import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "src/app/sw.js",
  swDest: "public/sw.js",
  register: true,
  reloadOnOnline: true,
  disable: false,
  scope: "/",
});

const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["tacoza.co", "*.tacoza.co"],
    },
  },
  images: {
    domains: ["localhost", "tacoza.co", "api.tacoza.co"],
  },
};

export default withSerwist(nextConfig);
