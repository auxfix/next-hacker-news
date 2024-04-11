/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        HACKER_API: process.env.HACKER_API,
        SOCKET_API: process.env.SOCKET_API,
    },
};

export default nextConfig;
