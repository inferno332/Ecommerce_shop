/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        BASE_URL: 'https://server-ls-shop.onrender.com',
    },
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'server-ls-shop.onrender.com',
            },
        ],
    },
};

module.exports = nextConfig;
