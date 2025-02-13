// next.config.js
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
};

export default nextConfig;
module.exports = {
  images: {
    domains: ["res.cloudinary.com"], // Add Cloudinary's domain here
  },
};
