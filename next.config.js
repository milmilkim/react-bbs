/** @type {import('next').NextConfig} */
const nextConfig = {
  styledComponents: true,
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/home',
      },
    ]
  },
};

module.exports = nextConfig;
