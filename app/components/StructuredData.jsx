"use client";
import PropTypes from 'prop-types';

export const StructuredData = ({ type = "Organization", data }) => {
  const getStructuredData = () => {
    switch (type) {
      case "Organization":
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "AMS SYSTEMS",
          "alternateName": "AMS Systems",
          "description": "Desarrollo web profesional en Argentina. Creamos sitios web que venden, e-commerce rentables y sistemas a medida que escalan tu negocio.",
          "url": "https://amssystems.com.ar",
          "logo": "https://amssystems.com.ar/logos/ams-logo.png",
          "image": "https://amssystems.com.ar/images/ams-logo.webp",
          "foundingDate": "2022",
          "founder": {
            "@type": "Person",
            "name": "AMS SYSTEMS Team"
          },
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Buenos Aires",
            "addressCountry": "AR",
            "addressRegion": "Buenos Aires"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+54-9-11-5054-4776",
            "contactType": "customer service",
            "email": "amssystems22@gmail.com",
            "availableLanguage": ["Spanish", "English"]
          },
          "sameAs": [
            "https://www.linkedin.com/company/ams-systems",
            "https://twitter.com/amssystems",
            "https://www.instagram.com/amssystems"
          ],
          "serviceArea": {
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
                  "name": "Desarrollo Web Profesional",
                  "description": "Sitios web que venden, optimizados para conversión y SEO"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "E-commerce Rentable",
                  "description": "Tiendas online que convierten visitantes en clientes"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Sistemas a Medida",
                  "description": "Software personalizado que automatiza procesos empresariales"
                }
              }
            ]
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "47",
            "bestRating": "5",
            "worstRating": "1"
          }
        };

      case "WebSite":
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "AMS SYSTEMS",
          "url": "https://amssystems.com.ar",
          "description": "Desarrollo web profesional en Argentina. Creamos sitios web que venden, e-commerce rentables y sistemas a medida.",
          "inLanguage": "es-AR",
          "copyrightYear": "2024",
          "creator": {
            "@type": "Organization",
            "name": "AMS SYSTEMS"
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://amssystems.com.ar/trabajos?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        };

      case "LocalBusiness":
        return {
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "name": "AMS SYSTEMS",
          "description": "Desarrollo web profesional, e-commerce y sistemas a medida en Argentina",
          "url": "https://amssystems.com.ar",
          "telephone": "+54-9-11-5054-4776",
          "email": "amssystems22@gmail.com",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Buenos Aires",
            "addressCountry": "AR",
            "addressRegion": "Buenos Aires"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "-34.6037",
            "longitude": "-58.3816"
          },
          "openingHours": "Mo-Fr 09:00-18:00",
          "priceRange": "$$",
          "currenciesAccepted": "ARS, USD",
          "paymentAccepted": "Cash, Credit Card, Bank Transfer",
          "areaServed": {
            "@type": "Country",
            "name": "Argentina"
          },
          "serviceType": "Desarrollo Web, E-commerce, Software a Medida"
        };

      case "FAQPage":
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "¿Qué tipo de empresas crecen más rápido con AMS SYSTEMS?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "PYMES con visión de escala, startups que buscan product-market fit y empresas establecidas que quieren digitalizar procesos. El común denominador: ambición de crecer y apertura al cambio."
              }
            },
            {
              "@type": "Question",
              "name": "¿Cuánto tiempo toma ver resultados reales?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Landing pages optimizadas: resultados en 2-4 semanas. E-commerce completo: primeras ventas en 6-8 semanas. Sistemas complejos: ROI visible en 3-4 meses."
              }
            },
            {
              "@type": "Question",
              "name": "¿Incluyen soporte y mantenimiento?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Absolutamente. Planes desde $299/mes que incluyen: monitoreo 24/7, updates de seguridad, backups automáticos y optimizaciones mensuales. Tu inversión está protegida."
              }
            },
            {
              "@type": "Question",
              "name": "¿Pueden integrar nuestros sistemas actuales?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Sí, es nuestra especialidad. Analizamos tu stack actual (CRM, ERP, email, analytics) y creamos un ecosistema integrado. Datos sincronizados, procesos fluidos."
              }
            },
            {
              "@type": "Question",
              "name": "¿Cómo calculan el precio de un proyecto?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Basado en valor generado, no en horas. Evaluamos tu potencial de crecimiento, definimos KPIs específicos y estructuramos la inversión con ROI proyectado. Transparencia total."
              }
            }
          ]
        };

      case "BreadcrumbList":
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": data?.breadcrumbs?.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
          })) || []
        };

      case "Project":
        return {
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          "name": data?.name || "Proyecto AMS SYSTEMS",
          "description": data?.description || "Proyecto de desarrollo web profesional",
          "url": data?.url || "https://amssystems.com.ar/trabajos",
          "creator": {
            "@type": "Organization",
            "name": "AMS SYSTEMS"
          },
          "dateCreated": data?.dateCreated || "2024-01-01",
          "genre": "Desarrollo Web",
          "inLanguage": "es-AR",
          "keywords": data?.keywords || "desarrollo web, e-commerce, sistemas a medida"
        };

      default:
        return {};
    }
  };

  const structuredData = getStructuredData();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2),
      }}
    />
  );
};

StructuredData.propTypes = {
  type: PropTypes.string,
  data: PropTypes.object
};
