"use client";

import { useEffect } from 'react';

export const AccessibilityEnhancer = () => {
  useEffect(() => {
    // Mejorar navegación por teclado
    const handleKeyDown = (e) => {
      // Skip to main content con Alt + M
      if (e.altKey && e.key === 'm') {
        e.preventDefault();
        const mainContent = document.querySelector('main') || document.querySelector('[role="main"]');
        if (mainContent) {
          mainContent.focus();
          mainContent.scrollIntoView({ behavior: 'smooth' });
        }
      }

      // Skip to navigation con Alt + N
      if (e.altKey && e.key === 'n') {
        e.preventDefault();
        const navigation = document.querySelector('nav') || document.querySelector('[role="navigation"]');
        if (navigation) {
          navigation.focus();
          navigation.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    // Agregar indicadores de foco mejorados
    const addFocusStyles = () => {
      const style = document.createElement('style');
      style.textContent = `
        /* Mejores estilos de foco para accesibilidad */
        /* Skip links */
        .skip-link {
          position: absolute;
          top: -40px;
          left: 6px;
          background: #4075f5;
          color: white;
          padding: 8px;
          text-decoration: none;
          border-radius: 4px;
          z-index: 10000;
          font-weight: bold;
        }

        .skip-link:focus {
          top: 6px;
        }

        /* Mejorar contraste para texto */
        .low-contrast {
          color: #333 !important;
        }

        /* Indicadores de estado para screen readers */
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        /* Mejorar visibilidad de enlaces */
        a:not(.button):not(.nav-pill) {
          text-decoration: underline;
          text-decoration-thickness: 2px;
          text-underline-offset: 3px;
        }

        a:not(.button):not(.nav-pill):hover {
          text-decoration-color: #4075f5;
        }

        /* Mejorar contraste de botones */
        .button {
          border: 2px solid transparent;
          transition: all 0.3s ease;
        }

        .button:hover {
          border-color: #4075f5;
        }

        /* Indicadores de carga para screen readers */
        .loading-indicator {
          position: relative;
        }

        .loading-indicator::after {
          content: "Cargando...";
          position: absolute;
          left: -9999px;
        }

        /* Mejorar legibilidad de formularios */
        input, textarea, select {
          border: 2px solid #ddd;
          padding: 12px;
          border-radius: 4px;
          font-size: 16px;
          line-height: 1.5;
        }

        input:focus, textarea:focus, select:focus {
          border-color: #4075f5;
          box-shadow: 0 0 0 3px rgba(64, 117, 245, 0.1);
        }

        /* Etiquetas de formulario */
        label {
          font-weight: 600;
          margin-bottom: 8px;
          display: block;
        }

        /* Mensajes de error */
        .error-message {
          color: #d32f2f;
          font-weight: 600;
          margin-top: 4px;
        }

        /* Mejorar contraste de imágenes */
        img {
          max-width: 100%;
          height: auto;
        }

        /* Indicadores de estado para elementos interactivos */
        [aria-expanded="true"]::after {
          content: " (expandido)";
          position: absolute;
          left: -9999px;
        }

        [aria-expanded="false"]::after {
          content: " (colapsado)";
          position: absolute;
          left: -9999px;
        }

        /* Mejorar visibilidad de elementos de navegación */
        nav a, nav button {
          min-height: 44px;
          min-width: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Indicadores de carga */
        [aria-busy="true"] {
          position: relative;
        }

        [aria-busy="true"]::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(255, 255, 255, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        [aria-busy="true"]::after {
          content: "Cargando...";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: #4075f5;
          color: white;
          padding: 8px 16px;
          border-radius: 4px;
          font-size: 14px;
        }
      `;
      document.head.appendChild(style);
    };

    // Agregar skip links
    const addSkipLinks = () => {
      const skipLinks = document.createElement('div');
      skipLinks.innerHTML = `
        <a href="#main-content" class="skip-link">Saltar al contenido principal</a>
        <a href="#navigation" class="skip-link">Saltar a la navegación</a>
        <a href="#footer" class="skip-link">Saltar al pie de página</a>
      `;
      document.body.insertBefore(skipLinks, document.body.firstChild);
    };

    // Mejorar elementos existentes
    const enhanceExistingElements = () => {
      // Agregar roles ARIA donde falten
      const navigation = document.querySelector('.navigation-wrapper');
      if (navigation && !navigation.getAttribute('role')) {
        navigation.setAttribute('role', 'navigation');
        navigation.setAttribute('aria-label', 'Navegación principal');
        navigation.id = 'navigation';
      }

      // Agregar main content
      const mainContent = document.querySelector('main') || document.querySelector('.main-content');
      if (mainContent) {
        mainContent.id = 'main-content';
        mainContent.setAttribute('role', 'main');
      }

      // Agregar footer
      const footer = document.querySelector('footer') || document.querySelector('.footer');
      if (footer) {
        footer.id = 'footer';
        footer.setAttribute('role', 'contentinfo');
      }

      // Mejorar botones
      const buttons = document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])');
      buttons.forEach(button => {
        if (!button.getAttribute('aria-label') && button.textContent.trim()) {
          button.setAttribute('aria-label', button.textContent.trim());
        }
      });

      // Mejorar enlaces
      const links = document.querySelectorAll('a:not([aria-label]):not([aria-labelledby])');
      links.forEach(link => {
        if (!link.getAttribute('aria-label') && link.textContent.trim()) {
          link.setAttribute('aria-label', link.textContent.trim());
        }
      });

      // Agregar indicadores de estado a elementos interactivos
      const interactiveElements = document.querySelectorAll('[onclick], [onmouseover], [onmouseout]');
      interactiveElements.forEach(element => {
        if (!element.getAttribute('tabindex')) {
          element.setAttribute('tabindex', '0');
        }
      });
    };

    // Inicializar mejoras de accesibilidad
    addFocusStyles();
    addSkipLinks();
    enhanceExistingElements();

    // Agregar event listeners
    document.addEventListener('keydown', handleKeyDown);

    // Mejorar elementos dinámicos
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          enhanceExistingElements();
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      observer.disconnect();
    };
  }, []);

  return null;
};
