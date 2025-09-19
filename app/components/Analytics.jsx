"use client";

import { useEffect } from 'react';
import Script from 'next/script';

export const Analytics = () => {
  useEffect(() => {
    // Google Analytics 4
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      // Configurar Google Analytics
      window.gtag = window.gtag || function() {
        (window.gtag.q = window.gtag.q || []).push(arguments);
      };
      
      window.gtag('js', new Date());
      window.gtag('config', 'G-XXXXXXXXXX', {
        page_title: document.title,
        page_location: window.location.href,
        send_page_view: true
      });
    }
  }, []);

  return (
    <>
      {/* Google Analytics */}
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX', {
              page_title: document.title,
              page_location: window.location.href,
              send_page_view: true
            });
          `,
        }}
      />
      
      {/* Google Search Console */}
      <meta name="google-site-verification" content="your-verification-code" />
      
      {/* Bing Webmaster Tools */}
      <meta name="msvalidate.01" content="your-bing-verification-code" />
      
      {/* Yandex Webmaster */}
      <meta name="yandex-verification" content="your-yandex-verification-code" />
    </>
  );
};
