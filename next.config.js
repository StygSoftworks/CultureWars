/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['th.bing.com', 'picsum.photos', 'i.postimg.cc', 's3-prod.adage.com'], // Add the domains you need here
  }
};

module.exports = nextConfig;
