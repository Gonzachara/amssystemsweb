"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { StructuredData } from './StructuredData';
import { useEffect, useState } from 'react';

export const Breadcrumbs = () => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  const generateBreadcrumbs = () => {
    const pathSegments = pathname.split('/').filter(segment => segment !== '');
    const breadcrumbs = [
      { name: 'Inicio', url: 'https://amssystems.com.ar/' }
    ];

    let currentPath = '';
    
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Mapear segmentos a nombres legibles
      const segmentNames = {
        'nosotros': 'Nosotros',
        'trabajos': 'Casos de Éxito',
        'contacto': 'Contacto',
        'servicios': 'Servicios',
        'legal': 'Legal',
        'terms': 'Términos de Servicio',
        'privacy': 'Política de Privacidad',
        'cookies': 'Política de Cookies'
      };

      // Para casos de estudio específicos
      const caseStudyNames = {
        'revestimientos-don-andres': 'Revestimientos Don Andrés',
        'combracks': 'Combracks',
        'american-racks': 'American Racks',
        'romatea': 'Romatea',
        'match-point-courts': 'Match Point Courts',
        'construcciones-secas': 'Construcciones Secas',
        'cyarq': 'Cyarq',
        'real-premoldeados': 'Real Premoldeados',
        'estudio-torres': 'Estudio Torres'
      };

      const name = segmentNames[segment] || caseStudyNames[segment] || 
                   segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
      
      breadcrumbs.push({
        name,
        url: `https://amssystems.com.ar${currentPath}`
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // No mostrar breadcrumbs hasta que esté montado o en la página de inicio
  if (!mounted || pathname === '/') {
    return null;
  }

  return (
    <>
      <StructuredData type="BreadcrumbList" data={{ breadcrumbs }} />
      <div 
        className="breadcrumbs-container"
        style={{
          position: 'relative',
          zIndex: 10,
          paddingTop: '1.5rem',
          paddingBottom: '1.5rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <nav 
          className="breadcrumbs" 
          aria-label="Breadcrumb"
          style={{
            display: 'inline-flex',
            borderRadius: '20px',
            padding: '0.4rem 0.8rem',
            fontSize: '0.7rem',
            fontWeight: '400',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s ease',
            maxWidth: '90vw',
            overflow: 'hidden'
          }}
        >
            <ol 
              style={{
                display: 'flex',
                alignItems: 'center',
                listStyle: 'none',
                margin: 0,
                padding: 0,
                gap: '0.5rem'
              }}
            >
              {breadcrumbs.map((breadcrumb, index) => (
                <li key={breadcrumb.url} style={{ display: 'flex', alignItems: 'center' }}>
                  {index > 0 && (
                    <span 
                      style={{ 
                        margin: '0 0.3rem',
                        color: 'rgba(255, 255, 255, 0.3)',
                        fontSize: '0.6rem',
                        fontWeight: '400'
                      }}
                      aria-hidden="true"
                    >
                      /
                    </span>
                  )}
                  {index === breadcrumbs.length - 1 ? (
                    <span 
                      style={{ 
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontWeight: '500',
                        textDecoration: 'none',
                        padding: '0.2rem 0.4rem',
                        borderRadius: '8px',
                        fontSize: '0.7rem',
                      }}
                      aria-current="page"
                    >
                      {breadcrumb.name}
                    </span>
                  ) : (
                    <Link 
                      href={breadcrumb.url.replace('https://amssystems.com.ar', '')}
                      style={{ 
                        color: 'rgba(255, 255, 255, 0.5)',
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                        padding: '0.2rem 0.4rem',
                        borderRadius: '8px',
                        fontSize: '0.7rem',
                        fontWeight: '400',
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = 'rgba(255, 255, 255, 0.8)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = 'rgba(255, 255, 255, 0.5)';
                      }}
                    >
                      {breadcrumb.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
      </div>

      <style>{`
        .breadcrumbs-container {
          margin-top: var(--nav-height, 70px);
        }

        .light-mode .breadcrumbs span,
        .light-mode .breadcrumbs a {
        color: #000000 !important;
        }

        @media (max-width: 768px) {
          .breadcrumbs-container {
            padding-top: 1rem !important;
            padding-bottom: 1rem !important;
          }
          
          .breadcrumbs {
            font-size: 0.65rem !important;
            padding: 0.3rem 0.6rem !important;
            max-width: 95vw !important;
          }
          
          .breadcrumbs ol {
            gap: 0.3rem !important;
          }
          
          .breadcrumbs span[aria-hidden="true"] {
            margin: 0 0.3rem !important;
            font-size: 0.6rem !important;
          }
          
          .breadcrumbs a,
          .breadcrumbs span[aria-current="page"] {
            padding: 0.3rem 0.6rem !important;
            font-size: 0.7rem !important;
          }
        }

        @media (max-width: 480px) {
          .breadcrumbs {
            max-width: calc(100vw - 1rem) !important;
            overflow-x: auto;
            white-space: nowrap;
            padding: 0.5rem 1rem !important;
          }
          
          .breadcrumbs ol {
            flex-wrap: nowrap;
            gap: 0.2rem !important;
          }
          
          .breadcrumbs a,
          .breadcrumbs span[aria-current="page"] {
            padding: 0.25rem 0.5rem !important;
            font-size: 0.65rem !important;
            border-radius: 15px !important;
          }
        }
      `}</style>
    </>
  );
};