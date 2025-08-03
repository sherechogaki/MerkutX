/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    allowedDevOrigins: ['http://172.16.1.16:3000', 'http://localhost:3000'],
  },
};

export default nextConfig;
