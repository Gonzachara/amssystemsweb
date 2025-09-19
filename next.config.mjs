/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimizaciones de rendimiento
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  
  // Optimización de imágenes
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 año
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Headers de seguridad y rendimiento
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Redirecciones para SEO
  async redirects() {
    return [
      {
        source: '/works',
        destination: '/trabajos',
        permanent: true,
      },
      {
        source: '/works/:path*',
        destination: '/proyecto/:path*',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/nosotros',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/contacto',
        permanent: true,
      },
      {
        source: '/services',
        destination: '/servicios',
        permanent: true,
      },
    ];
  },

  // Optimizaciones experimentales
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', '@fortawesome/react-fontawesome'],
  },

  // Configuración de webpack para optimización
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          gsap: {
            test: /[\\/]node_modules[\\/](gsap|@gsap)[\\/]/,
            name: 'gsap',
            chunks: 'all',
          },
          three: {
            test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
            name: 'three',
            chunks: 'all',
          },
        },
      };
    }
    return config;
  },
};

export default nextConfig;
