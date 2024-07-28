/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        HACKER_API: process.env.HACKER_API,
        SOCKET_API: process.env.SOCKET_API,
        GQL_SERVER: process.env.GQL_SERVER,
    },
};

export default nextConfig;
