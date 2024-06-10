/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pinimg.com"
      },
      {
        protocol: "https",
        hostname: "imcesa.com.pe"
      },
      {
        protocol: "https",
        hostname: "colineal.pe"
      }
    ]
  }
};

export default nextConfig;
