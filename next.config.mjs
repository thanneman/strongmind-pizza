/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    forceSwcTransforms: true, // Force SWC transforms
  },
};

export default nextConfig;
