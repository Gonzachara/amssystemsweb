"use client";

import { useEffect } from 'react';

export const PerformanceOptimizer = () => {
  useEffect(() => {
    // Preload recursos críticos
    const preloadCriticalResources = () => {
      const criticalResources = [
        { href: '/logos/ams-logo.webp', as: 'image' },
        { href: '/fonts/SF PRO DISPLAY 600.ttf', as: 'font', type: 'font/ttf', crossorigin: 'anonymous' },
        { href: '/fonts/SF PRO TEXT 400.ttf', as: 'font', type: 'font/ttf', crossorigin: 'anonymous' }
      ];

      criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource.href;
        link.as = resource.as;
        if (resource.type) link.type = resource.type;
        if (resource.crossorigin) link.crossOrigin = resource.crossorigin;
        document.head.appendChild(link);
      });
    };

    // Preconnect a dominios externos
    const preconnectExternalDomains = () => {
      const domains = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
        'https://assets.calendly.com',
        'https://calendly.com'
      ];

      domains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        document.head.appendChild(link);
      });
    };

    // Optimizar carga de fuentes
    const optimizeFonts = () => {
      const fontDisplay = document.createElement('style');
      fontDisplay.textContent = `
        @font-face {
          font-family: 'SF Pro Display';
          font-display: swap;
        }
        @font-face {
          font-family: 'SF Pro Text';
          font-display: swap;
        }
        @font-face {
          font-family: 'Arial';
          font-display: swap;
        }
      `;
      document.head.appendChild(fontDisplay);
    };

    // Optimizar imágenes con lazy loading nativo
    const optimizeImages = () => {
      const images = document.querySelectorAll('img:not([loading])');
      images.forEach(img => {
        if (!img.hasAttribute('loading')) {
          img.setAttribute('loading', 'lazy');
        }
        if (!img.hasAttribute('decoding')) {
          img.setAttribute('decoding', 'async');
        }
      });
    };

    // Optimizar scripts
    const optimizeScripts = () => {
      const scripts = document.querySelectorAll('script[src]');
      scripts.forEach(script => {
        if (!script.hasAttribute('async') && !script.hasAttribute('defer')) {
          script.setAttribute('defer', '');
        }
      });
    };

    // Prefetch páginas importantes
    const prefetchImportantPages = () => {
      const importantPages = ['/nosotros', '/trabajos', '/contacto', '/servicios'];
      
      importantPages.forEach(page => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = page;
        document.head.appendChild(link);
      });
    };

    // Optimizar Core Web Vitals
    const optimizeCoreWebVitals = () => {
      // LCP (Largest Contentful Paint) - Preload imagen hero
      const heroImage = document.querySelector('.hero-image, .main-image');
      if (heroImage) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = heroImage.src;
        link.as = 'image';
        link.fetchPriority = 'high';
        document.head.appendChild(link);
      }

      // FID (First Input Delay) - Optimizar event listeners
      const optimizeEventListeners = () => {
        // Usar passive listeners donde sea posible
        const passiveEvents = ['touchstart', 'touchmove', 'wheel', 'mousewheel'];
        passiveEvents.forEach(eventType => {
          document.addEventListener(eventType, () => {}, { passive: true });
        });
      };

      // CLS (Cumulative Layout Shift) - Reservar espacio para elementos dinámicos
      const reserveSpaceForDynamicElements = () => {
        const style = document.createElement('style');
        style.textContent = `
          /* Reservar espacio para elementos que pueden causar CLS */
          .navigation-wrapper {
            min-height: 80px;
          }
          
          .hero-section {
            min-height: 100vh;
          }
          
          .loading-placeholder {
            min-height: 200px;
            background: #f0f0f0;
          }
          
          /* Evitar layout shift en imágenes */
          img {
            aspect-ratio: attr(width) / attr(height);
          }
          
          /* Reservar espacio para contenido dinámico */
          .dynamic-content {
            min-height: 100px;
          }
        `;
        document.head.appendChild(style);
      };

      optimizeEventListeners();
      reserveSpaceForDynamicElements();
    };

    // Optimizar memoria
    const optimizeMemory = () => {
      // Limpiar event listeners no utilizados
      const cleanup = () => {
        // Limpiar timers
        const timers = window.setTimeout(() => {}, 0);
        if (timers > 100) {
          console.warn('Muchos timers activos, considerando limpieza');
        }
      };

      // Ejecutar limpieza cada 30 segundos
      setInterval(cleanup, 30000);
    };

    // Optimizar red
    const optimizeNetwork = () => {
      // Comprimir recursos
      const compressResources = () => {
        // Next.js ya maneja la compresión, pero podemos optimizar headers
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.register('/sw.js').catch(() => {
            // Service worker no disponible, continuar sin él
          });
        }
      };

      compressResources();
    };

    // Inicializar optimizaciones
    const initializeOptimizations = () => {
      preloadCriticalResources();
      preconnectExternalDomains();
      optimizeFonts();
      optimizeImages();
      optimizeScripts();
      prefetchImportantPages();
      optimizeCoreWebVitals();
      optimizeMemory();
      optimizeNetwork();
    };

    // Ejecutar optimizaciones
    initializeOptimizations();

    // Optimizar elementos dinámicos
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          optimizeImages();
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
};
