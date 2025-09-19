"use client";
import { useEffect } from 'react';

export const SEOOptimizer = () => {
  useEffect(() => {
    // Add structured data for better SEO
    const addStructuredData = () => {
      const structuredData = {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "@id": "https://amssystems.com.ar/#organization",
            "name": "AMS SYSTEMS",
            "url": "https://amssystems.com.ar",
            "logo": {
              "@type": "ImageObject",
              "url": "https://amssystems.com.ar/logos/ams-logo.png",
              "width": 300,
              "height": 300
            },
            "description": "Desarrollo web profesional en Argentina. Creamos sitios web que venden, e-commerce rentables y sistemas a medida que escalan tu negocio.",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "AR",
              "addressRegion": "Buenos Aires",
              "addressLocality": "Buenos Aires"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+54-11-1234-5678",
              "contactType": "customer service",
              "availableLanguage": ["Spanish", "English"]
            },
            "sameAs": [
              "https://www.linkedin.com/company/ams-systems",
              "https://www.instagram.com/amssystems",
              "https://www.facebook.com/amssystems"
            ]
          },
          {
            "@type": "WebSite",
            "@id": "https://amssystems.com.ar/#website",
            "url": "https://amssystems.com.ar",
            "name": "AMS SYSTEMS - Desarrollo Web Profesional en Argentina",
            "description": "Desarrollo web profesional en Argentina. Creamos sitios web que venden, e-commerce rentables y sistemas a medida.",
            "publisher": {
              "@id": "https://amssystems.com.ar/#organization"
            },
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://amssystems.com.ar/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          },
          {
            "@type": "LocalBusiness",
            "@id": "https://amssystems.com.ar/#localbusiness",
            "name": "AMS SYSTEMS",
            "image": "https://amssystems.com.ar/logos/ams-logo.png",
            "telephone": "+54-11-1234-5678",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Av. Corrientes 1234",
              "addressLocality": "Buenos Aires",
              "addressRegion": "Buenos Aires",
              "postalCode": "C1043",
              "addressCountry": "AR"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": -34.6037,
              "longitude": -58.3816
            },
            "url": "https://amssystems.com.ar",
            "openingHours": "Mo-Fr 09:00-18:00",
            "priceRange": "$$",
            "servedArea": {
              "@type": "Country",
              "name": "Argentina"
            },
            "serviceArea": {
              "@type": "GeoCircle",
              "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": -34.6037,
                "longitude": -58.3816
              },
              "geoRadius": "1000000"
            }
          },
          {
            "@type": "Service",
            "name": "Desarrollo Web Profesional",
            "description": "Creamos sitios web modernos, e-commerce rentables y sistemas a medida para empresas en Argentina",
            "provider": {
              "@id": "https://amssystems.com.ar/#organization"
            },
            "areaServed": {
              "@type": "Country",
              "name": "Argentina"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Servicios de Desarrollo Web",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Desarrollo de Sitios Web",
                    "description": "Sitios web modernos y responsivos que convierten visitantes en clientes"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "E-commerce",
                    "description": "Tiendas online rentables con integración de pagos y gestión de inventario"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Sistemas a Medida",
                    "description": "Software personalizado para automatizar procesos empresariales"
                  }
                }
              ]
            }
          }
        ]
      };

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(structuredData);
      document.head.appendChild(script);
    };

    // Add meta tags for better SEO
    const addMetaTags = () => {
      const metaTags = [
        { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
        { name: 'googlebot', content: 'index, follow' },
        { name: 'bingbot', content: 'index, follow' },
        { name: 'author', content: 'AMS SYSTEMS' },
        { name: 'publisher', content: 'AMS SYSTEMS' },
        { name: 'copyright', content: '© 2024 AMS SYSTEMS. Todos los derechos reservados.' },
        { name: 'language', content: 'es-AR' },
        { name: 'geo.region', content: 'AR' },
        { name: 'geo.placename', content: 'Buenos Aires' },
        { name: 'geo.position', content: '-34.6037;-58.3816' },
        { name: 'ICBM', content: '-34.6037, -58.3816' },
        { name: 'DC.title', content: 'AMS SYSTEMS - Desarrollo Web Profesional en Argentina' },
        { name: 'DC.description', content: 'Desarrollo web profesional en Argentina. Creamos sitios web que venden, e-commerce rentables y sistemas a medida.' },
        { name: 'DC.subject', content: 'Desarrollo Web, E-commerce, Software a Medida, Argentina' },
        { name: 'DC.language', content: 'es-AR' },
        { name: 'DC.coverage', content: 'Argentina' },
        { name: 'DC.creator', content: 'AMS SYSTEMS' },
        { name: 'DC.publisher', content: 'AMS SYSTEMS' },
        { name: 'DC.rights', content: '© 2024 AMS SYSTEMS. Todos los derechos reservados.' },
        { name: 'DC.date.created', content: '2024-01-01' },
        { name: 'DC.date.modified', content: new Date().toISOString().split('T')[0] },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'apple-mobile-web-app-title', content: 'AMS SYSTEMS' },
        { name: 'application-name', content: 'AMS SYSTEMS' },
        { name: 'msapplication-TileColor', content: '#4075f5' },
        { name: 'msapplication-config', content: '/browserconfig.xml' },
        { name: 'theme-color', content: '#4075f5' }
      ];

      metaTags.forEach(tag => {
        if (!document.querySelector(`meta[name="${tag.name}"]`)) {
          const meta = document.createElement('meta');
          meta.name = tag.name;
          meta.content = tag.content;
          document.head.appendChild(meta);
        }
      });
    };

    // Add canonical URL
    const addCanonicalUrl = () => {
      if (!document.querySelector('link[rel="canonical"]')) {
        const canonical = document.createElement('link');
        canonical.rel = 'canonical';
        canonical.href = `https://amssystems.com.ar${window.location.pathname}`;
        document.head.appendChild(canonical);
      }
    };

    // Add hreflang tags for multilingual support
    const addHreflangTags = () => {
      const hreflangTags = [
        { rel: 'alternate', hreflang: 'es-ar', href: 'https://amssystems.com.ar' },
        { rel: 'alternate', hreflang: 'es', href: 'https://amssystems.com.ar' },
        { rel: 'alternate', hreflang: 'x-default', href: 'https://amssystems.com.ar' }
      ];

      hreflangTags.forEach(tag => {
        if (!document.querySelector(`link[rel="${tag.rel}"][hreflang="${tag.hreflang}"]`)) {
          const link = document.createElement('link');
          link.rel = tag.rel;
          link.hreflang = tag.hreflang;
          link.href = tag.href;
          document.head.appendChild(link);
        }
      });
    };

    // Initialize all SEO optimizations
    addStructuredData();
    addMetaTags();
    addCanonicalUrl();
    addHreflangTags();

    // Track page performance for SEO insights
    const trackPerformance = () => {
      if ('performance' in window) {
        window.addEventListener('load', () => {
          setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
            
            // Track Core Web Vitals
            if ('web-vital' in window) {
              // This would be implemented with web-vitals library
              console.log('Core Web Vitals tracking ready');
            }
          }, 0);
        });
      }
    };

    trackPerformance();
  }, []);

  return null;
};

// Utility function to update page title and meta description
export const updatePageSEO = (title, description, keywords = '') => {
  if (typeof document !== 'undefined') {
    document.title = title;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = description;
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description;
      document.head.appendChild(meta);
    }

    if (keywords) {
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.content = keywords;
      } else {
        const meta = document.createElement('meta');
        meta.name = 'keywords';
        meta.content = keywords;
        document.head.appendChild(meta);
      }
    }
  }
};

// Function to generate sitemap data
export const generateSitemapData = () => {
  const baseUrl = 'https://amssystems.com.ar';
  const currentDate = new Date().toISOString().split('T')[0];
  
  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/nosotros`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/trabajos`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/servicios`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contacto`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    }
  ];
};
