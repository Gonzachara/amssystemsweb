export default function robots() {
    return {
      rules: [
        {
          userAgent: '*',
          allow: '/',
          disallow: [
            '/private/',
            '/admin/',
            '/api/',
            '/_next/',
            '/.well-known/',
          ],
        },
        {
          userAgent: 'Googlebot',
          allow: '/',
          disallow: [
            '/private/',
            '/admin/',
            '/api/',
          ],
        },
        {
          userAgent: 'Bingbot',
          allow: '/',
          disallow: [
            '/private/',
            '/admin/',
            '/api/',
          ],
        },
      ],
      sitemap: 'https://amssystems.com.ar/sitemap.xml',
      host: 'https://amssystems.com.ar',
    }
  }