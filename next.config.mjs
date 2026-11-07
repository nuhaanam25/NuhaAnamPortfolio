/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // For cleaner Three.js canvas lifecycles and animations
  transpilePackages: ['three'],
};

export default nextConfig;