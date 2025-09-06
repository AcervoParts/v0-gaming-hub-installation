/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'archive.org',
        port: '',
        pathname: '/download/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
        port: '',
        pathname: '/gh/EmulatorJS/**',
      },
      {
        protocol: 'https',
        hostname: '**.archive.org',
        port: '',
        pathname: '/**',
      },
    ],
    unoptimized: true,
  },
  
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },

  poweredByHeader: false,
  compress: true,
  
  async rewrites() {
    return [
      {
        source: '/emulator/:path*',
        destination: 'https://cdn.jsdelivr.net/gh/EmulatorJS/EmulatorJS@latest/:path*',
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'cross-origin',
          },
        ],
      },
    ]
  },
}

export default nextConfig
