/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  output: "export",
  images: {
    domains: ["res.cloudinary.com"], // Add Cloudinary's domain here
  },
};
module.exports = nextConfig;
