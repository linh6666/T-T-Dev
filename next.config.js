/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vietmodel.com.vn',
        pathname: '/api/v1/static/**',
      },
    ],
  },
};

module.exports = nextConfig;

