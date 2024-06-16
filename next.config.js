/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "img.icons8.com"
            },
            {
                protocol: "https",
                hostname: "cdn.sanity.io"
            },
        ]
    },
}

module.exports = nextConfig
