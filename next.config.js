/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')

const nextConfig = {
    // reactStrictMode: true,
    i18n,
    images: {
        domains: [
            'ik.imagekit.io',
            'xanalia.s3.amazonaws.com',
            'xanalia.s3.ap-southeast-1.amazonaws.com',
            'ik.imagekit.io',
            'storage.xanalia.com',
            'dev-storage.xanalia.com',
        ],
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack'],
        })

        return config
    },
}

module.exports = nextConfig
