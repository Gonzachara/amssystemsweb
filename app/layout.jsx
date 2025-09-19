import "./globals.css";
import { Navigation } from "./Navigation";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { StructuredData } from "./components/StructuredData";
import { Breadcrumbs } from "./components/Breadcrumbs";
import { AccessibilityEnhancer } from "./components/AccessibilityEnhancer";
import { PerformanceOptimizer } from "./components/PerformanceOptimizer";
import { GoogleAnalytics } from "./components/GoogleAnalytics";
import { SEOOptimizer } from "./components/SEOOptimizer";
import ChatWidget from "./components/ChatWidget";
import Script from 'next/script';
import PropTypes from 'prop-types';

export const metadata = {
  title: "AMS SYSTEMS | Desarrollo Web Profesional, E-commerce y Sistemas a Medida en Argentina",
  description: "Desarrollo web profesional en Argentina. Creamos sitios web que venden, e-commerce rentables y sistemas a medida que escalan tu negocio. +$247M en ingresos generados para nuestros clientes.",
  keywords: "desarrollo web argentina, diseño web profesional, e-commerce argentina, sistemas a medida, desarrollo de software, diseño UX UI, páginas web modernas, tiendas online, automatización empresarial, Buenos Aires",
  authors: [{ name: "AMS SYSTEMS" }],
  creator: "AMS SYSTEMS",
  publisher: "AMS SYSTEMS",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/logos/ams-logo.png', type: 'image/png' }
    ],
    shortcut: '/favicon.ico',
    apple: '/logos/ams-logo.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://amssystems.com.ar',
    siteName: 'AMS SYSTEMS',
    title: 'AMS SYSTEMS | Desarrollo Web Profesional y E-commerce en Argentina',
    description: 'Desarrollo web profesional en Argentina. Creamos sitios web que venden, e-commerce rentables y sistemas a medida que escalan tu negocio.',
    images: [
      {
        url: '/images/ams-og-image.webp',
        width: 1200,
        height: 630,
        alt: 'AMS SYSTEMS - Desarrollo Web Profesional en Argentina',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@amssystems',
    creator: '@amssystems',
    title: 'AMS SYSTEMS | Desarrollo Web Profesional en Argentina',
    description: 'Desarrollo web profesional en Argentina. Creamos sitios web que venden, e-commerce rentables y sistemas a medida.',
    images: ['/images/ams-twitter-card.webp'],
  },
  alternates: {
    canonical: 'https://amssystems.com.ar',
    languages: {
      'es-AR': 'https://amssystems.com.ar',
      'es': 'https://amssystems.com.ar',
    },
  },
  category: 'technology',
  classification: 'Desarrollo Web, E-commerce, Software a Medida',
  other: {
    'geo.region': 'AR',
    'geo.placename': 'Buenos Aires',
    'geo.position': '-34.6037;-58.3816',
    'ICBM': '-34.6037, -58.3816',
    'DC.title': 'AMS SYSTEMS - Desarrollo Web Profesional en Argentina',
    'DC.description': 'Desarrollo web profesional en Argentina. Creamos sitios web que venden, e-commerce rentables y sistemas a medida.',
    'DC.subject': 'Desarrollo Web, E-commerce, Software a Medida, Argentina',
    'DC.language': 'es-AR',
    'DC.coverage': 'Argentina',
    'DC.creator': 'AMS SYSTEMS',
    'DC.publisher': 'AMS SYSTEMS',
    'DC.rights': '© 2024 AMS SYSTEMS. Todos los derechos reservados.',
    'DC.date.created': '2024-01-01',
    'DC.date.modified': new Date().toISOString().split('T')[0],
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="es-AR" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#4075f5" />
        <meta name="msapplication-TileColor" content="#4075f5" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        {/* Font preloads for better performance */}
        <link 
          rel="preload" 
          href="/fonts/SF PRO DISPLAY 600.ttf" 
          as="font" 
          type="font/ttf" 
          crossOrigin="anonymous" 
        />
        <link 
          rel="preload" 
          href="/fonts/SF PRO TEXT 400.ttf" 
          as="font" 
          type="font/ttf" 
          crossOrigin="anonymous" 
        />
        <link 
          rel="preload" 
          href="/fonts/Causten-Regular.otf" 
          as="font" 
          type="font/otf" 
          crossOrigin="anonymous" 
        />
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-TQKLVSZC');
            `,
          }}
        />
        {/* End Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Prevent FOUC by applying theme immediately
              (function() {
                try {
                  const stored = localStorage.getItem("ams-theme");
                  if (stored === "light") {
                    document.documentElement.classList.add('light-mode');
                  } else {
                    document.documentElement.classList.remove('light-mode');
                  }
                } catch (e) {
                  document.documentElement.classList.remove('light-mode');
                }
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-TQKLVSZC"
            height="0" 
            width="0" 
            style={{display:'none',visibility:'hidden'}}
            title="Google Tag Manager"
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <AccessibilityEnhancer />
        <PerformanceOptimizer />
        <ThemeProvider>
          <LanguageProvider>
            {/* Header con navegación */}
            <header style={{ position: 'relative', zIndex: 1000 }}>
              <Navigation />
            </header>
            
            {/* Breadcrumbs justo debajo del header */}
            <div style={{ position: 'relative', zIndex: 999 }}>
              <Breadcrumbs />
            </div>
            
            {/* Contenido principal */}
            <main>
              {children}
            </main>
          </LanguageProvider>
        </ThemeProvider>
        <StructuredData type="Organization" />
        <StructuredData type="WebSite" />
        <StructuredData type="LocalBusiness" />
        <GoogleAnalytics />
        <SEOOptimizer />
        <ChatWidget />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Refresh ScrollTrigger on resize
              window.addEventListener('resize', () => {
                if (window.ScrollTrigger) {
                  ScrollTrigger.refresh();
                }
              });
              
              // Refresh ScrollTrigger on load
              window.addEventListener('load', () => {
                if (window.ScrollTrigger) {
                  ScrollTrigger.refresh();
                }
              });
            `,
          }}
        />
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};