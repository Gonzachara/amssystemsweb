import Head from 'next/head';

export const SEOHead = ({ 
  title = "AMS Systems - Desarrollo Digital y Soluciones Tecnológicas",
  description = "AMS Systems es una agencia especializada en desarrollo web, diseño digital y soluciones tecnológicas innovadoras. Creamos experiencias digitales únicas que conectan tu marca con el mundo digital.",
  keywords = "desarrollo web, diseño digital, soluciones tecnológicas, agencia digital, marketing digital, páginas web, aplicaciones web, UX/UI design",
  image = "/images/ams-logo.png",
  url = "https://amssystems.com.ar",
  type = "website",
  locale = "es_ES"
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AMS Systems",
    "description": description,
    "url": url,
    "logo": `${url}${image}`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+54-9-11-1234-5678",
      "contactType": "customer service",
      "availableLanguage": ["Spanish", "English"]
    },
    "sameAs": [
      "https://linkedin.com/company/ams-systems",
      "https://instagram.com/amssystems"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "AR",
      "addressLocality": "Buenos Aires"
    },
    "foundingDate": "2020",
    "founders": [
      {
        "@type": "Person",
        "name": "AMS Systems Team"
      }
    ],
    "services": [
      "Desarrollo Web",
      "Diseño Digital", 
      "Soluciones Tecnológicas",
      "Marketing Digital",
      "UX/UI Design"
    ]
  };

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="AMS Systems" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${url}${image}`} />
      <meta property="og:locale" content={locale} />
      <meta property="og:site_name" content="AMS Systems" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={`${url}${image}`} />
      
      {/* Additional SEO Tags */}
      <meta name="theme-color" content="#000000" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Language */}
      <meta httpEquiv="content-language" content="es" />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
    </Head>
  );
};