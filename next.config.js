/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/webp"],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.webequate.com',
          },
        ],
        destination: 'https://webequate.com/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
