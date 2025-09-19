"use client";

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

export const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  priority = false,
  quality = 85,
  placeholder = 'blur',
  blurDataURL,
  className = '',
  style = {},
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  loading = 'lazy',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef(null);

  // Intersection Observer para lazy loading
  useEffect(() => {
    if (priority || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority, isInView]);

  // Generar blur placeholder si no se proporciona
  const generateBlurDataURL = () => {
    if (blurDataURL) return blurDataURL;
    
    // Crear un placeholder SVG simple
    const svg = `
      <svg width="${width || 400}" height="${height || 300}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f0f0f0"/>
        <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#999" font-family="Arial, sans-serif" font-size="14">
          Cargando...
        </text>
      </svg>
    `;
    
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  };

  // Determinar el formato de imagen óptimo
  const getOptimalSrc = (originalSrc) => {
    if (!originalSrc) return originalSrc;
    
    // Si ya es WebP o AVIF, mantenerlo
    if (originalSrc.includes('.webp') || originalSrc.includes('.avif')) {
      return originalSrc;
    }
    
    // Para imágenes estáticas, intentar WebP
    if (originalSrc.includes('/images/') || originalSrc.includes('/logos/')) {
      const baseName = originalSrc.replace(/\.[^/.]+$/, '');
      return `${baseName}.webp`;
    }
    
    return originalSrc;
  };

  const optimizedSrc = getOptimalSrc(src);

  return (
    <div 
      ref={imgRef}
      className={`optimized-image-container ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        ...style
      }}
      {...props}
    >
      {isInView && (
        <Image
          src={optimizedSrc}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          quality={quality}
          placeholder={placeholder}
          blurDataURL={generateBlurDataURL()}
          sizes={sizes}
          loading={loading}
          onLoad={() => setIsLoaded(true)}
          style={{
            transition: 'opacity 0.3s ease',
            opacity: isLoaded ? 1 : 0,
            ...style
          }}
          onError={(e) => {
            // Fallback a la imagen original si WebP falla
            if (optimizedSrc !== src) {
              e.target.src = src;
            }
          }}
        />
      )}
      
      {/* Placeholder mientras carga */}
      {!isLoaded && isInView && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#999',
            fontSize: '14px',
            fontFamily: 'Arial, sans-serif'
          }}
        >
          Cargando...
        </div>
      )}
    </div>
  );
};

// Componente específico para logos
export const OptimizedLogo = ({ src, alt, width = 200, height = 60, ...props }) => (
  <OptimizedImage
    src={src}
    alt={alt}
    width={width}
    height={height}
    priority={true}
    quality={90}
    sizes="(max-width: 768px) 150px, 200px"
    {...props}
  />
);

// Componente específico para imágenes hero
export const OptimizedHeroImage = ({ src, alt, width = 1200, height = 600, ...props }) => (
  <OptimizedImage
    src={src}
    alt={alt}
    width={width}
    height={height}
    priority={true}
    quality={90}
    sizes="100vw"
    {...props}
  />
);

// Componente específico para thumbnails
export const OptimizedThumbnail = ({ src, alt, width = 300, height = 200, ...props }) => (
  <OptimizedImage
    src={src}
    alt={alt}
    width={width}
    height={height}
    quality={80}
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    {...props}
  />
);
