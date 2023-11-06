/** @type {import('next').NextConfig} */
const nextConfig = {
    productionBrowserSourceMaps: true,
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                port: "3000",
                pathname: "/**/**"
            },
            {
                protocol: "http",
                hostname: "localhost",
                port: "3001",
                pathname: "/**/**"
            },
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                port: "",
                pathname: "/**/**"
            },
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com",
                port: "",
                pathname: "/**/**"
            }
        ]
    }
};

export default nextConfig;
