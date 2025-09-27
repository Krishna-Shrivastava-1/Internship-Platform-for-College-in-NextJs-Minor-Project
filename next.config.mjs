/** @type {import('next').NextConfig} */
const nextConfig = {
     images: {
    domains: [], // This is deprecated in favor of remotePatterns
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**', // Matches any hostname
      },
      {
        protocol: 'https',
        hostname: '**', // Matches any hostname
      },
    ],
  }
};

export default nextConfig;
